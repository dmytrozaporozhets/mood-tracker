import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Pressable, Text, View} from 'react-native';

import { LANGUAGE_STORAGE_KEY } from '../constants/storage';
import { sg } from '../styling';

const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation();

  const changeLang = async (lng: string): Promise<void> => {
    await AsyncStorage.setItem(LANGUAGE_STORAGE_KEY, lng);
    await i18n.changeLanguage(lng);
  };

  return (
    <View style={[sg.row, sg.jCSpaceEvenly, sg.p10]}>
      {['en', 'ua'].map((lng) => (
        <Pressable key={lng} onPress={() => changeLang(lng)} style={[sg.p10]}>
          <Text style={{ fontWeight: i18n.language === lng ? 'bold' : 'normal' }}>
            {lng.toUpperCase()}
          </Text>
        </Pressable>
      ))}
    </View>
  );
};

export default LanguageSwitcher;
