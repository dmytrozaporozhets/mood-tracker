import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { useTranslation } from 'react-i18next';

export const IconRoute = ({ route, color }) => {
  const { t } = useTranslation('route');
  switch (route) {
    case t('home'): {
      return <Ionicons name="home-outline" size={20} color={color} />;
    }
    case t('history'): {
      return <Ionicons name="time-outline" size={20} color={color} />;
    }
    case t('profile'):
      return <Ionicons name="person-outline" size={20} color={color} />;
    default:
      return <Ionicons name="home-outline" size={20} color={color} />;
  }
};
