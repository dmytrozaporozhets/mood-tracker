import { MoodStore } from "./moodStore";
import { ThemeStore } from "./themeStore";

export class RootStore {
  moodStore: MoodStore;
  themeStore: ThemeStore;

  constructor() {
    this.moodStore = new MoodStore();
    this.themeStore = new ThemeStore();
  }
}
