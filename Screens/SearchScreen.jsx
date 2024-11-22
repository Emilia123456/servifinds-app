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
  const BASE_URL = 'https://diverse-tightly-mongoose.ngrok-free.app';

  useEffect(() => {
    const loadData = async () => {
      try {
        const categoriesData = await getCategories();
        console.log('Categorías recibidas:', categoriesData); // Debug log
        
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

  const processOffers = (offers) => {
    // Verificar que offers sea un array válido
    if (!Array.isArray(offers)) {
      console.log('No hay ofertas para procesar');
      return [];
    }

    // Crear un objeto para almacenar ofertas únicas
    const uniqueOffers = {};

    offers.forEach(offer => {
      if (!offer || !offer.id) return; // Skip si la oferta no es válida

      if (!uniqueOffers[offer.id]) {
        // Primera vez que vemos esta oferta
        uniqueOffers[offer.id] = {
          ...offer,
          fotos: offer.foto ? [offer.foto] : []
        };
      } else if (offer.foto && !uniqueOffers[offer.id].fotos.includes(offer.foto)) {
        // Agregar nueva foto si no existe
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
            onChangeText={text => setSearch(text)}
            style={styles.searchInput}
          />
        </View>
        
        <ScrollView horizontal style={styles.filterContainer} showsHorizontalScrollIndicator={false}>
            {console.log('Estado actual de categories:', categories)} {/* Debug log */}
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
    backgroundColor: '#ffffff',
    padding: 12,
    borderRadius: 12,
    width: 90,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 3,
  },
  filterImage: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
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
