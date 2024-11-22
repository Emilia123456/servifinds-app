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
    const fechaObj = new Date(fecha);
    const fechaFormateada = fechaObj.toISOString().split('T')[0];
    
    // Primero obtenemos las reservas
    const historialResponse = await api.get('/api/Historial/historial', {
      params: { fecha: fechaFormateada },
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      }
    });

    // Si hay reservas, obtenemos los detalles de cada ofrecido
    if (Array.isArray(historialResponse.data) && historialResponse.data.length > 0) {
      const reservasConDetalles = await Promise.all(
        historialResponse.data.map(async (reserva) => {
          try {
            const ofrecidoResponse = await api.get(`/api/Ofrecimientos/${reserva.idPublicacion}`, {
              headers: {
                'Authorization': `Bearer ${token}`,
              }
            });
            return {
              ...reserva,
              ofrecido: ofrecidoResponse.data
            };
          } catch (error) {
            console.error(`Error al obtener detalles del ofrecido ${reserva.idPublicacion}:`, error);
            return reserva;
          }
        })
      );
      return reservasConDetalles;
    }
    
    return [];
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
    console.log('Datos de reserva a enviar:', ofrecidoData);
    
    const response = await api.post('/api/Historial/historial', {
      idPublicacion: ofrecidoData.idOffer, // Asegúrate de que este ID sea correcto
      idOffer: ofrecidoData.idOffer,
      fechaReservada: ofrecidoData.fechaReservada,
      idEstado: 1 // Estado inicial
    }, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      }
    });

    console.log('Respuesta del servidor:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error completo:', error.response || error);
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
