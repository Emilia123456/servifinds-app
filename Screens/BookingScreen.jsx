import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Animated,
  Easing,
  ScrollView,
} from 'react-native';
import { Calendar } from 'react-native-calendars';
import moment from 'moment';
import Icon from 'react-native-vector-icons/Ionicons';

import { fetchOfrecidosPorFecha, getDetallesReserva } from '../service/bookingService';

const BookingScreen = () => {
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState(moment().format('YYYY-MM-DD'));
  const [ofrecidos, setOfrecidos] = useState([]);
  const [ofrecidosDetalles, setOfrecidosDetalles] = useState({});
  const [cancelModalVisible, setCancelModalVisible] = useState(false);
  const [cancelingId, setCancelingId] = useState(null);
  const [animation] = useState(new Animated.Value(0));

  const daysOfWeek = getRemainingDaysOfCurrentWeek();

  const toggleCalendar = () => {
    setShowCalendar(!showCalendar);
    Animated.timing(animation, {
      toValue: showCalendar ? 0 : 1,
      duration: 300,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start();
  };

  const animatedScale = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0.9, 1],
  });

  const animatedOpacity = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  useEffect(() => {
    fetchOfrecidos(selectedDate);
  }, [selectedDate]);

  const fetchOfrecidos = async (fecha) => {
    try {
      const data = await fetchOfrecidosPorFecha(fecha);
      setOfrecidos(Array.isArray(data) ? data : []);

      const detalles = {};
      for (const reserva of data) {
        if (reserva.idPublicacion) {
          const detalle = await getDetallesReserva(reserva.idPublicacion);
          if (detalle) {
            detalles[reserva.id] = detalle;
          }
        }
        console.log(detalles[reserva.id].idProveedor);
      }

      setOfrecidosDetalles(detalles);
    } catch (error) {
      setOfrecidos([]);
    }
  };

  const handleCancel = (id) => {
    setCancelModalVisible(true);
    setCancelingId(id);
  };

  const confirmCancel = () => {
    setOfrecidos((prev) =>
      prev.map((item) =>
        item.id === cancelingId ? { ...item, estado: 'Cancelado' } : item
      )
    );
    setCancelModalVisible(false);
    setCancelingId(null);
  };

  const renderEstado = (fecha, estado) => {
    const today = moment().format('YYYY-MM-DD');
    if (estado === 'Cancelado') return '❌ Cancelado';
    if (moment(fecha).isBefore(today)) return '✅ Completado';
    return '⏳ Pendiente';
  };

  return (
    <View style={styles.safeArea}>
      {/* Header con la barra de días de la semana */}
      <View style={styles.header}>
        <Text style={styles.title}>Selecciona una fecha</Text>
        <View style={styles.weekContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {daysOfWeek.map((day) => (
              <TouchableOpacity
                key={day.dateString}
                onPress={() => {
                  setSelectedDate(day.dateString);
                  fetchOfrecidos(day.dateString);
                }}
                style={[
                  styles.dayButton,
                  selectedDate === day.dateString && styles.selectedDayButton,
                ]}
              >
                <Text
                  style={[
                    styles.dayText,
                    selectedDate === day.dateString && styles.selectedDayText,
                  ]}
                >
                  {day.weekday}
                </Text>
                <Text
                  style={[
                    styles.dayNumber,
                    selectedDate === day.dateString && styles.selectedDayText,
                  ]}
                >
                  {day.day}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
          <TouchableOpacity style={styles.openButton} onPress={toggleCalendar}>
            <Icon name="calendar" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Lista de ofrecidos */}
      <ScrollView style={styles.ofrecidosContainer}>
        {ofrecidos.length > 0 ? (
          ofrecidos.map((ofrecido) => {
            const detalle = ofrecidosDetalles[ofrecido.id];
            return (
              <View key={ofrecido.id} style={styles.ofrecidoCard}>
                <Text style={styles.ofrecidoTitle}>
                  {detalle?.titulo || 'Reserva'}
                </Text>
                <View style={styles.ofrecidoInfo}>
                  <Icon name="calendar-outline" size={16} color="#666" />
                  <Text style={styles.ofrecidoDetails}>
                    {moment(ofrecido.fechaReservada).format('DD/MM/YYYY')}
                  </Text>
                </View>
                {detalle && (
                  <>
                    <View style={styles.ofrecidoInfo}>
                      <Icon name="pricetag-outline" size={16} color="#666" />
                      <Text style={styles.ofrecidoDetails}>
                        ${detalle.precio || 'No especificado'}
                      </Text>
                    </View>
                    {/* <View style={styles.ofrecidoInfo}>
                      <Icon name="person-outline" size={16} color="#666" />
                      <Text style={styles.ofrecidoDetails}>
                        Proveedor: {detalle.nombreProveedor || 'No especificado'}
                      </Text>
                    </View> */}
                  </>
                )}
                <View style={styles.statusContainer}>
                  <Text style={styles.statusText}>
                    {renderEstado(ofrecido.fechaReservada, ofrecido.estado)}
                  </Text>
                </View>
                <TouchableOpacity
                  style={styles.cancelButton}
                  onPress={() => handleCancel(ofrecido.id)}
                >
                  <Text style={styles.cancelButtonText}>Cancelar</Text>
                </TouchableOpacity>
              </View>
            );
          })
        ) : (
          <View style={styles.noOfrecidosContainer}>
            <Icon name="calendar-outline" size={50} color="#666" />
            <Text style={styles.noOfrecidosText}>
              No hay reservas para esta fecha
            </Text>
          </View>
        )}
      </ScrollView>

      {/* Modal para cancelar */}
      <Modal
        transparent
        visible={cancelModalVisible}
        onRequestClose={() => setCancelModalVisible(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalText}>¿Seguro que quieres cancelar?</Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.modalButtonConfirm}
                onPress={confirmCancel}
              >
                <Text style={styles.modalButtonText}>Sí</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalButtonCancel}
                onPress={() => setCancelModalVisible(false)}
              >
                <Text style={styles.modalButtonText}>No</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const getRemainingDaysOfCurrentWeek = () => {
  const today = moment();
  const endOfWeek = moment().endOf('isoWeek');
  const days = [];

  for (let day = today; day.isBefore(endOfWeek) || day.isSame(endOfWeek); day.add(1, 'days')) {
    days.push({
      day: day.format('D'),
      weekday: day.format('ddd'),
      dateString: day.format('YYYY-MM-DD'),
    });
  }
  return days;
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 50,
  },
  header: {
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    zIndex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1B2E35',
    marginBottom: 15,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1B2E35',
    marginVertical: 15,
  },
  taskList: {
    flex: 1,
  },
  weekContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  noTasksText: {
    textAlign: 'center',
    color: '#1B2E35',
    marginTop: 20,
  },
  taskCard: {
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
  },
  taskHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  taskImages: {
    marginRight: 10,
  },
  taskTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  taskDescription: {
    fontSize: 14,
    color: '#666',
  },
  taskFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  taskTime: {
    fontSize: 12,
    color: '#999',
  },
  taskRating: {
    fontSize: 12,
    color: '#999',
  },
  dayButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginHorizontal: 5,
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
  },
  selectedDayButton: {
    backgroundColor: '#1B2E35',
  },
  dayText: {
    fontSize: 14,
    color: '#333',
  },
  selectedDayText: {
    color: '#fff',
  },
  dayNumber: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  openButton: {
    backgroundColor: '#1B2E35',
    borderRadius: 50,
    padding: 10,
    marginLeft: 10,
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: '#fff', // Fondo blanco
    borderRadius: 16,       // Bordes redondeados
    padding: 24,            // Espaciado interno
    alignItems: 'center',   // Alinear contenido al centro
    shadowColor: '#000',    // Sombra para iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,           // Sombra para Android
    width: '80%',           // Ancho del modal
  },
  modalText: {
    fontSize: 18,           // Texto más grande
    fontWeight: 'bold',     // Resaltar texto
    color: '#333',          // Texto oscuro
    textAlign: 'center',    // Centrar texto
    marginBottom: 16,       // Separación inferior
  },
  modalButtons: {
    flexDirection: 'row',
    gap: 16,                // Espaciado entre botones
    marginTop: 16,          // Separación superior
  },
  modalButtonConfirm: {
    backgroundColor: '#1B2E35', // Color principal
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  modalButtonCancel: {
    backgroundColor: '#ccc', // Color de cancelación
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  modalButtonText: {
    color: '#fff',          // Texto blanco
    fontSize: 16,           // Tamaño de texto
    fontWeight: 'bold',     // Resaltar texto
    textAlign: 'center',
  },
  
  calendarContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    width: '90%',
  },
  closeButton: {
    marginTop: 20,
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#1B2E35',
    fontSize: 16,
  },
  ofrecidosContainer: {
    flex: 1,
    padding: 16,
  },
  ofrecidoCard: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    elevation: 3,
  },
  ofrecidoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  ofrecidoInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 8,
  },
  ofrecidoDetails: {
    fontSize: 14,
    color: '#666',
    flex: 1,
  },
  statusContainer: {
    marginTop: 8,
    paddingTop: 8,
  },
  statusText: {
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'right',
  },
  noOfrecidosContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50,
    gap: 12,
  },
  noOfrecidosText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  }
});

export default BookingScreen;
