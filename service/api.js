import axios from 'axios';
import {email, password} from './Screens/LoginScreen.jsx'

const api = axios.create({
  baseURL: 'https://diverse-tightly-mongoose.ngrok-free.app/api/user/login',  // Corrección de la URL base
  headers: {
    'Content-Type': 'application/json',
  },
});

export const login = async (email, password) => {
  try {
    axios.post('/user', {
        email: {email},
        contrasena: {password}
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
  axios({
    method: 'post',
    url: baseUrl + 'applications/' + appName + '/dataexport/plantypes' + plan,
    headers: {}, 
    data: {
      foo: 'bar', // This is the body part
    }
  });
}; 