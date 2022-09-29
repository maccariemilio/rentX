import React from "react";

import { createStackNavigator } from "@react-navigation/stack";
import { Home } from "../screens/Home";
import { CarDetails } from "../screens/CarDetails";
import { Scheluding } from "../screens/Scheluding";
import { ScheludingDetails } from "../screens/ScheludingDetails";
import { ScheludingComplete } from "../screens/ScheludingComplete";

const { Navigator, Screen } = createStackNavigator();

export function StackRoutes() {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Screen name="Home" component={Home}></Screen>
      <Screen name="CarDetails" component={CarDetails}></Screen>
      <Screen name="Scheluding" component={Scheluding}></Screen>
      <Screen name="ScheludingDetails" component={ScheludingDetails}></Screen>
      <Screen name="ScheludingComplete" component={ScheludingComplete}></Screen>
    </Navigator>
  );
}
