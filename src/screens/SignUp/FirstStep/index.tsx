import React, { useState } from "react";
import { BacKButton } from "../../../components/BackButton";
import { Bullet } from "../../../components/Bullet";
import { Input } from "../../../components/Input";
import * as Yup from "yup";
import { Button } from "../../../components/Buttton";

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

export function FirstStep() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [driverLicense, setDriverLicense] = useState("");
  function handleBack() {
    navigation.goBack();
  }
  const navigation = useNavigation<NavigationProp<ParamListBase>>();

  async function handleNextSetep() {
    try {
      const schema = Yup.object().shape({
        name: Yup.string().required("Nome é obrigatorio"),
        email: Yup.string()
          .email("E-mail Invalido")
          .required("E-mail é obrigatorio"),
        driverLicense: Yup.string().required("CNH é obrigatorio"),
      });

      const data = { name, email, driverLicense };
      await schema.validate(data);

      navigation.navigate("SecondStep", { user: data });
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        return Alert.alert("Opa", error.message);
      }
    }
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
            <FormTitle>1. Dados</FormTitle>
            <Input
              iconName="user"
              placeholder="Nome"
              onChangeText={setName}
              value={name}
            ></Input>
            <Input
              iconName="mail"
              placeholder="E-mail"
              keyboardType="email-address"
              onChangeText={setEmail}
              value={email}
            ></Input>
            <Input
              iconName="credit-card"
              placeholder="CNH"
              keyboardType="numeric"
              onChangeText={setDriverLicense}
              value={driverLicense}
            ></Input>
          </Form>
          <Button
            title={"Proximo"}
            disabled={false}
            onPress={handleNextSetep}
          ></Button>
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
