import React from "react";

import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from "@react-navigation/native";

import { useWindowDimensions } from "react-native";

import { Container, Content, Title, Message, Footer } from "./styles";

import LogoSvg from "../../assets/logo_background_gray.svg";
import DoneSvg from "../../assets/done.svg";
import { ConfirmButton } from "../../components/ConfirmButton";

export function ScheludingComplete() {
  const navigation = useNavigation<NavigationProp<ParamListBase>>();
  const { width } = useWindowDimensions();

  function handleHome() {
    navigation.navigate("Home");
  }

  return (
    <Container>
      <LogoSvg width={width}></LogoSvg>

      <Content>
        <DoneSvg width={80} height={80}></DoneSvg>
        <Title>Carro Alugado!</Title>
        <Message>
          Agora você só precisa ir {"\n"} até a concessionária da RENTX {"\n"}
          pegar o seu automóvel.
        </Message>
      </Content>
      <Footer>
        <ConfirmButton title={"Ok"} onPress={handleHome}></ConfirmButton>
      </Footer>
    </Container>
  );
}
