import React, { useEffect, useState, useRef } from 'react';
import { View, Text, Image, ScrollView, StyleSheet, Dimensions, TouchableOpacity, Animated, BackHandler } from 'react-native'; 
import { useFocusEffect } from '@react-navigation/native';
import { searchOffers } from '../service/offersService.js';
import SearchScreen from '../screens/SearchScreen.jsx';
import FilterComponent from '../components/Filter.jsx';
import RecommendationsComponent from '../components/Recommendations.jsx';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { getUserProfile } from '../service/userService';

const { width } = Dimensions.get('window');

export default function HomeScreen({ navigation }) {
  const [selectedFilter, setSelectedFilter] = useState('All'); // Estado para el filtro seleccionado
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [recomendations, setRecomendations] = useState([]);
  const [isMenuVisible, setMenuVisible] = useState(false);
  const shownIds = new Set(); 
  const [userName, setUserName] = useState('Usuario');

  useEffect(() => {
    const getUserData = async () => {
      try {
        const userData = await getUserProfile();
        if (userData && userData.nombre) {
          const nombreCompleto = `${userData.nombre} ${userData.apellido}`;
          setUserName(nombreCompleto);
        }
      } catch (error) {
        console.error('Error al obtener datos del usuario:', error);
        setUserName('Usuario');
      }
    };

    getUserData();
  }, []);

  useEffect(() => {
    const fetchRecomendations = async () => {
      try {
        const data = await searchOffers({
          mayorPromedio: "1"
        });
        
        // Filtrar duplicados
        const uniqueRecommendations = data.filter(recomendation => {
          if (!shownIds.has(recomendation.id)) {
            shownIds.add(recomendation.id);
            return true;
          }
          return false;
        });
        
        setRecomendations(uniqueRecommendations);
      } catch(error) {
        console.error("Error al obtener recomendaciones:", error);
        setRecomendations([]);
      }
    };

    fetchRecomendations();
  }, []);

  const propagandaImages = [
    require('../assets/propp.png'),
  ];

  const handleScroll = (event) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(contentOffsetX / width);
    setActiveImageIndex(index); 
  };

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => true;
      BackHandler.addEventListener('hardwareBackPress', onBackPress);
      return () => BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, [])
  );

  return (
    <ScrollView style={styles.container} >
      <View style={styles.header}>
        <View style={styles.leftHeader}>
          <Text style={styles.logo}>¡Hola {userName}!</Text>
          <Text style={styles.subtitle}>¿Qué servicio contratarás hoy?</Text>
        </View>
        
      </View>
      <View style={styles.propagandaContainer}>
        <View style={styles.promoOverlay}>
        <Text style={styles.promoTitle}>Ofertas</Text>
          <Text style={styles.promoText}>¡Descubre servicios únicos en tu zona!</Text>
          <TouchableOpacity style={styles.promoButton} onPress={() => navigation.navigate('Search')} >
            <Text style={styles.promoButtonText}>Explorar</Text>
          </TouchableOpacity>
        </View>
        <ScrollView
          
        >
          {propagandaImages.map((imageUri, index) => (
            <View key={index} style={styles.imageWrapper}>
              <Image source={imageUri} style={styles.propagandaImage} />
            </View>
          ))}
        </ScrollView>
      </View>
      <View >
        
      </View>
  

      <Text style={styles.title}>Recomendaciones para ti</Text>
      <RecommendationsComponent
        navigation={navigation}
        recomendations={recomendations}
        selectedFilter={selectedFilter}
      />

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    marginTop: 50,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  leftHeader: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },

  notificationContainer: {
    marginLeft: 'auto',
    marginTop: -20,
    marginRight: 10,
  },
  notificationIcon: {
    width: 23,
    height: 23,
    
  },
  subtitle: {
    fontSize: 18,
    color: '#1B2E35',
    textAlign: 'left',
    padding: 10,
    flexDirection: 'column',
    marginTop: -10,
    fontWeight: 'normal',
  },
  logo: {
    fontSize: 24,
    color: '#1B2E35',
    textAlign: 'left',
    padding: 10,
    flexDirection: 'column',
    marginTop: 10,
    fontWeight: 'normal',
  },
  propagandaContainer: {

    alignItems: 'center',
  },
  imageWrapper: {
    width: width,
    alignItems: 'center',
  },
  propagandaImage: {
    width: width - 40,
    height: 180,
    borderRadius: 30,
    padding:5,
  },
    promoOverlay: {
      position: 'absolute',
      top: 27,
      zIndex: 1,
      alignItems: 'center',
    },
    promoText: {
      fontSize: 14,
      color: '#1B2E35',
      textAlign: 'left',
      marginBottom: 20,
      marginLeft: -90,
      width: 200,
    },
    promoTitle: {
      fontSize: 20,
      color: '#1B2E35',
      textAlign: 'left',
      marginBottom: 5,
      marginLeft: -90,
      width: 200,
    },
    promoButton: {
      backgroundColor: '#1B2E35',
      paddingVertical: 8,
      paddingHorizontal: 20,
      marginLeft: -190,
      borderRadius: 10,
    },
    promoButtonText: {
      color: '#fff',
    },
    imageWrapper: {
      width: width,
      alignItems: 'center',
    },
    title: {
      fontSize: 20,
      color: '#1B2E35',
      textAlign: 'left',
      padding: 30,
      paddingBottom:10,
      flexDirection: 'column',
      fontWeight: 'normal',
    },

  });
