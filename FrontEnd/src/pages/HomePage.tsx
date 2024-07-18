import { Box, Container, Grid } from "@mui/material";
import ProductCard from "../components/ProductsCard";
import { useEffect, useState } from "react";
import { Product } from "../types/products";
import { BASE_URL } from "../constants/base_url";

const HomePage = () => {

    const [products , setproducts] = useState<Product[]>([]);
    const [error , seterror] = useState(false);
    

    useEffect(()=>{
        const FetchData = async ()=>{
            try {
                const Response = await fetch(`${BASE_URL}/products`)
                const data = await Response.json();
                setproducts(data);
            } catch (error) {
                seterror(true);
            }
        };
        FetchData();
    } , [])

    if(error){
        return <Box>SOMETHIG GOING WROING , PLEASE TRY AGAIN</Box>
    }

  return (
    <div>
      <Container sx={{mt:4}}>
        <Grid container spacing={2}>
            {products.map(({_id , Img , Title , price})=>(
                <Grid item md={4}><ProductCard id={_id} title={Title} img={Img} price={price} /></Grid>
            ))}
        </Grid>
      </Container>
    </div>
  );
};

export default HomePage;
