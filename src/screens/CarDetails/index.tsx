import React from "react";

import {
  NavigationProp,
  ParamListBase,
  useNavigation,
  useRoute,
} from "@react-navigation/native";

import { BacKButton } from "../../components/BackButton";
import { ImageSlider } from "../../components/ImageSlider";
import { Accessory } from "../../components/Accessory";
import { Button } from "../../components/Buttton";

import { getAccessoryIcon } from "../../utils/getAccessoryIcon";

import {
  Container,
  Header,
  CarImages,
  Content,
  Details,
  Description,
  Brand,
  Name,
  Rent,
  Period,
  Price,
  About,
  Accessories,
  Footer,
} from "./styles";
import { CarDto } from "../../dtos/carDTO";

interface Params {
  car: CarDto;
}

export function CarDetails() {
  const navigation = useNavigation<NavigationProp<ParamListBase>>();
  const route = useRoute();
  const { car } = route.params as Params;

  function handleScheluding() {
    navigation.navigate("Scheluding", { car });
  }

  function handleBack() {
    navigation.goBack();
  }
  // console.log(car);
  return (
    <Container>
      <Header>
        <BacKButton onPress={handleBack}></BacKButton>
      </Header>
      <CarImages>
        <ImageSlider imagesUrl={car.photos}></ImageSlider>
      </CarImages>

      <Content>
        <Details>
          <Description>
            <Brand>{car.brand}</Brand>
            <Name>{car.name}</Name>
          </Description>

          <Rent>
            <Period>{car.rent.period}</Period>

            <Price>{`R$ ${car.rent.price}`}</Price>
          </Rent>
        </Details>
        <Accessories>
          {car.accessories.map((accessory) => (
            <Accessory
              key={accessory.type}
              name={accessory.name}
              icon={getAccessoryIcon(accessory.type)}
            ></Accessory>
          ))}
        </Accessories>
        <About>{car.about}</About>
      </Content>
      <Footer>
        <Button
          title={"Escolher período do aluguel"}
          onPress={handleScheluding}
        ></Button>
      </Footer>
    </Container>
  );
}
