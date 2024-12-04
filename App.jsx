import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import MainStackNavigator from './navigation/MainStackNavigator';
import { FavProvider } from './contexts/FavContext.js'


export default function App() {
  let logeado = false; 
  return (
    <NavigationContainer>
      <FavProvider> 
        {logeado ? (
          <BottomTabNavigator />  
        ) : (
          <MainStackNavigator />  
        )}
      </FavProvider>
    </NavigationContainer>
  );
}