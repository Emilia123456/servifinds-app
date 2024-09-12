import React, { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView, StyleSheet, Dimensions, TouchableOpacity, BackHandler } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { getCategories } from '../service/offersService.js';
import Icon from 'react-native-vector-icons/FontAwesome'; // Importa un ícono para el corazón

const { width } = Dimensions.get('window');

export default function HomeScreen({ navigation }) {
  const [categories, setCategories] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState('All'); // Estado para el filtro seleccionado
  const [likedRecommendations, setLikedRecommendations] = useState({}); // Estado para manejar los likes
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategories(); 
        setCategories(data); 
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    fetchCategories();
  }, []); 

  const recommendations = [
    {
      title: 'Jardinería',
      description: 'Soy Romina y me gustan las flores re coloridas',
      imageUri: require('../assets/jardineria-recomendaciones.jpg'),
    },
    {
      title: 'Plomería',
      description: 'Hola me llamo Luis y me gustan las conejitas',
      imageUri: require('../assets/plomeria-recomendaciones.jpg'),
    },
    {
      title: 'Manicura',
      description: 'Hola me llamo Angela y hago nail art y esas cosas',
      imageUri: require('../assets/manicura-recomendaciones.jpg'),
    },
    {
      title: 'Particular Matematica',
      description: 'Hola me llamo Paola y te hago la vida mas facil (no)',
      imageUri: require('../assets/clases-recomendaciones.jpg'),
    }
  ];

  const propagandaImages = [
    require('../assets/propagandaa.png'),
    require('../assets/propagandaa2.png'),
    require('../assets/propagandaa3.png'),
  ];

  const handleScroll = (event) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(contentOffsetX / width);
    setActiveImageIndex(index); // Actualiza el índice de la imagen activa según el desplazamiento
  };

  const handleLike = (index) => {
    setLikedRecommendations((prev) => ({
      ...prev,
      [index]: !prev[index]
    }));
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
        {/* Icono de notificaciones */}
        <TouchableOpacity onPress={() => navigation.navigate('NotificationScreen')}>
          <Image source={require('../assets/notificacion.png')} style={styles.notificationIcon} />
        </TouchableOpacity>
      </View>

      {/* Categorías */}
      <ScrollView horizontal style={styles.filterContainer} showsHorizontalScrollIndicator={false}>
        {categories.length > 0 ? (
          categories.map((category, index) => (
            <TouchableOpacity key={index} style={styles.category} onPress={() => handleCategoryPress(category)}>
              <Image source={{ uri: 'https://diverse-tightly-mongoose.ngrok-free.app' + category.imageURL }} style={styles.filterImage} />
              <Text style={styles.filterText}>{category.nombre}</Text>
            </TouchableOpacity>
          ))
        ) : (
          <Text>No hay categorías disponibles</Text>
        )}
      </ScrollView>

      {/* Propaganda */}
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
                activeImageIndex === index ? styles.activeIndicator : {} // Activa el círculo solo si la imagen está visible
              ]}
            />
          ))}
        </View>
      </View>

      {/* Recomendaciones */}
      <View style={styles.recommendationsContainer}>
        <Text style={styles.sectionTitle}>Recomendaciones para ti</Text>
        {/* Filtros */}
        <ScrollView horizontal style={styles.filterButtonsContainer} showsHorizontalScrollIndicator={false}>
          {['Todo', 'Nuevo', 'Popular', 'Mejor calificación'].map((filter, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.filterButton,
                selectedFilter === filter && styles.selectedFilterButton
              ]}
              onPress={() => setSelectedFilter(filter)}
            >
              <Text style={styles.filterButtonText}>{filter}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
        {recommendations.map((recommendation, index) => (
          <TouchableOpacity
            key={index}
            style={styles.recommendation}
            onPress={() => navigation.navigate('Detail', {
              title: recommendation.title,
              description: recommendation.description,
              imageUri: recommendation.imageUri,
            })}
          >
            <Image source={recommendation.imageUri} style={styles.recommendationImage} />
            <View style={styles.recommendationText}>
              <View style={styles.rating}>
                <Text style={styles.ratingText}>4.9 (234)</Text>
                <TouchableOpacity onPress={() => handleLike(index)}>
                  <Icon name={likedRecommendations[index] ? 'heart' : 'heart-o'} size={20} color={likedRecommendations[index] ? '#e74c3c' : '#7f8c8d'} />
                </TouchableOpacity>
              </View>
              <Text style={styles.recommendationTitle}>{recommendation.title}</Text>
              <Text style={styles.recommendationSubtitle}>{recommendation.description}</Text>
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
  },
  notificationIcon: {
    width: 25,
    height: 25,
  },
  logo: {
    fontSize: 24,
    color: '#1B2E35',
    textAlign: 'left',
    padding: 5,
    fontWeight: 'bold',
  },
  propagandaContainer: {
    marginVertical: 16,
    alignItems: 'center',
  },
  imageWrapper: {
    width: width,
    alignItems: 'center',
  },
  propagandaImage: {
    width: width - 40,
    height: 200,
    borderRadius: 10,
  },
  indicatorContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 8,
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
    paddingBottom: 10,
    paddingTop: 0,
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
    paddingHorizontal: 0,
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
    fontWeight: 'semi-bold',
    color: '#333',
  },
  recommendationSubtitle: {
    fontSize: 12,
    color: '#666',
  },
});

