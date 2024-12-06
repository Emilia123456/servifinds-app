import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
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

  const daysOfWeek = getRemainingDaysOfCurrentWeek();

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
          <TouchableOpacity style={styles.openButton} onPress={() => setShowCalendar(!showCalendar)}>
            <Icon name="calendar-outline" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Mostrar el calendario */}
      {showCalendar && (
        <View style={styles.calendarContainer}>
          <Calendar
            onDayPress={(day) => {
              setSelectedDate(day.dateString);
              setShowCalendar(false);
            }}
            markedDates={{
              [selectedDate]: { selected: true, selectedColor: '#1B2E35' },
            }}
          />
        </View>
      )}

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
                  <View style={styles.ofrecidoInfo}>
                    <Icon name="pricetag-outline" size={16} color="#666" />
                    <Text style={styles.ofrecidoDetails}>
                      ${detalle.precio || 'No especificado'}
                    </Text>
                  </View>
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
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1B2E35',
    marginBottom: 15,
  },
  weekContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
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
  calendarContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    margin: 16,
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
  },
  noOfrecidosText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  }
});

export default BookingScreen;
