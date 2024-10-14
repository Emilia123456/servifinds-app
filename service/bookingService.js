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


export const createOfrecido = async (ofrecidoData) => {
  try {
    const response = await api.post('/ofrecidos', ofrecidoData);
    return response.data;
  } catch (error) {
    console.error('Error al crear el ofrecido:', error);
    return null;
  }
};
