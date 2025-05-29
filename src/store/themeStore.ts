import { makeAutoObservable } from "mobx";

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
}
