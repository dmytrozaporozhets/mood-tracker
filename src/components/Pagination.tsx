import React, { useEffect, useRef } from 'react';
import { View, Animated, TouchableWithoutFeedback } from 'react-native';

interface PaginationProps {
  total: number;
  currentIndex: number;
  dotSize?: number;
  activeDotSize?: number;
  activeColor?: string;
  inactiveColor?: string;
  onDotPress?: (index: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  total,
  currentIndex,
  dotSize = 8,
  activeDotSize = 12,
  activeColor,
  inactiveColor,
  onDotPress,
}) => {
  const scales = useRef<Animated.Value[]>([]).current;

  if (scales.length !== total) {
    for (let i = 0; i < total; i++) {
      scales[i] = new Animated.Value(i === currentIndex ? 1 : 0);
    }
  }

  useEffect(() => {
    scales.forEach((scale, i) => {
      Animated.timing(scale, {
        toValue: i === currentIndex ? 1 : 0,
        duration: 250,
        useNativeDriver: true,
      }).start();
    });
  }, [currentIndex]);

  return (
    <View style={{ flexDirection: 'row', justifyContent: 'center', marginVertical: 15 }}>
      {Array.from({ length: total }).map((_, index) => {
        const scale = scales[index].interpolate({
          inputRange: [0, 1],
          outputRange: [dotSize / activeDotSize, 1],
        });

        const backgroundColor = scales[index].interpolate({
          inputRange: [0, 1],
          outputRange: [inactiveColor ?? '#CCC', activeColor ?? '#555'],
        });

        return (
          <TouchableWithoutFeedback
            key={index}
            onPress={() => onDotPress && onDotPress(index)}
          >
            <Animated.View
              style={{
                width: activeDotSize,
                height: activeDotSize,
                borderRadius: activeDotSize / 2,
                backgroundColor,
                transform: [{ scale }],
                marginHorizontal: dotSize / 2,
              }}
            />
          </TouchableWithoutFeedback>
        );
      })}
    </View>
  );
};

export default Pagination;
