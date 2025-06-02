import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Spinner from '../components/Spinner';
import MoodModal from '../components/MoodModal';
import Navigation from '../navigation';
import { getTodayMood } from '../storage/moodStorage';
import { ONBOARDING_SHOWN_KEY } from '../constants/storage';

const AppInitializer = () => {
  const [isReady, setIsReady] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [showMoodModal, setShowMoodModal] = useState(false);

  useEffect(() => {
    const init = async () => {
      try {
        const onboardingShown = await AsyncStorage.getItem(ONBOARDING_SHOWN_KEY);
        if (!onboardingShown) {
          setShowOnboarding(true);
        } else {
          const mood = await getTodayMood();
          if (!mood) {
            setShowMoodModal(true);
          }
        }
      } catch (e) {
        console.warn('Initialization error:', e);
      } finally {
        setIsReady(true);
      }
    };

    init();
  }, []);

  useEffect(() => {
    if (!showOnboarding) {
      getTodayMood().then((mood) => {
        if (!mood) {
          setShowMoodModal(true);
        }
      });
    }
   setShowMoodModal(false)
  }, [showOnboarding]);

  if (!isReady) return <Spinner />;

  return (
    <>
      <Navigation
        showOnboarding={showOnboarding}
        setShowOnboarding={setShowOnboarding}
      />
      {showMoodModal && <MoodModal onClose={() => setShowMoodModal(false)} />}
    </>
  );
};

export default AppInitializer;
