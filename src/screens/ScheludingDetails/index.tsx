import React, { useEffect, useState } from "react";

import { format, parseISO } from "date-fns";

import { useTheme } from "styled-components";
import {
  NavigationProp,
  ParamListBase,
  useNavigation,
  useRoute,
} from "@react-navigation/native";

import { Feather } from "@expo/vector-icons";
import { RFValue } from "react-native-responsive-fontsize";

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
  RentalPeriod,
  CalendarIcon,
  DateInfo,
  DateTitle,
  DateValue,
  RentalPrice,
  RentalPriceLabel,
  RentalPriceDetails,
  RentalPriceQuota,
  RentalPriceTotal,
} from "./styles";
import { CarDto } from "../../dtos/carDTO";
import { getPlatformDate } from "../../utils/getPlatformDate";
import { api } from "../../services/api";
import { Alert } from "react-native";
interface Params {
  car: CarDto;
  dates: string[];
}
interface RentalPeriod {
  start: string;
  end: string;
}

export function ScheludingDetails() {
  const [rentalPeriod, setRentalPeriod] = useState<RentalPeriod>(
    {} as RentalPeriod
  );
  const navigation = useNavigation<NavigationProp<ParamListBase>>();
  const theme = useTheme();
  const route = useRoute();
  const { car, dates } = route.params as Params;
  const rentTotal = Number(dates.length * car.rent.price);

  async function handleScheludingComplete() {
    const schedulesByCar = await api.get(`/schedules_bycars/${car.id}`);

    const unavailable_dates = {
      ...schedulesByCar.data.unavailable_dates,
      ...dates,
    };

    await api.post(`/schedules_byuser`, {
      user_id: 1,
      car,
      startDate: format(getPlatformDate(parseISO(dates[0])), "dd/MM/yyyy"),
      endDate: format(
        getPlatformDate(parseISO(dates[dates.length - 1])),
        "dd/MM/yyyy"
      ),
    });

    await api
      .put(`/schedules_bycars/${car.id}`, {
        id: car.id,
        unavailable_dates,
      })
      .then(() => navigation.navigate("ScheludingComplete"))
      .catch(() => Alert.alert("Não foi possível confirmar o agendamento."));
  }

  function handleBack() {
    navigation.goBack();
  }

  useEffect(() => {
    setRentalPeriod({
      start: format(getPlatformDate(parseISO(dates[0])), "dd/MM/yyyy"),
      end: format(
        getPlatformDate(parseISO(dates[dates.length - 1])),
        "dd/MM/yyyy"
      ),
    });
  }, []);
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
        <RentalPeriod>
          <CalendarIcon>
            <Feather
              name="calendar"
              size={RFValue(24)}
              color={theme.colors.shape}
            ></Feather>
          </CalendarIcon>
          <DateInfo>
            <DateTitle>DE</DateTitle>
            <DateValue>{rentalPeriod.start}</DateValue>
          </DateInfo>
          <Feather
            name="chevrons-right"
            size={RFValue(10)}
            color={theme.colors.text}
          ></Feather>
          <DateInfo>
            <DateTitle>ATE</DateTitle>
            <DateValue>{rentalPeriod.end}</DateValue>
          </DateInfo>
        </RentalPeriod>

        <RentalPrice>
          <RentalPriceLabel>TOTAL</RentalPriceLabel>
          <RentalPriceDetails>
            <RentalPriceQuota>{`R$: ${car.rent.price} x${dates.length} diarias`}</RentalPriceQuota>
            <RentalPriceTotal>R$: {rentTotal}</RentalPriceTotal>
          </RentalPriceDetails>
        </RentalPrice>
      </Content>
      <Footer>
        <Button
          title={"Alugar Agora"}
          color={theme.colors.success}
          onPress={handleScheludingComplete}
        ></Button>
      </Footer>
    </Container>
  );
}
