import { TFunction, t } from 'i18next';
import { FirebaseError } from 'firebase/app';

const getFirebaseErrorMessage = (
  code: string | undefined,
  t: TFunction
): string => {
  if (!code) return t('validation.default');

  const messages: Record<string, string> = {
    'auth/invalid-credential': t('validation.invalidCredential'),
    'auth/user-not-found': t('validation.userNotFound'),
    'auth/wrong-password': t('validation.wrongPassword'),
    'auth/too-many-requests': t('validation.tooManyRequests'),
  };

  return messages[code] || t('validation.default');
};

export const handleFirebaseError = (
  error: unknown
): string => {
  if (error instanceof FirebaseError) {
    return getFirebaseErrorMessage(error.code, t);
  }

  return t('validation.default');
};

