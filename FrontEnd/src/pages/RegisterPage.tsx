import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { useRef, useState } from "react";
import { BASE_URL } from "../constants/base_url";
import { useAuth } from "../context/Auth/AuthContext";
import { useNavigate } from "react-router-dom";


const RegisterPage =  () => {
  const firstnameRef = useRef<HTMLInputElement>(null);
  const lastnameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);


  const [error , seterror] = useState("");


  const {login} = useAuth();
  const navegator = useNavigate();

  const onSubmit = async () => {
    const firstname = firstnameRef.current?.value;
    const lastname = lastnameRef.current?.value;
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;

    if(!firstname || !lastname || !email || !password){
        seterror("CHECK THE REGISTER INPUT")
        return;
    }

    console.log(firstname, lastname, email, password);


    const response = await fetch(`${BASE_URL}/user/register`,{
        method: 'POST',
        headers:{'Content-Type': 'application/json',},
        body: JSON.stringify({
            firstname,
            lastname,
            email,
            password
        }),
    });

    if(!response.ok){
        seterror("USER ALREADY REGISTERED, PLEASE TRY AGING")
        return
    }



    const token = await response.json();

    if(!token){
        seterror("INCORRECT TOKEN");
    }

    login(email , token)
    navegator("/");


  };

  return (
    <Container
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          mt: 4,
          flexDirection: "column",
        }}
      >
        <Typography variant="h6">REGISTER NEW ACCOUNT</Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            gap: 2,
            mt: 2,
            border: 1,
            padding: 4,
            borderColor: "#f5f5f5",
          }}
        >
          <TextField inputRef={firstnameRef}label="FirstName"name="firstname"/>
          <TextField inputRef={lastnameRef} label="LastName" name="lastname" />
          <TextField inputRef={emailRef} label="Email" name="email" />
          <TextField inputRef={passwordRef} type="password" label="Password" name="password" />
          <Button onClick={onSubmit} sx={{ width: "100%" }} variant="contained">
            Register
          </Button>
          {error && <Typography sx={{color:"red" , fontSize:"10px" , fontWeight:"300"}}>{error}</Typography> }
        </Box>
      </Box>
    </Container>
  );
};

export default RegisterPage;
