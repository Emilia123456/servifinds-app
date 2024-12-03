import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const api = axios.create({
    baseURL: 'http://yuke.ddns.net:3101/', 
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
  try {
    const token = await AsyncStorage.getItem('token');
    if (!token) throw new Error('No hay token disponible');

    const response = await api.get('/api/Historial/historial', {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      params: {
        fecha: fecha
      }
    });

    console.log('Respuesta de reservas:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error al obtener reservas:', error);
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
  if (!token) throw new Error('No hay token disponible');

  try {
    const response = await api.post('/api/Historial/historial', {
      idPublicacion: ofrecidoData.idPublicacion,
      fechaReservada: ofrecidoData.fechaReservada,
      idEstado: 1
    }, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      }
    });

    return response.data;
  } catch (error) {
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

export const getDetallesReserva = async (idPublicacion) => {
  try {
    const token = await AsyncStorage.getItem('token');
    if (!token) throw new Error('No hay token disponible');

    const response = await api.get('/api/Ofrecimientos/filtros', {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      params: {
        idPublicacion: idPublicacion
      }
    });
    
    const ofrecido = Array.isArray(response.data) 
      ? response.data.find(o => o.id === idPublicacion)
      : response.data;

    return ofrecido;
  } catch (error) {
    return null;
  }
};
