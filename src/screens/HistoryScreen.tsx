import React, { useCallback } from 'react';
import { FlatList, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';
import { observer } from 'mobx-react-lite';

import MoodCard from '../components/MoodCard';
import { useStore } from '../store/StoreProvider';
import { sg } from '../styling';

const HistoryScreen = observer(() => {
  const insets = useSafeAreaInsets();
  const { moodStore, authStore, themeStore } = useStore();
  const {colors}=themeStore.theme

  useFocusEffect(
    useCallback(() => {
      if (authStore.user) {
        moodStore.loadMoods();
      }
    }, [moodStore, authStore.user])
  );

  const { moodList } = moodStore;

  return (
    <View style={[sg.flex, { paddingTop: insets.top }]}>
      {!moodList.length ? (
        <View style={[sg.center, sg.flex]}>
          <Text style={[sg.textCenter,{color:colors.text}]}>No history yet</Text>
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
});

export default HistoryScreen;
