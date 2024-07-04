import React from 'react';
import { View, Text, TextInput, Image, ScrollView, StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  const categories = [
    { name: 'Limpieza', imageUri: 'icon.jpg' },
    { name: 'Arreglos', imageUri: 'icon.jpg' },
    { name: 'Jardinería', imageUri: 'icon.jpg' },
    { name: 'Manicura', imageUri: 'icon.jpg' },
    { name: 'Otros', imageUri: 'icon.jpg' },
  ];

  const recommendations = [
    {
      title: 'Jardinería',
      description: 'Hola me llamo Luis y me gustan las conejitas',
      imageUri: 'icon.jpg',
    },
    {
      title: 'Plomería',
      description: 'Hola me llamo Luis y me gustan las conejitas',
      imageUri: 'icon.jpg',
    },
    {
      title: 'Manicura',
      description: 'Hola me llamo Luis y me gustan las conejitas',
      imageUri: 'icon.jpg',
    },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.logo}>ServiFinds</Text>
        <TextInput style={styles.searchInput} placeholder="Buscar" />
      </View>
      <Image source={{ uri: 'icon.jpg' }} style={styles.imagePlaceholder} />
      <ScrollView horizontal style={styles.categoriesContainer}>
        {categories.map((category, index) => (
          <View key={index} style={styles.category}>
            <Image source={{ uri: category.imageUri }} style={styles.categoryImage} />
            <Text style={styles.categoryText}>{category.name}</Text>
          </View>
        ))}
      </ScrollView>
      <View style={styles.recommendationsContainer}>
        <Text style={styles.sectionTitle}>Recomendaciones para ti</Text>
        {recommendations.map((recommendation, index) => (
          <View key={index} style={styles.recommendation}>
            <Image source={{ uri: recommendation.imageUri }} style={styles.recommendationImage} />
            <View style={styles.recommendationText}>
              <View style={styles.rating}>
                <Text style={styles.ratingText}>4.9 (234)</Text>
              </View>
              <Text style={styles.recommendationTitle}>{recommendation.title}</Text>
              <Text style={styles.recommendationSubtitle}>{recommendation.description}</Text>
            </View>
          </View>
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
    marginTop: 40,  // Adjust this value to move the header lower
  },
  logo: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  searchInput: {
    width: width - 32,  // Full width with padding taken into account
    padding: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginTop: 8,  // Add margin to create space between logo and search input
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
    width: 50,  // Width of the category image
    height: 50,  // Height of the category image
    marginBottom: 8,  // Space between image and text
  },
  categoryText: {
    paddingVertical: 4,  // Add vertical padding to the category text
  },
  recommendationsContainer: {
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    paddingVertical: 4,  // Add vertical padding to the section title
  },
  recommendation: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    backgroundColor: '#f9f9f9',
    padding: 8,  // Increase padding around the recommendation container
    borderRadius: 8,
  },
  recommendationImage: {
    width: 140,  // Smaller image width
    height: 90,  // Smaller image height
    borderRadius: 8,
    marginRight: 8,
  },
  recommendationText: {
    flex: 1,
    paddingVertical: 4,  // Add vertical padding to the text container
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,  // Add bottom margin to create space below rating
  },
  ratingText: {
    marginLeft: 4,
  },
  recommendationTitle: {
    fontWeight: 'bold',
    marginBottom: 4,  // Add bottom margin to create space below title
  },
  recommendationSubtitle: {
    color: '#666',
    marginBottom: 4,  // Add bottom margin to create space below subtitle
  },
});
