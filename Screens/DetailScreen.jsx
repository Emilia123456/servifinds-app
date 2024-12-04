import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ScrollView,
  Modal,
  TextInput,
  Button,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createReserva } from '../service/bookingService';
import { getSellerInfo } from '../service/userService';

export default function DetailScreen({ route }) {
  const { idOffer, seller, title, description, imageUri, rating } = route.params;
  const screenWidth = Dimensions.get('window').width;
  const screenHeight = Dimensions.get('window').height;

  const [modalVisible, setModalVisible] = useState(false);
  const [fecha, setFecha] = useState(() => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  });
  const [sellerInfo, setSellerInfo] = useState(null);

  // Obtener información del vendedor
  useEffect(() => {
    const fetchSellerInfo = async () => {
      try {
        const sellerData = await getSellerInfo(seller.id); 
        console.log(sellerData);
        setSellerInfo(sellerData);
      } catch (error) {
        console.error('Error al obtener la información del vendedor:', error.message);
      }
    };
  
    if (seller && seller.id) fetchSellerInfo();
  }, [seller]);
  
  const handleHire = async () => {
    setModalVisible(false);
    const ofrecidoData = {
      idPublicacion: idOffer,
      idOffer: idOffer,
      fechaReservada: fecha,
      idEstado: 1,
    };

    try {
      const result = await createReserva(ofrecidoData);
      alert(result ? 'Reserva guardada exitosamente' : 'No se pudo guardar la reserva');
    } catch (error) {
      console.error('Error al guardar la reserva:', error.message);
      alert('Hubo un problema al guardar la reserva. Inténtalo nuevamente.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Image
          source={{ uri: imageUri }}
          style={[styles.productImage, { width: screenWidth - 40, height: screenHeight * 0.4 }]}
          onError={(e) => console.log('Error cargando imagen principal:', e.nativeEvent.error)}
        />
        <Text style={styles.productName}>{title}</Text>
        <Text style={styles.productDescription}>{description}</Text>
        <Text style={styles.productDescription}>⭐ {rating || 'Sin calificación'}</Text>

        {sellerInfo && (
          <View style={styles.sellerContainer}>
            <Image
              source={{ uri: sellerInfo.imageUri || 'https://via.placeholder.com/50' }}
              onError={(e) => console.log('Error cargando imagen del vendedor:', e.nativeEvent.error)}
              style={styles.sellerImage}
            />
            <View style={styles.sellerDetails}>
              <Text style={styles.sellerName}>
                {sellerInfo.nombre || 'Nombre no disponible'} {sellerInfo.apellido || ''}
              </Text>
              <Text style={styles.sellerDescription}>
                {sellerInfo.contacto || 'Información de contacto no disponible'}
              </Text>
            </View>
          </View>
        )}

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.hireButton}
            onPress={() => setModalVisible(true)}
          >
            <Text style={styles.buttonText}>Contratar</Text>
          </TouchableOpacity>
        </View>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>Contratar</Text>
            <TextInput
              style={styles.input}
              placeholder="Fecha"
              placeholderTextColor="#888"
              value={fecha}
              onChangeText={setFecha}
            />
            <Button title="Confirmar" onPress={handleHire} />
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.buttonText}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingBottom: 20,
  },
  productImage: {
    resizeMode: 'cover',
    borderRadius: 15,
    marginVertical: 20,
  },
  productName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    textAlign: 'center',
  },
  productDescription: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 22,
  },
  sellerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  sellerImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  sellerDetails: {
    flex: 1,
  },
  sellerName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  sellerDescription: {
    fontSize: 14,
    color: '#666',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 20,
  },
  hireButton: {
    flex: 1,
    padding: 14,
    borderRadius: 12,
    backgroundColor: '#446C64',
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    width: '80%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 6,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 15,
    paddingLeft: 10,
    borderRadius: 10,
  },
  closeButton: {
    marginTop: 10,
    backgroundColor: '#E8EAF6',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
});
