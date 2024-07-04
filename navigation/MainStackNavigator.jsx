import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import StartScreen from '../Screens/StartScreen';
import LoginScreen from '../Screens/LoginScreen';
import BottomTabNavigator from './BottomTabNavigator';

const Stack = createStackNavigator();

export default function MainStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Start" component={StartScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Main" component={BottomTabNavigator} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}
