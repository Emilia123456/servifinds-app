import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const TopOverlay = () => {
  return (
    <View style={styles.overlay}>
      <Text style={styles.logo}>ServiFinds</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 65, // Ajusta la altura según sea necesario
    backgroundColor: '#fff', // Ajusta el color de fondo según sea necesario
    zIndex: 1000, // Asegúrate de que esté en la parte superior
    borderBottomWidth: 0, // Eliminar la línea de separación si existe
    elevation: 0, // Eliminar sombra en Android
  },
  logo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'left',
    padding: 5,
  },
});

export default TopOverlay;
