import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions, ScrollView, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { getCategories, searchOffers, getByCategories, getRecomendations } from '../service/offersService'; 
import RecommendationsComponent from '../components/Recommendations';

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
  const [likedRecommendations, setLikedRecommendations] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        // Cargar categorías
        const categoriesData = await getCategories();
        console.log('Categorías recibidas:', categoriesData);
        setCategories(categoriesData || []);

        // Cargar ofertas
        const offersData = await searchOffers();
        setCategOffers(offersData || []);
      } catch (error) {
        console.error('Error al cargar datos:', error);
      }
    };

    loadData();
  }, []);

  const handleCategoryPress = (nombCateg) => {
    const fetchByCategory = async () => {
      try {
        const response = await getByCategories(nombCateg);
        //setCategOffers(response || []);
        setCategOffers([]);
        //setLikedRecommendations(new Array((response || []).length).fill(false));
      } catch (error) {
        console.error('Error fetching byCategories:', error);
      }
    };
    fetchByCategory();
  };

  const handleLike = (index) => {
    const updatedLikes = [...likedRecommendations];
    updatedLikes[index] = !updatedLikes[index];
    setLikedRecommendations(updatedLikes);
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
          {categories.length > 0 ? (
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
        <RecommendationsComponent 
          recomendations={categOffers}
          navigation={navigation}
        />
      ) : (
        <Text>No hay ofrecimientos disponibles</Text>
      )}
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
  filterContainer: {
    flexDirection: 'row',
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
  recommendationImage: {
    width: '100%',
    height: 100,
    resizeMode: 'cover',
  },
  recommendationText: {
    padding: 10,
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    marginRight: 8,
    fontSize: 14,
    color: '#1B2E35',
  },
  recommendationTitle: {
    fontSize: 16,
    color: '#1B2E35',
  },
});
