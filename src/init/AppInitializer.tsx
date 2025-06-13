import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Spinner from '../components/Spinner';
import MoodModal from '../components/MoodModal';
import Navigation from '../navigation';
import { ONBOARDING_SHOWN_KEY } from '../constants/storage';
import { useStore } from '../store/StoreProvider';
import { getTodayMood } from '../storage/moodStorage';

const AppInitializer = () => {
  const { authStore } = useStore();
  const [isReady, setIsReady] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [showMoodModal, setShowMoodModal] = useState(false);

  useEffect(() => {
    const init = async () => {
      try {
        const onboardingShown = await AsyncStorage.getItem(ONBOARDING_SHOWN_KEY);

        if (!onboardingShown) {
          setShowOnboarding(true);
          return;
        }

        const uid = authStore.user?.uid;
        if (uid) {
          const mood = await getTodayMood(uid);
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

    if (authStore.initialized) {
      init();
    }
  }, [authStore.initialized, authStore.user]);


  if (!isReady) return <Spinner />;

  return (
    <>
      <Navigation
        showOnboarding={showOnboarding}
        setShowOnboarding={setShowOnboarding}
      />
      {authStore.user && showMoodModal && (
        <MoodModal onClose={() => setShowMoodModal(false)} />
      )}
    </>
  );
};

export default AppInitializer;
