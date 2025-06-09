import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import CustomInput from '../../components/CustomInput';
import RegisterScreenStyle from '../../styles/screens/RegisterScreenStyle';
import { useStore } from '../../store/StoreProvider';
import { LOGIN_SCREEN } from '../../navigation/RouteNames';
import { showSuccessToast } from '../../utils/toast';
import Button from '../../components/Button';
import { sg } from '../../styling';

const RegisterScreen: React.FC = () => {
  const { themeStore, authStore } = useStore();
  const { colors, fonts } = themeStore.theme;
  const navigation = useNavigation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleRegister = async () => {
    if (!email || !password || !confirmPassword) {
      setError('Please fill all fields');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setError('');
    await authStore.register(email, password);

    if (authStore.error) {
      setError(authStore.error);
    } else if (authStore.user) {
      showSuccessToast('Your account has been created');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
    }
  };

  return (
    <View style={[RegisterScreenStyle.container, { backgroundColor: colors.background }]}>
      <Text style={[RegisterScreenStyle.title, { color: colors.text, ...fonts.bold }]}>
        Create Account
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
      />

      <CustomInput
        label="Confirm Password"
        placeholder="Confirm your password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureText
        error={error}
      />
      <Button title='Register' 
        onPress={handleRegister}
        disabled={authStore.loading}
        style={sg.mT25}/>
      <TouchableOpacity
        onPress={() => navigation.navigate(LOGIN_SCREEN as never)}
        style={RegisterScreenStyle.linkWrapper}
      >
        <Text style={[RegisterScreenStyle.linkText, { color: colors.text, ...fonts.regular }]}>
          Already have an account?{' '}
          <Text style={{ color: colors.primary, ...fonts.medium }}>Login</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default RegisterScreen;
