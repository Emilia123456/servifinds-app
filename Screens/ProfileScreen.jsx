import React, { useState, useEffect } from 'react';
import { View, Text, Image, Modal, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { getUserProfile } from '../service/userService';

export default function ProfileScreen({ navigation }) {
  const [likedRecommendations, setLikedRecommendations] = useState({});
  const [modalVisible, setModalVisible] = useState(false);
  const [userProfile, setUserProfile] = useState({
    nombre: '',
    apellido: '',
    email: '',
    direccion: '',
    foto: '',
    FechaNacimiento: '',
  });

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const profileData = await getUserProfile();
        if (profileData) {
          setUserProfile(profileData);
        }
      } catch (error) {
        console.error('Error al obtener el perfil:', error);
      }
    };

    fetchUserProfile();
  }, []);

  const openModal = () => setModalVisible(true);
  const closeModal = () => setModalVisible(false);

  return (
    <ScrollView style={styles.container}>

      {/* Imagen del usuario */}
      <View style={styles.profileContainer}>
        <Image 
          source={userProfile.foto ? { uri: userProfile.foto } : require('../assets/jardineria-recomendaciones.jpg')} 
          style={styles.profileImage} 
        />
        <View style={styles.profileInfo}>
          <Text style={styles.profileName}>{`${userProfile.nombre} ${userProfile.apellido}`}</Text>
          <Text style={styles.profileEmail}>{userProfile.email}</Text>
          <Text style={styles.profileStatus}>{userProfile.direccion}</Text>
        </View>
      </View>

      {/* Botones de acciones */}
      <View style={styles.actionsContainer}>
        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionText}>Editar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton} onPress={openModal}>
          <Text style={styles.actionText}>Publicar nuevo trabajo</Text>
        </TouchableOpacity>
      </View>

      {/* Modal */}
      <Modal 
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={closeModal}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Publicar nuevo trabajo</Text>
            <TouchableOpacity 
              style={styles.closeButton}
              onPress={closeModal}
            >
              <Text style={styles.closeButtonText}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Información adicional */}
      <View style={styles.infoContainer}>
        <View style={styles.infoItem}>
          <Text style={styles.infoTitle}>Información Personal</Text>
          <Text style={styles.infoText}>Fecha de Nacimiento: {new Date(userProfile.FechaNacimiento).toLocaleDateString()}</Text>
          <Text style={styles.infoText}>Dirección: {userProfile.direccion}</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4', // Fondo claro general
  },
  profileContainer: {
    alignItems: 'center',
    marginTop: 40, // Separación superior
    marginBottom: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: '#446C64', // Borde del avatar
    backgroundColor: '#e0e0e0', // Fondo gris si no hay imagen
  },
  profileName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 10,
  },
  profileEmail: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 30,
    paddingHorizontal: 20,
  },
  actionButton: {
    flex: 1,
    backgroundColor: '#446C64',
    paddingVertical: 12,
    marginHorizontal: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  actionText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  infoContainer: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    borderRadius: 5,
    padding: 15,
    marginBottom: 20,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1B2E35',
    marginBottom: 8,
  },
  infoText: {
    fontSize: 14,
    color: '#555',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '90%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1B2E35',
    marginBottom: 15,
    textAlign: 'center',
  },
  closeButton: {
    backgroundColor: '#446C64',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 15,
  },
  closeButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
