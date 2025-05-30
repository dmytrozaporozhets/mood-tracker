import React from 'react';
import { Modal, View, StyleSheet, Pressable, Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';

import MoodPicker from './MoodPicker';
import { useStore } from '../store/StoreProvider';

type Props = {
  onClose: () => void;
};

const MoodModal: React.FC<Props> = ({ onClose }) => {
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  const { themeStore } = useStore();
  const colors = themeStore.theme.colors;

  return (
    <Modal
      animationType="fade"
      transparent
      visible
      onRequestClose={onClose}
    >
      <View style={[styles.backdrop, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
        <View style={[styles.modalContainer, { backgroundColor: colors.card }]}>
          <Pressable onPress={onClose} style={styles.closeButton}>
            <Text style={[styles.close, { color: themeStore.isDark ? colors.textLight : colors.text }]}>
              ✕
            </Text>
          </Pressable>
          <View style={styles.header}>
            <Text style={[styles.title, { color: colors.text }]}>
              {t('mood.title')}
            </Text>
          </View>
          <MoodPicker onSelectMood={onClose} />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',  
    alignItems: 'center',
  },
  modalContainer: {
    width: '90%',
    borderRadius: 20,
    paddingVertical: 30,  
    paddingHorizontal: 10,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 12,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',  
    alignItems: 'center',
    marginBottom: 24,
    position: 'relative',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
  },
  closeButton: {
    position: 'absolute',
    right: 10,
    padding: 5,
    top: 10,
  },
  close: {
    fontSize: 18,
  },
});

export default MoodModal;
