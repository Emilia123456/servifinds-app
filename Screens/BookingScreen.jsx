import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

// Función para obtener los días del mes
const getDaysInMonth = (month, year) => {
  return new Date(year, month + 1, 0).getDate();
};

// Función para obtener el primer día del mes
const getFirstDayOfMonth = (month, year) => {
  return new Date(year, month, 1).getDay();
};

// Nombres de los meses
const monthNames = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

// Componente para el calendario
const Calendar = ({ selectedDate, setSelectedDate }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  const daysInMonth = getDaysInMonth(currentMonth, currentYear);
  const firstDay = getFirstDayOfMonth(currentMonth, currentYear);
  
  const dates = Array.from({ length: daysInMonth }, (_, index) => index + 1);

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  return (
    <View style={styles.calendarContainer}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handlePrevMonth}>
          <Text style={styles.navButton}>{"<"}</Text>
        </TouchableOpacity>
        <Text style={styles.monthText}>{monthNames[currentMonth]} {currentYear}</Text>
        <TouchableOpacity onPress={handleNextMonth}>
          <Text style={styles.navButton}>{">"}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.daysRow}>
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <Text key={day} style={styles.dayText}>{day}</Text>
        ))}
      </View>
      <View style={styles.dateGrid}>
        {Array.from({ length: firstDay }, (_, index) => (
          <View key={`empty-${index}`} style={styles.emptyDate} />
        ))}
        {dates.map(date => (
          <TouchableOpacity
            key={date}
            style={date === selectedDate ? styles.selectedDate : styles.date}
            onPress={() => setSelectedDate(date)}
          >
            <Text style={styles.dateText}>{date}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

// Componente para las tareas
const TaskList = ({ tasks }) => {
  const handleTaskPress = (task) => {
    Alert.alert("Task Details", `You selected the task: ${task.title}`);
  };

  return (
    <View style={styles.taskContainer}>
      <Text style={styles.taskTitle}>Today's Tasks</Text>
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.title}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.taskItem} onPress={() => handleTaskPress(item)}>
            <Text style={styles.taskTime}>{item.time}</Text>
            <View>
              <Text style={styles.taskTitle}>{item.title}</Text>
              <Text style={styles.taskDescription}>{item.description}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

// Pantalla principal
const BookingScreen = () => {
  const [selectedDate, setSelectedDate] = useState(new Date().getDate());

  const tasksForDate = {
    15: [
      { time: '07:00', title: 'Email campaign', description: 'Implement email campaign' },
      { time: '09:00', title: 'Mobile design', description: 'Refine mobile design' },
    ],
    16: [
      { time: '10:00', title: 'Team meeting', description: 'Discuss project updates' },
      { time: '13:00', title: 'Client call', description: 'Review project scope' },
    ],
  };

  return (
    <View style={styles.container}>
      <Calendar selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
      <TaskList tasks={tasksForDate[selectedDate] || []} />
    </View>
  );
};

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
  },
  calendarContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  monthText: {
    fontSize: 24,
    color: '#1B2E35',
    fontWeight: 'bold',
  },
  navButton: {
    fontSize: 20,
    color: '#1B2E35',
  },
  daysRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  dayText: {
    fontSize: 16,
    color: '#333',
    fontWeight: 'bold',
  },
  dateGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  emptyDate: {
    width: 40,
    height: 40,
    margin: 5,
  },
  date: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    backgroundColor: '#f9f9f9',
    margin: 5,
    borderColor: '#ccc',
    borderWidth: 1,
  },
  selectedDate: {
    width: 40,
    height: 40,
    backgroundColor: '#D5F1E4',
    borderColor: '#446C64',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    margin: 5,
    borderWidth: 2,
  },
  dateText: {
    color: '#1B2E35',
    fontWeight: 'bold',
  },
  taskContainer: {
    flex: 1,
    padding: 16,
  },
  taskTitle: {
    fontSize: 18,
    color: '#1B2E35',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  taskItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    backgroundColor: '#fff',
    padding: 8,
    borderRadius: 8,
    borderColor: '#ccc',
    borderWidth: 1,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  taskTime: {
    marginRight: 10,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1B2E35',
  },
  taskDescription: {
    fontSize: 14,
    color: '#666',
  }
});

export default BookingScreen;
