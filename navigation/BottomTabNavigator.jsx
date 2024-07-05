import React from 'react';
import { View, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../Screens/HomeScreen';
import SearchScreen from '../Screens/SearchScreen';
import TopOverlay from '../components/TopOverlay'; // Ajusta la ruta según sea necesario

const Tab = createBottomTabNavigator();
const HomeStack = createStackNavigator();
const SearchStack = createStackNavigator();

function HomeStackScreen() {
  return (
    <HomeStack.Navigator
      screenOptions={{
        headerShown: false, // Ocultar el encabezado predeterminado
      }}
    >
      <HomeStack.Screen name="ServiFinds" component={HomeScreen} />
    </HomeStack.Navigator>
  );
}

function SearchStackScreen() {
  return (
    <SearchStack.Navigator
      screenOptions={{
        headerShown: false, // Ocultar el encabezado predeterminado
      }}
    >
      <SearchStack.Screen name="Búsqueda" component={SearchScreen} />
    </SearchStack.Navigator>
  );
}

export default function BottomTabNavigator() {
  return (
    <View style={styles.container}>
      <TopOverlay />
      <Tab.Navigator>
        <Tab.Screen name="ServiFinds" component={HomeStackScreen} />
        <Tab.Screen name="Búsqueda" component={SearchStackScreen} />
      </Tab.Navigator>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
