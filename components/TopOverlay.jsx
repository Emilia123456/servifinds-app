import React from 'react';
import { View, Text, StyleSheet,  } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const TopOverlay = ({ showText }) => {
  return (
    <View style={styles.overlay}></View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: -30,
    left: 1,
    right: 0,
    backgroundColor: '#fff', 
    zIndex: 1000, 
    borderBottomWidth: 0, 
    elevation: 0, 
    marginTop:40,
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