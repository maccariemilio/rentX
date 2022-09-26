import React from "react";

import { Container, Header, TotalCars, HeaderContent, CarList } from "./styles";
import Logo from "../../assets/logo.svg";
import { RFValue } from "react-native-responsive-fontsize";
import { Cars } from "../../components/Cars";

export function Home() {
  const carData = {
    brand: "Nissan",
    name: "R35 Skyline GTR",
    rent: {
      period: "ao dia",
      price: 120,
    },
    thumbnail:
      "http://sogepower.com/public/uploads/bf4592a97520b69dd3d6efa068d9f480.png",
  };

  const carDataTwo = {
    brand: "Dodge",
    name: "Challenger SRT Demon",
    rent: {
      period: "ao dia",
      price: 180,
    },
    thumbnail:
      "https://www.pngmart.com/files/22/Dodge-Demon-PNG-Free-Download.png",
  };
  return (
    <Container>
      <Header>
        <HeaderContent>
          <Logo width={RFValue(108)} height={RFValue(12)}></Logo>
          <TotalCars>Total de 12 carros</TotalCars>
        </HeaderContent>
      </Header>
      <CarList
        data={[1, 2, 3, 4, 5, 6, 7]}
        keyExtratctor={(item: any) => String(item)}
        renderItem={({ item }) => <Cars data={carData}></Cars>}
      ></CarList>
    </Container>
  );
}
