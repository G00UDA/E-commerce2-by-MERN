import { Box, Container, Typography, Button, TextField } from "@mui/material";
import { useCart } from "../context/cart/CartContext";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import { BASE_URL } from "../constants/base_url";
import { useAuth } from "../context/Auth/AuthContext";

const CheckoutPage = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { cartItems, totalAmounds } = useCart();

  const navigate = useNavigate();

  const {token} = useAuth();

  const addressRef = useRef<HTMLInputElement>(null);



  const handleConfirmOrder = async () => {
    const address = addressRef.current?.value;

    if(!address)return;

    const response = await fetch(`${BASE_URL}/cart/checkout`,{
        method: "POST",
        headers: { 'Content-Type': 'application/json',
            Authorization: `Bearer ${token}` 
         },
        body: JSON.stringify({
            address
        }),
    });

    if(!response.ok)return;

    navigate("/ordersuccess")


  }

  return (
    <div>
      <Container fixed>
        <Typography
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            mt: 5,
            mb: 5,
          }}
          variant="h3"
        >
          Check Out
        </Typography>
        <TextField label="Delivery Adress" inputRef={addressRef} fullWidth sx={{mb:2 , border:"2px"}} name="address"/>
        <Box
          display="flex"
          flexDirection="column"
          gap={1}
          sx={{
            border: 2,
            borderColor: "#f5f5f5",
            padding: "20px",
            borderRadius: "10px",
            boxShadow: "2px 2px 2px 2px rgb(0 0 0 / 20%)",
          }}
        >
          {cartItems.map((i) => (
            <Box
              display="flex"
              flexDirection="row"
              justifyContent="space-between"
              alignItems="center"
              width="100%"
            >
              <Box
                width="100%"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  flexDirection: "row",
                  marginBottom: "20px",
                }}
              >
                <img src={i.image} width={100} />
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                  width="100%"
                >
                  <Typography variant="h4">{i.title}</Typography>
                  <Typography>
                    {i.quantity} x {i.unitprice}
                  </Typography>
                </Box>
              </Box>
            </Box>
          ))}
          <Box>
            <Typography variant="body2" sx={{textAlign:"right"}}>
              Total Amount: {totalAmounds.toFixed(2)} EGP
            </Typography>
          </Box>
        </Box>
        <Button fullWidth sx={{mt:2 , mb:7}} variant="contained" onClick={handleConfirmOrder} >
          Pay Now
        </Button>
      </Container>
    </div>
  );
};

export default CheckoutPage;
