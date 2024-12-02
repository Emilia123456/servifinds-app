import React, { useState, useEffect } from 'react';
import { View, Text, Image, Modal, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { getUserProfile, updateUserProfile} from '../service/userService'; 
import * as ImagePicker from 'expo-image-picker'; 

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

  const handleChangeProfilePicture = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Se necesitan permisos para acceder a la galería');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    if (!result.canceled) {
      const selectedImageUri = result.assets[0].uri;
      try {
        const response = await updateUserProfile(selectedImageUri);
        if (response.success) {
          setUserProfile((prevState) => ({
            ...prevState,
            foto: selectedImageUri,
          }));
        } else {
          alert('Error al cambiar la foto');
        }
      } catch (error) {
        console.error('Error al actualizar la foto de perfil:', error);
        alert('Hubo un error al actualizar la foto');
      }
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.profileContainer}>
        <Image
          source={
            userProfile.foto
              ? { uri: userProfile.foto }
              : require('../assets/usuario.png') 
          }
          style={styles.profileImage}
        />
        <TouchableOpacity onPress={handleChangeProfilePicture} style={styles.changePictureButton}>
          <Text style={styles.changePictureButtonText}>Cambiar Foto</Text>
        </TouchableOpacity>
        <View style={styles.profileInfo}>
          <Text style={styles.profileName}>{`${userProfile.nombre} ${userProfile.apellido}`}</Text>
          <Text style={styles.profileEmail}>{userProfile.email}</Text>
          <Text style={styles.profileStatus}>{userProfile.direccion}</Text>
        </View>
      </View>

      <View style={styles.actionsContainer}>
        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionText}>Editar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton} onPress={openModal}>
          <Text style={styles.actionText}>Publicar nuevo trabajo</Text>
        </TouchableOpacity>
      </View>

      <Modal visible={modalVisible} animationType="slide" transparent={true} onRequestClose={closeModal}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Publicar nuevo trabajo</Text>
            <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
              <Text style={styles.closeButtonText}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

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
    backgroundColor: '#f4f4f4', 
  },
  profileContainer: {
    alignItems: 'center',
    marginTop: 40, 
    marginBottom: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: '#446C64', 
    backgroundColor: '#e0e0e0', 
  },
  changePictureButton: {
    marginTop: 10,
    backgroundColor: '#446C64',
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  changePictureButtonText: {
    color: '#fff',
    fontWeight: 'bold',
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
  profileStatus: {
    fontSize: 14,
    color: '#888',
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