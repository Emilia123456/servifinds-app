import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { getLikedRecomendations, likeRecomendation } from '../service/favsService'; 

const FavoriteScreen = ({ navigation }) => {
  const [favorites, setFavorites] = useState([]);
  const [likedItems, setLikedItems] = useState({});

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      loadFavorites();
    });
    return unsubscribe;
  }, [navigation]);

  const loadFavorites = async () => {
    try {
      const data = await getLikedRecomendations();
      const uniqueFavorites = Array.from(new Map(data.map((item) => [item.id, item])).values());
      setFavorites(uniqueFavorites);

      const initialLikedState = uniqueFavorites.reduce((acc, item) => {
        acc[item.id] = true; 
        return acc;
      }, {});
      setLikedItems(initialLikedState);
    } catch (error) {
      console.error('Error loading favorites:', error);
    }
  };

  const handleToggleLike = async (favoriteId) => {
    try {
      const response = await likeRecomendation(favoriteId);
      setLikedItems((prevState) => ({
        ...prevState,
        [favoriteId]: !prevState[favoriteId], 
      }));
      if (!likedItems[favoriteId]) {
        setFavorites(favorites.filter((favorite) => favorite.id !== favoriteId));
      }

    } catch (error) {
      console.error('Error toggling like:', error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Mis Favoritos</Text>
      {favorites.length > 0 ? (
        favorites.map((favorite) => (
          <TouchableOpacity
            key={`favorite-${favorite.id}`}
            style={styles.recommendationItem}
            onPress={() =>
              navigation.navigate('Detail', {
                idOffer: favorite.id,
                title: favorite.titulo || 'Sin título',
                description: favorite.descripcion || 'Sin descripción',
                imageUri: favorite.foto,
                rating: parseFloat(favorite.promedio_calificacion) || 0,
              })
            }
          >
            <Image
              source={{ uri: favorite.foto || 'https://via.placeholder.com/300' }}
              style={styles.itemImage}
            />
            <View style={styles.itemContent}>
              <Text style={styles.itemTitle} numberOfLines={1}>
                {favorite.titulo || 'Sin título'}
              </Text>
              <Text style={styles.itemDescription} numberOfLines={2}>
                {favorite.descripcion || 'Sin descripción'}
              </Text>
              <View style={styles.footer}>
                <Text style={styles.itemRating}>
                  {`Calificación: ${(parseFloat(favorite.promedio_calificacion) || 0).toFixed(1)}`}
                </Text>
                <TouchableOpacity onPress={() => handleToggleLike(favorite.id)}>
                  <Icon
                    name={likedItems[favorite.id] ? 'heart' : 'heart-o'} 
                    size={20}
                    color={likedItems[favorite.id] ? '#FF0000' : '#1B2E35'} 
                  />
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
        ))
      ) : (
        <Text style={styles.emptyMessage}>No tienes favoritos guardados</Text>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 20,
    color: '#1B2E35',
    textAlign: 'left',
    padding: 30,
    paddingBottom: 10,
    fontWeight: 'normal',
  },
  recommendationItem: {
    flexDirection: 'row',
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 6,
    borderRadius: 12,
    backgroundColor: '#f8f9fa',
  },
  itemImage: {
    width: 140,
    height: 100,
    borderRadius: 8,
    marginRight: 16,
    resizeMode: 'cover',
  },
  itemContent: {
    flex: 1,
    justifyContent: 'space-between',
  },
  itemTitle: {
    fontSize: 16,
    color: '#000',
    marginBottom: 4,
  },
  itemDescription: {
    fontSize: 14,
    color: '#4a4a4a',
    marginBottom: 8,
  },
  itemRating: {
    fontSize: 14,
    fontWeight: '500',
    color: '#446C64',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  emptyMessage: {
    textAlign: 'center',
    fontSize: 16,
    color: '#666',
    marginTop: 32,
    fontStyle: 'italic',
  },
});

export default FavoriteScreen;