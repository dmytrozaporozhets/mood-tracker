import { TFunction } from 'i18next';

export const getLoginRules = (t: TFunction) => ({
  required: {
    value: true,
    message: t('validation.requiredEmail'),
  },
  pattern: {
    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    message: t('validation.invalidEmail'),
  },
});

export const getPasswordRules = (t: TFunction) => ({
  required: {
    value: true,
    message: t('validation.requiredPassword'),
  },
  minLength: {
    value: 6,
    message: t('validation.passwordMinLength', { length: 6 }),
  },
});

export const getDisplayNameRules = (t: TFunction) => ({
  required: {
    value: true,
    message: t('validation.requiredDisplayName'),
  },
  minLength: {
    value: 2,
    message: t('validation.displayNameMinLength', { length: 2 }),
  },
});

export const getPhoneNumberRules = (t: TFunction) => ({
  required: {
    value: true,
    message: t('validation.requiredPhoneNumber'),
  },
  pattern: {
    value: /^\+?[0-9]{7,15}$/,
    message: t('validation.invalidPhoneNumber'),
  },
});
