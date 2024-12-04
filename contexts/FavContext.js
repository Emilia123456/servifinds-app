import React, { createContext, useState, useContext } from 'react';

const FavContext = createContext();

export const FavProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);
  const [likedItems, setLikedItems] = useState({});

  const toggleLike = (id) => {
    setLikedItems((prev) => {
      const newLikedItems = { ...prev, [id]: !prev[id] };
      return newLikedItems;
    });

    setFavorites((prev) => {
      if (likedItems[id]) {
        return prev.filter((item) => item.id !== id);
      } else {
        const item = { id }; 
        return [...prev, item];
      }
    });
  };

  return (
    <FavContext.Provider value={{ favorites, likedItems, toggleLike }}>
      {children}
    </FavContext.Provider>
  );
};

export const useFavContext = () => useContext(FavContext);
