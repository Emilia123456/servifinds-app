import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { getLikedRecomendations } from '../service/favsService';

const FavoriteScreen = ({ navigation }) => {
  const [favorites, setFavorites] = useState([]);

  // Aseguramos que el corazón se coloree correctamente
  const [likedItems, setLikedItems] = useState({}); // Guardamos el estado de "liked" para cada item

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

      // Inicializamos el estado de likedItems a true (suponiendo que todos son "liked" al principio)
      const initialLikedState = uniqueFavorites.reduce((acc, item) => {
        acc[item.id] = true; // Si está en favoritos, lo consideramos "liked"
        return acc;
      }, {});
      setLikedItems(initialLikedState);
    } catch (error) {
      console.error('Error loading favorites:', error);
    }
  };

  // Función para manejar el "deslike"
  const handleDislike = (favoriteId) => {
    // Cambiamos el estado de likedItems para reflejar el cambio
    setLikedItems((prevState) => ({
      ...prevState,
      [favoriteId]: !prevState[favoriteId], // Si es true lo cambiamos a false y viceversa
    }));

    // Eliminamos el ítem de la lista de favoritos (frontend solamente)
    setFavorites(favorites.filter((favorite) => favorite.id !== favoriteId));
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
                <TouchableOpacity onPress={() => handleDislike(favorite.id)}>
                  <Icon
                    name="heart"
                    size={20}
                    color={likedItems[favorite.id] ? '#FF0000' : '#1B2E35'} // Rojo si "liked", gris si "disliked"
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
