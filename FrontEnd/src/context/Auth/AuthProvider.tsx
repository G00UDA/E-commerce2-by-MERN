import { FC, PropsWithChildren, useState } from "react";
import { AuthContext } from "./AuthContext";

const USERNAME_KEY = "userName";
const TOKEN_KEY = "token";

const AuthProvider: FC<PropsWithChildren> = ({children})=>{

    const [username , setusername] = useState<string | null>(localStorage.getItem(USERNAME_KEY));
    const [token , settoken] = useState<string | null>(localStorage.getItem(TOKEN_KEY));

    const IsAuthenticated = !!token;

    const login = (username: string, token: string ) =>{
        setusername(username);
        settoken(token);
        localStorage.setItem(USERNAME_KEY , username);
        localStorage.setItem(TOKEN_KEY , token);
    }

    const logout = ()=>{
        localStorage.removeItem(USERNAME_KEY);
        localStorage.removeItem(TOKEN_KEY);
        setusername(null);
        settoken(null);
    }
    

    return(
        <AuthContext.Provider value={{username , token , login , IsAuthenticated , logout}}>
            {children}
        </AuthContext.Provider>
    )

}

export default AuthProvider