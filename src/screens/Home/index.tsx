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
import { BackHandler, StyleSheet, TouchableOpacity } from "react-native";

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
import { Load } from "../../components/Load";
import { useTheme } from "styled-components";
import { LoadAnimation } from "../../components/LoadAnimation";

const ButtonAnimated = Animated.createAnimatedComponent(TouchableOpacity);

export function Home() {
  const positionX = useSharedValue(0);
  const positionY = useSharedValue(0);

  const myCarsButtonStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: positionX.value },
        { translateY: positionY.value },
      ],
    };
  });

  const onGestureEvent = useAnimatedGestureHandler({
    onStart(event, ctx: any) {
      ctx.positionX = positionX.value;
      ctx.positionY = positionY.value;
    },
    onActive(event, ctx: any) {
      positionX.value = ctx.positionX + event.translationX;
      positionY.value = ctx.positionY + event.translationY;
    },
    onEnd(event, context) {
      positionX.value = withSpring(0);
    },
  });

  const theme = useTheme();
  const [cars, setCars] = useState<CarDto[]>([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation<NavigationProp<ParamListBase>>();

  function handleCarDetails(car: CarDto) {
    navigation.navigate("CarDetails", { car });
  }

  function handleOpenMyCar() {
    navigation.navigate("MyCars");
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

  // useEffect(() => {
  //   BackHandler.addEventListener("hardwareBackPress", () => {
  //     return true;
  //   });
  // }, []);

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
      <PanGestureHandler onGestureEvent={onGestureEvent}>
        <Animated.View
          style={[
            myCarsButtonStyle,
            {
              position: "absolute",
              bottom: 13,
              right: 22,
            },
          ]}
        >
          <ButtonAnimated
            onPress={handleOpenMyCar}
            style={[style.button, { backgroundColor: theme.colors.main }]}
          >
            <Ionicons
              name="car-sport"
              size={32}
              color={theme.colors.shape}
            ></Ionicons>
          </ButtonAnimated>
        </Animated.View>
      </PanGestureHandler>
    </Container>
  );
}

const style = StyleSheet.create({
  button: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
});
