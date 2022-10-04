import React, { useEffect, useState } from "react";
import { useTheme } from "styled-components";
import { BacKButton } from "../../components/BackButton";
import { CarDto } from "../../dtos/carDTO";
import { api } from "../../services/api";
import { AntDesign } from "@expo/vector-icons";
import { Cars } from "../../components/Cars";

import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from "@react-navigation/native";

import {
  Container,
  Title,
  Header,
  SubTitle,
  Content,
  Appointments,
  Description,
  Count,
  CarWrapper,
  CarFooter,
  CarFooterTitle,
  CarFooterPeriod,
  CarFooterDate,
} from "./styles";
import { FlatList } from "react-native";
import { Load } from "../../components/Load";
import { LoadAnimation } from "../../components/LoadAnimation";
interface CarProps {
  id: string;
  user_id: string;
  car: CarDto;
  startDate: string;
  endDate: string;
}

export function MyCars() {
  const [cars, setCars] = useState<CarProps[]>([]);
  const [loading, setLoading] = useState(true);
  const theme = useTheme();
  const navigation = useNavigation<NavigationProp<ParamListBase>>();

  useEffect(() => {
    async function fetchCars() {
      try {
        const response = await api.get("schedules_byuser?user_id=1");
        setCars(response?.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    fetchCars();
  }, []);
  function handleBack() {
    navigation.goBack();
  }
  return (
    <Container>
      <Header>
        <BacKButton
          onPress={handleBack}
          color={theme.colors.shape}
        ></BacKButton>
        <Title>Seus agendamentos, estão aqui.</Title>
        <SubTitle>Conforto, segurança e praticidade.</SubTitle>
      </Header>
      {loading ? (
        <LoadAnimation></LoadAnimation>
      ) : (
        <Content>
          <Appointments>
            <Description>Agendamentos feitos</Description>
            <Count>{cars.length}</Count>
          </Appointments>

          <FlatList
            data={cars}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <CarWrapper>
                <Cars key={item?.id} data={item?.car} onPress={() => {}} />
                <CarFooter>
                  <CarFooterTitle>Período</CarFooterTitle>
                  <CarFooterPeriod>
                    <CarFooterDate>{item.startDate}</CarFooterDate>
                    <AntDesign
                      name="arrowright"
                      size={20}
                      color={theme.colors.title}
                      style={{ marginHorizontal: 10 }}
                    />
                    <CarFooterDate>{item.endDate}</CarFooterDate>
                  </CarFooterPeriod>
                </CarFooter>
              </CarWrapper>
            )}
          />
        </Content>
      )}
    </Container>
  );
}
