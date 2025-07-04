import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import { observer } from 'mobx-react-lite';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

import AppHeader from '../../components/AppHeader';
import ScreenView from '../../components/ScreenView';
import { safeParseDate } from '../../utils/date';
import { DEFAULT_AVATAR } from '../../constants/images';
import UserInfoRow from '../../components/sections/UserInfoRow';

import { EDIT_PROFILE_SCREEN } from '../../navigation/RouteNames';
import { useStore } from '../../store/StoreProvider';
import EditableAvatar from '../../components/EditableAvatar';


type ExtendedMetadata = {
  creationTime: string;
  lastLoginAt: string;
};

const ProfileScreen = observer(() => {
  const { t } = useTranslation();
  const { authStore, themeStore } = useStore();
  const navigation = useNavigation();
  const { user } = authStore;
  const { theme } = themeStore;

  if (!user) return null;

  const avatarSource = authStore.userProfile?.photoBase64
    ? { uri: authStore.userProfile.photoBase64 }
    : { uri: DEFAULT_AVATAR };

  const name = user.displayName || t('profile.anonymous');
  const email = user.email || t('profile.noEmail');
  const metadata = user.metadata as ExtendedMetadata;

  const created = safeParseDate(metadata?.creationTime);
  const lastLogin = safeParseDate(metadata?.lastLoginAt);

  const verificationColor = user.emailVerified
    ? theme.colors.notification.success
    : theme.colors.notification.warning;

  const verificationLabel = user.emailVerified
    ? t('profile.emailVerified')
    : t('profile.emailNotVerified');


  return (
    <ScreenView style={{ backgroundColor: theme.colors.background }}>
      <AppHeader showSettings />
      <View style={styles.container}>
        <EditableAvatar
          uri={avatarSource.uri}
          onPress={() => navigation.navigate(EDIT_PROFILE_SCREEN as never)}
        />

        <Text style={[styles.name, { color: theme.colors.text }]}>{name}</Text>
        <Text style={[styles.verification, { color: verificationColor }]}>
          {verificationLabel}
        </Text>

        <View style={styles.infoContainer}>
          <UserInfoRow label={t('profile.email')} value={email} />
          <UserInfoRow label={t('profile.lastActivity')} value={lastLogin} />
          <UserInfoRow label={t('profile.memberSince')} value={created} />
        </View>
      </View>
    </ScreenView>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 24,
    marginTop: 24,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 12,
  },
  name: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 4,
  },
  verification: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 8,
  },
  infoContainer: {
    marginTop: 16,
    alignItems: 'flex-start',
    width: '100%',
  },
  
});

export default ProfileScreen;
