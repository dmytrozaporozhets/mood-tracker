import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, ViewStyle } from 'react-native';
import { useStore } from '../store/StoreProvider';

type Props = {
  progress: number; // від 0 до 1
  color?: string;
  backgroundColor?: string;
  height?: number;
  duration?: number;
  style?: ViewStyle;
};

const ProgressBar: React.FC<Props> = ({
  progress,
  color,
  backgroundColor,
  height = 10,
  duration = 500,
  style,
}) => {
  const { themeStore } = useStore();
  const { colors } = themeStore.theme;

  const clampedProgress = Math.max(0, Math.min(progress, 1));
  const animatedWidth = useRef(new Animated.Value(clampedProgress)).current;

  useEffect(() => {
    Animated.timing(animatedWidth, {
      toValue: clampedProgress,
      duration,
      useNativeDriver: false,
    }).start();
  }, [clampedProgress, duration]);

  const widthInterpolated = animatedWidth.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: backgroundColor ?? colors.border,
          height,
          borderRadius: height / 2,
        },
        style,
      ]}
    >
      <Animated.View
        style={{
          width: widthInterpolated,
          backgroundColor: color ?? colors.primary,
          height: '100%',
          borderRadius: height / 2,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    overflow: 'hidden',
    marginVertical:10,
  },
});

export default ProgressBar;
