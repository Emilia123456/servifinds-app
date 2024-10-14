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
/*

Este DEBERIA ser la conexion entre el pop up(? de Contratar y la base de datos...

  PROBLEMA:
    la api te pide los siguientes datos:

    "idPublicacion": 11,
    "idProveedor": 10, 
    "fechaReservada": "2024-09-15", 
    "idEstado": 1

    y nosotros le estamos pasando estos desde el DetailScreen
        username: username,
        password: password,
        adddress: address,

  COSAS A HACER: 
  psarle por el DetailScreen que idPublicacion es la que yo toque
  tambien el idProveedor, fechaReservada y el idEstado

  por el token ya se pasan el username, password  y direccion (todos los datitos)

y listo :))

export const createReserva = async (username, password, address) => {
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
*/


export const createOfrecido = async (ofrecidoData) => {
  try {
    const response = await api.post('/ofrecidos', ofrecidoData);
    return response.data;
  } catch (error) {
    console.error('Error al crear el ofrecido:', error);
    return null;
  }
};
