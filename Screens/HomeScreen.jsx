import React from 'react';
import { View, Text, Image, ScrollView, StyleSheet, Dimensions, TouchableOpacity, BackHandler } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

const { width } = Dimensions.get('window');

export default function HomeScreen({ navigation }) {
  const categories = [
    { name: 'Arreglos', imageUri: require('../assets/Arreglos.png') },
    { name: 'Limpieza', imageUri: require('../assets/limpieza.png') },
    { name: 'Estética', imageUri: require('../assets/manicura.png') },
    { name: 'Clases', imageUri: require('../assets/clases.png') },
    { name: 'Jardinería', imageUri: require('../assets/jardineria.png') },
    { name: 'Cuidado', imageUri: require('../assets/cuidado.png') },
  ];

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
    require('../assets/jardineria-recomendaciones.jpg'),
    require('../assets/jardineria-recomendaciones.jpg'),
    require('../assets/jardineria-recomendaciones.jpg'),
  ];

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
      </View>

      <ScrollView horizontal style={styles.categoriesContainer} showsHorizontalScrollIndicator={false}>
        {categories.map((category, index) => (
          <TouchableOpacity
            key={index}
            style={styles.category}
            onPress={() => navigation.navigate('Categoría', { 
              title: category.name,
              imageUri: category.imageUri
            })}
          >
            <Image source={category.imageUri} style={styles.categoryImage} />
            <Text style={styles.categoryText}>{category.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <ScrollView horizontal style={styles.propagandaContainer} showsHorizontalScrollIndicator={false}>
        {propagandaImages.map((imageUri, index) => (
          <View key={index} style={styles.imageWrapper}>
            <Image source={imageUri} style={styles.propagandaImage} />
          </View>
        ))}
      </ScrollView>

      <View style={styles.recommendationsContainer}>
        <Text style={styles.sectionTitle}>Recomendaciones para ti</Text>
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
  },
  logo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1B2E35',
    textAlign: 'left',
    padding: 5,
  },
  categoriesContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingBottom: 10,
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
  propagandaContainer: {
    paddingHorizontal: 16,  // Eliminar márgenes laterales
    marginVertical: 16,
  },
  imageWrapper: {
    marginRight: 8,  // Reducir margen entre imágenes
  },
  propagandaImage: {
    width: width - 80,  // Ajustar ancho de las imágenes para que lleguen al borde
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
