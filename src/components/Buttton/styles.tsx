import { TouchableOpacityProps } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

interface ButtonProps {
  color: string;
}
interface ButtonTextProps {
  light: boolean;
}

export const Container = styled.TouchableOpacity<ButtonProps>`
  width: 100%;
  background-color: ${({ color, theme }) =>
    color ? color : theme.colors.main};
  padding: 16px;
  align-items: center;
  justify-content: center;
  margin-bottom: 8px;
`;

export const ButtonText = styled.Text<ButtonTextProps>`
  font-family: ${({ theme }) => theme.fonts.primary500};
  color: ${({ theme, light }) =>
    light ? theme.colors.header : theme.colors.background_secondary};
  font-size: ${RFValue(15)}px; ;
`;
