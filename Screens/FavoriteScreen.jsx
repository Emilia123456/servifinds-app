import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  StyleSheet, 
  RefreshControl,
  ActivityIndicator 
} from 'react-native';
import { getLikedRecomendations } from '../service/favsService';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Image } from 'react-native';

const FavoriteScreen = ({ navigation }) => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const loadFavorites = async () => {
    try {
      setLoading(true);
      console.log('Cargando favoritos...'); // Debug
      const data = await getLikedRecomendations();
      console.log('Favoritos cargados:', data); // Debug
      setFavorites(data);
    } catch (error) {
      console.error('Error al cargar favoritos:', error);
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadFavorites();
    setRefreshing(false);
  };

  useEffect(() => {
    loadFavorites();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#446C64" />
      </View>
    );
  }

  return (
    <ScrollView 
      style={styles.container}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
      }
    >
      <Text style={styles.title}>Mis Favoritos</Text>
      {favorites.length > 0 ? (
        favorites.map((favorite) => (
          <View key={favorite.id} style={styles.favoriteItem}>
            {favorite.foto && (
              <Image 
                source={{ uri: favorite.foto }} 
                style={styles.itemImage} 
              />
            )}
            <View style={styles.itemContent}>
              <Text style={styles.itemTitle}>{favorite.titulo}</Text>
              <Text style={styles.itemDescription}>{favorite.descripcion}</Text>
              <Text style={styles.itemPrice}>$ {favorite.precio}</Text>
              <View style={styles.ratingContainer}>
                <Icon name="star" size={16} color="#FFD700" />
                <Text style={styles.ratingText}>
                  {parseFloat(favorite.promedio_calificacion).toFixed(1)}
                </Text>
              </View>
            </View>
          </View>
        ))
      ) : (
        <Text style={styles.messageText}>No tienes publicaciones favoritas aún</Text>
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
    color: '#1B2E35', 
    textAlign: 'left',
    padding: 5,
    fontWeight: 'bold',
    marginTop: 50,
    marginBottom: -20,
  },
  favoriteItem: {
    flexDirection: 'row',
    padding: 12,
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  messageText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#666',
    marginTop: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 12,
  },
  itemContent: {
    flex: 1,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#1B2E35',
  },
  itemDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#446C64',
    marginBottom: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    marginLeft: 4,
    color: '#666',
  },
});

export default FavoriteScreen;
