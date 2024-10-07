import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions, ScrollView, Image } from 'react-native';
import { getCategories, searchOffers, getByCategories } from '../service/offersService';
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
  const [categOffers, setCategOffers] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        console.log("trayendo categorias");
        const data = await getCategories();
        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    fetchCategories();

    fetchOffers = async (props) => {
      try {
        console.log("trayendo eventos filtrados");
        const data = await searchOffers(props);
        setCategOffers(data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    fetchOffers("", "", "1", "");
  }, []);

  const handleCategoryPress = (nombCateg) => {
    const fetchByCategory = async () => {
      try {
        console.log("trayendo ofrecidos de categoria");
        const response = await getByCategories(nombCateg);
        setCategOffers(response);
      } catch (error) {
        console.error('Error fetching byCategories:', error);
      }
    };
    fetchByCategory();
    //se puede poner html aca?
  };

  return (
    <>
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
        
        <ScrollView horizontal style={styles.filterContainer} showsHorizontalScrollIndicator={false}>
        {categories.length() > 0 ? (
          categories.map((category, index) => (
            <TouchableOpacity key={index} style={styles.category} onPress={() => handleCategoryPress(category.nombre)}>
              <Image
                source={{ uri: 'https://diverse-tightly-mongoose.ngrok-free.app' + category.imageURL }}
                style={styles.filterImage}
              />
              <Text style={styles.filterText}>{category.nombre}</Text>
            </TouchableOpacity>
          ))
        ) : (
          <Text>No hay categorías disponibles</Text>
        )}
      </ScrollView>
      </ScrollView>
      {categOffers.length > 0 ? (
          categOffers.map((offer, index) => (
          <>
            <Image source={offer.imageUri} style={styles.recommendationImage} />
            <View style={styles.recommendationText}>
              <View style={styles.rating}>
                <Text style={styles.ratingText}>{offer.promedio_calificacion}</Text>
                <TouchableOpacity onPress={() => handleLike(index)}>
                  <Icon name={likedRecommendations[index] ? 'heart' : 'heart-o'} size={20} color={likedRecommendations[index] ? '#e74c3c' : '#7f8c8d'} />
                </TouchableOpacity>
              </View>
              <Text style={styles.recommendationTitle}>{offer.descripcion}</Text>
            </View>
          </>
      ))
      ) : (
        <Text>No hay ofrecimientos disponibles</Text>
      )}
      
     {/*  <>
        <TouchableOpacity style={styles.filterButton} onPress={filter}>
          <Text style={styles.filterButtonText}>Filtrar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.clearButton} onPress={() => setSelectedFilters({})}>
          <Text style={styles.clearButtonText}>Limpiar Filtros</Text>
        </TouchableOpacity>
      </> */}
    </>
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
    marginLeft: 6,
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
  filterContainer: {
    paddingHorizontal: 16,
  },
  category: {
    alignItems: 'center',
    marginRight: 16,
  },
  filterImage: {
    width: 25,
    height: 25,
    marginBottom: 8,
  },
  filterText: {
    paddingVertical: 4,
    color: '#1B2E35',
  },
  filterButtonsContainer: {
    flexDirection: 'row',
    paddingBottom: 10,
    paddingTop: 10,
  }
});
