import React, { useState } from 'react';
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
import Icon from 'react-native-vector-icons/Ionicons'; // Librería de íconos

const BookingScreen = () => {
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [animation] = useState(new Animated.Value(0));

  // Datos de ofrecimientos de ejemplo
  const offeredTasks = {
    '2024-10-08': ['Ofrecimiento 1', 'Ofrecimiento 2'],
    '2024-10-09': ['Ofrecimiento 3'],
    // Agrega más ofrecimientos según sea necesario
  };

  const daysOfWeek = getDaysOfCurrentWeek();

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

  const getOfferedTasksForDate = (date) => {
    return offeredTasks[date] || [];
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Esta semana</Text>
      <View style={styles.weekContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {daysOfWeek.map((day) => (
            <TouchableOpacity
              key={day.dateString}
              onPress={() => setSelectedDate(day.dateString)}
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
                {day.weekday} {day.day}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
        <TouchableOpacity style={styles.openButton} onPress={toggleCalendar}>
          <Icon name="add" size={30} color="white" />
        </TouchableOpacity>
      </View>

      {/* Mostrar ofrecimientos */}
      <View style={styles.offersContainer}>
        {selectedDate ? (
          getOfferedTasksForDate(selectedDate).length > 0 ? (
            getOfferedTasksForDate(selectedDate).map((offer, index) => (
              <Text key={index} style={styles.offerText}>
                {offer}
              </Text>
            ))
          ) : (
            <Text style={styles.noOffersText}>No hay nada en esta fecha</Text>
          )
        ) : (
          <Text style={styles.noDateSelectedText}>Selecciona una fecha</Text>
        )}
      </View>

      <Modal transparent visible={showCalendar} animationType="none">
        <View style={styles.modalBackground}>
          <Animated.View
            style={[
              styles.calendarContainer,
              { transform: [{ scale: animatedScale }], opacity: animatedOpacity },
            ]}
          >
            <Calendar
              onDayPress={(day) => {
                setSelectedDate(day.dateString);
                toggleCalendar();
              }}
              markedDates={{
                [selectedDate]: {
                  selected: true,
                  selectedColor: '#007AFF',
                },
              }}
              theme={{
                selectedDayBackgroundColor: '#007AFF',
                todayTextColor: '#00adf5',
                arrowColor: '#007AFF',
              }}
            />
            <TouchableOpacity onPress={toggleCalendar} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>Cerrar</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </Modal>
    </View>
  );
};

// Función para obtener los días de la semana actual
const getDaysOfCurrentWeek = () => {
  const startOfWeek = moment().startOf('isoWeek'); // Lunes
  const days = [];
  for (let i = 0; i < 7; i++) {
    const day = startOfWeek.clone().add(i, 'days');
    days.push({
      day: day.format('D'),
      weekday: day.format('ddd'),
      dateString: day.format('YYYY-MM-DD'),
    });
  }
  return days;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  weekContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dayButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    backgroundColor: '#f5f5f5',
    borderRadius: 15,
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: 80, // Tamaño uniforme
  },
  selectedDayButton: {
    backgroundColor: '#007AFF',
  },
  dayText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
  },
  selectedDayText: {
    color: 'white',
  },
  openButton: {
    backgroundColor: '#007AFF',
    borderRadius: 50,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
    marginLeft: 15, // Espaciado
  },
  offersContainer: {
    marginTop: 20,
  },
  offerText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 10,
  },
  noOffersText: {
    fontSize: 16,
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
  noDateSelectedText: {
    fontSize: 16,
    color: '#999',
    textAlign: 'center',
    marginTop: 20,
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  calendarContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: 320,
    elevation: 10,
  },
  closeButton: {
    marginTop: 10,
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default BookingScreen;
