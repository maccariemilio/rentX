import React from "react";

import { Container } from "./styles";

import { MaterialIcons } from "@expo/vector-icons";

import { useTheme } from "styled-components";

interface Props {
  color?: string;
  onPress?: Function;
}

export function BacKButton({ color, onPress }: Props) {
  const theme = useTheme();
  return (
    <Container onPress={onPress}>
      <MaterialIcons
        name="chevron-left"
        size={24}
        color={color ? color : theme.colors.text}
      ></MaterialIcons>
    </Container>
  );
}
