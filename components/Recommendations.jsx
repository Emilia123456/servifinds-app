import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const RecommendationsComponent = ({ recomendations, navigation }) => {
  const [likedRecommendations, setLikedRecommendations] = React.useState({});

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
              <View style={styles.rating}>
                <Text style={styles.ratingText}>
                  {typeof recomendation.promedio_calificacion === 'number'
                    ? recomendation.promedio_calificacion.toFixed(2)
                    : 'N/A'}
                </Text>
                <TouchableOpacity onPress={() => handleLike(recomendation.id)}>
                  <Icon
                    name={likedRecommendations[index] ? 'heart' : 'heart-o'}
                    size={22}
                    color={likedRecommendations[index] ? '#e74c3c' : '#7f8c8d'}
                  />
                </TouchableOpacity>
              </View>
              <Text style={styles.recommendationTitle}>{recomendation.titulo}</Text>
              <Text style={styles.recommendationSubtitle}>{recomendation.descripcion}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  recommendationsContainer: {
    paddingVertical: 16,
    paddingLeft: 20, 
  },
  sectionTitle: {
    fontSize: 20,
    color: '#1B2E35',
    marginBottom: 12,
    fontWeight: 'bold',
  },
  recommendation: {
    flexDirection: 'column',
    alignItems: 'center',
    marginRight: 16,
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 16,
    borderWidth: 1, 
    borderColor: '#ddd',
    width: 180, 
  },
  recommendationImage: {
    width: 160,
    height: 100,
    borderRadius: 12,
    marginBottom: 8,
  },
  recommendationText: {
    flex: 1,
    alignItems: 'center', 
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 6,
  },
  ratingText: {
    fontSize: 16,
    color: '#2c3e50',
    fontWeight: 'bold',
  },
  recommendationTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 4,
  },
  recommendationSubtitle: {
    fontSize: 14,
    color: '#7f8c8d',
    textAlign: 'center',
  },
});

export default RecommendationsComponent;
