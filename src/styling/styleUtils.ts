import { ColorsStyle } from "../types/theme";
import { DANGER, LARGE, MEDIUM, PRIMARY, SECONDARY, Size, SMALL, Type } from '../constants/types';

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

export const getPadding = (size: Size): number => {
  switch (size) {
    case SMALL:
      return 8;
    case MEDIUM:
      return 12;
    case LARGE:
    default:
      return 16;
  }
};

export const getFontSize = (size: Size): number => {
  switch (size) {
    case SMALL:
      return 14;
    case MEDIUM:
      return 16;
    case LARGE:
    default:
      return 18;
  }
};
