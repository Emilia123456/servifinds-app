import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const HamburgerMenu = ({ visible, onClose }) => {
  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.menuContainer}>
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <Text style={styles.closeButtonText}>X</Text>
        </TouchableOpacity>
        <Text style={styles.menuItem}>Perfil</Text>
        <Text style={styles.menuItem}>Configuraciones</Text>
        <Text style={styles.menuItem}>Cerrar sesión</Text>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  menuContainer: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  closeButton: {
    alignSelf: 'flex-end',
  },
  closeButtonText: {
    fontSize: 20,
    color: '#1B2E35',
  },
  menuItem: {
    fontSize: 18,
    marginVertical: 15,
    color: '#1B2E35',
  },
});

export default HamburgerMenu;
