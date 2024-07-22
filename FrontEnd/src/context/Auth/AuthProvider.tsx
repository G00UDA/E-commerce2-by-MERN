import { FC, PropsWithChildren, useState } from "react";
import { AuthContext } from "./AuthContext";
import { BASE_URL } from "../../constants/base_url";

const USERNAME_KEY = "userName";
const TOKEN_KEY = "token";

const AuthProvider: FC<PropsWithChildren> = ({children})=>{

    const [username , setusername] = useState<string | null>(localStorage.getItem(USERNAME_KEY));
    const [token , settoken] = useState<string | null>(localStorage.getItem(TOKEN_KEY));

    const [myorders , setmyorders] = useState([]);

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

    const GetMyOrders = async ()=>{

        const resonse = await fetch(`${BASE_URL}/user/my-orders`,{
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`, 
            },
        });

        if(!resonse.ok) return;

        const data = await resonse.json();

        setmyorders(data);

    }
    

    return(
        <AuthContext.Provider value={{username , token , login , IsAuthenticated , logout , GetMyOrders , myorders}}>
            {children}
        </AuthContext.Provider>
    )

}

export default AuthProvider