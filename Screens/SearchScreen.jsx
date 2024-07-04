import React from 'react';
import { View, Text, TextInput, StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export default function SearchScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.logo}>ServiFinds</Text>
      <TextInput style={styles.searchInput} placeholder="Buscar" />
      <Text style={styles.sectionTitle}>Categorías</Text>
      <View style={styles.categoriesContainer}>
        <Text style={styles.category}>Limpieza</Text>
        <Text style={styles.category}>Arreglos</Text>
        <Text style={styles.category}>Jardinería</Text>
        <Text style={styles.category}>Manicura</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
    marginTop: 40,
  },
  logo: {
    fontSize: 16,
 }
})



  