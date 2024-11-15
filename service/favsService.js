import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { 
  View, 
  Text, 
  Image, 
  ScrollView, 
  StyleSheet, 
  TouchableOpacity, 
  RefreshControl 
} from 'react-native';

const favsApi = axios.create({
  baseURL: 'https://diverse-tightly-mongoose.ngrok-free.app/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getLikedRecomendations = async () => {
  try {
    const token = await AsyncStorage.getItem('token');
    if (!token) {
      console.log('No hay token disponible');
      return [];
    }

    console.log('Intentando obtener favoritos con token:', token);
    const response = await favsApi.get('/favoritos', {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      }
    });

    if (response.status === 404) {
      console.log('No se encontraron favoritos');
      return [];
    }

    console.log('Respuesta de favoritos:', response.data);
    return Array.isArray(response.data) ? response.data : [];
  } catch (error) {
    if (error.response?.status === 404) {
      console.log('No se encontraron favoritos');
      return [];
    }
    console.error('Error al obtener favoritos:', {
      message: error.message,
      status: error.response?.status,
      data: error.response?.data
    });
    return [];
  }
};

export const likeRecomendation = async (recomendationId) => {
  try {
    const token = await AsyncStorage.getItem('token');
    if (!token) {
      throw new Error('No hay token disponible');
    }

    const response = await favsApi.post(`/favoritos/${recomendationId}`, null, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      }
    });

    console.log('Respuesta al dar like:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error al dar like:', {
      message: error.message,
      status: error.response?.status,
      data: error.response?.data
    });
    throw error;
  }
};
