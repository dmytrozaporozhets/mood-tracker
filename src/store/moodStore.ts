import { makeAutoObservable, runInAction } from "mobx";
import { saveTodayMoodItem } from "../storage/moodStorage";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MOOD_LIST_KEY } from "../constants/storage";
import { MoodItem } from "../components/MoodCard";
import { getTodayDate } from "../utils/date";

export class MoodStore {
  moodList: MoodItem[] = [];

  constructor() {
    makeAutoObservable(this);
    this.loadMoods();
  }

  async loadMoods() {
    try {
      const stored = await AsyncStorage.getItem(MOOD_LIST_KEY);
      if (stored) {
        const parsed: MoodItem[] = JSON.parse(stored);
        parsed.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        runInAction(() => {
          this.moodList = parsed;
        });
      }
    } catch (e) {
      console.error("Failed to load moods", e);
    }
  }

  async saveMood(newMood: MoodItem) {
    const updated = await saveTodayMoodItem(newMood);
    runInAction(() => {
      this.moodList = updated;
    });
  }

  get todayMood(): MoodItem | null {
    const today = getTodayDate();
    return this.moodList.find((item) => item.date.split("T")[0] === today) ?? null;
  }

  clearMoods() {
    this.moodList = [];
    AsyncStorage.removeItem(MOOD_LIST_KEY).catch((e) =>
      console.warn("Failed to clear moods", e)
    );
  }
}
