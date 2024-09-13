import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

// Componente para el calendario
const Calendar = ({ selectedDate, setSelectedDate }) => {
  const dates = [10, 11, 12, 13, 14, 15, 16];

  return (

    <View style={styles.calendarContainer}>
      <View style={styles.header}>
        <Text style={styles.monthText}>Septiembre</Text>
      </View>
      <View style={styles.daysRow}>
        {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
          <Text key={day} style={styles.dayText}>{day}</Text>
        ))}
      </View>
      <View style={styles.dateRow}>
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
  const [selectedDate, setSelectedDate] = useState(15);

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
    padding: 16,
    marginTop: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  calendarContainer: {
    
    backgroundColor: '#fff',
    borderRadius: 10,
    
  },
  monthText: {
    fontSize: 24,
    color: '#1B2E35',
    textAlign: 'left',
    padding: 5,
    fontWeight: 'bold',
    
  },
  daysRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
    marginLeft:10,
  },
  dayText: {
    fontSize: 16,
    color: '#333',
  },
  dateRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginLeft:20,
  },
  date: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    backgroundColor: '#f9f9f9',
    marginBottom:20,
  },
  selectedDate: {
    width: 40,
    height: 40,
    backgroundColor: '#D5F1E4',
    borderColor: '#446C64',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
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
  },
  taskTime: {
    marginRight: 10,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FF6F61',
  },
  taskDescription: {
    fontSize: 14,
    color: '#666',
  }
});

export default BookingScreen;
