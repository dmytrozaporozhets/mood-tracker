import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { observer } from 'mobx-react-lite';

import { useStore } from '../store/StoreProvider';
import { SETTINGS_SCREEN } from '../navigation/RouteNames';

type Props = {
  title?: string;
  showBack?: boolean;
  onBackPress?: () => void;
  showSettings?: boolean;
};

const AppHeader: React.FC<Props> = observer(({
  title,
  showBack = false,
  showSettings =false,
  onBackPress,
}) => {
  const navigation = useNavigation();
  const {
    themeStore: { theme },
  } = useStore();

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background, borderColor:theme.colors.border }]}>
      <View style={styles.left}>
        {showBack && (
          <TouchableOpacity onPress={onBackPress || navigation.goBack}>
            <Ionicons name="arrow-back" size={24} color={theme.colors.icon} />
          </TouchableOpacity>
        )}
      </View>

      {title && (
        <Text style={[styles.title, { color: theme.colors.text, ...theme.fonts.medium }]}>
          {title}
        </Text>
      )}

      {showSettings && (
        <View style={styles.right}>
          <TouchableOpacity onPress={() => navigation.navigate(SETTINGS_SCREEN as never)}>
              <Ionicons name="settings-outline" size={24} color={theme.colors.icon} />
          </TouchableOpacity>
        </View>
        )}
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    height: 56,
    flexDirection: 'row',
    paddingHorizontal: 16,
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    width:'100%'
  },
  left: {
    width: 40,
    justifyContent: 'center',
  },
  right: {
    width: 40,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  title: {
    fontSize: 18,
    flex: 1,
    textAlign: 'center',
  },
});

export default AppHeader;
