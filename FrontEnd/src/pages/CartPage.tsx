import { Box, ButtonGroup, Container, Typography, Button } from "@mui/material";
import { useCart } from "../context/cart/CartContext";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const {
    cartItems,
    totalAmounds,
    updatequantity,
    removeItemFromCart,
    ClearUserCart,
  } = useCart();


  const navigate = useNavigate();

  const handlequantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      return;
    }
    updatequantity(productId, quantity);
  };

  const handleremoveItem = (productId: string) => {
    removeItemFromCart(productId);
    console.log(productId);
  };

  const handleClearCart = () => {
    ClearUserCart();
  };

  const handleCheckout = () => {
    navigate("/checkout")
  };

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
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          mb={3}
          mt={1}
        >
          <Button onClick={handleClearCart} variant="contained">
            Clear Cart
          </Button>
        </Box>
        {cartItems.length ? (
          <Box display="flex" flexDirection="column" gap={2}>
            {cartItems.map((i) => (
              <Box
                display="flex"
                flexDirection="row"
                justifyContent="space-between"
                alignItems="center"
                sx={{
                  border: 2,
                  borderColor: "#f5f5f5",
                  padding: "20px",
                  borderRadius: "10px",
                  boxShadow: "2px 2px 2px 2px rgb(0 0 0 / 20%)",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "row",
                    marginBottom: "20px",
                    width: "100%",
                  }}
                >
                  <img src={i.image} width={100} />
                  <Box>
                    <Typography variant="h4">{i.title}</Typography>
                    <Typography>
                      {i.quantity} x {i.unitprice}
                    </Typography>
                    <Button onClick={() => handleremoveItem(i.productId)}>
                      RemoveItem
                    </Button>
                  </Box>
                </Box>
                <ButtonGroup
                  variant="contained"
                  aria-label="Basic button group"
                >
                  <Button
                    onClick={() => handlequantity(i.productId, i.quantity + 1)}
                  >
                    +
                  </Button>
                  <Button
                    onClick={() => handlequantity(i.productId, i.quantity - 1)}
                  >
                    -
                  </Button>
                </ButtonGroup>
              </Box>
            ))}
          </Box>
        ) : (
          <Typography>The Cart Is Empty, Please Start Shopping</Typography>
        )}
        <Box display="flex" flexDirection="row" justifyContent="space-between" mt={3}>
          <Typography variant="h4">
            Total Amount: {totalAmounds.toFixed(2)} EGP
          </Typography>
          <Button variant="contained" onClick={handleCheckout}>
            Go To Checkout
          </Button>
        </Box>
      </Container>
    </div>
  );
};

export default CartPage;
