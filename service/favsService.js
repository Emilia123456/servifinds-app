import axios from 'axios';

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
   
    const response = await favsApi.post('/Favoritos/like', {
      recomendationId, 
      liked,          
    });

    return response.data; 
  } catch (error) {
    console.error('Error al likear la recomendación:', error);
    throw error;
  }
};
