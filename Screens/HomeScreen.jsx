import React, { useEffect, useState, useRef } from 'react';
import { View, Text, Image, ScrollView, StyleSheet, Dimensions, TouchableOpacity, Animated, PanResponder, BackHandler } from 'react-native'; 
import { useFocusEffect } from '@react-navigation/native';
import { getRecomendations } from '../service/offersService.js';
import FilterComponent from '../components/Filter.jsx';
import RecommendationsComponent from '../components/Recommendations.jsx';
import HamburgerMenu from '../components/HamburguerMenu.jsx';

const { width } = Dimensions.get('window');

export default function HomeScreen({ navigation }) {
  const [selectedFilter, setSelectedFilter] = useState('All'); // Estado para el filtro seleccionado
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [recomendations, setRecomendations] = useState([]);
  const [isMenuVisible, setMenuVisible] = useState(false);
  const shownIds = new Set(); 


  const menuAnimation = useRef(new Animated.Value(-width * 0.75)).current; // Empieza fuera de la pantalla

  useEffect(() => {
    const fetchRecomendations = async () => {
      try {
        const data = await getRecomendations();

        // Filtrar duplicados basado en un id
        const uniqueRecommendations = data.filter((recomendation) => {
          if (!shownIds.has(recomendation.id)) {
            shownIds.add(recomendation.id);
            return true;
          }
          return false;
        });

        setRecomendations(uniqueRecommendations);
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchRecomendations();
  }, []);


  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (evt, gestureState) => {
        // Detecta si se desliza desde el borde izquierdo para abrir el menú
        return gestureState.dx > 20 || gestureState.dx < -20;
      },
      onPanResponderMove: (evt, gestureState) => {
        // Controla la apertura/cierre del menú deslizando
        if (gestureState.dx > 0) {
          Animated.timing(menuAnimation, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
          }).start();
          setMenuVisible(true);
        } else if (gestureState.dx < -0) {
          Animated.timing(menuAnimation, {
            toValue: -width,
            duration: 300,
            useNativeDriver: true,
          }).start(() => setMenuVisible(false));
        }
      },
    })
  ).current;



  const propagandaImages = [
    require('../assets/propaganda.png'),
    require('../assets/propaganda2.png'),
    require('../assets/propaganda3.png'),
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
    <ScrollView style={styles.container} {...panResponder.panHandlers}>
      <View style={styles.header}>
        <View style={styles.leftHeader}>
          <TouchableOpacity onPress={() => setMenuVisible(true)} style={styles.menuContainer}>
            <Image source={require('../assets/menu.png')} style={styles.menuIcon} />
          </TouchableOpacity>
        </View>
        <Text style={styles.logo}>Hola Usuario!</Text>
        <TouchableOpacity onPress={() => navigation.navigate('NotificationScreen')} style={styles.notificationContainer}>
          <Image source={require('../assets/notificacion.png')} style={styles.notificationIcon} />
        </TouchableOpacity>
      </View>

      <Text style={styles.subtitle}>¿Qué servicio contratarás hoy?</Text>

      <View style={styles.propagandaContainer}>
        <ScrollView
          horizontal
          pagingEnabled
          onScroll={handleScroll}
          showsHorizontalScrollIndicator={false}
          scrollEventThrottle={16}
        >
          {propagandaImages.map((imageUri, index) => (
            <View key={index} style={styles.imageWrapper}>
              <Image source={imageUri} style={styles.propagandaImage} />
            </View>
          ))}
        </ScrollView>
      </View>

  
      <FilterComponent selectedFilter={selectedFilter} setSelectedFilter={setSelectedFilter} />

      <RecommendationsComponent
        navigation={navigation}
        recomendations={recomendations}
        selectedFilter={selectedFilter}
      />

      <Animated.View style={[styles.menuOverlay, { transform: [{ translateX: menuAnimation }] }]}>
        <HamburgerMenu />
      </Animated.View>

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
  menuIcon: {
    width: 25,
    height: 25,
    marginBottom: 10,
  },
  notificationContainer: {
    marginLeft: 'auto',
  },
  notificationIcon: {
    width: 25,
    height: 25,
  },
  subtitle: {
    fontSize: 16,
    color: '#8a8888',
    textAlign: 'left',
    padding: 5,
    fontWeight: 'bold',
  },
  logo: {
    fontSize: 24,
    color: '#1B2E35',
    textAlign: 'left',
    padding: 5,
    flexDirection: 'column',
    marginTop: 5,
    fontWeight: 'bold',
  },
  propagandaContainer: {
    marginVertical: 20,
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
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },


});
