import { makeAutoObservable } from "mobx";
import { createTheme } from '../styling/themes/createTheme';
import { Theme } from '../types/theme';

export class ThemeStore {
  isDark = false;

  constructor() {
    makeAutoObservable(this);
  }

  toggleTheme() {
    this.isDark = !this.isDark;
  }

  setDarkMode(value: boolean) {
    this.isDark = value;
  }

  get theme(): Theme {
    return createTheme(this.isDark);
  }
}

