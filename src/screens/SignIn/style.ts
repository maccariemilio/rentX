import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

export const Container = styled.View`
  padding: 0px 24px;
  background-color: ${({ theme }) => theme.colors.background_primary};
`;

export const Header = styled.View`
  width: 100%;
  margin-top: 115px;
`;

export const Title = styled.Text`
  font-size: ${RFValue(40)}px;
  font-family: ${({ theme }) => theme.fonts.secondary600};
  color: ${({ theme }) => theme.colors.title};
`;

export const SubTitle = styled.Text`
  font-size: ${RFValue(15)}px;
  font-family: ${({ theme }) => theme.fonts.primary400};
  color: ${({ theme }) => theme.colors.text};
  line-height: ${RFValue(25)}px;
  margin-top: 16px;
`;

export const Form = styled.View``;

export const Footer = styled.View``;
