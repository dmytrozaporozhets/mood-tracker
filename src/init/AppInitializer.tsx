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
    const checkUserState = async () => {
      const user = authStore.user;
      if (!user) {
        setIsReady(true);
        return;
      }

      const onboardingShown = await AsyncStorage.getItem(ONBOARDING_SHOWN_KEY);
      const isNewUser =
        user.metadata?.creationTime === user.metadata?.lastSignInTime;
      console.log('isNewUser:', isNewUser, 'creationTime:', user.metadata?.creationTime, 'lastSignInTime:', user.metadata?.lastSignInTime);

      if (isNewUser && !onboardingShown) {
        setShowOnboarding(true);
      } else {
        const mood = await getTodayMood(user.uid);
        if (!mood) {
          setShowMoodModal(true);
        }
      }

      setIsReady(true);
    };

    if (authStore.initialized && authStore.user && !isReady) {
      checkUserState();
    }
    if (authStore.initialized && !authStore.user && !isReady) {
      setIsReady(true); 
    }
  }, [authStore.initialized, authStore.user, ]);

  const handleOnboardingFinish = async () => {
    await AsyncStorage.setItem(ONBOARDING_SHOWN_KEY, 'true');
    setShowOnboarding(false);

    const uid = authStore.user?.uid;
    if (uid) {
      const mood = await getTodayMood(uid);
      if (!mood) {
        setShowMoodModal(true);
      }
    }
  };

  if (!isReady) return <Spinner />;

  return (
    <>
      <Navigation
        showOnboarding={showOnboarding}
        setShowOnboarding={handleOnboardingFinish}
      />
      {authStore.user && showMoodModal && (
        <MoodModal onClose={() => setShowMoodModal(false)} />
      )}
    </>
  );
};

export default AppInitializer;
