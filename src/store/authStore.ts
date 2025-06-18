import { makeAutoObservable, runInAction } from 'mobx';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  sendPasswordResetEmail,
  User,
} from 'firebase/auth';
import { auth } from '../../firebaseConfig';
import { handleFirebaseError } from '../validation/firebaseErrorMessages';

export class AuthStore {
  user: User | null = null;
  loading = false;
  error: string | null = null;
  initialized = false;
  isNewUser = false;

  constructor() {
    makeAutoObservable(this);
    this.init();
  }

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
    });
  }

  async register(email: string, password: string) {
    this.loading = true;
    this.error = null;
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      await result.user.reload();

      runInAction(() => {
        this.isNewUser = true; 
        this.user = result.user;
      });
    } catch (err: any) {
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
      const result = await signInWithEmailAndPassword(auth, email, password);
      await result.user.reload();

      runInAction(() => {
        this.user = result.user;
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
    await signOut(auth);
    runInAction(() => {
      this.user = null;
      this.isNewUser = false;
    });
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
}
