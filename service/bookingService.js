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
    console.log('token', token);
    fecha = '2023-01-04';
    try {
      let miUrl = `/api/Historial/historial?fecha=${fecha}`;
      console.log('miUrl', miUrl);

        const response = await fetch(miUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`, 
            },
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error al obtener los ofrecidos:', error);
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
