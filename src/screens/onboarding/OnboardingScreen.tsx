import React from 'react';
import { View, Text, StyleSheet, Pressable, FlatList } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { ROOT_TABS } from '../../navigation/RouteNames';
import ScreenView from '../../components/ScreenView';
import { onboardingSlides } from '../../constants/onboarding';
import OnboardingScreenStyle from'../../styles/screens/OnboardingScreen';
import { sg } from '../../styling';
import { RootStackParamList } from '../../navigation/types';


const OnboardingScreen = () => {
const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const handleDone = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: ROOT_TABS}], 
    });
  };

  const renderItem = ({ item }: { item: typeof onboardingSlides[0] }) => (
    <View style={OnboardingScreenStyle.slide}>
      <Text style={OnboardingScreenStyle.title}>{item.title}</Text>
      <Text style={OnboardingScreenStyle.description}>{item.description}</Text>
    </View>
  );

  return (
    <ScreenView style={sg.bgWhite}>
      <View style={OnboardingScreenStyle.container}>
      <FlatList
        data={onboardingSlides}
        renderItem={renderItem}
        keyExtractor={(item) => item.key}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
      />
      <Pressable style={OnboardingScreenStyle.button} onPress={handleDone}>
        <Text style={OnboardingScreenStyle.buttonText}>Get Started</Text>
      </Pressable>
      <Pressable style={OnboardingScreenStyle.skipButton} onPress={handleDone}>
        <Text style={OnboardingScreenStyle.skipText}>Skip</Text>
      </Pressable>
    </View>
    </ScreenView>
  );
};

export default OnboardingScreen;
