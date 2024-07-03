import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {SafeAreaView, View, FlatList, StyleSheet, Text} from 'react-native';

export default function App() {
  const [DATA] = [ //hardcodee lo que nos llegaria por la api de servicios 
    {
      id: '0',
      descrip: 'First Item',
      name: 'Mario',
      price: 10,
      foto: '',
      rate: 4.3,
    },
    {
      id: '1',
      descrip: 'First Item',  
      name: 'Princes',
      price: 20,
      foto: '',
      rate: 3.9,
    },
    {
      id: '2',
      descrip: 'Third Item',
      name: 'Honguito',
      price: 10,
      foto: '',
      rate: 2.3,
    },
    {
      id: '3',
      descrip: 'Fourth Item',
      name: 'Luigi',
      price: 10,
      foto: '',
      rate: 2.3,
    },
  ];

  return (
    <>
      {/*<View style={styles.container}>
        <Text>Open up App.js to start working on your app!</Text>
        <StatusBar style="auto" />
      </View>*/}

      <FlatList> keyExtractor={(item) => item.id}
        data={DATA}
        renderItem={({item}) => (
          <View>
          <Text style ={styles.item}>{item.descrip}</Text>
          <View/>
        )}
      </FlatList>
      

      {/* <SafeAreaView style={styles.container}>
      <FlatList
        data={DATA}
        renderItem={({item}) => <Item title={item.title} />}
        keyExtractor={item => item.id}
      />
      </SafeAreaView> */}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 40,
    paddingHorizontal: 20,
  },
  item: {
    marginTop: 24,
    padding: 30,
    backgroundColor: 'blue',
    fontSize: 24,
    marginHorizontal: 10,
    marginTop: 24,
  }
});
