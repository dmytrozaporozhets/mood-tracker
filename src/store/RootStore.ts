import { MoodStore } from "./moodStore";

export class RootStore {
  moodStore: MoodStore;

  constructor() {
    this.moodStore = new MoodStore();
  }
}
