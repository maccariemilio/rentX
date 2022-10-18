import React, { useEffect, useState } from "react";
import { BacKButton } from "../../components/BackButton";

import {
  Container,
  Header,
  ImageWrapper,
  Photo,
  Title,
  TitleWrapper,
  LogOff,
  Icon,
} from "./styles";
import {
  NavigationProp,
  ParamListBase,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { useTheme } from "styled-components";
import { api } from "../../services/api";
import { useAuth } from "../../hooks/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

export function Profile() {
  const theme = useTheme();
  const navigation = useNavigation<NavigationProp<ParamListBase>>();
  const { signOut } = useAuth();
  const [data, setData] = useState({});

  async function name() {
    try {
      await api.get(`/users`).then(() => {
        console.log("kjaskjadshjk");
      });
    } catch (error) {
      console.log(error.response);
    }
  }

  function handleBack() {
    navigation.goBack();
  }

  function teste() {
    signOut();
  }
  useEffect(() => {
    name();
  }, []);
  return (
    <Container>
      <Header>
        <BacKButton
          onPress={handleBack}
          color={theme.colors.shape}
        ></BacKButton>
        <TitleWrapper>
          <Title>Emilio Maccari</Title>
        </TitleWrapper>
        <LogOff onPress={() => teste()}>
          <Icon name="power"></Icon>
        </LogOff>
      </Header>
      <ImageWrapper>
        <Photo
          source={{
            uri: "https://cdn.discordapp.com/attachments/1010147694142050324/1029395450874306623/unknown.png",
          }}
        ></Photo>
      </ImageWrapper>
    </Container>
  );
}
