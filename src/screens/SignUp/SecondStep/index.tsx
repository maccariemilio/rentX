import React, { useState } from "react";
import { BacKButton } from "../../../components/BackButton";
import { Bullet } from "../../../components/Bullet";
import { Input } from "../../../components/Input";
import { Button } from "../../../components/Buttton";
import { PasswordInput } from "../../../components/PasswordInput";
import { Confirmation } from "../../Confirmation";

import {
  StatusBar,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from "react-native";
import {
  NavigationProp,
  ParamListBase,
  useNavigation,
  useRoute,
} from "@react-navigation/native";

import {
  Container,
  Header,
  Title,
  BulletWrapper,
  SubTitle,
  Form,
  FormTitle,
} from "./styles";
import { useTheme } from "styled-components";
import { api } from "../../../services/api";

interface Params {
  user: {
    name: string;
    email: string;
    driverLicense: string;
  };
}

export function SecondStep() {
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const route = useRoute();
  const navigation = useNavigation<NavigationProp<ParamListBase>>();
  const { user } = route.params as Params;
  const theme = useTheme();
  function handleBack() {
    navigation.goBack();
  }
  async function handleRegister() {
    if (!password || !passwordConfirm) {
      return Alert.alert("Senha Obrigatoria");
    }
    if (password != passwordConfirm) {
      return Alert.alert("Senhas Diferentes");
    }

    await api
      .post("/users", {
        name: user.name,
        email: user.email,
        password,
        driver_license: user.driverLicense,
      })
      .then(() => {
        navigation.navigate("Confirmation", {
          nextScreenRoute: "SignIn",
          title: "Conta Criada",
          message: `Agora e so fazer login\ne aproveitar`,
        });
      })
      .catch(() => {
        Alert.alert("Opa", "Nao foi possivel fazer login");
      });
  }
  return (
    <KeyboardAvoidingView behavior="position" enabled>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
          <Header>
            <BacKButton onPress={handleBack}></BacKButton>
            <BulletWrapper>
              <Bullet active></Bullet>
              <Bullet></Bullet>
            </BulletWrapper>
          </Header>
          <Title>Crie sua {`\n`} conta</Title>
          <SubTitle>Faça seu cadrasto de{`\n`}forma rapida e facil</SubTitle>
          <Form>
            <FormTitle>2. Senha</FormTitle>

            <PasswordInput
              iconName="lock"
              placeholder="Senha"
              onChangeText={setPassword}
              value={password}
            ></PasswordInput>
            <PasswordInput
              iconName="lock"
              placeholder="Repetir Senha"
              onChangeText={setPasswordConfirm}
              value={passwordConfirm}
            ></PasswordInput>
          </Form>
          <Button
            title={"Cadastrar"}
            disabled={false}
            color={theme.colors.success}
            onPress={() => handleRegister()}
          ></Button>
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
