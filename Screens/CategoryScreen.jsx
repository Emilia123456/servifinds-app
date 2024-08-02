import React from 'react';
import { View, Text, TextInput, Image, ScrollView, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';

const { width } = Dimensions.get('window');

export default function SearchScreen({ navigation }) {  // Recibe navigation como prop

  const filters = [
    { name: 'Mejor valorados' },
    { name: 'Precio' },
    { name: 'Más trabajos realizados' },
    { name: 'Cerca tuyo' },
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
  }
});
