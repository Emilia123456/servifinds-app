import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity,  } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; 
import { getLikedRecomendations } from '../service/favsService';

export default function FavoritesScreen({ navigation }) {
  const [likedRecommendations, setLikedRecommendations] = useState({}); // Estado para manejar los likes

  useEffect(() => {
    const fetchLikedRecomendations = async () => {
      try {
        const data = await getLikedRecomendations();
        console.log(data);
        setLikedRecommendations(data);
      } catch (error) {
        console.log("Error al obtener los favoritos:", error);
      }
    };
    fetchLikedRecomendations();
  }, []);
  
  
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.logo}>Favoritos</Text>
      </View>
  
      <View style={styles.recommendationsContainer}>
        {likedRecommendations.length > 0 ? (
          likedRecommendations.map((recommendation, index) => (
            <TouchableOpacity
              key={index}
              style={styles.recommendation}
              onPress={() => navigation.navigate('Detail', {
                title: recommendation.titulo,
                description: recommendation.descripcion,
                imageUri: recommendation.foto,
                calificacion: recommendation.promedio_calificacion,
              })}
            >
              <Image source={{ uri: recommendation.foto }} style={styles.recommendationImage} />
              <View style={styles.recommendationText}>
                <Text style={styles.recommendationTitle}>{recommendation.titulo}</Text>
                <Text style={styles.recommendationSubtitle}>{recommendation.descripcion}</Text>
              </View>
            </TouchableOpacity>
          ))
        ) : (
          <Text>No tienes publicaciones likeadas aún</Text>
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
});
