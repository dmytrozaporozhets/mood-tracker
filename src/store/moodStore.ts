import { makeAutoObservable, runInAction } from 'mobx';
import { MoodItem } from '../components/MoodCard';
import { getDateBefore, getTodayDate } from '../utils/date';
import { saveTodayMoodItem, loadUserMoods, clearUserMoods, getTodayMood } from '../storage/moodStorage';
import { RootStore } from './RootStore';
import { calculateMoodStreakCount } from '../utils/mood';

export class MoodStore {
  root: RootStore;
  moodList: MoodItem[] = [];

  constructor(root: RootStore) {
    this.root = root;
    makeAutoObservable(this);
  }

  async loadMoods() {
    const uid = this.root.authStore.user?.uid;
    if (!uid) return;

    const moods = await loadUserMoods(uid);
    runInAction(() => {
      this.moodList = moods;
    });
  }

  async saveMood(newMood: MoodItem) {
    const uid = this.root.authStore.user?.uid;
    if (!uid) return;

    const updated = await saveTodayMoodItem(uid, newMood);
    runInAction(() => {
      this.moodList = updated;
    });
  }

  async getTodayMood() {
    const uid = this.root.authStore.user?.uid;
    if (!uid) return null;

    return await getTodayMood(uid);
  }

  async clearMoods() {
    const uid = this.root.authStore.user?.uid;
    if (!uid) return;

    await clearUserMoods(uid);
    runInAction(() => {
      this.moodList = [];
    });
  }

  get todayMood(): MoodItem | null {
    const today = getTodayDate();
    return this.moodList.find((item) => item.date.split("T")[0] === today) ?? null;
  }

get moodStreakCount(): number {
  return calculateMoodStreakCount(this.moodList);
}

}
