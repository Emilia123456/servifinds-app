import axios from 'axios';
import React, { useEffect, useState } from 'react';

const ofrecidosApi = axios.create({
  baseURL: 'https://diverse-tightly-mongoose.ngrok-free.app/', 
  headers: {
    'Content-Type': 'application/json',
  },
});

export const searchLikes = async () => {
  let url = '/api/Favoritos/favoritos';
  try {
    
    const response = await favsApi.get(url, {
      params: {
        
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};