import { Size, Type, SMALL, MEDIUM, LARGE, PRIMARY, SECONDARY, DANGER } from '../constants/types';
import { ColorsStyle } from '../types/theme';
import { ButtonDimensions } from '../styles/components/ButtonStyle';

export const getBackgroundColor = (
  type: Type,
  disabled: boolean,
  colors: ColorsStyle
): string => {
  if (disabled) return colors.disabled;

  switch (type) {
    case SECONDARY:
      return colors.secondary;
    case DANGER:
      return colors.error;
    case PRIMARY:
    default:
      return colors.primary;
  }
};

export const getTextColor = (
  disabled: boolean,
  colors: ColorsStyle
): string => {
  return disabled ? colors.disabledText : colors.textLight;
};

export const getFontSize = (size: Size): number => {
  switch (size) {
    case SMALL:
      return 12;
    case MEDIUM:
      return 14;
    case LARGE:
    default:
      return 16;
  }
};

export const getButtonSizeStyle = (size: Size) => {
  switch (size) {
    case SMALL:
      return ButtonDimensions.S;
    case MEDIUM:
      return ButtonDimensions.M;
    case LARGE:
    default:
      return ButtonDimensions.L;
  }
};
