import axios from 'axios';
import React, { useEffect, useState } from 'react';

const ofrecidosApi = axios.create({
  baseURL: 'https://diverse-tightly-mongoose.ngrok-free.app/',  // Corrección de la URL base
  headers: {
    'Content-Type': 'application/json',
  },
});

export const searchOffers = async (pcategoria, pubicacion, pcalificacion, pprecio) => {
  try {
    const response = await ofrecidosApi.get('api/Ofrecimientos/filtros?ubicacion={pubicacion}&calificacion={pcalificacion}&search={flores}&', {
      params: {
        categoria: pcategoria, 
        ubicacion: pubicacion, 
        calificacion: pcalificacion, 
        precio: pprecio,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

export const getCategories = async () => {
  try {
    const response = await ofrecidosApi.get('/api/Categorias');
    console.error('fetching categories:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    //throw error;
  }
};

//buscar los ofrecidos de cada categoria
export const getByCategories= async (pcategoria) => {
  try {
    const response = await ofrecidosApi.get('/api/Ofrecimientos/filtros?categoria={pcategoria}', {
      params: {
        categoria: pcategoria,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};
