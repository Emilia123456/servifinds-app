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

export default function DetailScreen({ route, navigation }) {
  const { idOffer, seller, title, description, imageUri, rating } = route.params;
  const screenWidth = Dimensions.get('window').width;

  const [liked, setLiked] = useState(false); // Estado para el botón de like

  const toggleLike = () => setLiked(!liked);

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <Image
          source={{ uri: imageUri }}
          style={[styles.productImage, { width: screenWidth - 40 }]}
          onError={(e) => console.log('Error cargando imagen:', e.nativeEvent.error)}
        />
        <View style={styles.contentContainer}>
          <View style={styles.textContainer}>
            <Text style={styles.productName}>{title}</Text>
            <Text style={styles.productDescription}>{description}</Text>
            <Text style={styles.productRating}> Calificación: {rating || 'Sin calificación'}</Text>
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.hireButton}>
            <Text style={styles.buttonText}>Contratar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
 
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  backButton: {
    alignSelf: 'flex-start',
    marginTop: 60,
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#EAEAEA',
    borderRadius: 8,
  },
  backButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  productImage: {
    resizeMode: 'cover',
    borderRadius: 15,
    marginBottom: 20,
    height: 200,
  },
  contentContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  textContainer: {
    flex: 1,
    marginRight: 10,
  },
  productName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  productDescription: {
    fontSize: 14,
    color: '#555',
    marginBottom: 8,
  },
  productRating: {
    fontSize: 16,
    color: '#777',
  },
  likeButton: {
    padding: 10,
    borderRadius: 50,
    backgroundColor: '#FFF',
    elevation: 2,
  },
  likeButtonText: {
    fontSize: 20,
    color: '#FF5555',
  },
  buttonContainer: {

    marginTop: 0,
  },
  hireButton: {
    padding: 14,
    borderRadius: 12,
    backgroundColor: '#446C64',
    alignItems: 'center',
    width: '40%',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});