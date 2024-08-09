// HomeScreen.js
import React from 'react';
import { View, Text, TextInput, Image, ScrollView, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';

const { width } = Dimensions.get('window');

export default function HomeScreen({ navigation }) {

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

  return (
    <ScrollView style={styles.container}>
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

  categoriesContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingBottom: 20,
    paddingTop: 10,
  },
  category: {
    alignItems: 'center',
    marginRight: 16,
  },
  categoryImage: {
    width: 25,
    height: 25,
    marginBottom: 8,
  },
  categoryText: {
    paddingVertical: 4,
    color: '#1B2E35',
  },
  imageContainer: {
    position: 'relative',
    marginHorizontal: 16,
    marginVertical: 16,
  },
  imagePlaceholder: {
    width: width - 32,
    height: 150,
    borderRadius: 8,
  },
  recommendationsContainer: {
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    paddingVertical: 4,
    color: '#1B2E35',
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
