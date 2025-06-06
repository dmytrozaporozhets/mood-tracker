import React from 'react';
import {
  ActivityIndicator,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import { useStore } from '../store/StoreProvider';
import {
  getBackgroundColor,
  getFontSize,
  getPadding,
  getTextColor,
} from '../styling/styleUtils';
import { Size, Type, PRIMARY, LARGE } from '../constants/types';
import ButtonStyle from '../styles/components/Buttonstyle';

type Props = {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  type?: Type;
  size?: Size;
  style?: ViewStyle;
};

const Button: React.FC<Props> = ({
  title,
  onPress,
  disabled = false,
  loading = false,
  icon,
  type = PRIMARY,
  size = LARGE,
  style,
}) => {
  const { themeStore } = useStore();
  const { colors, fonts } = themeStore.theme;

  const isDisabled = disabled || loading;

  const backgroundColor = getBackgroundColor(type, isDisabled, colors);
  const textColor = getTextColor(isDisabled, colors);
  const padding = getPadding(size);
  const fontSize = getFontSize(size);

  return (
    <TouchableOpacity
      style={[
        ButtonStyle.button,
        {
          backgroundColor,
          paddingVertical: padding,
          opacity: isDisabled ? 0.7 : 1,
        },
        style,
      ]}
      onPress={onPress}
      disabled={isDisabled}
    >
      {loading ? (
        <ActivityIndicator color={textColor} />
      ) : (
        <View style={ButtonStyle.content}>
          {icon && <View style={ButtonStyle.iconWrapper}>{icon}</View>}
          <Text style={[ButtonStyle.text, { color: textColor, fontSize }, fonts.medium]}>
            {title}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

export default React.memo(Button);
