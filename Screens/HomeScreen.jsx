import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView, StyleSheet, Dimensions, TouchableOpacity, BackHandler } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { getRecomendations } from '../service/offersService.js';
import Icon from 'react-native-vector-icons/FontAwesome'; // ícono para el corazón
import { likeRecomendation } from '../service/favsService.js';

const { width } = Dimensions.get('window');

export default function HomeScreen({ navigation }) {
  const [selectedFilter, setSelectedFilter] = useState('All'); // Estado para el filtro seleccionado
  const [likedRecommendations, setLikedRecommendations] = useState({}); // Estado para manejar los likes
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [recomendations, setRecomendations] = useState([]);
  const shownIds = new Set(); 

  useEffect(() => {
    const fetchRecomendations = async () => {
      try {
        const data = await getRecomendations();

        // Filtrar duplicados basado en un id
        const uniqueRecommendations = data.filter((recomendation) => {
          if (!shownIds.has(recomendation.id)) {
            shownIds.add(recomendation.id);
            return true;
          }
          return false;
        });

        setRecomendations(uniqueRecommendations);
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchRecomendations();
  }, []);

  const propagandaImages = [
    require('../assets/propaganda.png'),
    require('../assets/propaganda2.png'),
    require('../assets/propaganda3.png'),
  ];

  const handleScroll = (event) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(contentOffsetX / width);
    setActiveImageIndex(index); 
  };

  const handleLike = async (recomendationId) => {
    try {
      const isLiked = likedRecommendations[recomendationId]; // Verifica si ya está likeada
      
      const response = await likeRecomendation(recomendationId); 
      
      if (response.status === 201) {
        setLikedRecommendations((prev) => ({
          ...prev,
          [recomendationId]: !prev[recomendationId], // Cambia el estado del like
        }));
      } else {
        console.error('Error al actualizar el like en el servidor:', response);
      }
    } catch (error) {
      console.error('Error al realizar la solicitud:', error);
    }
  };
  

  const handleCategoryPress = (category) => {
    navigation.navigate('CategoryScreen', { category });
  };

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => true;
      BackHandler.addEventListener('hardwareBackPress', onBackPress);
      return () => BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, [])
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.logo}>ServiFinds</Text>
        <TouchableOpacity onPress={() => navigation.navigate('NotificationScreen')}>
          <Image source={require('../assets/notificacion.png')} style={styles.notificationIcon} />
        </TouchableOpacity>
      </View>

      <View style={styles.propagandaContainer}>
        <ScrollView
          horizontal
          pagingEnabled
          onScroll={handleScroll}
          showsHorizontalScrollIndicator={false}
          scrollEventThrottle={16}
        >
          {propagandaImages.map((imageUri, index) => (
            <View key={index} style={styles.imageWrapper}>
              <Image source={imageUri} style={styles.propagandaImage} />
            </View>
          ))}
        </ScrollView>
        <View style={styles.indicatorContainer}>
          {propagandaImages.map((_, index) => (
            <View
              key={index}
              style={[
                styles.indicator,
                activeImageIndex === index ? styles.activeIndicator : {},
              ]}
            />
          ))}
        </View>
      </View>

      <View style={styles.recommendationsContainer}>
        <Text style={styles.sectionTitle}>Recomendaciones para ti</Text>

        <ScrollView horizontal style={styles.filterButtonsContainer} showsHorizontalScrollIndicator={false}>
          {['Todo', 'Nuevo', 'Popular', 'Mejor calificación'].map((filter, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.filterButton, selectedFilter === filter && styles.selectedFilterButton]}
              onPress={() => setSelectedFilter(filter)}
            >
              <Text style={styles.filterButtonText}>{filter}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {recomendations.map((recomendation, index) => (
          <TouchableOpacity
            key={index}
            style={styles.recommendation}
            onPress={() => navigation.navigate('Detail', {
              title: recomendation.titulo,
              description: recomendation.descripcion,
              imageUri: recomendation.foto,
              calificacion: recomendation.promedio_calificacion,
            })}
          >
            <Image source={{ uri: recomendation.foto }} style={styles.recommendationImage} />
            <View style={styles.recommendationText}>
              <View style={styles.rating}>
                <Text style={styles.ratingText}>{recomendation.promedio_calificacion.toString()}</Text>
                <TouchableOpacity onPress={() => handleLike(recomendation.id)}>
                  <Icon name={likedRecommendations[index] ? 'heart' : 'heart-o'} size={20} color={likedRecommendations[index] ? '#e74c3c' : '#7f8c8d'} />
                </TouchableOpacity>
              </View>
              <Text style={styles.recommendationTitle}>{recomendation.titulo}</Text>
              <Text style={styles.recommendationSubtitle}>{recomendation.descripcion}</Text>
            </View>
          </TouchableOpacity>
        ))}
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 4, // Para Android
    shadowColor: '#000', // Para iOS
    shadowOffset: { width: 0, height: 2 }, // Para iOS
    shadowOpacity: 0.1, // Para iOS
    shadowRadius: 4, // Para iOS
  },
  notificationIcon: {
    width: 25,
    height: 25,
    marginRight: 10,
  },
  logo: {
    fontSize: 24,
    color: '#1B2E35',
    textAlign: 'left',
    padding: 5,
    fontWeight: 'bold',
  },
  propagandaContainer: {
    marginVertical: 20,
    alignItems: 'center',
  },
  imageWrapper: {
    width: width,
    alignItems: 'center',
  },
  propagandaImage: {
    width: width - 40,
    height: 180,
    borderRadius: 30,
    elevation: 4, // Para Android
    shadowColor: '#000', // Para iOS
    shadowOffset: { width: 0, height: 2 }, // Para iOS
    shadowOpacity: 0.2, // Para iOS
    shadowRadius: 4, // Para iOS
  },
  indicatorContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  indicator: {
    height: 8,
    width: 8,
    borderRadius: 4,
    backgroundColor: '#ccc',
    marginHorizontal: 4,
  },
  activeIndicator: {
    backgroundColor: '#1B2E35',
  },
  filterContainer: {
    paddingHorizontal: 16,
  },
  category: {
    alignItems: 'center',
    marginRight: 16,
  },
  filterImage: {
    width: 25,
    height: 25,
    marginBottom: 8,
  },
  filterText: {
    paddingVertical: 4,
    color: '#1B2E35',
  },
  filterButtonsContainer: {
    flexDirection: 'row',
    paddingBottom: 10,
    paddingTop: 10,
  },
  filterButton: {
    height: 38,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
    marginBottom: 7,
    paddingHorizontal: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#fff',
    elevation: 3, // Para Android
    shadowColor: '#000', // Para iOS
    shadowOffset: { width: 0, height: 2 }, // Para iOS
    shadowOpacity: 0.1, // Para iOS
    shadowRadius: 4, // Para iOS
  },
  selectedFilterButton: {
    backgroundColor: '#D5F1E4',
    borderColor: '#446C64',
  },
  filterButtonText: {
    fontSize: 14,
    color: '#1B2E35',
  },
  recommendationsContainer: {
    padding: 16,
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
    backgroundColor: '#fff',
    padding: 8,
    borderRadius: 8,
    elevation: 3, // Para Android
    shadowColor: '#000', // Para iOS
    shadowOffset: { width: 0, height: 2 }, // Para iOS
    shadowOpacity: 0.1, // Para iOS
    shadowRadius: 4, // Para iOS
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
    fontWeight: 'semi-bold',
    color: '#333',
  },
  recommendationSubtitle: {
    fontSize: 12,
    color: '#666',
  },
});
