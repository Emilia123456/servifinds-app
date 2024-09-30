export const getLikedRecomendations = async () => {
  const url = '/api/Favoritos/favoritos';
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error('Error al obtener los favoritos:', error);
    throw error;
  }
};
