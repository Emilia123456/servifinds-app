import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { login } from '../service/userService.js';  

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const result = await login(email, password);
      
      if (result.success) {  
        navigation.navigate('Main');
        navigation.reset({
          index: 0,
          routes: [{ name: 'Main' }],
        });
      } else {
        Alert.alert("Error", "Usuario o contraseña incorrecta, vuelve a ingresar los datos.");
      }
    } catch (error) {
      Alert.alert("Error", "Hubo un problema al iniciar sesión. Inténtalo de nuevo más tarde.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>¡Hola de nuevo!</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#777"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        placeholderTextColor="#777"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity style={styles.forgotPassword}>
        <Text style={styles.forgotPasswordText}>¿Olvidaste tu contraseña?</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Continuar</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <Text style={styles.signUpText}>¿Aún no tienes cuenta? ¡Regístrate!</Text>
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
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1B2E35',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    backgroundColor: '#f0f0f0',
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
    color: '#000',
  },
  forgotPassword: {
    width: '100%',
    alignItems: 'flex-end',
    marginVertical: 10,
  },
  forgotPasswordText: {
    color: '#777',
  },
  button: {
    width: '100%',
    backgroundColor: '#1B2E35',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  signUpText: {
    color: '#777',
    marginTop: 20,
  },
});
