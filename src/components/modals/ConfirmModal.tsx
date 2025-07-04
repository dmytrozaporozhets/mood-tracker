import React from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import { useStore } from '../../store/StoreProvider';
import { useTranslation } from 'react-i18next';

type Props = {
  visible: boolean;
  title: string;
  onConfirm: () => void;
  onCancel: () => void;
  confirmText?: string;
  cancelText?: string;
};

const ConfirmModal: React.FC<Props> = ({
  visible,
  title,
  onConfirm,
  onCancel,
  confirmText,
  cancelText,
}) => {
  const { themeStore } = useStore();
  const { colors, fonts } = themeStore.theme;
  const { t } = useTranslation();

  const confirmLabel = confirmText || t('button.confirm');
  const cancelLabel = cancelText || t('button.cancel');

  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent
      onRequestClose={onCancel}
    >
      <View style={styles.overlay}>
        <View style={[styles.modalContainer, { backgroundColor: colors.card }]}>
          <Text style={[styles.title, { color: colors.text }, fonts.medium]}>
            {title}
          </Text>

          <View style={styles.buttonsContainer}>
            <TouchableOpacity
              onPress={onCancel}
              style={[styles.button, styles.cancelButton, { borderColor: colors.border }]}
            >
              <Text style={[styles.cancelText, { color: colors.text }]}>
                {cancelLabel}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={onConfirm}
              style={[styles.button, { backgroundColor: colors.notification.success }]}
            >
              <Text style={[styles.confirmText, { color: colors.background }]}>
                {confirmLabel}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ConfirmModal;


const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  modalContainer: {
    width: '100%',
    borderRadius: 16,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 10,
  },
  title: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 24,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 12,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 8,
  },
  cancelButton: {
    borderWidth: 1,
  },
  confirmText: {
    fontWeight: '600',
  },
  cancelText: {
    fontWeight: '500',
  },
});
