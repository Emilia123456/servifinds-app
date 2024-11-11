import axios from 'axios';
import React, { useEffect, useState } from 'react';

const ofrecidosApi = axios.create({
  baseURL: 'https://diverse-tightly-mongoose.ngrok-free.app/api',  // Corrección de la URL base
  headers: {
    'Content-Type': 'application/json',
  },
});

export const searchOffers = async (pcategoria, pubicacion, mayorPromedio, pprecio) => {
  let url = '/Ofrecimientos/filtros?';
  
  try {
    if (pcategoria !== "") {
      url += "categoria=" + encodeURIComponent(pcategoria) + "&";
    }
    if (pubicacion !== "") {
      url += "ubicacion=" + encodeURIComponent(pubicacion) + "&";
    }
    if (mayorPromedio !== "") {
      url += "mayorPromedio=" + encodeURIComponent(mayorPromedio) + "&";
    }
    if (pprecio !== "") {
      url += "precio=" + encodeURIComponent(pprecio) + "&";
    }
    
    // Eliminar el último `&` si está presente
    if (url.endsWith("&")) {
      url = url.slice(0, -1);
    }

    url= '/ofrecimientos/filtros?mayorPromedio=1'

    console.log("url", url);

    const response = await ofrecidosApi.get(url);
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