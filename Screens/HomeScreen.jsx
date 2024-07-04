import React from 'react';
import { View, Text, TextInput, Image, ScrollView, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  const categories = [
    { name: 'Limpieza', imageUri: require('../assets/icon.jpg') },
    { name: 'Arreglos', imageUri: require('../assets/icon.jpg') },
    { name: 'Jardinería', imageUri: require('../assets/icon.jpg') },
    { name: 'Manicura', imageUri: require('../assets/icon.jpg') },
    { name: 'Plomería', imageUri: require('../assets/icon.jpg') },
    { name: 'Cuidado', imageUri: require('../assets/icon.jpg') },
    { name: 'Otros', imageUri: require('../assets/icon.jpg') },
  ];

  const recommendations = [
    {
      title: 'Jardinería',
      description: 'Soy Romina y me gustan las flores re coloridas',
      imageUri: require('../assets/icon.jpg'),
    },
    {
      title: 'Plomería',
      description: 'Hola me llamo Luis y me gustan las conejitas',
      imageUri: require('../assets/icon.jpg'),
    },
    {
      title: 'Manicura',
      description: 'Hola me llamo Angela y hago nail art y esas cosas',
      imageUri: require('../assets/icon.jpg'),
    },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.logo}>ServiFinds</Text>
        <TextInput style={styles.searchInput} placeholder="Buscar" />
      </View>
      <Image source={require('../assets/icon.jpg')} style={styles.imagePlaceholder} />

      <ScrollView horizontal style={styles.categoriesContainer}>
        {categories.map((category, index) => (
          <TouchableOpacity key={index} style={styles.category}>
            <Image source={require('../assets/icon.jpg')} style={styles.categoryImage} />
            <Text style={styles.categoryText}>{category.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <View style={styles.recommendationsContainer}>
        <Text style={styles.sectionTitle}>Recomendaciones para ti</Text>
        {recommendations.map((recommendation, index) => (
          <TouchableOpacity key={index} style={styles.recommendation}>
            <Image source={require('../assets/icon.jpg')} style={styles.recommendationImage} />
            <View style={styles.recommendationText}>
              <View style={styles.rating}>
                <Text style={styles.ratingText}>4.9 (234)</Text>
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
    marginTop: 40,
  },
  logo: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  searchInput: {
    width: width - 32,
    padding: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginTop: 8,
  },
  imagePlaceholder: {
    width: width - 32,
    height: 100,
    marginHorizontal: 16,
    marginVertical: 16,
    borderRadius: 8,
  },
  categoriesContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  category: {
    alignItems: 'center',
    marginRight: 16,
  },
  categoryImage: {
    width: 50,
    height: 50,
    marginBottom: 8,
  },
  categoryText: {
    paddingVertical: 4,
  },
  recommendationsContainer: {
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    paddingVertical: 4,
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
  },
  recommendationTitle: {
    fontWeight: 'bold',
    marginBottom: 4,
  },
  recommendationSubtitle: {
    color: '#666',
    marginBottom: 4,
  },
});
