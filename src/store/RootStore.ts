import { MoodStore } from './moodStore';
import { ThemeStore } from './themeStore';
import { AuthStore } from './authStore';

export class RootStore {
  moodStore: MoodStore;
  themeStore: ThemeStore;
  authStore: AuthStore;

  constructor() {
    this.themeStore = new ThemeStore();
    this.authStore = new AuthStore();
    this.moodStore = new MoodStore(this);
  }
}
