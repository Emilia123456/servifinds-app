import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const OfrecidoListaComponent = ({ ofrecidoListas, navigation }) => {
  const [likedOfrecidoLista, setLikedOfrecidoLista] = React.useState({});

  const handleLike = async (ofrecidoListaId) => {
    try {
      const isLiked = likedOfrecidoLista[ofrecidoListaId];
      const response = await likeofrecidoLista(ofrecidoListaId);

      if (response.status === 201) {
        setLikedOfrecidoLista((prev) => ({
          ...prev,
          [ofrecidoListaId]: !prev[ofrecidoListaId],
        }));
      } else {
        console.error('Error al actualizar el like en el servidor:', response);
      }
    } catch (error) {
      console.error('Error al realizar la solicitud:', error);
    }
  };

  return (
    <View style={styles.OfrecidoListaContainer}>
      <Text style={styles.sectionTitle}>Recomendaciones para ti</Text>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {ofrecidoListas.map((ofrecidoLista, index) => (
          <TouchableOpacity
            key={index}
            style={styles.recommendation}
            onPress={() =>
              navigation.navigate('Detail', {
                idOffer: ofrecidoLista.id,
                seller: ofrecidoLista.idUsuario,
                title: ofrecidoLista.titulo,
                description: ofrecidoLista.descripcion,
                price: ofrecidoLista.precio,
                imageUri: ofrecidoLista.foto,
                rating: ofrecidoLista.promedio_calificacion,
              })
            }
          >
            <Image source={{ uri: ofrecidoLista.foto }} style={styles.recommendationImage} />
            <View style={styles.recommendationText}>
              <View style={styles.rating}>
                <Text style={styles.ratingText}>
                  {typeof ofrecidoLista.promedio_calificacion === 'number'
                    ? ofrecidoLista.promedio_calificacion.toFixed(2)
                    : 'N/A'}
                </Text>
                <TouchableOpacity onPress={() => handleLike(ofrecidoLista.id)}>
                  <Icon
                    name={likedOfrecidoLista[index] ? 'heart' : 'heart-o'}
                    size={22}
                    color={likedOfrecidoLista[index] ? '#e74c3c' : '#7f8c8d'}
                  />
                </TouchableOpacity>
              </View>
              <Text style={styles.recommendationTitle}>{ofrecidoLista.titulo}</Text>
              <Text style={styles.OfrecidoListaubtitle}>{ofrecidoLista.descripcion}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  OfrecidoListaContainer: {
    paddingVertical: 16,
    paddingLeft: 20, 
  },
  sectionTitle: {
    fontSize: 20,
    color: '#1B2E35',
    marginBottom: 12,
    fontWeight: 'bold',
  },
  recommendation: {
    flexDirection: 'column',
    alignItems: 'center',
    marginRight: 16,
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 16,
    borderWidth: 1, 
    borderColor: '#ddd',
    width: 180, 
  },
  recommendationImage: {
    width: 160,
    height: 100,
    borderRadius: 12,
    marginBottom: 8,
  },
  recommendationText: {
    flex: 1,
    alignItems: 'center', 
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 6,
  },
  ratingText: {
    fontSize: 16,
    color: '#2c3e50',
    fontWeight: 'bold',
  },
  recommendationTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 4,
  },
  OfrecidoListaubtitle: {
    fontSize: 14,
    color: '#7f8c8d',
    textAlign: 'center',
  },
});

export default OfrecidoListaComponent;
