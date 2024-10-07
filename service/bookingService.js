import axios from 'axios';

const api = axios.create({
    baseURL: 'https://diverse-tightly-mongoose.ngrok-free.app/', 
    headers: {
      'Content-Type': 'application/json',
    },
});


export const fetchOfrecidosPorFecha = async (fecha) => {
    try {
        const response = await fetch(`/api/historial?fecha=${fecha}`, {
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
