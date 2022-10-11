import { TextInput } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import styled, { css } from "styled-components/native";

interface Props {
  isFocused: boolean;
}

export const Container = styled.View`
  flex-direction: row;
  margin-bottom: 8px;
  width: 100%;
`;

export const IconContainer = styled.View<Props>`
  height: 56px;
  width: 55px;
  justify-content: center;
  align-items: center;
  margin-right: 2px;
  background-color: ${({ theme }) => theme.colors.background_secondary};
  ${({ isFocused, theme }) =>
    isFocused &&
    css`
      border-bottom-width: 2px;
      border-bottom-color: ${({ theme }) => theme.colors.main};
    `}
`;

export const InputText = styled(TextInput)<Props>`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background_secondary};
  color: ${({ theme }) => theme.colors.text};
  font-family: ${({ theme }) => theme.fonts.primary400};
  font-size: 15px;
  padding: 0 23px;

  ${({ isFocused, theme }) =>
    isFocused &&
    css`
      border-bottom-width: 2px;
      border-bottom-color: ${({ theme }) => theme.colors.main};
    `}
`;

export const ChangePasswordVisibilityButton = styled.TouchableOpacity.attrs({
  activeOpacity: 0.7,
})``;
