import  express  from "express"
import { GetAllProducts } from "../services/productServices";
const router = express.Router();

router.get("/" , async (request , response) => {
    const products = await GetAllProducts();
    response.status(200).send(products);
})

export default router;