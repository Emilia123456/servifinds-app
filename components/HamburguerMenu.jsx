import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const HamburgerMenu = () => {
  return (
    <View style={styles.menuContainer}>
      <Text style={styles.menuItem}>Opción 1</Text>
      <Text style={styles.menuItem}>Opción 2</Text>
      <Text style={styles.menuItem}>Opción 3</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  menuContainer: {
    flex: 1,
    padding: 20,
  },
  menuItem: {
    fontSize: 18,
    marginVertical: 10,
  },
});

export default HamburgerMenu;
