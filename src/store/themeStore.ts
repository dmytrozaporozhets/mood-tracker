import { makeAutoObservable, runInAction } from 'mobx';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createTheme } from '../styling/themes/createTheme';
import { Theme } from '../types/theme';
import { THEME_STORAGE_KEY } from '../constants/storage';
import { DARK, LIGHT } from '../constants/types';
import { RootStore } from './RootStore';
import { doc, setDoc } from 'firebase/firestore';
import { firestore } from '../../firebaseConfig';

export class ThemeStore {
  rootStore: RootStore | null = null;
  isDark = false;
  initialized = false;

  constructor() {
    makeAutoObservable(this);
  }

  setRootStore(rootStore: RootStore) {
    this.rootStore = rootStore;
    this.loadTheme();
  }

  async loadTheme() {
    try {
      const storedTheme = await AsyncStorage.getItem(THEME_STORAGE_KEY);
      runInAction(() => {
        this.isDark = storedTheme === DARK;
        this.initialized = true;
      });
    } catch {
      runInAction(() => {
        this.initialized = true;
      });
    }
  }

  toggleTheme() {
    this.setDarkMode(!this.isDark, true);
  }

  setDarkMode(value: boolean, saveToFirestore: boolean) {
    this.isDark = value;
    const themeString = value ? DARK : LIGHT;

    AsyncStorage.setItem(THEME_STORAGE_KEY, themeString).catch(() => {});

    const uid = this.rootStore?.authStore.user?.uid;
    if (saveToFirestore && uid) {
      setDoc(doc(firestore, 'users', uid), {
        theme: themeString,
      }, { merge: true }).catch(() => {});
    }
  }

  get theme(): Theme {
    return createTheme(this.isDark);
  }
}
