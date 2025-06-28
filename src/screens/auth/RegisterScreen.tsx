import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useForm } from 'react-hook-form';
import { useNavigation } from '@react-navigation/native';

import ControlledInput from '../../components/ControlledInput';
import { useStore } from '../../store/StoreProvider';
import { LOGIN_SCREEN } from '../../navigation/RouteNames';
import { showSuccessToast } from '../../utils/toast';
import Button from '../../components/Button';
import { 
  getLoginRules, 
  getPasswordRules, 
  getDisplayNameRules, 
  getPhoneNumberRules 
} from '../../validation/rules';
import { useTranslation } from 'react-i18next';
import { sg } from '../../styling';

type FormValues = {
  email: string;
  password: string;
  confirmPassword: string;
  displayName: string;
  phoneNumber: string;
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
      displayName: '',
      phoneNumber: '',
    },
  });

  const password = watch('password');

  const onSubmit = async (data: FormValues) => {
    await authStore.register(data.email, data.password, data.displayName, data.phoneNumber);

    if (authStore.error) return;

    showSuccessToast(t('auth.accountCreated'));
  };

  const onSignUp =() => {
       authStore.clearError();
       navigation.navigate(LOGIN_SCREEN as never)
    }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.text, ...fonts.bold }]}>
        {t('auth.register')}
      </Text>

      <ControlledInput
        name="displayName"
        label={t('auth.displayName')}
        placeholder={t('auth.displayNamePlaceholder')}
        control={control}
        rules={getDisplayNameRules(t)}
      />

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
        name="phoneNumber"
        label={t('auth.phoneNumber')}
        placeholder={t('auth.phoneNumberPlaceholder')}
        keyboardType="phone-pad"
        control={control}
        rules={getPhoneNumberRules(t)}
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
        onPress={onSignUp}
        style={styles.linkWrapper}
      >
        <Text style={[styles.linkText, { color: colors.text, ...fonts.regular }]}>
          {t('auth.noAccount')}{' '}
          <Text style={{ color: colors.primary, ...fonts.medium }}>{t('auth.login')}</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 28,
    marginBottom: 32,
    textAlign: 'center',
  },
  linkWrapper: {
    marginTop: 20,
    alignItems: 'center',
  },
  linkText: {
    fontSize: 14,
  },
});

export default RegisterScreen;
