import React from "react";
import { Container, ButtonText } from "./styles";

interface ButtonProps {
  color?: string;
  title: string;
  onPress?: Function;
}

export function Button({ onPress, color, title }: ButtonProps) {
  return (
    <Container onPress={onPress} color={color} activeOpacity={0.7}>
      <ButtonText>{title}</ButtonText>
    </Container>
  );
}
