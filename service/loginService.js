import axios from 'axios';

const loginApi = axios.create({
  baseURL: 'https://diverse-tightly-mongoose.ngrok-free.app/api/users/login',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const login = async (email, password) => {
  try {
    const response = await loginApi.post('/user', {
      email: email,
      contrasena: password,  // Asegúrate de que el backend esté esperando "contrasena"
    });

    console.log('LLEGO ACA');
    console.log(response.data);

    return response.data;  // Devolver los datos si el login es exitoso
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;  // Propaga el error para manejarlo en el componente
  }
};
