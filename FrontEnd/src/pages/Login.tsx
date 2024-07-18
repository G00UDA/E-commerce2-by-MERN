import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { useRef, useState } from "react";
import { BASE_URL } from "../constants/base_url";
import { json, useNavigate } from "react-router-dom";
import { useAuth } from "../context/Auth/AuthContext";

const Login = () => {
    const [error , seterror] = useState("");
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);


    const {login} = useAuth();
    const navegator = useNavigate();


    const onSubmit = async () => {
        const email = emailRef.current?.value;
        const password = passwordRef.current?.value;

        console.log(email, password);

        if(!email || !password) {
            seterror("INVALID EMAIL OR PASSWORD");
            return;
        }

        const response = await fetch(`${BASE_URL}/user/login`,{
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: email,
                password: password
            }),
        });
        
        if(!response){
            seterror("INVALID LOGIN");
        }
        

        const token = await response.json();

        
        login(email , token)
        navegator("/");

    }

    return (
    <Container sx={{display:"flex" , height:"100vh" , alignItems:"center" , justifyContent:"center" , flexDirection:"column"}}>
        <Box>
            <Typography variant="h4">LGIN NEW</Typography>
        </Box>
        <Box sx={{display:"flex" , alignItems:"center" , justifyContent:"center" , flexDirection:"column" , mt:3 , gap:2 , border:1 , borderColor:"#f5f5f5" , padding:"10px"}}>
            <TextField  label="Email" name="email" inputRef={emailRef} />
            <TextField label="Password" name="password" type="password" inputRef={passwordRef}/>
            <Button onClick={onSubmit} sx={{width:"100%"}} variant="contained">Login</Button>
            {error && <Typography sx={{color:"red" , fontSize:"10px"}}>{error}</Typography>}
        </Box>
    </Container>
);
}

export default Login;