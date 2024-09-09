import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { register } from '../service/userService.js';  // Corrige la importación

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [secondPassword, setSecondPassword] = useState('');
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [genero, setGenero] = useState('');
  const [direccion, setDireccion] = useState('');
  const [foto, setFoto] = useState('');
  const [fecha, setFecha] = useState('');

  const handleRegister = async () => {
    if (password!=secondPassword){
      Alert.alert("Las contraseñas no coinciden");
    }else{
      try {
        const result = await register(email, nombre, apellido, direccion, password, genero, foto, fecha);
        console.log("resultado", result); 
        
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
    }
    
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>¡Empecemos!</Text>
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
        placeholder="Nombre"
        placeholderTextColor="#777"
        value={nombre}
        onChangeText={setNombre}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Apellido"
        placeholderTextColor="#777"
        value={apellido}
        onChangeText={setApellido}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Dirección"
        placeholderTextColor="#777"
        value={direccion}
        onChangeText={setDireccion}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Genero"
        placeholderTextColor="#777"
        value={genero}
        onChangeText={setGenero}
        autoCapitalize="none"
      />
      <TextInput //imput de foto?
        style={styles.input}
        placeholder="foto"
        placeholderTextColor="#777"
        value={foto}
        onChangeText={setFoto}
        autoCapitalize="none"
      />
      <TextInput 
        style={styles.input}
        placeholder="Fecha de nacimiento"
        placeholderTextColor="#777"
        value={fecha}
        onChangeText={setFecha}
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
      <TextInput
        style={styles.input}
        placeholder="Repite la contraseña"
        placeholderTextColor="#777"
        value={secondPassword}
        onChangeText={setSecondPassword}
        secureTextEntry
      />
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Continuar</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.signUpText}>¿Ya tenes una cuenta? Iniciá sesión</Text>
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
