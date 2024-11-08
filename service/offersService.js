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
  let returnArray = [];
  try {
    const response = await ofrecidosApi.get('/api/Categorias');
    console.error('fetching categories:', response.data);
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



export const getRecomendations = async () => {
  try {
    const response = await ofrecidosApi.get('api/Ofrecimientos/filtros?mayorPromedio=1');
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};
