import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import MainStackNavigator from './navigation/MainStackNavigator';

export default function App() {
  let logeado = false; 
  //hacer un if de si está logueadp no te deje ir para atras
  return (
    <NavigationContainer>
      <MainStackNavigator />
    </NavigationContainer>
  );
}
