import { makeAutoObservable, runInAction } from "mobx";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createTheme } from '../styling/themes/createTheme';
import { Theme } from '../types/theme';
import { THEME_STORAGE_KEY } from "../constants/storage";

export class ThemeStore {
  isDark = false;
  initialized = false;

  constructor() {
    makeAutoObservable(this);
    this.loadTheme();
  }

  async loadTheme() {
    try {
      const storedTheme = await AsyncStorage.getItem(THEME_STORAGE_KEY);
      runInAction(() => {
        this.isDark = storedTheme === 'dark';
        this.initialized = true;
      });
    } catch (e) {
      runInAction(() => {
        this.initialized = true;
      });
    }
  }

  toggleTheme() {
    this.isDark = !this.isDark;
    AsyncStorage.setItem(THEME_STORAGE_KEY, this.isDark ? 'dark' : 'light').catch(() => {});
  }

  setDarkMode(value: boolean) {
    this.isDark = value;
    AsyncStorage.setItem(THEME_STORAGE_KEY, value ? 'dark' : 'light').catch(() => {});
  }

  get theme(): Theme {
    return createTheme(this.isDark);
  }
}
