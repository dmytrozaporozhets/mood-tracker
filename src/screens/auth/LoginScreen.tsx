import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { observer } from 'mobx-react-lite';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import ControlledInput from '../../components/ControlledInput';
import Button from '../../components/Button';
import { useStore } from '../../store/StoreProvider';
import { REGISTER_SCREEN, RESET_PASSWORD_SCREEN } from '../../navigation/RouteNames';
import LoginScreenStyle from '../../styles/screens/LoginScreenStyle';

import { getLoginRules, getPasswordRules } from '../../validation/rules';

interface LoginFormValues {
  email: string;
  password: string;
}

const LoginScreen: React.FC = () => {
  const { themeStore, authStore } = useStore();
  const { colors, fonts } = themeStore.theme;
  const navigation = useNavigation();
  const { t } = useTranslation();

  const {
  control,
  handleSubmit,
  formState: { isSubmitting },
} = useForm<LoginFormValues>({
  mode: 'onChange',
  defaultValues: {
    email: '',
    password: '',
  },
});

  const onSubmit = async ({ email, password }: LoginFormValues) => {
    await authStore.login(email, password);
  };

  return (
    <View style={[LoginScreenStyle.container, { backgroundColor: colors.background }]}>
      <Text style={[LoginScreenStyle.title, { color: colors.text, ...fonts.bold }]}>
        {t('auth.welcome')}
      </Text>

      <ControlledInput
        name="email"
        control={control}
        label={t('auth.email')}
        placeholder={t('auth.emailPlaceholder')}
        keyboardType="email-address"
        rules={getLoginRules(t)}
      />

      <ControlledInput
        name="password"
        control={control}
        label={t('auth.password')}
        placeholder={t('auth.passwordPlaceholder')}
        secureText
        rules={getPasswordRules(t)}
        warning={authStore?.error}
      />

      <Button
        title={t('auth.login')}
        onPress={handleSubmit(onSubmit)}
        loading={isSubmitting || authStore.loading}
      />

      <TouchableOpacity
        onPress={() => navigation.navigate(RESET_PASSWORD_SCREEN as never)}
        style={LoginScreenStyle.linkWrapper}
      >
        <Text style={[LoginScreenStyle.linkText, { color: colors.primary, ...fonts.regular }]}>
          {t('auth.forgotPassword')}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate(REGISTER_SCREEN as never)}
        style={LoginScreenStyle.linkWrapper}
      >
        <Text style={[LoginScreenStyle.linkText, { color: colors.text, ...fonts.regular }]}>
          {t('auth.noAccount')}{' '}
          <Text style={{ color: colors.primary, ...fonts.medium }}>{t('auth.register')}</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default observer(LoginScreen);
