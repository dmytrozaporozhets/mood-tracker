import React, { useState, useRef } from 'react';
import { View, Text, Pressable, FlatList, NativeScrollEvent, NativeSyntheticEvent } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { ROOT_TABS } from '../../navigation/RouteNames';
import ScreenView from '../../components/ScreenView';
import { onboardingSlides } from '../../constants/onboarding';
import OnboardingScreenStyle from '../../styles/screens/OnboardingScreen';
import { useTranslation } from 'react-i18next';
import Pagination from '../../components/Pagination';

import { useStore } from '../../store/StoreProvider';  // імпорт useStore

type OnboardingScreenProps = {
  onFinish: () => void;
};

const OnboardingScreen: React.FC<OnboardingScreenProps> = ({ onFinish }) => {
  const navigation = useNavigation<NavigationProp<any>>();
  const { t } = useTranslation();
  const { themeStore } = useStore();       // отримуємо тему
  const { colors, fonts } = themeStore.theme;

  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  const handleDone = () => {
    onFinish();
    navigation.reset({
      index: 0,
      routes: [{ name: ROOT_TABS }],
    });
  };

  const renderItem = ({ item }: { item: typeof onboardingSlides[0] }) => (
    <View style={[OnboardingScreenStyle.slide, { backgroundColor: colors.background }]}>
      <Text style={[OnboardingScreenStyle.title, { color: colors.text, fontFamily: fonts.medium.fontFamily }]}>
        {t(item.titleKey)}
      </Text>
      <Text style={[OnboardingScreenStyle.description, { color: colors.text }]}>
        {t(item.descriptionKey)}
      </Text>
    </View>
  );

  const onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const width = event.nativeEvent.layoutMeasurement.width;
    const newIndex = Math.round(offsetX / width);
    if (newIndex !== currentIndex) {
      setCurrentIndex(newIndex);
    }
  };

  const onDotPress = (index: number) => {
    flatListRef.current?.scrollToIndex({ index });
    setCurrentIndex(index);
  };

  return (
    <ScreenView style={{ flex: 1, backgroundColor: colors.background }}>
      <View style={OnboardingScreenStyle.container}>
        <FlatList
          ref={flatListRef}
          data={onboardingSlides}
          renderItem={renderItem}
          keyExtractor={(item) => item.key}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={onScroll}
          scrollEventThrottle={16}
        />
        <Pagination
          total={onboardingSlides.length}
          currentIndex={currentIndex}
          onDotPress={onDotPress}
          activeColor={themeStore.theme.colors.primary}
          inactiveColor={themeStore.theme.colors.placeholder}
        />
        <Pressable
          style={[OnboardingScreenStyle.button, { backgroundColor: colors.primary }]}
          onPress={handleDone}
        >
          <Text style={[OnboardingScreenStyle.buttonText, { color: colors.textLight }]}>
            {t('button.getStarted')}
          </Text>
        </Pressable>
        <Pressable style={OnboardingScreenStyle.skipButton} onPress={handleDone}>
          <Text style={[OnboardingScreenStyle.skipText, { color: colors.placeholder }]}>
            {t('button.skip')}
          </Text>
        </Pressable>
      </View>
    </ScreenView>
  );
};

export default OnboardingScreen;
