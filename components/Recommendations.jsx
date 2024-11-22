import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const RecommendationsComponent = ({ recomendations = [], navigation }) => {
  // Verificar que recomendations sea un array válido
  if (!Array.isArray(recomendations)) {
    console.log('Recomendaciones no es un array:', recomendations);
    return null;
  }

  return (
    <View style={styles.recommendationsContainer}>
      <Text style={styles.sectionTitle}>Recomendaciones para ti</Text>
      <View style={styles.recommendationsGrid}>
        {recomendations.map((offer, index) => {
          // Verificar que offer sea un objeto válido
          if (!offer || typeof offer !== 'object') return null;

          return (
            <TouchableOpacity
              key={offer.id || index}
              style={styles.recommendation}
              onPress={() => navigation.navigate('Detail', {
                idOffer: offer.id,
                title: offer.titulo || 'Sin título',
                description: offer.descripcion || 'Sin descripción',
                imageUri: offer.foto || offer.fotos?.[0], // Intentar usar foto o la primera foto del array
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
                  <TouchableOpacity style={styles.likeButton}>
                    <Icon 
                      name={'heart-o'} 
                      size={20} 
                      color={'#7f8c8d'} 
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
});

export default RecommendationsComponent;