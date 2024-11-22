import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const api = axios.create({
    baseURL: 'https://diverse-tightly-mongoose.ngrok-free.app/', 
    headers: {
      'Content-Type': 'application/json',
    },
});


export const getPublicacion = async (idPublicacion) => {
  const token = await AsyncStorage.getItem('token');

  try {
    const response = await api.get(`/api/Ofrecimientos/filtros${idPublicacion}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error al obtener la publicación:', error);
    if (error.response) {
      console.error('Error en la respuesta:', error.response.data);
      console.error('Código de estado:', error.response.status);
    }
  }
};


export const fetchOfrecidosPorFecha = async (fecha) => {
  const token = await AsyncStorage.getItem('token');

  try {
    console.log('Fetching data for date:', fecha); // Debug log
    const response = await api.get('/api/Historial/historial', {
      params: { fecha },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    
    console.log('Response data:', response.data); // Debug log
    return Array.isArray(response.data) ? response.data : [];
  } catch (error) {
    console.error('Error completo:', error);
    if (error.response) {
      console.error('Error en la respuesta:', error.response.data);
      console.error('Código de estado:', error.response.status);
    }
    return [];
  }
};

/*

ofrecidoData = {
      idPublicacion: idOffer,
      fechaReservada: fecha,
      idEstado: 1,
      idOffer: idOffer,  
    };
*/
export const createReserva = async (ofrecidoData) => {
  const token = await AsyncStorage.getItem('token');

  const fecha = ofrecidoData.fechaReservada; // Asegúrate de que esto sea "DD/MM"
  const [dia, mes] = fecha.split('-');
  const año = new Date().getFullYear(); // O el año que necesites
  const fechaReservada = new Date(`${año}-${mes}-${dia}T00:00:00`).toISOString();

  // Actualiza ofrecidoData
  ofrecidoData.fechaReservada = fechaReservada;

  try {
    const response = await api.post(`/api/Historial/historial`, ofrecidoData, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    const data = response.data;
    return data;
  } catch (error) {
    console.error('Error en el post createReserva:', error);
    if (error.response) {
      console.error('Error en la respuesta:', error.response.data);
      console.error('Código de estado:', error.response.status);
    }
  }
};


export const createOfrecido = async (ofrecidoData) => {
  try {
    const response = await api.post('/ofrecidos', ofrecidoData);
    return response.data;
  } catch (error) {
    console.error('Error al crear el ofrecido:', error);
    return null;
  }
};
