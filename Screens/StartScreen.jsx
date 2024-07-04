import React from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, Image } from 'react-native';

export default function StartScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.skipButton} onPress={() => navigation.navigate('Omitir')}>
        <Text style={styles.skipButtonText}>Omitir</Text>
      </TouchableOpacity>
      <View style={styles.header}>
        <Text style={styles.title}>ServiFinds</Text>
        <Text style={styles.subtitle}>La solución a tu puerta. Servicios a domicilio</Text>
      </View>
      <Image
        source={require('../assets/icon.jpg')} // Cambia la ruta a la imagen subida
        style={styles.image}
      />
      <TouchableOpacity style={styles.startButton} onPress={() => navigation.navigate('Login')}>
        <Text style={styles.startButtonText}>Empezar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
    position: 'relative',
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1B2E35',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    color: '#666',
    marginTop: 10,
  },
  startButton: {
    backgroundColor: '#1B2E35',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    width: '80%',
  },
  startButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  skipButton: {
    position: 'absolute',
    top: 50,
    right: 20,
  },
  skipButtonText: {
    color: '#1B2E35',
    fontSize: 16,
  },
});
