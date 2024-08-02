import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './HomeScreen';
import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-web';
import Icon from 'react-native-vector-icons/Ionicons';
import Octicons from '@expo/vector-icons/Octicons';
const Tab = createBottomTabNavigator();

function PlaceholderScreen() {
  return (
    <SafeAreaView>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Pantalla de ejemplo</Text>
      </View>
    </SafeAreaView>
  );
}

export default function RootNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName;
            if (route.name === 'Home') {
              iconName = 'home';
            } else if (route.name === 'Búsqueda') {
              iconName = 'search';
            } else if (route.name === 'Reservas') {
              iconName = 'calendar';
            } else if (route.name === 'Favoritos') {
              iconName = 'heart';
            } else if (route.name === 'Perfil') {
              iconName = 'person';
            }

            // Puedes devolver cualquier componente que desees aquí.
            return <Octicons name={iconName} size={24} color="black" />;
          },
          tabBarLabelStyle: { fontSize: 12, fontWeight: 'bold' },
          tabBarStyle: { paddingBottom: 5, height: 60 }
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Búsqueda" component={PlaceholderScreen} />
        <Tab.Screen name="Reservas" component={PlaceholderScreen} />
        <Tab.Screen name="Favoritos" component={PlaceholderScreen} />
        <Tab.Screen name="Perfil" component={PlaceholderScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}