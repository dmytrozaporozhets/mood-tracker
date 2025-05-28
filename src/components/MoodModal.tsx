import React from 'react';
import { Modal, View, StyleSheet, Pressable, Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import MoodPicker from './MoodPicker';
import { Colors } from '../styling';

type Props = {
  onClose: () => void;
};

const MoodModal: React.FC<Props> = ({ onClose }) => {
  const insets = useSafeAreaInsets();

  return (
    <Modal
      animationType="fade"
      transparent
      visible
      onRequestClose={onClose}
    >
      <View style={[styles.backdrop, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
        <View style={styles.modalContainer}>
          <Pressable onPress={onClose} style={styles.closeButton}>
              <Text style={styles.close}>✕</Text>
          </Pressable>
          <View style={styles.header}>
            <Text style={styles.title}>How are you feeling today?</Text>
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
    backgroundColor: Colors.neutrals.white,
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
    color: Colors.neutrals[600],
  },
  closeButton: {
    position: 'absolute',
    right: 10,
    padding: 5,
    top:10,
  },
  close: {
    fontSize: 18,
    color: Colors.neutrals[500],
  },
});

export default MoodModal;
