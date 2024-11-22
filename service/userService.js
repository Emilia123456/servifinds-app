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

    const token = response.data.token;
    console.log('Token recibido:', token ? 'presente' : 'ausente');
    
    if (token) {
      await AsyncStorage.setItem('token', token);
      // Verificar que se guardó correctamente
      const storedToken = await AsyncStorage.getItem('token');
      console.log('Token almacenado correctamente:', storedToken === token);
    }

    return response.data;  
  } catch (error) {
    console.error('Error en login:', {
      message: error.message,
      status: error.response?.status,
      data: error.response?.data
    });
    throw error; 
  }
};


export const register = async (email, nombre, apellido, direccion, password, genero, foto, fecha) => {
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

export const getUserId = async () => {
  try {
    const token = await AsyncStorage.getItem('token');
    if (!token) {
      throw new Error('No hay token disponible');
    }

    const response = await userApi.get('/users/profile', {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      }
    });

    return response.data.id;
  } catch (error) {
    console.error('Error al obtener ID del usuario:', error);
    throw error;
  }
};
