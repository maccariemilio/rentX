import React, { useEffect, useState } from "react";

import { Ionicons } from "@expo/vector-icons";

import { CarDto } from "../../dtos/carDTO";

import { PanGestureHandler } from "react-native-gesture-handler";

import Animated, {
  useAnimatedStyle,
  useSharedValue,
  useAnimatedGestureHandler,
  withSpring,
} from "react-native-reanimated";
import { TouchableOpacity } from "react-native";

import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from "@react-navigation/native";

import { api } from "../../services/api";

import {
  Container,
  Header,
  TotalCars,
  HeaderContent,
  CarList,
  MyCarButton,
} from "./styles";
import Logo from "../../assets/logo.svg";
import { RFValue } from "react-native-responsive-fontsize";
import { Cars } from "../../components/Cars";
import { LoadAnimation } from "../../components/LoadAnimation";

export function Home() {
  const [cars, setCars] = useState<CarDto[]>([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation<NavigationProp<ParamListBase>>();

  function handleCarDetails(car: CarDto) {
    navigation.navigate("CarDetails", { car });
  }

  useEffect(() => {
    async function fetchCars() {
      try {
        const response = await api.get("/cars");
        setCars(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    fetchCars();
  }, []);

  return (
    <Container>
      <Header>
        <HeaderContent>
          <Logo width={RFValue(108)} height={RFValue(12)}></Logo>
          <TotalCars>Total de {cars.length} carros</TotalCars>
        </HeaderContent>
      </Header>
      {loading ? (
        <LoadAnimation />
      ) : (
        <CarList
          data={cars}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => (
            <Cars data={item} onPress={() => handleCarDetails(item)}></Cars>
          )}
        ></CarList>
      )}
    </Container>
  );
}
