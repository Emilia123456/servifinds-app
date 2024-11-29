import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker'; // Importar el DateTimePicker
import Icon from 'react-native-vector-icons/MaterialIcons'; // Importar un ícono para mostrar/ocultar contraseña
import { register } from '../service/userService.js';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [secondPassword, setSecondPassword] = useState('');
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [fecha, setFecha] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showPassword, setShowPassword] = useState(false); 
  const [showSecondPassword, setShowSecondPassword] = useState(false); // Estado para la repetición de la contraseña

  const handleRegister = async () => {
    if (password !== secondPassword) {
      Alert.alert("Las contraseñas no coinciden");
    } else {
      try {
        console.log(email, nombre, apellido, '', password, '1', '', fecha.toISOString());
        const result = await register(email, nombre, apellido, '', password, '1', '', fecha.toISOString());
        console.log(result);
        if (result>0) {
          navigation.navigate('Main');
          navigation.reset({
            index: 0,
            routes: [{ name: 'Main' }],
          });
        } else {
          Alert.alert("Error", "No se pudo registrar, el usuario ya existe"); //porque el result te lo devolvio como -1
        }
      } catch (error) {
        Alert.alert("Error", "Hubo un problema al registrarse.");
      }
    }
  };

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || fecha;
    setShowDatePicker(false); // Ocultar el DatePicker después de seleccionar la fecha
    setFecha(currentDate);
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

      <View style={styles.dateContainer}>
        <TextInput
          style={styles.dateInput}
          placeholder="Fecha de nacimiento"
          placeholderTextColor="#777"
          value={fecha ? fecha.toLocaleDateString() : ''}
          editable={false} // No editable para que solo se cambie con el DatePicker
        />
        <TouchableOpacity onPress={() => setShowDatePicker(true)}>
          <Icon name="event" size={24} color="#777" />
        </TouchableOpacity>
      </View>

      {showDatePicker && (
        <DateTimePicker
          value={fecha}
          mode="date"
          display="default"
          onChange={handleDateChange}
        />
      )}

      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.passwordInput}
          placeholder="Contraseña"
          placeholderTextColor="#777"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!showPassword} // Mostrar u ocultar la contraseña
        />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          <Icon name={showPassword ? "visibility-off" : "visibility"} size={24} color="#777" />
        </TouchableOpacity>
      </View>

      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.passwordInput}
          placeholder="Repite la contraseña"
          placeholderTextColor="#777"
          value={secondPassword}
          onChangeText={setSecondPassword}
          secureTextEntry={!showSecondPassword} // Mostrar u ocultar la repetición de contraseña
        />
        <TouchableOpacity onPress={() => setShowSecondPassword(!showSecondPassword)}>
          <Icon name={showSecondPassword ? "visibility-off" : "visibility"} size={24} color="#777" />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Continuar</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.signUpText}>¿Ya tenés una cuenta? Iniciá sesión</Text>
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
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    backgroundColor: '#f0f0f0',
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
  },
  dateInput: {
    flex: 1,
    color: '#000',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    backgroundColor: '#f0f0f0',
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
  },
  passwordInput: {
    flex: 1,
    color: '#000',
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
