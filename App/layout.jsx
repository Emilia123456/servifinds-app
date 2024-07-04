import React from "react";
import { View, StyleSheet } from "react-native";
import RootNavigator from "./navigation/RootNavigator";
import Footer from "./Footer";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { useColorScheme } from "@/hooks/useColorScheme";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: "../assets/fonts/SpaceMono-Regular.ttf",
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      <View style={styles.mainContent}>
        <RootNavigator />
      </View>
      <Footer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative', 
  },
  mainContent: {
    flex: 1,
    paddingBottom: 60,  
  },
});
