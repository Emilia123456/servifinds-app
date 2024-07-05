import React from 'react';
import { View, Text, TextInput, Image, ScrollView, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';

const { width } = Dimensions.get('window');

export default function ProfileScreen() {

  return (
    <ScrollView style={styles.container}>   
      <View style={styles.recommendationsContainer}>
        <Text style={styles.sectionTitle}>you</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
      },
      header: {
        padding: 16,
      },
      sectionTitle:{
        paddingTop: 15,
        paddingLeft:15,
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
        paddingVertical: 4,
        color: '#1B2E35',
      }
});
