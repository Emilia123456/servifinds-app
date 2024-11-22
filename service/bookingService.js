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
  
  try {
    // Convertimos la fecha a formato YYYY-MM-DD
    const fechaOriginal = ofrecidoData.fechaReservada;
    const fecha = new Date(fechaOriginal);
    const fechaReservada = fecha.toISOString().split('T')[0];

    // Obtenemos el idContratador del token decodificado o del AsyncStorage
    const idContratador = await AsyncStorage.getItem('userId'); // Asegúrate de guardar el userId al hacer login

    const dataToSend = {
      idPublicacion: ofrecidoData.idPublicacion,
      idOffer: ofrecidoData.idOffer, // Corregido: usar idOffer en lugar de idPublicacion
      idContratador: parseInt(idContratador), // Agregado: incluir el idContratador
      fechaReservada: fechaReservada,
      idEstado: ofrecidoData.idEstado
    };

    console.log('Datos a enviar:', dataToSend);

    const response = await api.post('/api/Historial/historial', dataToSend, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    if (response.status === 201 || response.status === 200) { // Agregado status 200
      return response.data;
    } else {
      throw new Error(response.data.message || 'Error en la respuesta del servidor');
    }
  } catch (error) {
    console.error('Error en el post createReserva:', error);
    if (error.response) {
      console.error('Error en la respuesta:', error.response.data);
      console.error('Código de estado:', error.response.status);
    }
    throw error;
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
