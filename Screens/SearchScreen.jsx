import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions, ScrollView, Image } from 'react-native';
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
  const BASE_URL = 'https://diverse-tightly-mongoose.ngrok-free.app';

  useEffect(() => {
    const loadData = async () => {
      try {
        const categoriesData = await getCategories();
        if (Array.isArray(categoriesData)) {
          setCategories(categoriesData);
        } else if (categoriesData?.data) {
          setCategories(categoriesData.data);
        } else {
          console.error('Formato de categorías inesperado:', categoriesData);
        }

        const offersData = await searchOffers({
          mayorPromedio: "1"
        });

        if (offersData) {
          const processedOffers = processOffers(offersData);
          setCategOffers(processedOffers);
        }
      } catch (error) {
        console.error('Error al cargar datos:', error);
      }
    };

    loadData();
  }, []);

  useEffect(() => {
    // Si hay texto en el campo de búsqueda, realiza la búsqueda
    if (search) {
      handleSearch(search);
    } else {
      // Si el campo está vacío, no hacer nada o mostrar todas las ofertas
      setCategOffers([]);
    }
  }, [search]);  // Dependemos de 'search' para que se ejecute cada vez que cambie el texto

  const processOffers = (offers) => {
    if (!Array.isArray(offers)) {
      return [];
    }

    const uniqueOffers = {};

    offers.forEach(offer => {
      if (!offer || !offer.id) return;

      if (!uniqueOffers[offer.id]) {
        uniqueOffers[offer.id] = {
          ...offer,
          fotos: offer.foto ? [offer.foto] : []
        };
      } else if (offer.foto && !uniqueOffers[offer.id].fotos.includes(offer.foto)) {
        uniqueOffers[offer.id].fotos.push(offer.foto);
      }
    });

    return Object.values(uniqueOffers);
  };

  const handleCategoryPress = async (categoryName) => {
    try {
      const response = await searchOffers({
        categoria: categoryName
      });

      if (response) {
        const uniqueOffers = processOffers(response);
        setCategOffers(uniqueOffers);
      } else {
        setCategOffers([]);
      }
    } catch (error) {
      console.error('Error al buscar ofertas por categoría:', error);
      setCategOffers([]);
    }
  };

  const handleSearch = async (searchText) => {
    try {
      const response = await searchOffers({
        busqueda: searchText
      });

      if (response) {
        const uniqueOffers = processOffers(response);
        setCategOffers(uniqueOffers); // Actualizamos las ofertas
      } else {
        setCategOffers([]);
      }
    } catch (error) {
      console.error('Error al buscar ofertas:', error);
      setCategOffers([]);
    }
  };

  const handleLike = (index) => {
    const updatedLikes = [...likedRecommendations];
    updatedLikes[index] = !updatedLikes[index];
    setLikedRecommendations(updatedLikes);
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.searchSection}>
        <View style={styles.header}>
          <TextInput
            value={search}
            placeholder="Buscar"
            placeholderTextColor="#777"
            onChangeText={text => setSearch(text)}  // Cambiar el texto actual de búsqueda
            style={styles.searchInput}
          />
        </View>
        
        <ScrollView horizontal style={styles.filterContainer} showsHorizontalScrollIndicator={false}>
            {categories && categories.length > 0 ? (
              categories.map((category, index) => (
                <TouchableOpacity key={category.id || index} style={styles.categoryItem} onPress={() => handleCategoryPress(category.nombre)}>
                  <Image
                    source={{ uri: `${BASE_URL}${category.imageURL}` }}
                    style={styles.filterImage}
                    onError={(e) => console.log('Error cargando imagen:', e.nativeEvent.error)}
                  />
                  <Text style={styles.filterText}>{category.nombre}</Text>
                </TouchableOpacity>
              ))
            ) : (
              <Text style={styles.loadingText}>Cargando categorías...</Text>
            )}
        </ScrollView>
      </View>
      
      <ScrollView style={styles.offersContainer}>
        <View style={styles.recommendationsSection}>
          {categOffers.length > 0 && (
            <RecommendationsComponent 
              recomendations={categOffers}
              navigation={navigation}
            />
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  searchSection: {
    backgroundColor: '#fff',
    paddingTop: 50,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  header: {
    padding: 16,
  },
  searchInput: {
    padding: 12,
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    color: '#1B2E35',
    fontSize: 16,
    paddingLeft: 20,
  },
  filterContainer: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    marginTop: 8,
  },
  categoryItem: {
    alignItems: 'center',
    marginRight: 16,
    padding: 12,
    width: 90,
  },
  filterImage: {
    width: 30,
    height: 30,
    marginBottom: 8,
  },
  filterText: {
    fontSize: 12,
    fontWeight: '500',
    textAlign: 'center',
    color: '#1B2E35',
  },
  loadingText: {
    padding: 10,
    color: '#666',
  },
  offersContainer: {
    flex: 1,
  },
  recommendationsSection: {
    flex: 1,
  }
});
