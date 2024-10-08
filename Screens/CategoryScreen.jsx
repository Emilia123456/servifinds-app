import React, { useState } from 'react';
import { View, Text, TextInput, Image, ScrollView, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';

const { width } = Dimensions.get('window');

export default function CategoryScreen({ route, navigation }) {
  const { title, description, imageUri } = route.params;

  const filters = [
    { name: 'Mejor valorados' },
    { name: 'Precio' },
    { name: 'Más trabajos realizados' },
    { name: 'Cerca tuyo' },
  ];

  const [selectedFilter, setSelectedFilter] = useState(null);


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

  const filteredRecommendations = recommendations.filter(
    recommendation => recommendation.filter === selectedFilter
  );

  const handleFilterPress = (filterName) => {
    if (selectedFilter === filterName) {
      setSelectedFilter(null); 
    } else {
      setSelectedFilter(filterName);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>+
        <TextInput style={styles.searchInput} placeholder="Buscar" placeholderTextColor="#777" />
      </View>

      <ScrollView horizontal style={styles.filtersContainer} showsHorizontalScrollIndicator={false}>
        {filters.map((filter, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.filter, selectedFilter === filter.name && styles.selectedFilter]}
            onPress={() => handleFilterPress(filter.name)}
          >
            <Text style={styles.filterText}>{filter.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <ScrollView style={styles.recommendationsContainer}>
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
              </View>
              <Text style={styles.recommendationTitle}>{recommendation.title}</Text>
              <Text style={styles.recommendationSubtitle}>{recommendation.description}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    padding: 16,
  },
  searchInput: {
    width: width - 32,
    padding: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginTop: 8,
    color: '#1B2E35',
  },
  filtersContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingBottom: 20,
    paddingTop: 10,
  },
  filter: {
    height: 38,
    alignItems: 'center',
    marginRight: 16,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    minWidth: 100, 
  },
  selectedFilter: {
    backgroundColor: '#D5F8E4',
    borderColor: '#446C64',
  },
  filterText: {
    color: '#1B2E35',
    fontFamily: 'Roboto-Regular',
  },
  recommendationsContainer: {
    paddingHorizontal: 16,
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
    paddingVertical: 4,
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  ratingText: {
    marginLeft: 4,
    color: '#1B2E35',
  },
  recommendationTitle: {
    fontWeight: 'bold',
    color: '#1B2E35',
    marginBottom: 4,
  },
  recommendationSubtitle: {
    color: '#1B2E35',
    marginBottom: 4,
  },
});
