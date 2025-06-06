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

export class AuthStore {
  user: User | null = null;
  loading = false;
  error: string | null = null;
  initialized = false;

  constructor() {
    makeAutoObservable(this);
    this.init();
  }

  init() {
    onAuthStateChanged(auth, (user) => {
      runInAction(() => {
        this.user = user;
        this.initialized = true;
      });
    });
  }

  async register(email: string, password: string) {
    this.loading = true;
    this.error = null;
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (err: any) {
      runInAction(() => {
        this.error = err.message;
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
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err: any) {
      runInAction(() => {
        this.error = err.message;
      });
    } finally {
      runInAction(() => {
        this.loading = false;
      });
    }
  }

  async logout() {
    await signOut(auth);
  }

  async resetPassword(email: string) {
    this.loading = true;
    this.error = null;
    try {
      await sendPasswordResetEmail(auth, email);
    } catch (err: any) {
      runInAction(() => {
        this.error = err.message;
      });
    } finally {
      runInAction(() => {
        this.loading = false;
      });
    }
  }
}

