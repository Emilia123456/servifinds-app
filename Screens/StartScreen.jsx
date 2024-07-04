import React from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, Image } from 'react-native';

export default function StartScreen({ navigation }) {

  return (
    <View style={styles.container}>
      <View style={styles.header}>
      <Image
          source={require('../assets/icon.jpg')} // Cambia la URL por la ruta de tu imagen
          style={styles.image}
        />
        <Text style={styles.title}>ServiFinds</Text>
        <Text style={styles.subtitle}>
          La solución a tu puerta
        </Text>
      </View>
      <View style={styles.footer}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Login')}>
          <Text style={styles.buttonText}>Iniciar sesión</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Register')}>
          <Text style={styles.buttonText}>Registrarse</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.skipButton} onPress={() => navigation.navigate('Omitir')}>
        <Text style={styles.skipButtonText}>Omitir</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
  },
  header: {
    marginTop: 60,
    alignItems: 'center',
  },
  image: {
    width: 300,
    height: 300,
    marginBottom: 20,
    marginTop: 100,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000',
  },
  subtitle: {
    fontSize: 15,
    textAlign: 'center',
    color: '#777',
    marginTop: 10,
    paddingHorizontal: 20,
  },
  footer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 80,
  },
  button: {
    width: '100%',
    backgroundColor: '#1B2E35', 
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  skipButton: {
    position: 'absolute',
    bottom: 55,
    right: 40,
  },
  skipButtonText: {
    color: '#000',
    fontSize: 17,
  },
});
