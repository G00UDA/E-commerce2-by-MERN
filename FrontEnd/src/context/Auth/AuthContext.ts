import { createContext, useContext } from "react";

interface AuthContext {
  username: string | null;
  token: string | null;
  login: (username: string, token: string) => void;
  myorders: any[];
  IsAuthenticated: boolean;
  logout: () => void;
  GetMyOrders: () => void;
}

export const AuthContext = createContext<AuthContext>({
  username: null,
  token: null,
  myorders: [],
  login: () => {},
  IsAuthenticated: false,
  logout: () => {},
  GetMyOrders: () => {},
});

export const useAuth = () => useContext(AuthContext);
