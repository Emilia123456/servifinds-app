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
      {/* Imagen de portada */}
      <View style={styles.coverContainer}>
        <Image 
          source={userProfile.foto ? { uri: userProfile.foto } : require('../assets/jardineria-recomendaciones.jpg')} 
          style={styles.coverImage} 
        />
      </View>

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
    backgroundColor: '#fff',
  },
  coverContainer: {
    height: 200,
    backgroundColor: '#f0f0f0',
  },
  coverImage: {
    width: '100%',
    height: '100%',
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginTop: -60, 
    marginBottom: 20,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 4,
    borderColor: '#fff',
    marginRight: 16,
  },
  profileInfo: {
    flex: 1,
    alignItems: 'flex-start',
  },
  profileName: {
    fontSize: 22, 
    fontWeight: 'bold',
    color: '#333',
    marginTop: 70,
    marginBottom: 0,
  },
  profileStatus: {
    fontSize: 14,
    color: '#446C64',
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 16,
  },
  actionButton: {
    backgroundColor: '#446C64',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
  },
  actionText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  infoContainer: {
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  infoItem: {
    marginBottom: 10,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1B2E35',
  },
  infoText: {
    fontSize: 14,
    color: '#777',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '90%',
    maxHeight: '80%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
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
