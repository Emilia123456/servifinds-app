import axios from 'axios';
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ofrecidosApi = axios.create({
  baseURL: 'https://diverse-tightly-mongoose.ngrok-free.app/api',  // Verifica que esta URL sea correcta
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

    console.log('Intentando obtener ofrecimientos de:', url);
    const response = await ofrecidosApi.get(url, config);
    console.log("Respuesta completa:", response.data);
    
    
    return response.data;
  } catch (error) {
    console.error('Error completo:', error.response || error);
    throw error;
  }
};

export const getCategories = async () => {
  let returnArray = [];
  try {
    const response = await ofrecidosApi.get('/api/Categorias');
    //console.log('fetching categories:', response.data);
    returnArray = response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    //throw error;
  }
  return returnArray;
};

//buscar los ofrecidos de cada categoria
export const getByCategories = async () => {
  try {
    const response = await ofrecidosApi.get('/api/Categorias');
    console.log('Categorías recibidas desde API:', response.data); // Comprobar la estructura
    return response.data;  // Asegúrate de que esto es un array
  } catch (error) {
    console.log('Error fetching categories:', error);
    return [];  // Retorna un array vacío en caso de error
  }
};


/*
export const getRecomendations = async () => {
  try {
    const response = await ofrecidosApi.get('api/Ofrecimientos/filtros?mayorPromedio=1');
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};
*/