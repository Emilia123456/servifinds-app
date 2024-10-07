import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';


// Creación de instancia axios con configuración base
const favsApi = axios.create({
  baseURL: 'https://diverse-tightly-mongoose.ngrok-free.app/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getLikedRecomendations = async () => {
  try {
    const token = await AsyncStorage.getItem('token');
    console.log(token);
    const response = await favsApi.get('/Favoritos/favoritos', {
      headers: {
        Authorization: `Bearer ${token}`, 
        'Content-Type': 'application/json',
      },
    });
    console.log(response.data)
    return response.data;
  } catch (error) {
    console.error('Error al obtener los favoritos:', error);
    throw error;
  }
};


export const likeRecomendation = async (recomendationId, liked) => {
  try {
    const token = await AsyncStorage.getItem('token'); 
    const miurl = `/Favoritos/likes/${recomendationId}`; 
    
    const response = await favsApi.patch(miurl, {
      liked,
    }, {
      headers: {
        Authorization: `Bearer ${token}`, 
        'Content-Type': 'application/json',
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error al likear la recomendación:', error);
    throw error;
  }
};
