import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Toast, { BaseToastProps } from 'react-native-toast-message';
import { useStore } from '../store/StoreProvider';

const CustomToast = () => {
  const { themeStore } = useStore();
  const { colors, fonts } = themeStore.theme;

  const baseStyle = {
    borderLeftWidth: 6,
    borderRadius: 8,
    padding: 12,
    marginHorizontal: 16,
    marginTop: 10,
    backgroundColor: colors.card,
  };

  return (
    <Toast
      position="top"
      topOffset={50}
      config={{
        success: (props: BaseToastProps) => (
          <View style={[baseStyle, { borderLeftColor: colors.notification.success }]}>
            <Text style={[styles.title, { ...fonts.bold, color: colors.notification.success }]}>
              {props.text1}
            </Text>
            {!!props.text2 && (
              <Text style={[styles.message, { ...fonts.regular, color: colors.text }]}>
                {props.text2}
              </Text>
            )}
          </View>
        ),
        error: (props: BaseToastProps) => (
          <View style={[baseStyle, { borderLeftColor: colors.error }]}>
            <Text style={[styles.title, { ...fonts.bold, color: colors.error }]}>
              {props.text1}
            </Text>
            {!!props.text2 && (
              <Text style={[styles.message, { ...fonts.regular, color: colors.text }]}>
                {props.text2}
              </Text>
            )}
          </View>
        ),
      }}
    />
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 16,
    marginBottom: 4,
  },
  message: {
    fontSize: 14,
  },
});

export default CustomToast;
