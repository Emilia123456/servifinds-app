import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const api = axios.create({
    baseURL: 'https://diverse-tightly-mongoose.ngrok-free.app/', 
    headers: {
      'Content-Type': 'application/json',
    },
});


export const fetchOfrecidosPorFecha = async (fecha) => {
    const token = await AsyncStorage.getItem('token');
    console.log('fecha', fecha);
    console.log('token', token);

    try {
        const response = await api.get(`/api/Historial/historial`, {
            params: { fecha },
            headers: {
                Authorization: `Bearer ${token}`, 
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error al obtener los ofrecidos:', error);
        return null;
    }
};


export const createReserva = async (ofrecidoData) => {
  const token = await AsyncStorage.getItem('token');

  try {
      const response = await api.post(`/api/Historial/historial`, {
        username: username,
        password: password,
        adddress: address,
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`, 
      });
      const data = await response.json();
      return data;
  } catch (error) {
      console.error('Error en el post createReserva:', error);
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
