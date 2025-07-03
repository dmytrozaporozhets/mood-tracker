import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useStore } from '../store/StoreProvider';

interface UserHeaderProps {
  greeting: string;
  userName?: string;
  formattedDate: string;
  onProfilePress?: () => void;
}

const UserHeader: React.FC<UserHeaderProps> = ({ greeting, userName, formattedDate, onProfilePress }) => {
  const { themeStore } = useStore();
  const { colors } = themeStore.theme;

  const backgroundColor = colors.background === '#000000' ? '#222' : colors.background;

  return (
    <View style={[styles.header, { backgroundColor, borderColor:colors.border }]}>
      <View style={styles.textBlock}>
        <Text style={[styles.greeting, { color: colors.text }]}>
          {greeting}, {userName ?? 'User'} 👋
        </Text>
        <Text style={[styles.date, { color: colors.moodEmoji.date }]}>
          {formattedDate}
        </Text>
      </View>
      <TouchableOpacity
        onPress={onProfilePress}
        style={[styles.avatarPlaceholder, { backgroundColor: colors.secondary }]}
        activeOpacity={0.7}
      >
        <Text style={styles.avatarLetter}>
          {userName?.[0]?.toUpperCase() || '?'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal:20,
    paddingVertical:10,
    borderBottomWidth:1,
  },
  textBlock: {
    flex: 1,
  },
  greeting: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 4,
  },
  date: {
    fontSize: 14,
  },
  avatarPlaceholder: {
    width: 52,
    height: 52,
    borderRadius: 26,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarLetter: {
    fontSize: 28,
    fontWeight: '700',
    color: '#fff',
  },
});

export default UserHeader;
