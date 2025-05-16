// components/LanguageSwitcher.js
import React from 'react';
import { View, Pressable, Text } from 'react-native';
import { useTranslation } from 'react-i18next';
import { sg } from '../styling';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const changeLang = (lng) => i18n.changeLanguage(lng);

  return (
    <View style={[sg.row, sg.jCSpaceEvenly, sg.p10]}>
      {['en','ua'].map((lng) => (
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
