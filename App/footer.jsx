import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function Footer() {
  return (
    <View style={styles.footer}>
      <Text style={styles.footerItem}>Home</Text>
      <Text style={styles.footerItem}>Busqueda</Text>
      <Text style={styles.footerItem}>Reservas</Text>
      <Text style={styles.footerItem}>Favoritos</Text>
      <Text style={styles.footerItem}>Perfil</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    height: 60,
    borderTopWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "#fff",
    position: "absolute",
    bottom: 0,
    width: "100%",
  },
  footerItem: {
    textAlign: "center",
  },
});
