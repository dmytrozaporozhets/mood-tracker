import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { IconRoute } from '../components/elements/IconRoute';
import { Colors, sg } from '../styling';

export const CustomBottomBar: React.FC<BottomTabBarProps> = ({
  state,
  descriptors,
  navigation,
}) => {
  const insets = useSafeAreaInsets();

  return (
    <View style={[sg.bgBlack, { paddingBottom: insets.bottom }]}>
      <View style={sg.row}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const label = options.tabBarLabel ?? options.title ?? route.name;

          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name, route.params);
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };

          const labelColor = isFocused ? Colors.neutrals.white : Colors.primary[500];

          return (
            <Pressable
              key={route.key}
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarButtonTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={[
                sg.flex,
                sg.aICenter,
                sg.h60,
                sg.jCCenter,
                {
                  backgroundColor: isFocused ? Colors.primary[500] : Colors.neutrals.white,
                },
              ]}
            >
              <IconRoute route={typeof label === 'string' ? label : route.name} color={labelColor} />
              {typeof label === 'string' ? (
                <Text style={{ color: labelColor }}>{label}</Text>
              ) : (
                label({
                  focused: isFocused,
                  color: labelColor,
                  position: 'below-icon',
                  children: route.name,
                })
              )}
            </Pressable>
          );
        })}
      </View>
    </View>
  );
};
