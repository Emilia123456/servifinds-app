import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const favsApi = axios.create({
  baseURL: 'https://diverse-tightly-mongoose.ngrok-free.app/api/Favoritos',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getLikedRecomendations = async () => {
  try {
    const token = await AsyncStorage.getItem('token');
    if (!token) {
      return [];
    }

    console.log('Token format check:', {
      length: token.length,
      startsWithBearer: token.startsWith('Bearer '),
      sample: token.substring(0, 20) + '...'
    });

    const headers = {
      'Authorization': token.startsWith('Bearer ') ? token : `Bearer ${token}`,
      'Content-Type': 'application/json',
    };
    const response = await favsApi.get('/favoritos', { headers });

    console.log('Respuesta del servidor:', {
      status: response.status,
      data: response.data,
      headers: response.headers
    });

    return Array.isArray(response.data) ? response.data : [];

  } catch (error) {
    console.error('Error en getFavoritos:', {
      message: error.message,
      status: error.response?.status,
      data: error.response?.data,
      headers: error.config?.headers
    });

    if (error.response?.status === 401) {
      await AsyncStorage.removeItem('token');
    }

    return [];
  }
};

export const likeRecomendation = async (recomendationId) => {
  try {
    const token = await AsyncStorage.getItem('token');
    if (!token) {
      throw new Error('No hay token disponible');
    }

    const response = await favsApi.patch(`/likes/${recomendationId}`, {}, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      }
    });

    console.log('Respuesta del servidor al dar like:', {
      status: response.status,
      data: response.data,
      ofrecidoId: recomendationId
    });

    return response.data;
  } catch (error) {
    console.error('Error detallado al dar like:', {
      ofrecidoId: recomendationId,
      message: error.message,
      status: error.response?.status,
      data: error.response?.data,
      url: error.config?.url,
      body: error.config?.data
    });
    throw error;
  }
};


