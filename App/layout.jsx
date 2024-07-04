import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import "react-native-reanimated";
import RootNavigator from "./navigation/RootNavigator";

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
          <RootNavigator />
    </View>
  );


}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
