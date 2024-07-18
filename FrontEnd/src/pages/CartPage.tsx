import { Container, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { BASE_URL } from "../constants/base_url";
import { useAuth } from "../context/Auth/AuthContext";



const CartPage = () =>{

    const [cart , setcart] = useState("");
    const [error , seterror] = useState("");

    const {token} = useAuth();

    

    useEffect(()=>{

        if(!token){
            return;
        }

        const fetchCart = async ()=>{
            const response = await fetch(`${BASE_URL}/cart`,{
                headers: {
                    'Authorization': ` Bearer ${token}`
                }
            })

            if(!response.ok){
                seterror("Failed TO FETCH USER CART, PLEASE TRY AGAIN")
            }

            const data = await response.json();
            setcart(data);
        }

        fetchCart();
    },[token])

    console.log(cart);

    return(
    <div>
        <Container>
            <Typography sx={{display:"flex" , alignItems:"center" , justifyContent:"center" , mt: 5}} variant="h3">MY CART</Typography>
        </Container>
    </div>)
    ;
}

export default CartPage;