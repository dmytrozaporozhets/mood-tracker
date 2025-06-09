import React from 'react';
import { Controller, Control} from 'react-hook-form';
import CustomInput from './CustomInput';

type ControlledInputProps = {
  name: string;
  label: string;
  placeholder?: string;
  control: Control<any>;
  rules?: object;
  secureText?: boolean;
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
  warning?: string | null;
};

const ControlledInput: React.FC<ControlledInputProps> = ({
  name,
  label,
  placeholder,
  control,
  rules,
  secureText,
  keyboardType = 'default',
  warning,
}) => {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field: { onChange, value }, fieldState: { error} }) => (
        <CustomInput
          label={label}
          placeholder={placeholder}
          value={value}
          onChangeText={onChange}
          secureText={secureText}
          keyboardType={keyboardType}
          error={error?.message ?? warning}
        />
      )}
    />
  );
};

export default ControlledInput;
