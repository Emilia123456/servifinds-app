import axios from 'axios';

const loginApi = axios.create({
  baseURL: 'https://diverse-tightly-mongoose.ngrok-free.app/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const login = async (email, password) => {
  try {
    const response = await loginApi.post('/users/login', {
      email: email,
      contrasena: password, 
    });

    console.log('LLEGO ACA');
    console.log(email, password);
    console.log(response.data);

    return response.data;  // Devolver los datos si el login es exitoso
  } catch (error) {
    console.error('Error fetching data:', error);
    console.error(error);
    throw error;  // Propaga el error para manejarlo en el componente
  }
};
