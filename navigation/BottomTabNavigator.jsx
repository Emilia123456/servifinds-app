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
      <HomeStack.Screen 
        name="ServiFinds" 
        component={HomeScreen} 
        options={{
          header: () => <TopOverlay showText={true} />,
          headerTransparent: true,
          headerShown: false
        }} 
      />
      <HomeStack.Screen name="Detail" component={DetailScreen} />
      <HomeStack.Screen name="Categoría" component={CategoryScreen} />
    </HomeStack.Navigator>
  );
}

function SearchStackScreen() {
  return (
    <SearchStack.Navigator screenOptions={{ headerShown: false }}>
      <SearchStack.Screen name="Búsqueda" component={SearchScreen} />
      <SearchStack.Screen name="Categoría" component={CategoryScreen} />
      <SearchStack.Screen name="Detail" component={DetailScreen} />
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
      <FavoriteStack.Screen name="Detail" component={DetailScreen} />
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
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused }) => {
            let iconSource;

            switch (route.name) {
              case 'ServiFinds':
                iconSource = require('../assets/home.png');
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
          tabBarShowLabel: false, // Ocultar etiquetas
          tabBarStyle: styles.tabBarStyle,
        })}
      >
        <Tab.Screen name="Home" component={HomeStackScreen} options={{ headerShown: false }} />
        <Tab.Screen name="Búsqueda" component={SearchStackScreen} options={{ headerShown: false }} />
        <Tab.Screen name="Reservas" component={BookingStackScreen} options={{ headerShown: false }} />
        <Tab.Screen name="Favoritos" component={FavoriteStackScreen} options={{ headerShown: false }} />
        <Tab.Screen name="Perfil" component={ProfileStackScreen} options={{ headerShown: false }} />
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
    width: 24, // Ajusta el tamaño del ícono
    height: 24,
    marginHorizontal: 10,
    tintColor: '#1B2E35',
  },
  tabBarStyle: {
    backgroundColor: '#F7F7F7',
    height: 80, // Hace más grande el contenedor del tabBar
    borderTopWidth: 0,
    elevation: 0,
    paddingBottom: 10, // Más espacio abajo
  },
});
