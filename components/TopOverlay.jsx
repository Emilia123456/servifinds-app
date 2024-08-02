import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const TopOverlay = () => {
  return (

      <View style={styles.overlay}>
        <Text style={styles.logo}>ServiFinds</Text>
      </View>


  );
};

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 60,
    left: 1,
    right: 0,
    height: 55,
    backgroundColor: '#fff', 
    zIndex: 1000, 
    borderBottomWidth: 0, 
    elevation: 0, 
  },
  logo: {
    fontSize: 24,
    left: 15,
    fontWeight: 'bold',
    color: '#1B2E35',
    textAlign: 'left',
    padding: 5,
  },
});

export default TopOverlay;
