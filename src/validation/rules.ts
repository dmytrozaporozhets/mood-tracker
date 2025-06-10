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
