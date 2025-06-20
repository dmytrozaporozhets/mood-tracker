import { MoodLabel } from "../components/MoodCard";
import { MoodColors } from "../styling/Colors";

export const moods: { label: MoodLabel; emoji: string}[] = [
  { emoji: '😊', label: 'Happy', },
  { emoji: '😌', label: 'Relaxed', },
  { emoji: '😐', label: 'Neutral',  },
  { emoji: '😔', label: 'Sad',  },
  { emoji: '😠', label: 'Angry',  },
];
