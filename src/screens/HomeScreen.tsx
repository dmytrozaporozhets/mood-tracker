import React, { useEffect, useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  RefreshControl,
  Animated,
  FlatList,
  Dimensions
} from 'react-native';
import { observer } from 'mobx-react-lite';
import { useStore } from '../store/StoreProvider';
import { moods } from '../constants/moods';
import { formatDate, getGreeting } from '../utils/date';
import { useTranslation } from 'react-i18next';
import ScreenView from '../components/ScreenView';
import MoodSelectedCard from '../components/MoodSelectedCard';
import UserHeader from '../components/UserHeader';
import Button from '../components/Button';
import { SECONDARY, SMALL } from '../constants/types';
import { sg } from '../styling';
import { useNavigation } from '@react-navigation/native';
import { PROFILE_SCREEN, HISTORY_SCREEN } from '../navigation/RouteNames';

import StreakCard from '../components/StreakCard';


const QUOTES = [
  "Take a deep breath. You're doing great.",
  'Every day is a new beginning.',
  'Keep going, you are getting there!',
  'Small steps lead to big changes.',
  'Remember to smile today 😊',
];


const HomeScreen = observer(() => {
  const { authStore, moodStore, themeStore } = useStore();
  const { t } = useTranslation();
  const { colors } = themeStore.theme;
  const moodIndexRef = useRef(0);
  const navigation = useNavigation();

  const [refreshing, setRefreshing] = useState(false);
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [fadeAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    moodStore.loadMoods();
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();
  }, [moodStore]);

  const onRefresh = () => {
    setRefreshing(true);
    moodStore.loadMoods().finally(() => {
      setRefreshing(false);
    });
  };

  const userName = authStore.user?.displayName || t('profile.anonymous');
  const greeting = getGreeting(new Date(), t);
  const currentMood = moodStore.todayMood;
  const formattedDate = formatDate(new Date());

  const onSelectMood = async () => {
    const mood = moods[moodIndexRef.current];

    await moodStore.saveMood({
      date: new Date().toISOString(),
      id: Date.now(),
      label: mood.label,
      emoji: mood.emoji,
    });

    moodIndexRef.current = (moodIndexRef.current + 1) % moods.length;
  };

  const goTo = (route: never) => () => navigation.navigate(route);

  const renderQuote = ({ item }: { item: string }) => (
    <View style={{ width: Dimensions.get('window').width - 32 }}>
      <Text style={[styles.cardContent, { color: colors.text }]}>“{item}”</Text>
    </View>
  );

  return (
    <ScreenView>
      <UserHeader
        greeting={greeting}
        userName={userName}
        formattedDate={formattedDate}
        onProfilePress={goTo(PROFILE_SCREEN as never)}
      />

      <ScrollView
        style={[styles.container, { backgroundColor: colors.background }]}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >

        <View style={[styles.cardBox, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <Text style={[styles.cardTitle, { color: colors.text }]}> {t('home.quoteOfTheDay')}</Text>
          <FlatList
            data={QUOTES}
            keyExtractor={(item, index) => `${item}-${index}`}
            renderItem={renderQuote}
            horizontal
            showsHorizontalScrollIndicator={false}
            pagingEnabled
            initialScrollIndex={quoteIndex}
            onMomentumScrollEnd={(e) => {
              const index = Math.round(e.nativeEvent.contentOffset.x / (Dimensions.get('window').width - 32));
              setQuoteIndex(index);
            }}
          />
        </View>

        <StreakCard title={t('home.streakTitle')} />

        <Animated.View style={{ opacity: fadeAnim }}>
          <MoodSelectedCard
            isSelected={!!currentMood}
            emoji={currentMood?.emoji}
            label={currentMood?.label}
            onSelectMood={onSelectMood}
          />
        </Animated.View>

        <View style={styles.quickActions}>
          <Button
            title={t('home.history')}
            onPress={goTo(HISTORY_SCREEN as never)}
            size={SMALL}
            style={sg.mR10}
          />
          <Button
            title={t('home.addMood')}
            onPress={onSelectMood}
            size={SMALL}
            type={SECONDARY}
          />
        </View>

      </ScrollView>
    </ScreenView>
  );
});

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  cardBox: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
    elevation: 5,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
  },
  cardContent: {
    fontSize: 16,
    fontStyle: 'italic',
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 32,
  },
});

export default HomeScreen;
