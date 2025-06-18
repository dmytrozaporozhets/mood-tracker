import React, { useCallback, useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { getTodayMood } from '../storage/moodStorage';

import { useStore } from '../store/StoreProvider';
import Spinner from '../components/Spinner';
import MoodModal from '../components/MoodModal';
import Navigation from '../navigation';

const AppInitializer = observer(() => {
  const { authStore } = useStore();
  const [isReady, setIsReady] = useState(false);
  const [showMoodModal, setShowMoodModal] = useState(false);

  const checkUserState = useCallback(async () => {
    const user = authStore.user;

    if (!authStore.initialized || authStore.loading) return;

    if (!user) {
      setIsReady(true);
      return;
    }

    if (!authStore.isNewUser) {
      const mood = await getTodayMood(user.uid);
      if (!mood) {
        setShowMoodModal(true);
      }
    }

    setIsReady(true);
  }, [authStore]);

  useEffect(() => {
    checkUserState();
  }, [checkUserState]);


  const handleOnboardingFinish = async () => {
    authStore.isNewUser = false;

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
      <Navigation onOnboardingFinish={handleOnboardingFinish} />
      {authStore.user && showMoodModal && (
        <MoodModal onClose={() => setShowMoodModal(false)} />
      )}
    </>
  );
});

export default AppInitializer;
