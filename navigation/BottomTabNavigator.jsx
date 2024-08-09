import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../Screens/HomeScreen';
import SearchScreen from '../Screens/SearchScreen';
import BookingScreen from '../Screens/BookingScreen';
import TopOverlay from '../components/TopOverlay';
import FavoriteScreen from '../Screens/FavoriteScreen';
import ProfileScreen from '../Screens/ProfileScreen';
import DetailScreen from '../Screens/DetailScreen';
import CategoryScreen from '../Screens/CategoryScreen';

const Tab = createBottomTabNavigator();
const HomeStack = createStackNavigator();
const SearchStack = createStackNavigator();
const BookingStack = createStackNavigator();
const FavoriteStack = createStackNavigator();
const ProfileStack = createStackNavigator();

function HomeStackScreen() {
  return (
    <HomeStack.Navigator screenOptions={{ headerShown: false }}>
      <HomeStack.Screen name="ServiFinds" component={HomeScreen} />
      <HomeStack.Screen name="Detail" component={DetailScreen} />
    </HomeStack.Navigator>
  );
}

function SearchStackScreen() {
  return (
    <SearchStack.Navigator screenOptions={{ headerShown: false }}>
      <SearchStack.Screen name="Búsqueda" component={SearchScreen} />
      <SearchStack.Screen name="Categoría" component={CategoryScreen} />
    </SearchStack.Navigator>
  );
}

function BookingStackScreen() {
  return (
    <BookingStack.Navigator screenOptions={{ headerShown: false }}>
      <BookingStack.Screen name="Reservas" component={BookingScreen} />
    </BookingStack.Navigator>
  );
}

function FavoriteStackScreen() {
  return (
    <FavoriteStack.Navigator screenOptions={{ headerShown: false }}>
      <FavoriteStack.Screen name="Favoritos" component={FavoriteScreen} />
    </FavoriteStack.Navigator>
  );
}

function ProfileStackScreen() {
  return (
    <ProfileStack.Navigator screenOptions={{ headerShown: false }}>
      <ProfileStack.Screen name="Perfil" component={ProfileScreen} />
    </ProfileStack.Navigator>
  );
}

export default function BottomTabNavigator() {
  return (
    <View style={styles.container}>
      <TopOverlay />
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused }) => {
            let iconSource;

            switch (route.name) {
              case 'ServiFinds':
                iconSource = require('../assets/limpieza.png');
                break;
              case 'Búsqueda':
                iconSource = require('../assets/limpieza.png');
                break;
              case 'Reservas':
                iconSource = require('../assets/limpieza.png');
                break;
              case 'Favoritos':
                iconSource = require('../assets/limpieza.png');
                break;
              case 'Perfil':
                iconSource = require('../assets/limpieza.png');
                break;
              default:
                iconSource = require('../assets/limpieza.png');
            }

            return (
              <Image
                source={iconSource}
                style={[
                  styles.iconos,
                  { tintColor: focused ? '#000' : '#808080' }
                ]}
              />
            );
          },
          tabBarLabelStyle: styles.tabBarLabelStyle,
          tabBarStyle: styles.tabBarStyle,
          tabBarActiveTintColor: styles.tabBarActiveTintColor,
          tabBarInactiveTintColor: styles.tabBarInactiveTintColor,
        })}
      >
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
  iconos: {
    width: 30, 
    height: 30,
    marginTop: 8, 
    marginBottom: 8, 
    marginHorizontal: 20, 
  },
  tabBarLabelStyle: {
    fontSize: 12, 
    fontWeight: 'normal', 
    marginTop: 0, 
    marginBottom: 8, 
  },
  tabBarStyle: {
    backgroundColor: '#F7F7F7', 
    height: 70, 
    borderTopWidth: 0, 
    elevation: 0,
    paddingTop: 10, 
    paddingBottom: 10, 
  },
  tabBarActiveTintColor: '#000', 
  tabBarInactiveTintColor: '#808080', 
});
