import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback } from 'react';
import { FlatList, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import MoodCard from '../components/MoodCard';
import useMoods from '../hooks/useMoods';
import { sg } from '../styling';

const HistoryScreen = () => {
  const insets = useSafeAreaInsets();
  const { moodList, loadMoods } = useMoods();

  useFocusEffect(
    useCallback(() => {
      loadMoods();
    }, [])
  );

  return (
    <View style={[sg.flex, { paddingTop: insets.top }]}>
      {!moodList.length ? (
        <View style={[sg.center, sg.flex]}>
          <Text style={sg.textCenter}>No history yet</Text>
        </View>
      ) : (
        <FlatList
          data={moodList}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <MoodCard item={item} />}
          style={sg.mT20}
          contentContainerStyle={sg.pB100}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
};

export default HistoryScreen;
