import React from 'react';
import { ScrollView, TouchableOpacity, Text, StyleSheet } from 'react-native';

const FilterComponent = ({ selectedFilter, setSelectedFilter, navigation }) => {
  const filters = ['Todo', 'Nuevo', 'Popular', 'Mejor calificación'];

  return (
    <>
      <Text style={styles.sectionTitle}>Filtrar</Text>
      <TouchableOpacity
          style={styles.viewAllButton} // Estilo sin borde
          onPress={() => navigation.navigate('SearchScreen')} // Redirige a SearchScreen
        >
          <Text style={styles.viewAllText}>Ver todo</Text>
        </TouchableOpacity>
      <ScrollView horizontal style={styles.filterButtonsContainer} showsHorizontalScrollIndicator={false}>
        {filters.map((filter, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.filterButton,
              selectedFilter === filter && styles.selectedFilterButton,
            ]}
            onPress={() => setSelectedFilter(filter)}
          >
            <Text
              style={[
                styles.filterButtonText,
                selectedFilter === filter && styles.selectedFilterText,
              ]}
            >
              {filter}
            </Text>
          </TouchableOpacity>
        ))}

        {/* Botón Ver Todo */}

      </ScrollView>        

    </>
  );
};

const styles = StyleSheet.create({
  filterButtonsContainer: {
    flexDirection: 'row',
    paddingBottom: 10,
    paddingTop: 10,
    paddingLeft: 30,
  },
  filterButton: {
    height: 38,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
    marginBottom: 7,
    paddingHorizontal: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#fff',
  },
  selectedFilterButton: {
    backgroundColor: '#1B2E35',
    borderWidth: 0,
  },
  filterButtonText: {
    fontSize: 13,
    color: '#a3a2a2',
    textAlign: 'left',
    padding: 5,
    fontWeight: 'normal',
  },
  selectedFilterText: {
    color: '#fff',
  },
  sectionTitle: {
    fontSize: 18,
    color: '#1B2E35',
    marginBottom: 9,
    fontWeight: 'normal',
    paddingTop: 10,
    paddingLeft: 20,
  },
  // Estilo del botón Ver Todo sin borde
  viewAllButton: {
    height: 38,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 'auto',
    paddingHorizontal: 16,
    marginTop:-38,

  },
  viewAllText: {
    fontSize: 12,
    color: '#a3a2a2',
    textAlign: 'left',
    fontWeight: 'normal',
  },
});

export default FilterComponent;
