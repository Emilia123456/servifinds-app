import axios from 'axios';
import React, { useEffect, useState } from 'react';

const ofrecidosApi = axios.create({
  baseURL: 'https://diverse-tightly-mongoose.ngrok-free.app/',  // Corrección de la URL base
  headers: {
    'Content-Type': 'application/json',
  },
});

export const searchOffers = async (pcategoria, pubicacion, mayorPromedio, pprecio) => {
  //let url = 'api/Ofrecimientos/filtros?ubicacion={pubicacion}&mayorPromedio={mayorPromedio}&search={flores}&';
  let url = 'api/Ofrecimientos/filtros?';
  try {
    if (pcategoria!="" ){
      url = url + "categoria=" + pcategoria + "&";
    }
    if (pubicacion!="" ){
      url = url + "ubicacion=" + pubicacion + "&";
    }
    if (mayorPromedio!="" ){
      url = url + "mayorPromedio=" + mayorPromedio + "&";
    }
    if (pprecio!="" ){
      url = url + "precio=" + pprecio + "&";
    }

    const response = await ofrecidosApi.get(url, {
      params: {
        categoria: pcategoria, 
        ubicacion: pubicacion, 
        mayorPromedio: mayorPromedio, 
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


export const getRecomendations = async () => {
  //let url = 'api/Ofrecimientos/filtros?ubicacion={pubicacion}&mayorPromedio={mayorPromedio}&search={flores}&';
;
  try {
    const response = await ofrecidosApi.get('api/Ofrecimientos/filtros?mayorPromedio=1', {
      params: {
        mayorPromedio: '1', 
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};