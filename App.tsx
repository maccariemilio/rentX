import React from "react";
import { Home } from "./src/screens/Home";
import { ThemeProvider } from "styled-components";
// import { useFonts } from "expo-font";
import { CarDetails } from "./src/screens/CarDetails";

import {
  useFonts,
  Inter_400Regular,
  Inter_500Medium,
} from "@expo-google-fonts/inter";
import {
  Archivo_400Regular,
  Archivo_500Medium,
  Archivo_600SemiBold,
} from "@expo-google-fonts/archivo";
import AppLoading from "expo-app-loading";
import { theme } from "./styles/theme";
import { StatusBar } from "react-native";

export default function App() {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Archivo_400Regular,
    Archivo_500Medium,
    Archivo_600SemiBold,
  });

  if (!fontsLoaded) {
    <AppLoading />;
  } else {
    return (
      <ThemeProvider theme={theme}>
        <StatusBar
          barStyle="light-content"
          backgroundColor="transparent"
          translucent
        ></StatusBar>
        <CarDetails />
      </ThemeProvider>
    );
  }
}
