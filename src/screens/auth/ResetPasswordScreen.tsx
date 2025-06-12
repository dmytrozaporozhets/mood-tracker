import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useForm } from 'react-hook-form';
import { useNavigation } from '@react-navigation/native';
import { observer } from 'mobx-react-lite';

import ControlledInput from '../../components/ControlledInput';
import Button from '../../components/Button';
import ResetPasswordStyle from '../../styles/screens/ResetPasswordStyle';
import { sg } from '../../styling';
import { useStore } from '../../store/StoreProvider';
import { LOGIN_SCREEN } from '../../navigation/RouteNames';
import { getLoginRules } from '../../validation/rules';
import { useTranslation } from 'react-i18next';
import { showSuccessToast } from '../../utils/toast';

const ResetPasswordScreen: React.FC = observer(() => {
  const { t } = useTranslation();
  const { themeStore, authStore } = useStore();
  const { colors, fonts } = themeStore.theme;
  const navigation = useNavigation();

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm({ defaultValues: { email: '' } });

  const onSubmit = async (data: { email: string }) => {
    await authStore.resetPassword(data.email);

    if (!authStore.error) {
      showSuccessToast(t('auth.resetSuccess'));
      navigation.navigate(LOGIN_SCREEN as never);
    }
  };

  return (
    <View style={[ResetPasswordStyle.container, { backgroundColor: colors.background }]}>
      <Text style={[ResetPasswordStyle.title, { color: colors.text, ...fonts.bold }]}>
        {t('auth.resetPassword')}
      </Text>

      <ControlledInput
        name="email"
        label={t('auth.email')}
        placeholder={t('auth.emailPlaceholder')}
        control={control}
        rules={getLoginRules(t)}
        keyboardType="email-address"
        warning={authStore.error}
      />

      <Button
        title={t('auth.sendResetLink')}
        onPress={handleSubmit(onSubmit)}
        loading={authStore.loading || isSubmitting}
        style={sg.mT25}
      />

      <TouchableOpacity
        onPress={() => navigation.navigate(LOGIN_SCREEN as never)}
        style={ResetPasswordStyle.linkWrapper}
      >
        <Text style={[ResetPasswordStyle.linkText, { color: colors.primary, ...fonts.regular }]}>
          {t('auth.backToLogin')}
        </Text>
      </TouchableOpacity>
    </View>
  );
});

export default ResetPasswordScreen;
