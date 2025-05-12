import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MoodPicker from '../components/MoodPicker';
import { NavigationContainer } from '@react-navigation/native';
import { MOOD_SCREEN } from '../navigation/RouteNames';
import MoodScreen from '../screens/MoodScreen'

const Stack = createNativeStackNavigator();

const Navigation = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name={MOOD_SCREEN} component={MoodScreen}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default Navigation;
