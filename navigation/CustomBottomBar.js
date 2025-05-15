import React from 'react';
import { View, Pressable, Text } from 'react-native';
import {IconRoute} from '../components/elements/IconRoute';

export const CustomBottomBar = ({ state, descriptors, navigation }) => {

  return (
    <View style={{ flexDirection: 'row' }}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel ?? options.title ?? route.name;

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

        return (
          <Pressable
            key={route.key}
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarButtonTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{ flex: 1, alignItems: 'center', height:60,justifyContent:'center',
              backgroundColor:isFocused ? 'darkblue':'white' }}
          >
            <IconRoute
              route={label}
              color={ isFocused ? 'white' : 'gray'}
            />
            <Text style={{ color: isFocused ? 'white' : 'gray' }}>
              {label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
};
