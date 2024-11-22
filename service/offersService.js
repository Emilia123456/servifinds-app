import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ofrecidosApi = axios.create({
  baseURL: 'https://diverse-tightly-mongoose.ngrok-free.app/api', 
  headers: {
    'Content-Type': 'application/json',
  },
});

export const searchOffers = async (params = {}) => {
  try {
    const token = await AsyncStorage.getItem('token');
    const url = '/Ofrecimientos/filtros';
    const config = {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      params: params
    };
    const response = await ofrecidosApi.get(url, config);

    return Array.isArray(response.data) ? response.data : [];
  } catch (error) {
    console.error('Error en searchOffers:', {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status
    });
    return [];
  }
};

export const getCategories = async () => {
  try {
    const token = await AsyncStorage.getItem('token');

    const response = await ofrecidosApi.get('/Categorias', {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      }
    });
    
    return Array.isArray(response.data) ? response.data : [];
  } catch (error) {
    console.error('Error en getCategories:', {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status
    });
    return [];
  }
};

export const getByCategories = async (categoryId) => {
  try {
    const token = await AsyncStorage.getItem('token');
    const response = await ofrecidosApi.get(`/Ofrecimientos/categoria/${categoryId}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      }
    });
    return Array.isArray(response.data) ? response.data : [];
  } catch (error) {
    console.error('Error en getByCategories:', error.response || error);
    return [];
  }
};