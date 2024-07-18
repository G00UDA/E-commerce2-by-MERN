import { createContext, useContext } from "react";

interface AuthContext{
    username: string | null;
    token: string | null;
    login: (username: string , token: string) => void;
    IsAuthenticated: boolean;
    logout: () => void;
}

export const AuthContext = createContext<AuthContext>({username: null , token: null , login: ()=>{} , IsAuthenticated: false , logout: ()=>{},});

export const useAuth = () => useContext(AuthContext);