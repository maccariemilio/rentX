import React from "react";

import LottieView from "lottie-react-native";

import { Container } from "./styles";

import loadCar from "../../assets/loadCar.json";

export function LoadAnimation() {
  return (
    <Container>
      <LottieView
        source={loadCar}
        autoPlay
        style={{ height: 200 }}
      ></LottieView>
    </Container>
  );
}
