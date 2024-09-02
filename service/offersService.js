import axios from 'axios';
import React, { useEffect, useState } from 'react';

const ofrecidosApi = axios.create({
  baseURL: 'https://diverse-tightly-mongoose.ngrok-free.app/',  // Corrección de la URL base
  headers: {
    'Content-Type': 'application/json',
  },
});

export const searchOffers = async (pubicacion, pcalificacion, pprecio) => {
  try {
    const response = await ofrecidosApi.get('api/Ofrecimientos/filtros?ubicacion={pubicacion}&calificacion={pcalificacion}&search={flores}&', {
      params: {
        busqueda: inputValue,
        ubicacion: pubicacion,
        calificacion: pcalificacion,
        precio : pprecio
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};


 