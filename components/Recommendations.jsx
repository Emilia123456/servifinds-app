import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { likeRecomendation } from '../service/favsService';

const RecommendationsComponent = ({ recomendations = [], navigation }) => {
  const [likedRecommendations, setLikedRecommendations] = useState({});

  if (!Array.isArray(recomendations)) {
    console.warn('recomendations no es un array:', recomendations);
    return <Text>No hay recomendaciones disponibles</Text>;
  }

  const handleLike = async (recomendationId) => {
    try {
      const isLiked = likedRecommendations[recomendationId];
      await likeRecomendation(recomendationId);
      
      setLikedRecommendations(prev => ({
        ...prev,
        [recomendationId]: !isLiked
      }));
    } catch (error) {
      console.error('Error al dar like:', error);
    }
  };

  const formatRating = (rating) => {
    if (typeof rating === 'number') {
      return rating.toFixed(1);
    }
    return '0.0';
  };

  return (
    <View style={styles.recommendationsContainer}>
      <Text style={styles.sectionTitle}>Recomendaciones para ti</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {recomendations.map((offer, index) => (
          <TouchableOpacity
            key={index}
            style={styles.recommendation}
            onPress={() => navigation.navigate('Detail', {
              idOffer: offer.id,
              title: offer.titulo || 'Sin título',
              description: offer.descripcion || 'Sin descripción',
              imageUri: offer.foto || 'https://via.placeholder.com/150', //si no anda cambiar la propiedad a imageU
              rating: offer.promedio_calificacion || 0,
            })}
          >
            <Image 
              source={{ uri: offer.foto || 'https://via.placeholder.com/150' }} 
              style={styles.recommendationImage}
            />
            <View style={styles.recommendationText}>
              <View style={styles.rating}>
                <Text style={styles.ratingText}>
                  {formatRating(offer.promedio_calificacion)}
                </Text>
                <TouchableOpacity 
                  onPress={() => handleLike(offer.id)}
                  style={styles.likeButton}
                >
                  <Icon 
                    name={likedRecommendations[offer.id] ? 'heart' : 'heart-o'} 
                    size={20} 
                    color={likedRecommendations[offer.id] ? '#e74c3c' : '#7f8c8d'} 
                  />
                </TouchableOpacity>
              </View>
              <Text style={styles.recommendationTitle}>
                {offer.titulo || 'Sin título'}
              </Text>
              <Text style={styles.recommendationDescription}>
                {offer.descripcion || 'Sin descripción'}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  recommendationsContainer: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#1B2E35',
  },
  recommendation: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 10,
    marginRight: 16,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    width: 250,
  },
  recommendationImage: {
    width: '100%',
    height: 150,
    borderRadius: 6,
    marginBottom: 8,
  },
  recommendationText: {
    padding: 8,
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  ratingText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#555',
  },
  recommendationTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  recommendationDescription: {
    fontSize: 14,
    color: '#666',
  },
  likeButton: {
    padding: 8,
  }
});

export default RecommendationsComponent;