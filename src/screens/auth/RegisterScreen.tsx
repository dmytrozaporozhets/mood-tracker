import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useForm } from 'react-hook-form';
import { useNavigation } from '@react-navigation/native';

import ControlledInput from '../../components/ControlledInput';
import RegisterScreenStyle from '../../styles/screens/RegisterScreenStyle';
import { useStore } from '../../store/StoreProvider';
import { LOGIN_SCREEN } from '../../navigation/RouteNames';
import { showSuccessToast } from '../../utils/toast';
import Button from '../../components/Button';
import { getLoginRules, getPasswordRules } from '../../validation/rules';
import { useTranslation } from 'react-i18next';
import { sg } from '../../styling';

type FormValues = {
  email: string;
  password: string;
  confirmPassword: string;
};

const RegisterScreen: React.FC = () => {
  const { themeStore, authStore } = useStore();
  const { colors, fonts } = themeStore.theme;
  const navigation = useNavigation();
  const { t } = useTranslation();

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const password = watch('password');

  const onSubmit = async (data: FormValues) => {
    await authStore.register(data.email, data.password);

    if (authStore.error) return;

    showSuccessToast(t('auth.accountCreated'));
    navigation.navigate(LOGIN_SCREEN as never);
  };

  return (
    <View style={[RegisterScreenStyle.container, { backgroundColor: colors.background }]}>
      <Text style={[RegisterScreenStyle.title, { color: colors.text, ...fonts.bold }]}>
        {t('auth.register')}
      </Text>

      <ControlledInput
        name="email"
        label={t('auth.email')}
        placeholder={t('auth.emailPlaceholder')}
        keyboardType="email-address"
        control={control}
        rules={getLoginRules(t)}
        warning={authStore.error}
      />

      <ControlledInput
        name="password"
        label={t('auth.password')}
        placeholder={t('auth.passwordPlaceholder')}
        secureText
        control={control}
        rules={getPasswordRules(t)}
      />

      <ControlledInput
        name="confirmPassword"
        label={t('auth.confirmPassword')}
        placeholder={t('auth.confirmPasswordPlaceholder')}
        secureText
        control={control}
        rules={{
          required: {
            value: true,
            message: t('validation.requiredPassword'),
          },
          validate: (value: string) =>
            value === password || t('validation.passwordsDoNotMatch'),
        }}
      />

      <Button
        title={t('auth.register')}
        onPress={handleSubmit(onSubmit)}
        disabled={authStore.loading}
        style={sg.mT25}
      />

      <TouchableOpacity
        onPress={() => navigation.navigate(LOGIN_SCREEN as never)}
        style={RegisterScreenStyle.linkWrapper}
      >
        <Text style={[RegisterScreenStyle.linkText, { color: colors.text, ...fonts.regular }]}>
          {t('auth.noAccount')}{' '}
          <Text style={{ color: colors.primary, ...fonts.medium }}>{t('auth.login')}</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default RegisterScreen;
