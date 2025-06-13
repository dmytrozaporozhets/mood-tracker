import React from 'react';
import { View } from 'react-native';
import { observer } from 'mobx-react-lite';

import { useStore } from '../store/StoreProvider';
import ThemeToggleSwitch from '../components/ThemeToggleSwitch';
import LanguageSwitcher from '../components/LanguageSwitcher';
import { sg } from '../styling';
import { useTranslation } from 'react-i18next';
import Button from '../components/Button';
import { DANGER, SMALL } from '../constants/types';
import ScreenView from '../components/ScreenView';
import AppHeader from '../components/AppHeader';

const SettingsScreen = observer(() => {
  const { authStore } = useStore();
  const { t } = useTranslation();

  const handleLogout = () => {
    authStore.logout();
  };

  return (
    <ScreenView>
      <AppHeader showBack/>
      <View style={[sg.flex, sg.jCSpaceBetween]}>
        <View>
          <ThemeToggleSwitch />
          <LanguageSwitcher />
        </View>
        <Button 
          title={t('auth.logout')}
          onPress={handleLogout} 
          type={DANGER} size={SMALL} 
          style={[sg.mT40,sg.mB20]} />
      </View>
    </ScreenView>
  );
});

export default SettingsScreen;
