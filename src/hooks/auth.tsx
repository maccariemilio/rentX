import {
  useContext,
  useState,
  createContext,
  ReactNode,
  useEffect,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { api } from "../services/api";
import { setDate } from "date-fns/esm";

interface User {
  id: string;
  email: string;
  name: string;
  driver_license: string;
  avatar: string;
}

interface AuthState {
  token: string;
  user: User;
}

interface SignInCredenctials {
  email: string;
  password: string;
}

interface AuthContextData {
  user: User | undefined;
  signIn: (credentials: SignInCredenctials) => Promise<void>;
  signOut: () => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

function AuthProvider({ children }: AuthProviderProps) {
  const [data, setData] = useState<User | any>({} as User);

  async function signIn({ email, password }: SignInCredenctials) {
    try {
      const response = await api.post("/sessions", {
        email,
        password,
      });
      const token = response.data.token;
      const user = response.data.user;
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      setData(user);
      await AsyncStorage.setItem("@storage_Key", token);
      await AsyncStorage.setItem("user@id", data?.id);
    } catch (error) {
      console.log(error);
    }
  }

  const signOut = async () => {
    setData(null);
    AsyncStorage.clear();
  };

  return (
    <AuthContext.Provider
      value={{
        user: data,
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  return context;
}

export { AuthProvider, useAuth };
