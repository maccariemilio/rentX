import React from "react";

import { createStackNavigator } from "@react-navigation/stack";
import { Home } from "../screens/Home";
import { CarDetails } from "../screens/CarDetails";
import { Scheluding } from "../screens/Scheluding";
import { ScheludingDetails } from "../screens/ScheludingDetails";
import { Confirmation } from "../screens/Confirmation";
import { MyCars } from "../screens/MyCars";

const { Navigator, Screen } = createStackNavigator();

export function AppStackRoutes() {
  return (
    <Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Screen name="Home" component={Home}></Screen>
      <Screen name="CarDetails" component={CarDetails}></Screen>
      <Screen name="Scheluding" component={Scheluding}></Screen>
      <Screen name="ScheludingDetails" component={ScheludingDetails}></Screen>
      <Screen name="Confirmation" component={Confirmation}></Screen>
      <Screen name="MyCars" component={MyCars}></Screen>
    </Navigator>
  );
}
