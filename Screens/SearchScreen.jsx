import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions, ScrollView, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { getCategories, searchOffers, getByCategories, getRecomendations } from '../service/offersService'; 
import RecommendationsComponent from '../components/Recommendations';

const { width } = Dimensions.get('window');

export default function SearchScreen({ navigation }) {
  console.log("Renderizando SearchScreen");

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

  // useEffect específico para cargar categorías
  useEffect(() => {
    const loadCategories = async () => {
      try {
        console.log("Cargando categorías..."); // Debug
        const response = await getCategories();
        console.log("Respuesta de categorías:", response); // Debug
        if (response && Array.isArray(response)) {
          setCategories(response);
        }
      } catch (error) {
        console.error("Error al cargar categorías:", error);
        // Categorías básicas sin imágenes
        setCategories([
          { id: 1, nombre: "Jardinería" },
          { id: 2, nombre: "Plomería" },
          { id: 3, nombre: "Electricidad" },
          { id: 4, nombre: "Limpieza" }
        ]);
      }
    };

    loadCategories();
  }, []);

  // useEffect separado para cargar ofertas iniciales
  useEffect(() => {
    const loadInitialOffers = async () => {
      try {
        const offers = await searchOffers("", "", "1", "");
        setCategOffers(offers || []);
      } catch (error) {
        console.error("Error al cargar ofertas:", error);
      }
    };

    loadInitialOffers();
  }, []);

  // Agregar console.log para ver el estado de las categorías
  console.log("Categories state:", categories);

  // Manejador de búsqueda actualizado
  const handleSearch = async (searchText) => {
    setSearch(searchText);
    try {
      // Mantiene el ordenamiento por promedio pero agrega el texto de búsqueda
      const searchResults = await searchOffers(searchText, "", "1", "");
      setCategOffers(searchResults || []);
    } catch (error) {
      console.error('Error en búsqueda:', error);
    }
  };

  const handleCategoryPress = async (nombCateg) => {
    try {
      // Mantiene el ordenamiento por promedio pero filtra por categoría
      const response = await searchOffers("", nombCateg, "1", "");
      setCategOffers(response || []);
    } catch (error) {
      console.error('Error cargando categoría:', error);
      setCategOffers([]);
    }
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
            onChangeText={handleSearch}
            style={styles.searchInput}
          />
        </View>
        
        <ScrollView 
          horizontal 
          style={styles.filterContainer} 
          showsHorizontalScrollIndicator={false}
        >
          {categories.length > 0 ? (
            categories.map((category, index) => (
              <TouchableOpacity 
                key={category.id || index}
                style={[
                  styles.category,
                  selectedFilters.categoria === category.nombre && {
                    backgroundColor: '#D5F8E4',
                    borderColor: '#446C64',
                  }
                ]}
                onPress={() => handleCategoryPress(category.nombre)}
              >
                <Image
                  source={{ uri: `https://diverse-tightly-mongoose.ngrok-free.app${category.imageURL}` }}
                  style={styles.categoryImage}
                />
                <Text style={styles.filterText}>{category.nombre}</Text>
              </TouchableOpacity>
            ))
          ) : (
            <Text>Cargando categorías...</Text>
          )}
        </ScrollView>

        {categOffers.length > 0 ? (
          <View>
            {categOffers.map((offer, index) => (
              <RecommendationsComponent 
                key={index} 
                recomendations={[offer]}
              />
            ))}
          </View>
        ) : (
          <Text>No hay ofrecimientos disponibles</Text>
        )}
      </ScrollView>
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
    paddingVertical: 12,
    marginBottom: 8,
  },
  category: {
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
    minWidth: 90,
  },
  categoryImage: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    marginBottom: 8,
    backgroundColor: '#F5F5F5', // Color de fondo mientras carga
  },
  filterText: {
    color: '#1B2E35',
    fontSize: 12,
    fontWeight: '500',
    textAlign: 'center',
    marginTop: 4,
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
