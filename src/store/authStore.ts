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

export class AuthStore {
  user: User | null = null;
  userProfile: DocumentData | null = null;
  loading = false;
  error: string | null = null;
  initialized = false;
  isNewUser = false;

  constructor() {
    makeAutoObservable(this);
    this.init();
  }

  // Listen for authentication state changes
  init() {
    onAuthStateChanged(auth, async (user) => {

      if (user) await user.reload();

      runInAction(() => {
        this.user = user;
        this.initialized = true;

        if (!this.isNewUser) {
          this.isNewUser = false;
        }
      });

      if (user) {
        const profile = await this.fetchUserProfile(user.uid);
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

  // Register a new user
  async register(email: string, password: string, displayName: string, phoneNumber: string) {
    this.loading = true;
    this.error = null;

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const { user } = userCredential;

      await updateProfile(user, { displayName });

      try {
        await setDoc(doc(firestore, 'users', user.uid), {
          displayName,
          phoneNumber,
          email,
          createdAt: new Date().toISOString(),
        });
      } catch (err) {
        console.error('Firestore setDoc error:', err);
        runInAction(() => {
          this.error = handleFirebaseError(err);
        });
      }


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

  // Login
  async login(email: string, password: string) {
    this.loading = true;
    this.error = null;

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const { user } = userCredential;

      const profile = await this.fetchUserProfile(user.uid);

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

  // Logout
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


  // Reset password
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

  // Fetch user profile from Firestore
  async fetchUserProfile(uid: string) {
    try {
      const docRef = doc(firestore, 'users', uid);
      const snapshot = await getDoc(docRef);
      if (snapshot.exists()) {
        return snapshot.data();
      } else {
        console.warn('No user profile found in Firestore');
        return null;
      }
    } catch (err) {
      console.error('Failed to fetch user profile:', err);
      return null;
    }
  }
