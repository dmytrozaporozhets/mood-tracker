import { Ionicons } from '@expo/vector-icons';
import React from 'react';

export const IconRoute = ({ route, color }) => {
  switch (route) {
    case 'Home': {
      return <Ionicons name="home-outline" size={20} color={color} />;
    }
    case 'History': {
      return <Ionicons name="time-outline" size={20} color={color} />;
    }
    default:
      return <Ionicons name="home-outline" size={20} color={color} />;
  }
};
