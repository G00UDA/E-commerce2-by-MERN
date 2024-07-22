import { Box, ButtonGroup, Container, Typography , Button } from "@mui/material";
import { useCart } from "../context/cart/CartContext";

const CartPage = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { cartItems , totalAmounds , updatequantity , removeItemFromCart} = useCart();


  const handlequantity = (productId: string , quantity: number)=>{

    if(quantity <= 0){
        return;
    }
    updatequantity(productId , quantity);
  }

  
  const handleremoveItem = (productId: string)=>{
    removeItemFromCart(productId)
    console.log(productId);
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
          MY CART
        </Typography>
        <Box display="flex" flexDirection="column" gap={2}>
        {cartItems.map((i) => (
          <Box
          display="flex"
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
            sx={{
              border:2,
              borderColor:"#f5f5f5",
              padding:"20px",
              borderRadius:"10px",
              boxShadow:"2px 2px 2px 2px rgb(0 0 0 / 20%)",
            }}
          >
            <Box sx={{display:"flex" , alignItems:"center" , flexDirection:"row" , marginBottom:"20px" , width:"100%"}} >
              <img src={i.image} width={100} />
              <Box>
              <Typography variant="h4">{i.title}</Typography>
              <Typography>
                {i.quantity} x {i.unitprice}
              </Typography>
              <Button onClick={()=> handleremoveItem(i.productId)}>RemoveItem</Button>
              </Box>
            </Box>
            <ButtonGroup variant="contained" aria-label="Basic button group">
              <Button onClick={()=> handlequantity(i.productId , i.quantity + 1 )}>+</Button>
              <Button onClick={()=> handlequantity(i.productId , i.quantity - 1 )}>-</Button>
            </ButtonGroup>
          </Box>
        ))}
        </Box>
        <Box><Typography variant="h3" m="20px">TotalAmount:{totalAmounds.toFixed(2)} EGP</Typography></Box>
      </Container>
    </div>
  );
};

export default CartPage;
