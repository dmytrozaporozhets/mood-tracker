import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import CustomInput from '../../components/CustomInput';
import { useStore } from '../../store/StoreProvider';
import { LOGIN_SCREEN } from '../../navigation/RouteNames';
import ResetPasswordStyle from '../../styles/screens/ResetPasswordStyle';
import { showSuccessToast } from '../../utils/toast';
import Button from '../../components/Button';
import { sg } from '../../styling';

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
      <Button title='Send Reset Link' onPress={handleReset}   loading={authStore.loading} style={sg.mT25}/>
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
