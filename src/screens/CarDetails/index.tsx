import React from "react";

import Animated, {
  useSharedValue,
  useAnimatedScrollHandler,
  event,
  useAnimatedStyle,
  interpolate,
  Extrapolate,
} from "react-native-reanimated";

import {
  NavigationProp,
  ParamListBase,
  useNavigation,
  useRoute,
} from "@react-navigation/native";

import { BacKButton } from "../../components/BackButton";
import { ImageSlider } from "../../components/ImageSlider";
import { Accessory } from "../../components/Accessory";
import { Button } from "../../components/Buttton";

import { getAccessoryIcon } from "../../utils/getAccessoryIcon";

import {
  Container,
  Header,
  CarImages,
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
} from "./styles";
import { CarDto } from "../../dtos/carDTO";
import { StatusBar, StyleSheet } from "react-native";
import { useTheme } from "styled-components";

interface Params {
  car: CarDto;
}

export function CarDetails() {
  const theme = useTheme();
  const navigation = useNavigation<NavigationProp<ParamListBase>>();
  const route = useRoute();
  const { car } = route.params as Params;

  const scrollY = useSharedValue(0);
  const scrollHandle = useAnimatedScrollHandler((event) => {
    scrollY.value = event.contentOffset.y;
  });

  const headerAnimation = useAnimatedStyle(() => {
    return {
      height: interpolate(
        scrollY.value,
        [0, 200],
        [200, 70],
        Extrapolate.CLAMP
      ),
    };
  });

  const sliderCarsAnimationSlider = useAnimatedStyle(() => {
    return {
      opacity: interpolate(scrollY.value, [0, 150], [1, 0], Extrapolate.CLAMP),
    };
  });

  function handleScheluding() {
    navigation.navigate("Scheluding", { car });
  }

  function handleBack() {
    navigation.goBack();
  }
  // console.log(car);
  return (
    <Container>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      />
      <Animated.View
        style={[
          headerAnimation,
          style.header,
          { backgroundColor: theme.colors.background_primary },
        ]}
      >
        <Header style={style.back}>
          <BacKButton onPress={handleBack}></BacKButton>
        </Header>
        <Animated.View style={sliderCarsAnimationSlider}>
          <CarImages>
            <ImageSlider imagesUrl={car.photos}></ImageSlider>
          </CarImages>
        </Animated.View>
      </Animated.View>

      <Animated.ScrollView
        contentContainerStyle={{
          paddingHorizontal: 24,
          paddingTop: 160,
          alignItems: "center",
        }}
        showsVerticalScrollIndicator={false}
        onScroll={scrollHandle}
        scrollEventThrottle={16}
      >
        <Details>
          <Description>
            <Brand>{car.brand}</Brand>
            <Name>{car.name}</Name>
          </Description>

          <Rent>
            <Period>{car.period}</Period>

            <Price>{`R$ ${car.price}`}</Price>
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
        <About>
          {car.about}
          {car.about}
          {car.about}
          {car.about}
        </About>
      </Animated.ScrollView>
      <Footer>
        <Button
          title={"Escolher período do aluguel"}
          onPress={handleScheluding}
          disabled={false}
        ></Button>
      </Footer>
    </Container>
  );
}

const style = StyleSheet.create({
  header: {
    position: "absolute",
    overflow: "hidden",
    zIndex: 1,
  },
  back: {
    marginTop: 30,
    zIndex: 22,
  },
});
