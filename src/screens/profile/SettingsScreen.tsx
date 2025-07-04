import React, { useState } from 'react';
import { View } from 'react-native';
import { observer } from 'mobx-react-lite';
import { useTranslation } from 'react-i18next';

import ThemeToggleSwitch from '../../components/ThemeToggleSwitch';
import LanguageSwitcher from '../../components/LanguageSwitcher';
import Button from '../../components/Button';
import ScreenView from '../../components/ScreenView';
import AppHeader from '../../components/AppHeader';
import ConfirmModal from '../../components/modals/ConfirmModal';

import { sg } from '../../styling';
import { DANGER, SMALL } from '../../constants/types';
import { useStore } from '../../store/StoreProvider';

const SettingsScreen = observer(() => {
  const { authStore } = useStore();
  const { t } = useTranslation();

  const [showModal, setShowModal] = useState(false);

  const handleLogout = () => {
    setShowModal(true);
  };

  const confirmLogout = async () => {
    setShowModal(false);
    await authStore.logout();
  };

  return (
    <ScreenView>
      <AppHeader showBack />
      <View style={[sg.flex, sg.jCSpaceBetween]}>
        <View>
          <ThemeToggleSwitch />
          <LanguageSwitcher />
        </View>

        <Button
          title={t('auth.logout')}
          onPress={handleLogout}
          type={DANGER}
          size={SMALL}
          style={[sg.mT40, sg.mB20]}
        />

        <ConfirmModal
          visible={showModal}
          title={t('profile.confirmLogout')}
          onConfirm={confirmLogout}
          onCancel={() => setShowModal(false)}
          confirmText={t('button.confirm')}
          cancelText={t('button.cancel')}
        />
      </View>
    </ScreenView>
  );
});

export default SettingsScreen;
