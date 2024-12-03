import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { getLikedRecomendations } from '../service/favsService';
import { likeRecomendation } from '../service/favsService';

const RecommendationsComponent = ({ recomendations = [], navigation }) => {
  const [likedOffers, setLikedOffers] = useState(new Set());

  useEffect(() => {
    const loadInitialLikes = async () => {
      try {
        const likedData = await getLikedRecomendations();
        const likedIds = new Set(likedData.map((offer) => offer.id));
        setLikedOffers(likedIds);
      } catch (error) {
        console.error('Error cargando los likes iniciales:', error);
      }
    };
    loadInitialLikes();
  }, []);

  const handleLike = async (offerId) => {
    try {
      await getLikedRecomendations(offerId);
      await likeRecomendation(offerId);
      setLikedOffers((prev) => {
        const newSet = new Set(prev);
        newSet.has(offerId) ? newSet.delete(offerId) : newSet.add(offerId);
        return newSet;
      });
    } catch (error) {
      console.error('Error al dar like:', error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Recomendaciones para ti</Text>
      {recomendations.length > 0 ? (
        recomendations.map((offer, index) => {
          if (!offer || typeof offer !== 'object') return null;
          const isLiked = likedOffers.has(offer.id);

          return (
            <TouchableOpacity
              key={`recommendation-${offer.id || index}`}
              style={[
                styles.recommendationItem,
                isLiked && { backgroundColor: '#f5f5f5' }, // Color si está likeado
              ]}
              onPress={() =>
                navigation.navigate('Detail', {
                  idOffer: offer.id,
                  seller: {
                    id: offer.idProveedor,
                  },
                  title: offer.titulo || 'Sin título',
                  description: offer.descripcion || 'Sin descripción',
                  imageUri: offer.foto || offer.fotos?.[0],
                  rating: parseFloat(offer.promedio_calificacion) || 0,
                })
              }
            >
              <Image
                source={{
                  uri: offer.foto || offer.fotos?.[0] || 'https://via.placeholder.com/300',
                }}
                style={styles.itemImage}
              />
              <View style={styles.itemContent}>
                <Text style={styles.itemTitle} numberOfLines={1}>
                  {offer.titulo || 'Sin título'}
                </Text>
                <Text style={styles.itemDescription} numberOfLines={2}>
                  {offer.descripcion || 'Sin descripción'}
                </Text>
                <View style={styles.footer}>
                  <Text style={styles.itemRating}>
                    {`Calificación: ${(parseFloat(offer.promedio_calificacion) || 0).toFixed(1)}`}
                  </Text>
                  <TouchableOpacity
                    onPress={(e) => {
                      e.stopPropagation();
                      handleLike(offer.id);
                    }}
                  >
                    <Icon
                      name={isLiked ? 'heart' : 'heart-o'}
                      size={20}
                      color={isLiked ? '#1B2E35' : '#1B2E35'}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableOpacity>
          );
        })
      ) : (
        <Text style={styles.emptyMessage}>No hay recomendaciones disponibles</Text>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
  recommendationItem: {
    flexDirection: 'row',
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 6,
    borderRadius: 12,
    backgroundColor: '#f8f9fa',

  },
  itemImage: {
    width: 140,
    height: 100,
    borderRadius: 8,
    marginRight: 16,
    resizeMode: 'cover',
  },
  itemContent: {
    flex: 1,
    justifyContent: 'space-between',
  },
  itemTitle: {
    fontSize: 16,
    color: '#000',
    marginBottom: 4,
  },
  itemDescription: {
    fontSize: 14,
    color: '#4a4a4a',
    marginBottom: 8,
  },
  itemRating: {
    fontSize: 14,
    fontWeight: '500',
    color: '#446C64',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  emptyMessage: {
    textAlign: 'center',
    fontSize: 16,
    color: '#666',
    marginTop: 32,
    fontStyle: 'italic',
  },
});

export default RecommendationsComponent;
