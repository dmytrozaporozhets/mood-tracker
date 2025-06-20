import React from 'react';
import { View,  StyleSheet, } from 'react-native';
import { useForm } from 'react-hook-form';
import { observer } from 'mobx-react-lite';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

import ControlledInput from '../../components/ControlledInput';
import Button from '../../components/Button';
import AppHeader from '../../components/AppHeader';
import ScreenView from '../../components/ScreenView';
import { useStore } from '../../store/StoreProvider';
import { showSuccessToast } from '../../utils/toast';
import { getDisplayNameRules, getPhoneNumberRules } from '../../validation/rules';
import { sg } from '../../styling';


type FormValues = {
  displayName: string;
  phoneNumber: string;
};

const EditProfileScreen = observer(() => {
  const { authStore, themeStore } = useStore();
  const { t } = useTranslation();
  const { colors, fonts } = themeStore.theme;
  const navigation = useNavigation();

  const { user, userProfile } = authStore;

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      displayName: user?.displayName || '',
      phoneNumber: userProfile?.phoneNumber || '',
    },
  });

  const onSubmit = async (data: FormValues) => {
    await authStore.updateUserProfile(data);

    if (!authStore.error) {
      showSuccessToast(t('profile.profileUpdated'));
    }
  };

  if (!user) return null;

  return (
    <ScreenView>
      <AppHeader showBack />
      <View style={styles.container}>
        <View>
          <ControlledInput
          name="displayName"
          label={t('auth.displayName')}
          placeholder={t('auth.displayNamePlaceholder')}
          control={control}
          rules={getDisplayNameRules(t)}
          />

          <ControlledInput
            name="phoneNumber"
            label={t('auth.phoneNumber')}
            placeholder={t('auth.phoneNumberPlaceholder')}
            keyboardType="phone-pad"
            control={control}
            rules={getPhoneNumberRules(t)}
          />
          </View>
          <Button
            title={t('button.save')}
            onPress={handleSubmit(onSubmit)}
            loading={authStore.loading}
            style={sg.mT30}
          />
      </View>
    </ScreenView>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 24,
    justifyContent:'space-between',
  },
});

export default EditProfileScreen;
