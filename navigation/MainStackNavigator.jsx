import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import StartScreen from '../Screens/StartScreen';
import LoginScreen from '../Screens/LoginScreen';
import RegisterScreen from '../Screens/RegisterScreen';
import BottomTabNavigator from './BottomTabNavigator';
import HomeScreen from '../Screens/HomeScreen';

const Stack = createStackNavigator();

export default function MainStackNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Start" component={StartScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Main" component={BottomTabNavigator} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}
