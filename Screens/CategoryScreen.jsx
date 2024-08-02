import React, { useState } from 'react';
import { View, Text, TextInput, Image, ScrollView, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';

const { width } = Dimensions.get('window');

export default function CategoryScreen({ route }) {
  const { title, description, imageUri } = route.params;

  const filters = [
    { name: 'Mejor valorados' },
    { name: 'Precio' },
    { name: 'Más trabajos realizados' },
    { name: 'Cerca tuyo' },
  ];

  const [selectedFilter, setSelectedFilter] = useState(null);

  const recommendations = [
    // Añade tus recomendaciones aquí
    // Ejemplo:
    { filter: 'Mejor valorados', name: 'Recomendación 1', description: 'Descripción 1' },
    { filter: 'Precio', name: 'Recomendación 2', description: 'Descripción 2' },
    // ...
  ];

  const filteredRecommendations = recommendations.filter(
    recommendation => recommendation.filter === selectedFilter
  );

  const handleFilterPress = (filterName) => {
    if (selectedFilter === filterName) {
      setSelectedFilter(null); // Deseleccionar si ya está seleccionado
    } else {
      setSelectedFilter(filterName);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
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

      <ScrollView>
 

        <View style={styles.recommendationsContainer}>
          {filteredRecommendations.map((recommendation, index) => (
            <View key={index} style={styles.recommendation}>
              <Text style={styles.recommendationName}>{recommendation.name}</Text>
              <Text style={styles.recommendationDescription}>{recommendation.description}</Text>
            </View>
          ))}
        </View>
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
    height:38,
    alignItems: 'center',
    marginRight: 16,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    minWidth: 100, // Ajuste de tamaño mínimo
  },
  selectedFilter: {
    backgroundColor: '#a3c9a8', // Cambia el color según tus necesidades
    borderColor: '#1B2E35',
  },
  filterText: {
    color: '#1B2E35',
    fontFamily: 'Roboto-Regular',
  },
  categoryContainer: {
    alignItems: 'center',
    padding: 16,
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1B2E35',
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    color: '#777',
    textAlign: 'center',
  },
  recommendationsContainer: {
    padding: 16,
  },
  recommendation: {
    marginBottom: 16,
  },
  recommendationName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1B2E35',
  },
  recommendationDescription: {
    fontSize: 14,
    color: '#777',
  },
});
