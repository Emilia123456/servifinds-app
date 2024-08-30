import axios from 'axios';
import React, { useEffect, useState } from 'react';

const ofrecidosApi = axios.create({
  baseURL: 'https://diverse-tightly-mongoose.ngrok-frelaer/',  // Corrección de la URL base
  headers: {
    'Content-Type': 'application/json',
  },
});

export const searchOffers = async (inputValue) => {
  try {
    const response = await api.get('api/ofrecimientos/filtros', {
      params: {
        busqueda: inputValue,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};
