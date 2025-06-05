import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import CustomInput from '../../components/CustomInput';
import { useStore } from '../../store/StoreProvider';
import { LOGIN_SCREEN } from '../../navigation/RouteNames';
import ResetPasswordStyle from '../../styles/screens/ResetPasswordStyle';
import { showSuccessToast } from '../../utils/toast';

const ResetPasswordScreen: React.FC = () => {
  const { themeStore, authStore } = useStore();
  const { colors, fonts } = themeStore.theme;
  const navigation = useNavigation();

  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleReset = async () => {
    if (!email) {
      setError('Please enter your email');
      return;
    }

    setError('');
    await authStore.resetPassword(email);

    if (authStore.error) {
      setError(authStore.error);
      return;
    } else {
      showSuccessToast('Password reset link sent to your email');
      setEmail('');
      navigation.navigate(LOGIN_SCREEN as never);
    }
  };

  return (
    <View style={[ResetPasswordStyle.container, { backgroundColor: colors.background }]}>
      <Text style={[ResetPasswordStyle.title, { color: colors.text, ...fonts.bold }]}>
        Reset Password
      </Text>

      <CustomInput
        label="Email"
        placeholder="Enter your email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        error={error}
      />

      <TouchableOpacity
        style={[
          ResetPasswordStyle.button,
          {
            backgroundColor: authStore.loading ? '#A5A5A5' : colors.primary,
            opacity: authStore.loading ? 0.7 : 1,
          },
        ]}
        onPress={handleReset}
        disabled={authStore.loading}
      >
        <Text style={[ResetPasswordStyle.buttonText, { color: '#fff', ...fonts.medium }]}>
          {authStore.loading ? 'Sending...' : 'Send Reset Link'}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate(LOGIN_SCREEN as never)}
        style={ResetPasswordStyle.linkWrapper}
      >
        <Text style={[ResetPasswordStyle.linkText, { color: colors.primary, ...fonts.regular }]}>
          Back to Login
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default ResetPasswordScreen;
