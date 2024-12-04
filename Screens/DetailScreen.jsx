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
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createReserva } from '../service/bookingService';
import { getSellerInfo } from '../service/userService';

export default function DetailScreen({ route }) {
  const { idOffer, seller, title, description, imageUri, rating } = route.params;
  const screenWidth = Dimensions.get('window').width;

  const [modalVisible, setModalVisible] = useState(false);
  const [fecha, setFecha] = useState(() => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  });
  const [sellerInfo, setSellerInfo] = useState(null);

  useEffect(() => {
    const fetchSellerInfo = async () => {
      try {
        const sellerData = await getSellerInfo(seller.id);
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
          style={styles.productImage}
        />
        <Text style={styles.productName}>{title}</Text>
        <Text style={styles.productDescription}>{description}</Text>
        <Text style={styles.productRating}>Calificación: {rating || 'Sin calificación'}</Text>

        {sellerInfo && (
          <View style={styles.sellerContainer}>
            <Image
              source={{ uri: sellerInfo.foto || 'https://via.placeholder.com/50' }}
              style={styles.sellerImage}
            />
            <View>
              <Text style={styles.sellerName}>
                {sellerInfo.nombre || 'Nombre no disponible'} {sellerInfo.apellido || ''}
              </Text>
              <Text style={styles.sellerContact}>{sellerInfo.contacto || 'Sin contacto'}</Text>
            </View>
          </View>
        )}

        <TouchableOpacity style={styles.hireButton} onPress={() => setModalVisible(true)}>
          <Text style={styles.buttonText}>Contratar</Text>
        </TouchableOpacity>
      </View>

      <Modal animationType="fade" transparent={true} visible={modalVisible}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>Confirmar Contratación</Text>
            <TextInput
              style={styles.input}
              placeholder="Fecha"
              value={fecha}
              onChangeText={setFecha}
            />
            <TouchableOpacity style={styles.confirmButton} onPress={handleHire}>
              <Text style={styles.buttonText}>Confirmar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
              <Text style={styles.buttonText}>Cancelar</Text>
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
    backgroundColor: '#fff',
  },
  container: {
    padding: 20,
  },
  productImage: {
    width: '100%',
    height: 250,
    borderRadius: 15,
    marginBottom: 20,
    marginTop: 40,
  },
  productName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  productDescription: {
    fontSize: 16,
    color: '#666',
    marginBottom: 10,
  },
  productRating: {
    fontSize: 14,
    color: '#888',
    marginBottom: 20,
  },
  sellerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    padding: 15,
  },
  sellerImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  sellerName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  sellerContact: {
    fontSize: 14,
    color: '#888',
  },
  hireButton: {
    backgroundColor: '#1B2E35',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
  },
  confirmButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
  closeButton: {
    backgroundColor: '#f44336',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
});
