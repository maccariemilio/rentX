import React from "react";

import { createStackNavigator } from "@react-navigation/stack";
import { Home } from "../screens/Home";
import { CarDetails } from "../screens/CarDetails";
import { Scheluding } from "../screens/Scheluding";
import { ScheludingDetails } from "../screens/ScheludingDetails";
import { Confirmation } from "../screens/Confirmation";
import { MyCars } from "../screens/MyCars";
import { Splash } from "../screens/Splash";
import { SignIn } from "../screens/SignIn";
import { FirstStep } from "../screens/SignUp/FirstStep";
import { SecondStep } from "../screens/SignUp/SecondStep";

const { Navigator, Screen } = createStackNavigator();

export function AuthRoutes() {
  return (
    <Navigator
      initialRouteName="Splash"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Screen name="Splash" component={Splash}></Screen>
      <Screen name="SignIn" component={SignIn}></Screen>
      <Screen name="FirstStep" component={FirstStep}></Screen>
      <Screen name="SecondStep" component={SecondStep}></Screen>
      <Screen name="Confirmation" component={Confirmation}></Screen>
    </Navigator>
  );
}
