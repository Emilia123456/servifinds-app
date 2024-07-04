import React from 'react';
import { View, Text, Button } from 'react-native';

export default function StartScreen({ navigation }) {
  return (
    <View>
      <Text>ServiFinds</Text>
      <Button title="Iniciar sesión" onPress={() => navigation.navigate('Login')} />
      <Button title="Registrarse" onPress={() => navigation.navigate('Login')} />
    </View>
  );
}
