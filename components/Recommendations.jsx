import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { likeRecomendation } from '../service/favsService';

const RecommendationsComponent = ({ recomendations = [], navigation }) => {
  const [likedOffers, setLikedOffers] = useState(new Set());

  const handleLike = async (offerId) => {
    try {
      console.log('Intentando dar like al ofrecido:', offerId);
      await likeRecomendation(offerId);
      
      // Toggle del estado local
      setLikedOffers(prev => {
        const newSet = new Set(prev);
        if (newSet.has(offerId)) {
          newSet.delete(offerId);
        } else {
          newSet.add(offerId);
        }
        return newSet;
      });
      
    } catch (error) {
      console.error('Error al dar like:', error);
    }
  };

  return (
    <View style={styles.recommendationsContainer}>
      <Text style={styles.sectionTitle}>Recomendaciones para ti</Text>
      <View style={styles.recommendationsGrid}>
        {recomendations.map((offer, index) => {
          if (!offer || typeof offer !== 'object') return null;
          
          const isLiked = likedOffers.has(offer.id);

          return (
            <TouchableOpacity
              key={offer.id || index}
              style={styles.recommendation}
              onPress={() => navigation.navigate('Detail', {
                idOffer: offer.id,
                title: offer.titulo || 'Sin título',
                description: offer.descripcion || 'Sin descripción',
                imageUri: offer.foto || offer.fotos?.[0],
                rating: parseFloat(offer.promedio_calificacion) || 0,
              })}
            >
              <View style={styles.imageContainer}>
                <Image 
                  source={{ 
                    uri: offer.foto || offer.fotos?.[0] || 'https://via.placeholder.com/150'
                  }} 
                  style={styles.recommendationImage}
                />
              </View>
              
              <View style={styles.recommendationText}>
                <View style={styles.rating}>
                  <Text style={styles.ratingText}>
                    {(parseFloat(offer.promedio_calificacion) || 0).toFixed(1)}
                  </Text>
                  <TouchableOpacity 
                    style={[styles.likeButton, isLiked && styles.likedButton]}
                    onPress={(e) => {
                      e.stopPropagation(); // Evita que se active la navegación
                      handleLike(offer.id);
                    }}
                  >
                    <Icon 
                      name={isLiked ? 'heart' : 'heart-o'} 
                      size={20} 
                      color={isLiked ? '#e74c3c' : '#7f8c8d'} 
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
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  recommendationsContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#1B2E35',
  },
  recommendationsGrid: {
    flexDirection: 'column',
  },
  recommendation: {
    backgroundColor: '#fff',
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 3,
  },
  imageContainer: {
    width: '100%',
    height: 200,
    backgroundColor: '#f5f5f5',
  },
  recommendationImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  recommendationText: {
    padding: 16,
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  ratingText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1B2E35',
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  recommendationTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1B2E35',
    marginBottom: 8,
  },
  recommendationDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  likeButton: {
    padding: 8,
    backgroundColor: '#f5f5f5',
    borderRadius: 20,
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  likedButton: {
    backgroundColor: '#ffe6e6', // Un fondo rosado suave para cuando está liked
  }
});

export default RecommendationsComponent;