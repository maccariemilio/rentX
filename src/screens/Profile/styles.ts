import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";
import { Feather } from "@expo/vector-icons";

import { TouchableOpacityProps } from "react-native";

interface Props extends TouchableOpacityProps {
  onPress?: () => void;
}

export const Container = styled.View``;
export const Header = styled.View`
  width: 100%;
  height: ${RFValue(200)}px;
  background-color: ${({ theme }) => theme.colors.header};
  justify-content: space-between;
  justify-items: center;
  padding: 50px 24px;
  flex-direction: row;
`;
export const ImageWrapper = styled.View`
  justify-content: center;
  align-items: center;
  align-self: center;
  justify-self: center;
  position: absolute;
  background-color: ${({ theme }) => theme.colors.title};
  padding: 10px;
  border-radius: 30px;
  margin-top: ${RFValue(140)}px;
`;

export const Photo = styled.Image`
  width: ${RFValue(100)}px;
  height: ${RFValue(100)}px;
  border-radius: 15px;
`;

export const Title = styled.Text`
  font-size: ${RFValue(17)}px;
  color: ${({ theme }) => theme.colors.shape};
`;
export const TitleWrapper = styled.View``;

export const LogOff = styled.TouchableOpacity<Props>``;

export const Icon = styled(Feather)`
  color: ${({ theme }) => theme.colors.shape};
  font-size: ${RFValue(17)}px;
`;
