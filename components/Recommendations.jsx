import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const RecommendationsComponent = ({ recomendations }) => {
  const [likedRecommendations, setLikedRecommendations] = useState({});

  if (!recomendations || recomendations.length === 0) {
    return <Text>No hay ofrecimientos disponibles</Text>;
  }

  const handleLike = (index) => {
    setLikedRecommendations(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  return (
    <View>
      {recomendations.map((offer, index) => (
        <View key={index} style={styles.recommendation}>
          <Image 
            source={{ uri: offer.imageUri }} 
            style={styles.recommendationImage}
            
          />
          <View style={styles.recommendationText}>
            <View style={styles.rating}>
              <Text style={styles.ratingText}>
                {offer.promedio_calificacion || '0.0'}
              </Text>
              <TouchableOpacity onPress={() => handleLike(index)}>
                <Icon 
                  name={likedRecommendations[index] ? 'heart' : 'heart-o'} 
                  size={20} 
                  color={likedRecommendations[index] ? '#e74c3c' : '#7f8c8d'} 
                />
              </TouchableOpacity>
            </View>
            <Text style={styles.recommendationTitle}>
              {offer.descripcion || 'Sin descripción'}
            </Text>
          </View>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  recommendation: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 10,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    flexDirection: 'row',
  },
  recommendationImage: {
    width: 120,
    height: 90,
    borderRadius: 6,
  },
  recommendationText: {
    flex: 1,
    paddingHorizontal: 12,
    justifyContent: 'center',
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  ratingText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#555',
    marginRight: 8,
  },
  recommendationTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
});

export default RecommendationsComponent;
