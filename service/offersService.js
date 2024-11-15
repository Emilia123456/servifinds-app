import axios from 'axios';
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
  let returnArray = [];
  try {
    const response = await ofrecidosApi.get('/api/Categorias');
    returnArray = response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
  return returnArray;
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