import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useCallback, useState } from 'react';
import { FlatList,Text, View } from 'react-native';
import {sg} from '../styling'
import { useSafeAreaInsets } from "react-native-safe-area-context";
import MoodCard from '../components/MoodCard';
import {MOOD_LIST_KEY} from '../constants/storage'
import { useFocusEffect } from '@react-navigation/native';


const HistoryScreen = () => {
  const insets = useSafeAreaInsets();
  const [moodList, setMoodList] = useState([]);

  const loadMoods = async () => {
    try {
      const stored = await AsyncStorage.getItem(MOOD_LIST_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        const sortedList = [...parsed].sort((a, b) => new Date(b.date) - new Date(a.date));
        setMoodList(sortedList);
      }
    } catch (e) {
      console.error('Failed to load moods', e);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadMoods();
    }, [])
  );

  return (
    <View style={[sg.flex,{paddingTop:insets.top}]} >
      {!moodList.length ? <Text>No history yet</Text> : <FlatList
        data={moodList}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <MoodCard item={item} />}
        style={{ marginTop: 20 }}
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      />}
    </View>
  );
};

export default HistoryScreen;
