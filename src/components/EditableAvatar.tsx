import React from 'react';
import { View, Image, StyleSheet, Pressable } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useStore } from '../store/StoreProvider';


type Props = {
  uri: string;
  onPress: () => void;
  size?: number;
};

const EditableAvatar = ({ uri, onPress, size = 100 }: Props) => {
  const { themeStore } = useStore();
  const { theme} = themeStore;

  return (
    <Pressable onPress={onPress} style={[styles.container,{ width: size, height: size }]}>
      <View>
        <Image
          source={{ uri }}
          style={[
            styles.image,
            {
              width: size,
              height: size,
              borderRadius: size / 2,
              backgroundColor: theme.colors.card,
            },
          ]}
        />
        <View style={[styles.iconWrapper, { backgroundColor: theme.colors.primary }]}>
          <MaterialIcons name="edit" size={20} color={ theme.colors.background} />
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf:'center'
  },
  image: {
    resizeMode: 'cover',
  },
  iconWrapper: {
    position: 'absolute',
    bottom: 4,
    right: 4,
    borderRadius: 12,
    padding: 4,
  },
});

export default EditableAvatar;
