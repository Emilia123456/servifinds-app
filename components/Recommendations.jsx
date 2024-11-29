import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { likeRecomendation } from '../service/favsService';

const RecommendationsComponent = ({ recomendations = [], navigation }) => {
  const [likedOffers, setLikedOffers] = useState(new Set());

  const handleLike = async (offerId) => {
    try {
      await likeRecomendation(offerId);
      setLikedOffers(prev => {
        const newSet = new Set(prev);
        newSet.has(offerId) ? newSet.delete(offerId) : newSet.add(offerId);
        return newSet;
      });
    } catch (error) {
      console.error('Error al dar like:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Recomendaciones para ti</Text>
      <View style={styles.grid}>
        {recomendations.map((offer, index) => {
          if (!offer || typeof offer !== 'object') return null;
          const isLiked = likedOffers.has(offer.id);

          return (
            <TouchableOpacity
              key={offer.id || index}
              style={styles.card}
              onPress={() => navigation.navigate('Detail', {
                idOffer: offer.id,
                title: offer.titulo || 'Sin título',
                description: offer.descripcion || 'Sin descripción',
                imageUri: offer.foto || offer.fotos?.[0],
                rating: parseFloat(offer.promedio_calificacion) || 0,
              })}
            >
              <Image 
                source={{ uri: offer.foto || offer.fotos?.[0] || 'https://via.placeholder.com/150' }} 
                style={styles.image}
              />
              <View style={styles.cardContent}>
                <Text style={styles.cardTitle} numberOfLines={1}>
                  {offer.titulo || 'Sin título'}
                </Text>
                <Text style={styles.description} numberOfLines={2}>
                  {offer.descripcion || 'Sin descripción'}
                </Text>
                <View style={styles.footer}>
                  <View style={styles.ratingContainer}>
                    <Icon name="star" size={16} color="#FFD700" />
                    <Text style={styles.rating}>
                      {(parseFloat(offer.promedio_calificacion) || 0).toFixed(1)}
                    </Text>
                  </View>
                  <TouchableOpacity 
                    style={styles.likeButton}
                    onPress={(e) => {
                      e.stopPropagation();
                      handleLike(offer.id);
                    }}
                  >
                    <Icon 
                      name={isLiked ? 'heart' : 'heart-o'} 
                      size={18} 
                      color={isLiked ? '#e74c3c' : '#7f8c8d'} 
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 16,
    color: '#1B2E35',
  },
  grid: {
    flexDirection: 'column',
  },
  card: {
    width: '100%',
    height: 140,
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
    overflow: 'hidden',
    flexDirection: 'row',
  },
  image: {
    width: 100,
    height: '100%',
  },
  cardContent: {
    flex: 1,
    padding: 12,
    justifyContent: 'space-between',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1B2E35',
    marginBottom: 4,
  },
  description: {
    fontSize: 13,
    color: '#666',
    marginBottom: 8,
    lineHeight: 18,
    flex: 1,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 'auto',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  rating: {
    fontSize: 14,
    fontWeight: '500',
    marginLeft: 4,
    color: '#1B2E35',
  },
  likeButton: {
    padding: 6,
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default RecommendationsComponent;