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

const BookingScreen = () => {
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [ofrecidos, setOfrecidos] = useState([]); 
  const [animation] = useState(new Animated.Value(0));

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

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tasks for {selectedDate || 'Today'}</Text>

      {/* Scrollable list of offered tasks */}
      <ScrollView>
        {ofrecidos.map((ofrecido) => (
          <View key={ofrecido.id} style={styles.taskCard}>
            <View style={styles.taskHeader}>
              <View style={styles.taskImages}>
                {/* Placeholder for participant images */}
                <Icon name="people-circle" size={24} color="#555" />
              </View>
              <View>
                <Text style={styles.taskTitle}>{ofrecido.titulo}</Text>
                <Text style={styles.taskDescription}>{ofrecido.descripcion}</Text>
              </View>
            </View>
            <View style={styles.taskFooter}>
              <Text style={styles.taskTime}>Price: {ofrecido.precio}</Text>
              <Text style={styles.taskRating}>Rating: {ofrecido.promedio_calificacion}</Text>
            </View>
          </View>
        ))}
      </ScrollView>

      <Text style={styles.title}>Pick a date</Text>
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
          <Icon name="add" size={30} color="white" />
        </TouchableOpacity>
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
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </Modal>
    </View>
  );
};

const getDaysOfCurrentWeek = () => {
  const startOfWeek = moment().startOf('isoWeek');
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
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginVertical: 15,
  },
  taskCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 5,
    elevation: 2,
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
  weekContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  dayButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginHorizontal: 5,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 5,
    elevation: 2,
  },
  selectedDayButton: {
    backgroundColor: '#007AFF',
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
    backgroundColor: '#007AFF',
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
    color: '#007AFF',
    fontSize: 16,
  },
});

export default BookingScreen;
