import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { register, login } from '../service/userService.js'; // Asegúrate de importar ambas funciones

export default function RegisterScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [secondPassword, setSecondPassword] = useState('');
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [direccion, setDireccion] = useState('');
  const [fecha, setFecha] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showSecondPassword, setShowSecondPassword] = useState(false);

  const handleRegister = async () => {
    if (password.trim() !== secondPassword.trim()) {
      Alert.alert("Las contraseñas no coinciden");
      return;
    }
    if (!email.trim() || !nombre.trim() || !apellido.trim() || !password.trim()) {
      Alert.alert("Por favor, completa todos los campos requeridos.");
      return;
    }

    const requestData = {
      email: email.trim(),
      nombre: nombre.trim(),
      apellido: apellido.trim(),
      direccion: direccion.trim(),
      contrasena: password.trim(),
      idGenero: 1, // Valor predeterminado
      foto: '', // Opcional
      FechaNacimiento: fecha.toISOString().split('T')[0], // Formato 'YYYY-MM-DD'
    };

    try {
      const result = await register(
        requestData.email,
        requestData.nombre,
        requestData.apellido,
        requestData.direccion,
        requestData.contrasena,
        requestData.idGenero,
        requestData.foto,
        requestData.FechaNacimiento
      );
      if (result && result.success) {
        // Al registrar correctamente, iniciar sesión con las mismas credenciales
        const loginResult = await login(email.trim(), password.trim());
        
        if (loginResult && loginResult.token) {
          // Guardar el token en AsyncStorage o realizar la navegación
          navigation.navigate('Main');
          navigation.reset({
            index: 0,
            routes: [{ name: 'Main' }],
          });
        } else {
          Alert.alert("Error", "No se pudo iniciar sesión automáticamente.");
        }
      } else {
        Alert.alert("Error", "No se pudo registrar, el usuario ya existe.");
      }
    } catch (error) {
      Alert.alert("Error", "Hubo un problema al registrarse. Por favor, inténtalo de nuevo.");
      console.error("Error de registro:", error);
    }
  };

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || fecha;
    setShowDatePicker(false);
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

      <TextInput
        style={styles.input}
        placeholder="Dirección (opcional)"
        placeholderTextColor="#777"
        value={direccion}
        onChangeText={setDireccion}
        autoCapitalize="none"
      />

      <View style={styles.dateContainer}>
        <TextInput
          style={styles.dateInput}
          placeholder="Fecha de nacimiento"
          placeholderTextColor="#777"
          value={fecha ? fecha.toLocaleDateString() : ''}
          editable={false}
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
          secureTextEntry={!showPassword}
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
          secureTextEntry={!showSecondPassword}
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