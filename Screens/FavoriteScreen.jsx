import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { getLikedRecomendations } from '../service/favsService';

const FavoriteScreen = ({ navigation }) => {
  const [favorites, setFavorites] = useState([]);

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
    } catch (error) {
      console.error('Error loading favorites:', error);
    }
  };
  

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Mis Favoritos</Text>
      {favorites.length > 0 ? (
        favorites.map((favorite) => (
          <TouchableOpacity
            key={`favorite-${favorite.id}`}
            style={styles.favoriteItem}
            onPress={() => navigation.navigate('Detail', {
              idOffer: favorite.id,
              title: favorite.titulo,
              description: favorite.descripcion,
              imageUri: favorite.foto,
              rating: parseFloat(favorite.promedio_calificacion) || 0,
            })}
          >
            <Image 
              source={{ uri: favorite.foto }} 
              style={styles.itemImage}
            />
            <View style={styles.itemContent}>
              <Text style={styles.itemTitle}>{favorite.titulo}</Text>
              <Text style={styles.itemDescription}>{favorite.descripcion}</Text>
              <Text style={styles.itemRating}>
                Calificación: {(parseFloat(favorite.promedio_calificacion) || 0).toFixed(1)}
              </Text>
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
    fontSize: 24,
    fontWeight: 'bold',
    padding: 16,
    color: '#1B2E35',
    marginTop: 50,
  },
  favoriteItem: {
    flexDirection: 'row',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  itemImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginRight: 16,
  },
  itemContent: {
    flex: 1,
    justifyContent: 'space-between',
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1B2E35',
    marginBottom: 8,
  },
  itemDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  itemRating: {
    fontSize: 14,
    color: '#446C64',
  },
  emptyMessage: {
    textAlign: 'center',
    fontSize: 16,
    color: '#666',
    marginTop: 32,
  }
});

export default FavoriteScreen;
