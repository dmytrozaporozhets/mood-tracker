import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { observer } from 'mobx-react-lite';
import { useTranslation } from 'react-i18next';

import { IconRoute } from '../components/elements/IconRoute';
import { useStore } from '../store/StoreProvider';
import { sg } from '../styling';

const CustomBottomBarComponent: React.FC<BottomTabBarProps> = ({
  state,
  descriptors,
  navigation,
}) => {
  const insets = useSafeAreaInsets();
  const { themeStore } = useStore();
  const { colors, fonts, dark } = themeStore.theme;
  const { t } = useTranslation('route');

  const backgroundColor = dark
    ? colors.bottomBarDark.inactiveBackground
    : colors.bottomBar.inactiveBackground;

  const borderColor = dark
    ? colors.borderDark
    : colors.border;

  return (
    <View
      style={{
        backgroundColor,
        paddingBottom: insets.bottom,
        borderTopWidth: 1,
        borderTopColor: borderColor,
      }}
    >
      <View style={[sg.row, { backgroundColor }]}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const labelKey = options.tabBarLabel as string;
          const label = t(labelKey);
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

          const tabBackgroundColor = isFocused
            ? (dark
                ? colors.bottomBarDark.activeBackground
                : colors.bottomBar.activeBackground)
            : backgroundColor;

          const labelColor = isFocused
            ? (dark
                ? colors.bottomBarDark.activeText
                : colors.bottomBar.activeText)
            : (dark
                ? colors.bottomBarDark.inactiveText
                : colors.bottomBar.inactiveText);

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
                  backgroundColor: tabBackgroundColor,
                  borderRightWidth: index < state.routes.length - 1 ? 1 : 0,
                  borderRightColor: borderColor,
                },
              ]}
            >
              <IconRoute route={labelKey} color={labelColor} />
              <Text style={[{ color: labelColor }, fonts.medium]}>
                {label}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
};

export const CustomBottomBar = observer(CustomBottomBarComponent);
