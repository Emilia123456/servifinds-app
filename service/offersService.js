import axios from 'axios';
import React, { useEffect, useState } from 'react';
<<<<<<< HEAD
import Icon from 'react-native-vector-icons/FontAwesome';
=======
import AsyncStorage from '@react-native-async-storage/async-storage';
>>>>>>> cb4dcf700ea3bf75614efd010d38fd4ce94e7a23

const ofrecidosApi = axios.create({
  baseURL: 'https://diverse-tightly-mongoose.ngrok-free.app/api', 
  headers: {
    'Content-Type': 'application/json',
  },
});

export const searchOffers = async (params = {}) => {
  try {
    const token = await AsyncStorage.getItem('token');
    const url = '/Ofrecimientos/filtros';
    
    const config = {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      }
    };
    const response = await ofrecidosApi.get(url, config);    
    return response.data;
  } catch (error) {
    console.error('Error completo:', error.response || error);
    throw error;
  }
};

export const getCategories = async () => {
  console.log("Llamando a getCategories"); // Debug
  try {
<<<<<<< HEAD
    const response = await fetch('https://diverse-tightly-mongoose.ngrok-free.app/api/Categorias');
    console.log("Status de respuesta:", response.status); // Debug
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    console.log("Datos de categorías recibidos:", data); // Debug
    return data;
  } catch (error) {
    console.error("Error en getCategories:", error);
    throw error;
=======
    const response = await ofrecidosApi.get('/api/Categorias');
    returnArray = response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
>>>>>>> cb4dcf700ea3bf75614efd010d38fd4ce94e7a23
  }
};

export const getByCategories = async () => {
  try {
    const response = await ofrecidosApi.get('/api/Categorias');
    return response.data; 
  } catch (error) {
    console.log('Error fetching categories:', error);
    return []; 
  }
};