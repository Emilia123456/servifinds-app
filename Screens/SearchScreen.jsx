import React from 'react';
import { useEffect, useState } from 'react';
import { View, Text, TextInput, Image, ScrollView, StyleSheet, Dimensions, TouchableOpacity,  FlatList, Button, Alert } from 'react-native';
import { searchOffers } from '../service/offersService.js';
const { width } = Dimensions.get('window');

const EventoItem = ({ evento, onPress }) => (
  <TouchableOpacity style={styles.itemContainer} onPress={onPress}>
    <Image source={{ uri: evento.Poster }} style={styles.imagen} />
    <View style={styles.textContainer}>
      <Text style={styles.name}>{evento.Title}</Text>
      <Text style={styles.description}>{evento.Type}</Text>
      <Text style={styles.start_date}>{evento.Year}</Text>
    </View>
  </TouchableOpacity>
);

export default function SearchScreen({ navigation }) {  // Recibe navigation como prop

  const [search, setSearch] = useState(''); 
  const [offers, setOffers] = useState([]);

  const fetchOffers = async () => {
    try {
      const response = await searchOffers(search);
      if (response.Search) {
        setOffers(response.Search);  
      } else {
        Alert.alert('No se encontraron resultados');
        setOffers([]);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      Alert.alert('Error al buscar ofrecidos');
    }
  };

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
        <TextInput
        value={search}
        placeholder="Buscar"
        placeholderTextColor="#777"
        onChangeText={text => setSearch(text)}
        style={styles.searchInput}
        />
        <Button title="Buscar" onPress={fetchOffers} />
      </View>
      
 
      <View style={styles.categoriesContainer}>
        {categories.map((category, index) => (
          <TouchableOpacity 
            key={index} 
            style={styles.category}
            onPress={() => navigation.navigate('Categoría', { 
              title: category.name,
              imageUri: category.imageUri,
              idCategory: category.id,
            })}
          >
            <Image source={category.imageUri} style={styles.categoryImage} />
            <Text style={styles.categoryText}>{category.name}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList 
          data={offers}
          renderItem={({ item }) => (
            <EventoItem
              evento={item}
              onPress={() => navigation.navigate('Detail', { evento: item })}
            />
          )}
          keyExtractor={item => (item.imdbID ? item.imdbID.toString() : Math.random().toString())}
      />


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
    marginTop: 52,
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
  categoriesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 230,
  },
  category: {
    width: (width - 64) / 2,  // Dos categorías por fila
    height: (width - 64) / 2, // Hacer los contenedores cuadrados
    backgroundColor: '#f9f9f9',  // Mismo color que los contenedores de las recomendaciones
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,  // Bordeado similar al resto de los contenedores
    marginBottom: 16,
  },
  categoryImage: {
    width: 50,  // Ajustar tamaño de la imagen
    height: 50, // Ajustar tamaño de la imagen
    marginBottom: 8,
  },
  categoryText: {
    fontSize: 16,
    color: '#1B2E35',
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1B2E35',
    paddingHorizontal: 16,
    paddingTop: 10,
    marginBottom: 10,
  },
});
