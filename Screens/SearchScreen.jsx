import React from 'react';
import { View, Text, TextInput, Image, ScrollView, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';

const { width } = Dimensions.get('window');

export default function SearchScreen({ navigation }) {  // Recibe navigation como prop


  const categories = [
    { name: 'Limpieza', imageUri: require('../assets/limpieza.png') },
    { name: 'Arreglos', imageUri: require('../assets/Arreglos.png') },
    { name: 'Jardinería', imageUri: require('../assets/jardineria.png') },
    { name: 'Belleza', imageUri: require('../assets/manicura.png') },
    { name: 'Cuidado', imageUri: require('../assets/cuidado.png') },
    { name: 'Clases', imageUri: require('../assets/clases.png') },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TextInput style={styles.searchInput} placeholder="Buscar" placeholderTextColor="#777" />
      </View>



      <Text style={styles.sectionTitle}>Categorías</Text>
      <View style={styles.categoriesContainer}>
        {categories.map((category, index) => (
          <TouchableOpacity 
            key={index} 
            style={styles.category}
            onPress={() => navigation.navigate('Categoría', { 
              title: category.name,
              imageUri: category.imageUri,
            })}>
            <Image source={category.imageUri} style={styles.categoryImage} />
            <Text style={styles.categoryText}>{category.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
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
    marginTop: 92,
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
    alignItems: 'center',
    marginRight: 16,
  },
  filterText: {
    paddingVertical: 4,
    color: '#1B2E35',
    fontFamily: 'Roboto-Regular',
  },
  categoriesContainer: {
    paddingHorizontal: 16,
    paddingTop: 25,
    paddingBottom: 230,
  },
  category: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  categoryImage: {
    width: 25,
    height: 25,
    marginRight: 16,
  },
  categoryText: {
    fontSize: 16,
    color: '#1B2E35',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1B2E35',
    textAlign: 'right',
    marginRight: 270,
  },
});
