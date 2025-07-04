import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, ViewStyle, Text } from 'react-native';
import { useStore } from '../store/StoreProvider';
import { observer } from 'mobx-react-lite';

type Props = {
  progress: number; // від 0 до 1
  color?: string;
  backgroundColor?: string;
  height?: number;
  duration?: number;
  style?: ViewStyle;
  leftLabel?: string; 
  rightLabel?: string;  
};

const ProgressBar: React.FC<Props> =observer( ({
  progress,
  color,
  backgroundColor,
  height = 10,
  duration = 500,
  style,
  leftLabel,
  rightLabel,
}) => {
  const { themeStore } = useStore();
  const { colors } = themeStore.theme;

  const clampedProgress = Math.max(0, Math.min(progress, 1));
  const [animatedWidth] = React.useState(() => new Animated.Value(0));

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
    <View style={[styles.wrapper, style]}>
      {leftLabel !== undefined && (
        <Text style={[styles.label, { color: colors.text, marginRight: 8 }]}>
          {leftLabel}
        </Text>
      )}

      <View
        style={[
          styles.container,
          {
            backgroundColor: backgroundColor ?? colors.border,
            height,
            borderRadius: height / 2,
            flex: 1,
          },
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

      {rightLabel !== undefined && (
        <Text style={[styles.label, { color: colors.text, marginLeft: 8 }]}>
          {rightLabel}
        </Text>
      )}
    </View>
  );
});

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  container: {
    overflow: 'hidden',
  },
  label: {
    fontSize: 14,
    minWidth: 40,
    textAlign: 'center',
  },
});

export default ProgressBar;
