import { makeAutoObservable, runInAction } from 'mobx';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  sendPasswordResetEmail,
  updateProfile,
  User,
} from 'firebase/auth';
import {
  doc,
  setDoc,
  getDoc,
  DocumentData,
} from 'firebase/firestore';
import { auth, firestore } from '../../firebaseConfig';
import { handleFirebaseError } from '../validation/firebaseErrorMessages';
import { DARK, LIGHT } from '../constants/types';
import { RootStore } from './RootStore';
import { i18n } from '../utils/i18n/i18n';
import * as FileSystem from 'expo-file-system';
import * as ImageManipulator from 'expo-image-manipulator';
import Toast from 'react-native-toast-message';

export class AuthStore {
  rootStore: RootStore;
  user: User | null = null;
  userProfile: DocumentData | null = null;
  loading = false;
  error: string | null = null;
  initialized = false;
  isNewUser = false;

  constructor(rootStore: RootStore) {
    makeAutoObservable(this);
    this.rootStore = rootStore;
    this.init();
  }

  init() {
    onAuthStateChanged(auth, async (user) => {
      if (user) await user.reload();

      runInAction(() => {
        this.user = user;
        this.initialized = true;
      });

      if (user) {
        const profile = await this.fetchUserProfile(user.uid);

        if (profile?.theme === DARK) {
          this.rootStore.themeStore.setDarkMode(true, false);
        } else {
          this.rootStore.themeStore.setDarkMode(false, false);
        }

        if (profile?.language && ['en', 'uk'].includes(profile.language)) {
          await i18n.changeLanguage(profile.language);
        }


        runInAction(() => {
          this.userProfile = profile;
        });
      } else {
        runInAction(() => {
          this.userProfile = null;
        });
      }
    });
  }

  async register(email: string, password: string, displayName: string, phoneNumber: string) {
    this.loading = true;
    this.error = null;

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const { user } = userCredential;
      await updateProfile(user, { displayName });

      await setDoc(doc(firestore, 'users', user.uid), {
        displayName,
        phoneNumber,
        email,
        createdAt: new Date().toISOString(),
        theme: LIGHT,
        language: 'en',
      });

      const profile = await this.fetchUserProfile(user.uid);

      runInAction(() => {
        this.user = user;
        this.userProfile = profile;
        this.isNewUser = true;
      });
    } catch (err: any) {
      console.error('Registration error:', err);
      runInAction(() => {
        this.error = handleFirebaseError(err);
        this.isNewUser = false;
      });
    } finally {
      runInAction(() => {
        this.loading = false;
      });
    }
  }

  async login(email: string, password: string) {
    this.loading = true;
    this.error = null;

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const { user } = userCredential;
      const profile = await this.fetchUserProfile(user.uid);

      if (profile?.language && ['en', 'uk'].includes(profile.language)) {
        await i18n.changeLanguage(profile.language);
      }

      if (profile?.theme === DARK) {
        this.rootStore.themeStore.setDarkMode(true, false);
      } else {
        this.rootStore.themeStore.setDarkMode(false, false);
      }

      runInAction(() => {
        this.user = user;
        this.userProfile = profile;
        this.isNewUser = false;
      });
    } catch (err: any) {
      runInAction(() => {
        this.error = handleFirebaseError(err);
      });
    } finally {
      runInAction(() => {
        this.loading = false;
      });
    }
  }

  async logout() {
    this.loading = true;
    this.error = null;

    try {
      await signOut(auth);
      runInAction(() => {
        this.user = null;
        this.userProfile = null;
        this.isNewUser = false;
      });
    } catch (err: any) {
      runInAction(() => {
        this.error = handleFirebaseError(err);
      });
    } finally {
      runInAction(() => {
        this.loading = false;
      });
    }
  }

  async resetPassword(email: string) {
    this.loading = true;
    this.error = null;

    try {
      await sendPasswordResetEmail(auth, email);
    } catch (err: any) {
      runInAction(() => {
        this.error = handleFirebaseError(err);
      });
    } finally {
      runInAction(() => {
        this.loading = false;
      });
    }
  }

  async fetchUserProfile(uid: string) {
    try {
      const docRef = doc(firestore, 'users', uid);
      const snapshot = await getDoc(docRef);
      return snapshot.exists() ? snapshot.data() : null;
    } catch (err) {
      console.error('Failed to fetch user profile:', err);
      return null;
    }
  }
  
  async updateUserProfile(data: { displayName?: string; phoneNumber?: string }) {
    if (!this.user || !this.userProfile) {
      console.warn('Cannot update profile: no user or userProfile');
      return;
    }

    this.loading = true;
    this.error = null;

    try {
      if (data.displayName) {
        await updateProfile(this.user, { displayName: data.displayName });
      }

      await setDoc(
        doc(firestore, 'users', this.user.uid),
        {
          ...this.userProfile,
          ...data,
        },
        { merge: true }
      );

      const updatedProfile = await this.fetchUserProfile(this.user.uid);
      runInAction(() => {
        this.userProfile = updatedProfile;
      });

    } catch (err: any) {
      runInAction(() => {
        this.error = handleFirebaseError(err);
      });
    } finally {
      runInAction(() => {
        this.loading = false;
      });
    }
  }

  clearError() {
    this.error = null;
  }

  async uploadProfilePhoto(uri: string, t: (key: string) => string) {
    if (!this.user) return;

    try {
      const manipulated = await ImageManipulator.manipulateAsync(
        uri,
        [{ resize: { width: 300 } }],
        { compress: 0.4, format: ImageManipulator.SaveFormat.JPEG }
      );

      const base64 = await FileSystem.readAsStringAsync(manipulated.uri, {
        encoding: FileSystem.EncodingType.Base64,
      });

      const maxBase64Length = 1_000_000;

      if (base64.length > maxBase64Length) {
        throw new Error('PhotoTooLarge');
      }

      const dataUrl = `data:image/jpeg;base64,${base64}`;

      await setDoc(
        doc(firestore, 'users', this.user.uid),
        { ...this.userProfile, photoBase64: dataUrl },
        { merge: true }
      );

      const updatedProfile = await this.fetchUserProfile(this.user.uid);
      runInAction(() => {
        this.userProfile = updatedProfile;
      });
    } catch (err: any) {
      console.error('Failed to save base64 avatar:', err);

      if (err.message === 'PhotoTooLarge') {
        Toast.show({
          type: 'error',
          text1: t('errors.error'),
          text2: t('errors.uploadPhotoTooLarge'),
        });
      } else {
        Toast.show({
          type: 'error',
          text1: t('errors.error'),
          text2: t('errors.photoSaveFailed'),
        });
      }
    }
  }
}
