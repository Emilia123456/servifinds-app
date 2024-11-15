import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const RecommendationsComponent = ({ recomendations = [], navigation }) => {
  const [likedRecommendations, setLikedRecommendations] = React.useState({});

  if (!Array.isArray(recomendations)) {
    console.warn('recomendations no es un array:', recomendations);
    return <Text>No hay recomendaciones disponibles</Text>;
  }

  const handleLike = async (recomendationId) => {
    try {
      const isLiked = likedRecommendations[recomendationId];
      const response = await likeRecomendation(recomendationId);

      if (response.status === 201) {
        setLikedRecommendations((prev) => ({
          ...prev,
          [recomendationId]: !prev[recomendationId],
        }));
      } else {
        console.error('Error al actualizar el like en el servidor:', response);
      }
    } catch (error) {
      console.error('Error al realizar la solicitud:', error);
    }
  };

  return (
    <View style={styles.recommendationsContainer}>
      <Text style={styles.sectionTitle}>Recomendaciones para ti</Text>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {recomendations.map((recomendation, index) => (
          <TouchableOpacity
            key={index}
            style={styles.recommendation}
            onPress={() =>
              navigation.navigate('Detail', {
                idOffer: recomendation.id,
                seller: recomendation.idUsuario,
                title: recomendation.titulo,
                description: recomendation.descripcion,
                price: recomendation.precio,
                imageUri: recomendation.foto,
                rating: recomendation.promedio_calificacion,
              })
            }
          >
            <Image source={{ uri: recomendation.foto }} style={styles.recommendationImage} />
            <View style={styles.recommendationText}>
              <Text style={styles.recommendationTitle}>{recomendation.titulo}</Text>
              <Text style={styles.recommendationSubtitle} numberOfLines={2}>
                {recomendation.descripcion}
              </Text>
              <View style={styles.ratingContainer}>
                <Text style={styles.ratingText}>
                  {(Number.isFinite(recomendation.promedio_calificacion) 
                    ? recomendation.promedio_calificacion 
                    : 0).toFixed(1)}
                </Text>
                <TouchableOpacity onPress={() => handleLike(recomendation.id)}>
                  <Icon
                    name={likedRecommendations[recomendation.id] ? 'heart' : 'heart-o'}
                    size={18}
                    color={likedRecommendations[recomendation.id] ? '#e74c3c' : '#bdc3c7'}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  recommendationsContainer: {
    paddingVertical: 20,
    paddingLeft: 20,
  },
  sectionTitle: {
    fontSize: 20,
    color: '#333',
    marginBottom: 16,
  },
  recommendation: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 10,
    marginRight: 16,
    width: 160,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  recommendationImage: {
    width: '100%',
    height: 90,
    borderRadius: 6,
  },
  recommendationText: {
    paddingHorizontal: 4,
  },
  recommendationTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  recommendationSubtitle: {
    fontSize: 12,
    color: '#666',
    lineHeight: 16,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  ratingText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#555',
  },
});

export default RecommendationsComponent;
