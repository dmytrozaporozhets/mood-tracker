import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import CustomInput from '../../components/CustomInput';
import { useStore } from '../../store/StoreProvider';
import { REGISTER_SCREEN, RESET_PASSWORD_SCREEN } from '../../navigation/RouteNames';
import LoginScreenStyle from '../../styles/screens/LoginScreenStyle';
import Spinner from '../../components/Spinner';
import { observer } from 'mobx-react-lite';

const LoginScreen: React.FC = () => {
  const { themeStore, authStore } = useStore();
  const { colors, fonts } = themeStore.theme;
  const navigation = useNavigation();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (!email || !password) {
      authStore.error = 'Please enter both email and password';
      return;
    }
    await authStore.login(email, password);
  };

  return (
    <View style={[LoginScreenStyle.container, { backgroundColor: colors.background }]}>
      <Text style={[LoginScreenStyle.title, { color: colors.text, ...fonts.bold }]}>
        Welcome Back
      </Text>

      <CustomInput
        label="Email"
        placeholder="Enter your email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <CustomInput
        label="Password"
        placeholder="Enter your password"
        value={password}
        onChangeText={setPassword}
        secureText
        error={authStore.error || ''}
      />

      <TouchableOpacity
        style={[LoginScreenStyle.button, { backgroundColor: colors.primary }]}
        onPress={handleLogin}
      >
        <Text style={[LoginScreenStyle.buttonText, { color: '#fff', ...fonts.medium }]}>
          Login
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate(RESET_PASSWORD_SCREEN as never)}
        style={LoginScreenStyle.linkWrapper}
      >
        <Text style={[LoginScreenStyle.linkText, { color: colors.primary, ...fonts.regular }]}>
          Forgot your password?
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate(REGISTER_SCREEN as never)}
        style={LoginScreenStyle.linkWrapper}
      >
        <Text style={[LoginScreenStyle.linkText, { color: colors.text, ...fonts.regular }]}>
          Don't have an account?{' '}
          <Text style={{ color: colors.primary, ...fonts.medium }}>Register</Text>
        </Text>
      </TouchableOpacity>
      {authStore.loading && <Spinner />}
    </View>
  );
};

export default observer(LoginScreen);
