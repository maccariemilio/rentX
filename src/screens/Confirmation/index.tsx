import React from "react";

import {
  NavigationProp,
  ParamListBase,
  useNavigation,
  useRoute,
} from "@react-navigation/native";

import { useWindowDimensions } from "react-native";

import { Container, Content, Title, Message, Footer } from "./styles";

import LogoSvg from "../../assets/logo_background_gray.svg";
import DoneSvg from "../../assets/done.svg";
import { ConfirmButton } from "../../components/ConfirmButton";

interface Params {
  title: string;
  message: string;
  nextScreenRoute: string;
}

export function Confirmation() {
  const navigation = useNavigation<NavigationProp<ParamListBase>>();
  const { width } = useWindowDimensions();
  const route = useRoute();
  const { title, message, nextScreenRoute } = route.params as Params;

  function handleHome() {
    navigation.navigate(nextScreenRoute);
  }

  return (
    <Container>
      <LogoSvg width={width}></LogoSvg>

      <Content>
        <DoneSvg width={80} height={80}></DoneSvg>
        <Title>{title}</Title>
        <Message>{message}</Message>
      </Content>
      <Footer>
        <ConfirmButton title={"Ok"} onPress={handleHome}></ConfirmButton>
      </Footer>
    </Container>
  );
}
