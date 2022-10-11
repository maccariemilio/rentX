import React, { useState } from "react";
import {
  StatusBar,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from "react-native";

import { useAuth } from "../../hooks/auth";

import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from "@react-navigation/native";

import * as Yup from "yup";

import { Container, Header, Title, SubTitle, Footer, Form } from "./style";

import { Button } from "../../components/Buttton";
import { useTheme } from "styled-components";
import { Input } from "../../components/Input";
import { PasswordInput } from "../../components/PasswordInput";

export function SignIn() {
  const theme = useTheme();
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const navigation = useNavigation<NavigationProp<ParamListBase>>();
  const { signIn } = useAuth();

  async function handleSigIn() {
    try {
      const schema = Yup.object().shape({
        email: Yup.string()
          .required("Email obrigatorio")
          .email("Digite um email valido"),
        password: Yup.string().required("Senha e obrigatorio"),
      });
      await schema.validate({ email, password });
      Alert.alert("tudo certo");

      signIn({ email, password });
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        return Alert.alert("Opa", error.message);
      } else {
        Alert.alert(
          "Erro na autenticaçao",
          "Ocorreu um erro ao fazer login, Verificar as creendenciais "
        );
      }
    }
  }

  async function handleNewAccount() {
    navigation.navigate("FirstStep");
  }

  return (
    <KeyboardAvoidingView behavior="position" enabled>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
          <StatusBar
            barStyle="dark-content"
            backgroundColor="transparent"
            translucent
          ></StatusBar>
          <Header>
            <Title>Estamos {`\n`}quase la </Title>
            <SubTitle>
              Faça seu login para começar{`\n`} uma experiencia incrivel
            </SubTitle>
          </Header>

          <Input
            placeholder="Email"
            iconName={"mail"}
            keyboardType="email-address"
            autoCorrect={false}
            autoCapitalize="none"
            onChangeText={setEmail}
            value={email}
          />
          <PasswordInput
            placeholder="Senha"
            iconName={"lock"}
            onChangeText={setPassword}
            value={password}
          />

          <Footer>
            <Button
              title="Login"
              onPress={handleSigIn}
              disabled={false}
              loading={false}
            ></Button>
            <Button
              title="Cadastrar"
              onPress={handleNewAccount}
              light
              color={theme.colors.main_light}
              disabled={false}
              loading={false}
            ></Button>
          </Footer>
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
