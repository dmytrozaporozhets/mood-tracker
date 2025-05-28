import React, { useState, useRef } from 'react';
import { View, Text, Pressable, FlatList, NativeScrollEvent, NativeSyntheticEvent } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { ROOT_TABS } from '../../navigation/RouteNames';
import ScreenView from '../../components/ScreenView';
import { onboardingSlides } from '../../constants/onboarding';
import OnboardingScreenStyle from '../../styles/screens/OnboardingScreen';
import { sg } from '../../styling';
import { RootStackParamList } from '../../navigation/types';
import { useTranslation } from 'react-i18next';
import Pagination from '../../components/Pagination';

type OnboardingScreenProps = {
  onFinish: () => void;
};

const OnboardingScreen: React.FC<OnboardingScreenProps> = ({ onFinish }) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { t } = useTranslation();

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
    <View style={OnboardingScreenStyle.slide}>
      <Text style={OnboardingScreenStyle.title}>{t(item.titleKey)}</Text>
      <Text style={OnboardingScreenStyle.description}>{t(item.descriptionKey)}</Text>
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
    <ScreenView style={sg.bgWhite}>
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
        />
        <Pressable style={OnboardingScreenStyle.button} onPress={handleDone}>
          <Text style={OnboardingScreenStyle.buttonText}>{t('button:getStarted')}</Text>
        </Pressable>
        <Pressable style={OnboardingScreenStyle.skipButton} onPress={handleDone}>
          <Text style={OnboardingScreenStyle.skipText}>{t('button:skip')}</Text>
        </Pressable>
      </View>
    </ScreenView>
  );
};

export default OnboardingScreen;
