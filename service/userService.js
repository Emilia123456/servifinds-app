import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const userApi = axios.create({
  baseURL: 'https://diverse-tightly-mongoose.ngrok-free.app/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const login = async (email, password) => {
  try {
    const response = await userApi.post('/users/login', {
      email: email,
      contrasena: password, 
    });

    AsyncStorage.setItem('token', response.data.token);
    
    console.log(response.data);

    return response.data;  
  } catch (error) {
    console.error('Error fetching data:', error);
    console.error(error);
    throw error; 
  }
};


export const register = async (email, nombre, apellido, direccion, password, genero, foto, fecha) => {
  console.log("hola")
  try {
    const response = await userApi.post('/users/register', {
      email: email, 
      nombre: nombre,
      apellido: apellido, 
      direccion: direccion, 
      contrasena: password,
      idGenero: genero, 
      foto: foto, 
      FechaNacimiento: fecha


    });
    //if (response.satatu = 201)

    return response.data;  
  } catch (error) {
    console.error('Error fetching data:', error);
    console.error(error);
    throw error;  
  }
};
