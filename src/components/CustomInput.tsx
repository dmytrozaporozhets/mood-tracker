import React, { useState } from 'react';
import {
  TextInput,
  View,
  Text,
  TextInputProps,
  TouchableOpacity,
} from 'react-native';
import { Feather } from '@expo/vector-icons';

import { useStore } from '../store/StoreProvider';
import CustomInputStyle from '../styles/components/CustomInputStyle';

interface CustomInputProps extends TextInputProps {
  label: string;
  error?: string | null;
  secureText?: boolean;
}

const CustomInput: React.FC<CustomInputProps> = ({
  label,
  error,
  secureText = false,
  ...rest
}) => {
  const { themeStore } = useStore();
  const { colors, fonts } = themeStore.theme;

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  return (
    <View style={CustomInputStyle.container}>
      <Text style={[CustomInputStyle.label, { color: colors.text, ...fonts.medium }]}>
        {label}
      </Text>

      <View
        style={[
          CustomInputStyle.inputWrapper,
          {
            backgroundColor: colors.inputBackground,
            borderColor: error ? colors.error : colors.border,
          },
        ]}
      >
        <TextInput
          style={[CustomInputStyle.input, { color: colors.text, ...fonts.regular }]}
          secureTextEntry={secureText && !isPasswordVisible}
          placeholderTextColor={colors.placeholder}
          autoCapitalize="none"
          {...rest}
        />

        {secureText && (
          <TouchableOpacity onPress={() => setIsPasswordVisible((prev) => !prev)}>
            <Feather
              name={isPasswordVisible ? 'eye' : 'eye-off'}
              color={colors.text}
              size={20}
            />
          </TouchableOpacity>
        )}
      </View>

      {!!error && (
        <Text style={[CustomInputStyle.errorText, { color: colors.error }]}>
          {error}
        </Text>
      )}
    </View>
  );
};

export default CustomInput;
