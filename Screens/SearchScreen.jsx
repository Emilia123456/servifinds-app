import React from 'react';
import { View, Text, TextInput, Image, ScrollView, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';

const { width } = Dimensions.get('window');

export default function SearchScreen() {

  const filters = [
    { name: 'Mejor valorados' },
    { name: 'Precio' },
    { name: 'Más trabajos realizados' },
    { name: 'Cerca tuyo' },
  ];

  const categories = [
    { name: 'Limpieza', imageUri: require('../assets/limpieza.png') },
    { name: 'Arreglos', imageUri: require('../assets/arreglos.png') },
    { name: 'Jardinería', imageUri: require('../assets/jardineria.png') },
    { name: 'Manicura', imageUri: require('../assets/manicura.png') },
    { name: 'Cuidado', imageUri: require('../assets/cuidado.png') },
    { name: 'Clases', imageUri: require('../assets/clases.png') },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TextInput style={styles.searchInput} placeholder="Buscar" placeholderTextColor="#777" />
      </View>

      <ScrollView horizontal style={styles.filtersContainer} showsHorizontalScrollIndicator={false}>
        {filters.map((filter, index) => (
          <TouchableOpacity key={index} style={styles.filter}>
            <Text style={styles.filterText}>{filter.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <Text style={styles.sectionTitle}>Categorías</Text>
      <View style={styles.categoriesContainer}>
        {categories.map((category, index) => (
          <TouchableOpacity key={index} style={styles.category}>
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
  },
  logo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'left',
    padding: 5,
  },
  searchInput: {
    width: width - 32,
    padding: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginTop: 8,
    color: '#000',
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
    color: '#000',
  },
  categoriesContainer: {
    paddingHorizontal: 16,
    paddingTop: 25,
    paddingBottom: 120,
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
    color: '#000',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'right',
    marginRight: 270,
  },
});
