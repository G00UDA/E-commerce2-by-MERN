import { Box, Container, Typography } from "@mui/material";
import { useAuth } from "../context/Auth/AuthContext";
import { useEffect } from "react";
// import { useNavigate } from "react-router-dom";

const MyOrderPage = () => {
  // const navigate = useNavigate();

  // const handleHome = ()=>{
  //     navigate("/");
  // };


  const {myorders , GetMyOrders } = useAuth();

  console.log(myorders)

  useEffect(()=>{
        GetMyOrders();
  },[])

  return (
    <Container
      fixed
      sx={{
        mt: 2,
        display: "flex",
        flexDirection: "column",
        gap: 2,
        alignItems: "center",
        justifyContent: "center",
      }}
    >   
        <Typography variant="h4">My Orders</Typography>
      {myorders.map(({_id , address , orderitems , total})=>(
        <Box sx={{border:1 , borderColor:"gray" , padding:"10px" , borderRadius:"10px"}}>
            <Typography>Address: {address}</Typography>
            <Typography>Items:{orderitems.length}</Typography>
            <Typography>total: {total}</Typography>
        </Box>
      ))}

    </Container>
  );
};

export default MyOrderPage;
