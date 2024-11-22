import React, { useState } from 'react';
import { View, Text, Image, Modal, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function ProfileScreen({ navigation }) {
  const [likedRecommendations, setLikedRecommendations] = useState({}); // Estado para manejar los likes en trabajos realizados
  const [modalVisible, setModalVisible] = useState(false);

  const openModal = () => {
    setModalVisible(true);
  }

  
  const closeModal = () => {
    setModalVisible(false);
  }
  const userProfile = {
    name: 'Jaboris Wells',
    status: 'Mantenimiento de jardines',
    mutualFriends: 8,
    coverImageUri: require('../assets/jardineria-recomendaciones.jpg'), 
    imageUri: require('../assets/jardineria-recomendaciones.jpg'),
  };

  const recommendations = [
    {
      title: 'Jardinería en hogar',
      description: 'Mantenimiento de jardines',
      imageUri: require('../assets/jardineria-recomendaciones.jpg'),
    },
    {
      title: 'Servicio de plomería',
      description: 'Reparación de cañerías',
      imageUri: require('../assets/plomeria-recomendaciones.jpg'),
    },
  ];

  const handleLike = (index) => {
    setLikedRecommendations((prev) => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  return (
    <ScrollView style={styles.container}>
      {/* Imagen de portada */}
      <View style={styles.coverContainer}>
        <Image source={userProfile.coverImageUri} style={styles.coverImage} />
      </View>

      {/* Imagen del usuario */}
      <View style={styles.profileContainer}>
        <Image source={userProfile.imageUri} style={styles.profileImage} />
        <View style={styles.profileInfo}>
          <Text style={styles.profileName}>{userProfile.name}</Text>
          <Text style={styles.profileUsername}>{userProfile.username}</Text>
          <Text style={styles.profileStatus}>{userProfile.status}</Text>
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
        <Modal 
          visible={modalVisible}
          animationType="slide"
          transparent={true}
          onRequestClose={closeModal}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Publicar nuevo trabajo</Text>
              {/* Aquí irá el formulario */}
              <TouchableOpacity 
                style={styles.closeButton}
                onPress={closeModal}
              >
                <Text style={styles.closeButtonText}>Cerrar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>

      {/* Información adicional */}
      <View style={styles.infoContainer}>
        <View style={styles.infoItem}>
          <Text style={styles.infoTitle}>Trabajos realizados</Text>
          <Text style={styles.infoText}>{userProfile.mutualFriends} proyectos completados</Text>
        </View>
      </View>

      {/* Trabajos realizados */}
      <View style={styles.recommendationsContainer}>
        <Text style={styles.sectionTitle}>Ofrecidos</Text>
        {recommendations.map((recommendation, index) => (
          <TouchableOpacity
            key={index}
            style={styles.recommendation}
            onPress={() => navigation.navigate('Detail', {
              title: recommendation.title,
              description: recommendation.description,
              imageUri: recommendation.imageUri,
            })}
          >
            <Image source={recommendation.imageUri} style={styles.recommendationImage} />
            <View style={styles.recommendationText}>
              <View style={styles.rating}>
                <Text style={styles.ratingText}>4.9 (234)</Text>
                <TouchableOpacity onPress={() => handleLike(index)}>
                  <Icon name={likedRecommendations[index] ? 'heart' : 'heart-o'} size={20} color={likedRecommendations[index] ? '#e74c3c' : '#7f8c8d'} />
                </TouchableOpacity>
              </View>
              <Text style={styles.recommendationTitle}>{recommendation.title}</Text>
              <Text style={styles.recommendationSubtitle}>{recommendation.description}</Text>
            </View>
          </TouchableOpacity>
        ))}
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
  recommendationsContainer: {
    padding: 16,
    marginTop: 0,
  },
  sectionTitle: {
    fontSize: 18,
    color: '#1B2E35',
    marginBottom: 9,
    fontWeight: 'bold',
  },
  recommendation: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    backgroundColor: '#f9f9f9',
    padding: 8,
    borderRadius: 8,
  },
  recommendationImage: {
    width: 140,
    height: 90,
    borderRadius: 8,
    marginRight: 8,
  },
  recommendationText: {
    flex: 1,
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  ratingText: {
    fontSize: 14,
    color: '#7f8c8d',
  },
  recommendationTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  recommendationSubtitle: {
    fontSize: 12,
    color: '#666',
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
