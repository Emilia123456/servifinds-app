import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity, RefreshControl } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; 
import { getLikedRecomendations } from '../service/favsService';

export default function FavoritesScreen({ navigation }) {
  const [likedRecommendations, setLikedRecommendations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchLikedRecomendations = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await getLikedRecomendations();
      console.log('Datos de favoritos recibidos:', data);
      setLikedRecommendations(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error al obtener favoritos:", error);
      setError('No se pudieron cargar los favoritos');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchLikedRecomendations();
  }, []);

  const handleRefresh = () => {
    fetchLikedRecomendations();
  };

  return (
    <ScrollView 
      style={styles.container}
      refreshControl={
        <RefreshControl
          refreshing={isLoading}
          onRefresh={handleRefresh}
        />
      }
    >
      <View style={styles.header}>
        <Text style={styles.logo}>Favoritos</Text>
      </View>

      <View style={styles.recommendationsContainer}>
        {isLoading ? (
          <Text style={styles.messageText}>Cargando favoritos...</Text>
        ) : error ? (
          <TouchableOpacity onPress={handleRefresh}>
            <Text style={styles.errorText}>{error}</Text>
            <Text style={styles.retryText}>Toca para intentar nuevamente</Text>
          </TouchableOpacity>
        ) : likedRecommendations.length > 0 ? (
          likedRecommendations.map((recommendation, index) => (
            <TouchableOpacity
              key={index}
              style={styles.recommendation}
              onPress={() => navigation.navigate('Detail', {
                idOffer: recommendation.id,
                title: recommendation.titulo || 'Sin título',
                description: recommendation.descripcion || 'Sin descripción',
                imageUri: recommendation.foto || 'URL_POR_DEFECTO',
                rating: recommendation.promedio_calificacion || 0,
              })}
            >
              <Image 
                source={{ 
                  uri: recommendation.foto || 'URL_POR_DEFECTO'
                }} 
                style={styles.recommendationImage}
              />
              <View style={styles.recommendationText}>
                <Text style={styles.recommendationTitle}>
                  {recommendation.titulo || 'Sin título'}
                </Text>
                <Text style={styles.recommendationSubtitle}>
                  {recommendation.descripcion || 'Sin descripción'}
                </Text>
              </View>
            </TouchableOpacity>
          ))
        ) : (
          <Text style={styles.messageText}>No tienes publicaciones favoritas aún</Text>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff', 
  },
  header: {
    padding: 16,
    marginTop: 50,
    marginBottom: -20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff', 
    borderBottomWidth: 1,
    borderBottomColor: '#0000', 
  },
  logo: {
    fontSize: 24,
    color: '#1B2E35', 
    textAlign: 'left',
    padding: 5,
    fontWeight: 'bold',
  },
  recommendationsContainer: {
    padding: 16,
    marginTop: 0,
  },
  sectionTitle: {
    fontSize: 18,
    color: '#1B2E35',
    marginBottom: 9,
    fontWeight: 'bold',
  },
  recommendation: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    backgroundColor: '#f9f9f9',
    padding: 8,
    borderRadius: 8,
  },
  recommendationImage: {
    width: 140,
    height: 90,
    borderRadius: 8,
    marginRight: 8,
  },
  recommendationText: {
    flex: 1,
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  ratingText: {
    fontSize: 14,
    color: '#7f8c8d',
  },
  recommendationTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  recommendationSubtitle: {
    fontSize: 12,
    color: '#666',
  },
  messageText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#666',
    marginTop: 20,
  },
  errorText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#e74c3c',
    marginTop: 20,
  },
  retryText: {
    textAlign: 'center',
    fontSize: 14,
    color: '#3498db',
    marginTop: 10,
  },
});
