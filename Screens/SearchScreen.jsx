import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions, ScrollView, Image } from 'react-native';
import { getCategories } from '../service/offersService';
const { width } = Dimensions.get('window');

export default function SearchScreen({ navigation }) {
  const [search, setSearch] = useState('');
  const [selectedFilters, setSelectedFilters] = useState({
    ubicacion: null,
    categoria: null,
    precio: null,
    calificaciones: null,
    distancia: null,
  });
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    console.log('useEffect')
    const fetchCategories = async () => {
      try {
        const data = await getCategories(); 
        console.log('Fetched categories:', data);
        setCategories(data); 
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []); 

  const handleFilterPress = (filterType, value) => {
    setSelectedFilters(prevFilters => ({
      ...prevFilters,
      [filterType]: prevFilters[filterType] === value ? null : value,
    }));
  };
  const filter = () => {
    const searchOffersFiltered = async () => {
      try {
        const data = await searchOffers(); 
        setCategories(data); 
      } catch (error) {
        console.error('Error fetching offers:', error);
      }
    };
  
    searchOffersFiltered();
  };
  
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TextInput
          value={search}
          placeholder="Buscar"
          placeholderTextColor="#777"
          onChangeText={text => setSearch(text)}
          style={styles.searchInput}
        />
      </View>

      <Text style={styles.sectionTitle}>Ubicación</Text>
      <View style={styles.filterContainer}>
        <TouchableOpacity
          style={[styles.filter, selectedFilters.ubicacion === 'Cerca tuyo' && styles.selectedFilter]}
          onPress={() => handleFilterPress('ubicacion', 'Cerca tuyo')}
        >
          <Text style={styles.filterText}>Cerca tuyo</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.sectionTitle}>Categorías</Text>
      <ScrollView horizontal style={styles.filterContainer} showsHorizontalScrollIndicator={false}>
      {categories.length > 0 ? (
        categories.map((category, index) => (
      <TouchableOpacity
        key={index}
        style={[styles.filter, selectedFilters.categoria === category.value && styles.selectedFilter]}
        onPress={() => handleFilterPress('categoria', category.value)}
      >
        {category.imageUri && <Image source={{ uri: category.imageUri }} style={styles.filterImage} />} {/* Aseguramos que imageUri sea válido */}
        <Text style={styles.filterText}>{category.nombre}</Text>
      </TouchableOpacity>
      ))
      ) : (
        <Text>No hay categorías disponibles</Text>
      )}
      </ScrollView>

      <Text style={styles.sectionTitle}>Precio</Text>
      <View style={styles.filterContainer}>
        <TouchableOpacity
          style={[styles.filter, selectedFilters.precio === 'Bajo' && styles.selectedFilter]}
          onPress={() => handleFilterPress('precio', 'Bajo')}
        >
          <Text style={styles.filterText}>De menor a mayor</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.filter, selectedFilters.precio === 'Alto' && styles.selectedFilter]}
          onPress={() => handleFilterPress('precio', 'Alto')}
        >
          <Text style={styles.filterText}>De mayor a menor</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.sectionTitle}>Calificaciones</Text>
      <View style={styles.filterContainer}>
        <TouchableOpacity
          style={[styles.filter, selectedFilters.calificaciones === '4+' && styles.selectedFilter]}
          onPress={() => handleFilterPress('calificaciones', '4+')}
        >
          <Text style={styles.filterText}>4+ Estrellas</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.filter, selectedFilters.calificaciones === '3+' && styles.selectedFilter]}
          onPress={() => handleFilterPress('calificaciones', '3+')}
        >
          <Text style={styles.filterText}>3+ Estrellas</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.filter, selectedFilters.calificaciones === '2+' && styles.selectedFilter]}
          onPress={() => handleFilterPress('calificaciones', '2+')}
        >
          <Text style={styles.filterText}>2+ Estrellas</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.filter, selectedFilters.calificaciones === '1+' && styles.selectedFilter]}
          onPress={() => handleFilterPress('calificaciones', '1+')}
        >
          <Text style={styles.filterText}>1+ Estrellas</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.filterButton} onPress={() => filter()}>
        <Text style={styles.filterButtonText}>Filtrar</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.clearButton} onPress={() => setSelectedFilters({})}>
        <Text style={styles.clearButtonText}>Limpiar Filtros</Text>
      </TouchableOpacity>
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
  searchInput: {
    width: width - 32,
    padding: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    color: '#1B2E35',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1B2E35',
    paddingHorizontal: 16,
    paddingTop: 10,
    marginBottom: 10,
  },
  filterContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  filter: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginRight: 8,
    marginBottom: 8,
  },
  selectedFilter: {
    borderColor: '#1B2E35',
  },
  filterText: {
    color: '#1B2E35',
    marginLeft: 6,  // Espacio entre la imagen y el texto
  },
  filterImage: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
  filterButton: {
    backgroundColor: '#1B2E35',
    paddingVertical: 14,
    borderRadius: 10,
    marginHorizontal: 16,
    alignItems: 'center',
    marginBottom: 20,
  },
  filterButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  clearButton: {
    borderColor: '#1B2E35',
    borderWidth: 1,
    backgroundColor: 'transparent',
    paddingVertical: 14,
    borderRadius: 10,
    marginHorizontal: 16,
    alignItems: 'center',
    marginBottom: 20,
  },
  clearButtonText: {
    color: '#1B2E35',
    fontSize: 16,
  },
});
