import React from "react";
import { TouchableOpacityProps } from "react-native";

import { CarDto } from "../../dtos/carDTO";

import {
  Container,
  Detail,
  Brand,
  Name,
  About,
  Rent,
  Period,
  Price,
  Type,
  CarImage,
} from "./styles";

import GasolineSvg from "../../assets/gasoline.svg";
import { getAccessoryIcon } from "../../utils/getAccessoryIcon";

interface Props {
  data: CarDto;
  onPress?: Function;
}

export function Cars({ data, ...rest }: Props) {
  const MotorIcon = getAccessoryIcon(data.fuel_type);
  return (
    <Container {...rest}>
      <Detail>
        <Brand>{data.brand}</Brand>
        <Name>{data.name}</Name>

        <About>
          <Rent>
            <Period>{data.period}</Period>
            <Price>{`R$ ${data.price}`}</Price>
          </Rent>

          <Type>
            <MotorIcon></MotorIcon>
          </Type>
        </About>
      </Detail>

      <CarImage
        source={{
          uri: data.thumbnail,
        }}
      ></CarImage>
    </Container>
  );
}
