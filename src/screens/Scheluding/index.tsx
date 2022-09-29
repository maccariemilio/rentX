import React, { useState } from "react";

import { format, parseISO } from "date-fns";

import { Alert } from "react-native";

import {
  NavigationProp,
  ParamListBase,
  useNavigation,
  useRoute,
} from "@react-navigation/native";

import { BacKButton } from "../../components/BackButton";
import { useTheme } from "styled-components";
import ArrowSvg from "../../assets/arrow.svg";
import {
  Container,
  Header,
  Title,
  RentalPeriod,
  DateInfo,
  DateTitle,
  DateValue,
  Content,
  Footer,
} from "./styles";
import { Button } from "../../components/Buttton";
import {
  Calendar,
  DayProps,
  generateInterval,
  MarkedDatesProps,
} from "../../components/Calendar";
import { getPlatformDate } from "../../utils/getPlatformDate";
import { CarDto } from "../../dtos/carDTO";

interface RentalPeriod {
  start: number;
  end: number;
  startFormatted: string;
  endFormatted: string;
}

interface Params {
  car: CarDto;
}

export function Scheluding() {
  const [lastSelectedDate, setLastSelectedDate] = useState<DayProps>(
    {} as DayProps
  );
  const [markedDates, setMarkedDates] = useState<MarkedDatesProps>(
    {} as MarkedDatesProps
  );
  const navigation = useNavigation<NavigationProp<ParamListBase>>();
  const [rentalPeriod, setRentalPeriod] = useState<RentalPeriod>(
    {} as RentalPeriod
  );

  const theme = useTheme();
  const route = useRoute();
  const { car } = route.params as Params;

  function handleScheludingDetails() {
    if (!rentalPeriod.start || !rentalPeriod.end) {
      Alert.alert("Selecione o intervalo para alugar");
    } else {
      navigation.navigate("ScheludingDetails", {
        car,
        dates: Object.keys(markedDates),
      });
    }
  }

  function handleBack() {
    navigation.goBack();
  }

  function handleChangeDate(date: DayProps) {
    let start = !lastSelectedDate.timestamp ? date : lastSelectedDate;
    let end = date;

    if (start.timestamp > end.timestamp) {
      start = end;
      end = start;
    }
    setLastSelectedDate(end);
    const interval = generateInterval(start, end);
    setMarkedDates(interval);

    const firstDate = Object.keys(interval)[0];
    const endDate = Object.keys(interval)[Object.keys(interval).length - 1];

    setRentalPeriod({
      start: start.timestamp,
      end: end.timestamp,
      startFormatted: format(
        getPlatformDate(parseISO(firstDate)),
        "dd/MM/yyyy"
      ),
      endFormatted: format(getPlatformDate(parseISO(endDate)), "dd/MM/yyyy"),
    });
  }

  return (
    <Container>
      <Header>
        <BacKButton
          onPress={handleBack}
          color={theme.colors.shape}
        ></BacKButton>
        <Title>
          Escolha uma{"\n"} data de inicio e{"\n"} fim do aluguel{" "}
        </Title>

        <RentalPeriod>
          <DateInfo>
            <DateTitle>DE</DateTitle>
            <DateValue selected={!!rentalPeriod.startFormatted}>
              {rentalPeriod.startFormatted}
            </DateValue>
          </DateInfo>

          <ArrowSvg></ArrowSvg>

          <DateInfo>
            <DateTitle>ATE</DateTitle>
            <DateValue selected={!!rentalPeriod.endFormatted}>
              {rentalPeriod.endFormatted}
            </DateValue>
          </DateInfo>
        </RentalPeriod>
      </Header>

      <Content>
        <Calendar
          markedDates={markedDates}
          onDayPress={handleChangeDate}
        ></Calendar>
      </Content>

      <Footer>
        <Button title={"Confirmar"} onPress={handleScheludingDetails}></Button>
      </Footer>
    </Container>
  );
}
