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
    if (token) {
      await AsyncStorage.setItem('token', token);
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
      direccion: direccion || '',
      contrasena: password,
      idGenero: genero, 
      foto: foto || '',
      FechaNacimiento: fecha
    });

    if (response.status === 201) {
      return response.data;  
    } else {
      throw new Error('Error en el registro: ' + response.statusText);
    }
  } catch (error) {
    console.error('Error al registrar el usuario:', {
      message: error.message,
      status: error.response?.status,
      data: error.response?.data
    });
    throw error;  
  }
};

export const getUserProfile = async () => {
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

    return response.data;
  } catch (error) {
    console.error('Error al obtener perfil del usuario:', error);
    throw error;
  }
};

export const updateUserProfile = async (imageUri) => {
  try {
    const token = await AsyncStorage.getItem('token');
    if (!token) {
      throw new Error('No hay token disponible');
    }

    if (!imageUri) {
      throw new Error('La URI de la imagen no es válida');
    }

    const formData = new FormData();
    formData.append('foto', {
      uri: imageUri,
      type: 'image/jpeg', // Adjust the MIME type based on the image type
      name: 'profile-pic.jpg', // Optional: you can dynamically use the filename here
    });

    console.log('Sending profile picture to server with FormData: ', formData);

    const response = await userApi.put('/users/profile/picture', formData, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    });

    console.log('Server response:', response.data);
    return response.data;  

  } catch (error) {
    console.error('Error al actualizar la foto de perfil:', error.response ? error.response.data : error.message);
    throw error;
  }
};