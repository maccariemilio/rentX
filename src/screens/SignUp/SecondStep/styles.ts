import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

export const Container = styled.View`
  padding: 0px 24px;
  background-color: ${({ theme }) => theme.colors.background_primary};
`;

export const Header = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;

  align-items: center;
  margin-top: 35px;
`;

export const BulletWrapper = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const Title = styled.Text`
  font-size: ${RFValue(40)}px;
  font-family: ${({ theme }) => theme.fonts.secondary600};
  color: ${({ theme }) => theme.colors.title};
  margin-top: 60px;
  margin-bottom: 16px;
`;

export const SubTitle = styled.Text`
  font-size: ${RFValue(15)}px;
  font-family: ${({ theme }) => theme.fonts.primary400};
  color: ${({ theme }) => theme.colors.text};
  line-height: ${RFValue(25)}px;
`;
export const Form = styled.View`
  width: 100%;
  margin-top: 64px;
  margin-bottom: 16px;
`;
export const FormTitle = styled.Text`
  font-size: ${RFValue(20)}px;
  font-family: ${({ theme }) => theme.fonts.secondary600};
  color: ${({ theme }) => theme.colors.title};
  line-height: ${RFValue(25)}px;
  margin-bottom: 24px;
`;
