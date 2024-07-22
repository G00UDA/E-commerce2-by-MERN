import { CheckCircleOutline } from "@mui/icons-material";
import { Button, Container, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";


const OrderSuccessPage = ()=>{

    const navigate = useNavigate();

    const handleHome = ()=>{
        navigate("/");
    };

    return(
        <Container fixed sx={{mt:2 , display:"flex" , flexDirection:"column" , gap:2 , alignItems:"center" ,justifyContent:"center"}}>

            <CheckCircleOutline sx={{color:"green" , fontSize:"80px"}}/>
            <Typography variant="h4">Thank You For Your Order.</Typography>
            <Typography>We Start Do It, And We Well Get Back To You Again</Typography>


            <Button onClick={handleHome}>Go To Home</Button>

        </Container>
    );
}

export default OrderSuccessPage;