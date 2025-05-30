import { Ionicons } from '@expo/vector-icons';
import React from 'react';

interface IconRouteProps {
  route: string; // 'home' | 'history' | 'profile'
  color: string;
}

const iconMap = {
  home: 'home-outline',
  history: 'time-outline',
  profile: 'person-outline',
} as const;

export const IconRoute: React.FC<IconRouteProps> = ({ route, color }) => {
  const iconName = iconMap[route as keyof typeof iconMap] ?? 'help-outline';
  return <Ionicons name={iconName} size={20} color={color} />;
};
