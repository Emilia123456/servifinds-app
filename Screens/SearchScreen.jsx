import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export default function SearchScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.logo}>ServiFinds</Text>
        <TextInput style={styles.searchInput} placeholder="Buscar" placeholderTextColor="#777" />
      </View>
      <View style={styles.filterContainer}>
        <TouchableOpacity style={styles.filterButton}><Text style={styles.filterText}>Más trabajos realizados</Text></TouchableOpacity>
        <TouchableOpacity style={styles.filterButton}><Text style={styles.filterText}>Precio</Text></TouchableOpacity>
        <TouchableOpacity style={styles.filterButton}><Text style={styles.filterText}>Mejor valorados</Text></TouchableOpacity>
      </View>
      <Text style={styles.sectionTitle}>Categorías</Text>
      <View style={styles.categoriesContainer}>
        <TouchableOpacity style={styles.categoryButton}>
          <Text style={styles.categoryText}>Limpieza</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.categoryButton}>
          <Text style={styles.categoryText}>Arreglos</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.categoryButton}>
          <Text style={styles.categoryText}>Jardinería</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.categoryButton}>
          <Text style={styles.categoryText}>Manicura</Text>
        </TouchableOpacity>
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
    marginTop: 40,
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



  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginVertical: 15,
  },
  filterButton: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 10,
    flex: 1,
    marginHorizontal: 5,
  },
  filterText: {
    color: '#000',
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 8,
    color: '#000',
    width: '100%',
  },
  categoriesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    width: '100%',
  },
  categoryButton: {
    backgroundColor: '#f0f0f0',
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
    width: '48%',
    alignItems: 'center',
  },
  categoryText: {
    color: '#000',
    fontWeight: 'bold',
  },
});
