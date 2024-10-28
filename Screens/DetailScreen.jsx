import React, { useState } from 'react';
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

export default function DetailScreen({ route }) {
  const {idOffer, seller, title, description, price, imageUri, rating} = route.params;
  const screenWidth = Dimensions.get('window').width;
  const screenHeight = Dimensions.get('window').height;

  const [modalVisible, setModalVisible] = useState(false);
  const [fecha, setFecha] = useState('');

  const tok = AsyncStorage.getItem('token');

  const handleHire = () => {
    setModalVisible(false);
    console.log('idOffer', idOffer);
    console.log('fecha', fecha);
    
    let ofrecidoData = {
      idOffer : idOffer,
      fecha : fecha,
      idEstado : 1,
    }

  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Image
          source={imageUri}
          style={[styles.productImage, { width: screenWidth - 40, height: screenHeight * 0.4 }]}
        />

        <View style={styles.detailsContainer}>
          <Text style={styles.productName}>{title}</Text>
          <Text style={styles.productDescription}>{description}</Text>
          <Text style={styles.productDescription}>{price}</Text>
          <Text style={styles.productDescription}>{rating}</Text>
          <View style={styles.sellerContainer}>
            <Image source={{ uri: '../assets/propaganda.png' }} style={styles.sellerImage} />
            <View style={styles.sellerDetails}>
              <Text style={styles.sellerName}>{tok.nombre} {tok.apellido} </Text>
              <Text style={styles.sellerDescription}>Hola, soy el vendedor</Text>
            </View>
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.messageButton}>
              <Text style={styles.buttonText}>Mensaje</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.hireButton}
              onPress={() => setModalVisible(true)}
            >
              <Text style={styles.buttonText}>Contratar</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.commentsSection}>
          <Text style={styles.commentsTitle}>Comentarios</Text>
          <View style={styles.comment}>
            <Text style={styles.commentUser}>John Doe</Text>
            <Text style={styles.commentText}>Excelente servicio</Text>
          </View>
          <View style={styles.comment}>
            <Text style={styles.commentUser}>Jane Smith</Text>
            <Text style={styles.commentText}>Muy recomendado</Text>
          </View>
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
  detailsContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 20,
    width: '90%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 6,
    alignItems: 'center',
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
  messageButton: {
    flex: 1,
    padding: 14,
    borderRadius: 12,
    backgroundColor: '#E8EAF6',
    alignItems: 'center',
    marginRight: 8,
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
  commentsSection: {
    width: '90%',
    backgroundColor: '#FFF',
    padding: 16,
    borderRadius: 12,
    marginTop: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 6,
  },
  commentsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  comment: {
    marginBottom: 16,
  },
  commentUser: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  commentText: {
    fontSize: 14,
    color: '#666',
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
