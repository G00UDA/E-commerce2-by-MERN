import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { userCart } from "../context/cart/CartContext";

interface props {
  id: string;
  title: string;
  img: string;
  price: string;
}

export default function ProductCard({ id, title, price, img }: props) {

  const {addToCart} = userCart();

  return (
    <Card sx={{}}>
      <CardMedia
        sx={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          backgroundImage: "cover",
        }}
        component="img"
        alt="green iguana"
        height="140"
        image={img}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {price}
        </Typography>
      </CardContent>
      <CardActions>
        <Button variant="contained" size="small" onClick={()=> addToCart(id)}>
          ADD TO CARD
        </Button>
      </CardActions>
    </Card>
  );
}
