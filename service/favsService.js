import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';


// Creación de instancia axios con configuración base
const favsApi = axios.create({
  baseURL: 'https://diverse-tightly-mongoose.ngrok-free.app/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Función para obtener las recomendaciones likeadas
export const getLikedRecomendations = async () => {
  try {
    const response = await favsApi.get('/Favoritos/favoritos');
    return response.data;
  } catch (error) {
    console.error('Error al obtener los favoritos:', error);
    throw error;
  }
};


export const likeRecomendation = async (recomendationId, liked) => {
  try {
    const token = await AsyncStorage.getItem('token'); // Obtener el token almacenado
    const miurl = `/Favoritos/likes/${recomendationId}`; // Construir correctamente la URL con el id
    
    const response = await favsApi.patch(miurl, {
      liked,
    }, {
      headers: {
        Authorization: `Bearer ${token}`, // Agregar el token en el header
        'Content-Type': 'application/json',
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error al likear la recomendación:', error);
    throw error;
  }
};
