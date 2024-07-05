import React from 'react';
import { View, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../Screens/HomeScreen';
import SearchScreen from '../Screens/SearchScreen';
import BookingScreen from '../Screens/BookingScreen';
import TopOverlay from '../components/TopOverlay'; // Ajusta la ruta según sea necesario
import FavoriteScreen from '../Screens/FavoriteScreen';
import ProfileScreen from '../Screens/ProfileScreen';

const Tab = createBottomTabNavigator();
const HomeStack = createStackNavigator();
const SearchStack = createStackNavigator();
const BookingStack = createStackNavigator();
const FavoriteStack = createStackNavigator();
const ProfileStack = createStackNavigator();

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

function BookingStackScreen() {
  return (
    <SearchStack.Navigator
      screenOptions={{
        headerShown: false, 
      }}
    >
      <SearchStack.Screen name="Reservas" component={BookingScreen} />
    </SearchStack.Navigator>
  );
}

function FavoriteStackScreen() {
  return (
    <SearchStack.Navigator
      screenOptions={{
        headerShown: false, 
      }}
    >
      <SearchStack.Screen name="Reservas" component={FavoriteScreen} />
    </SearchStack.Navigator>
  );
}

function ProfileStackScreen() {
  return (
    <SearchStack.Navigator
      screenOptions={{
        headerShown: false, 
      }}
    >
      <SearchStack.Screen name="Perfil" component={ProfileScreen} />
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
        <Tab.Screen name="Reservas" component={BookingStackScreen} />
        <Tab.Screen name="Favoritos" component={FavoriteStackScreen} />
        <Tab.Screen name="Perfil" component={ProfileStackScreen} />
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
