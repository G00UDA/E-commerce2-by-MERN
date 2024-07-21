import express, { Request , Response } from 'express';
import { addItemToCart, GetActiveCartForUser, UpdateItemFromCart , DeleteItemFromCart, ClearCart, checkout } from '../services/CartServices';
import validateJWT from '../middlewares/validateJwt';
import { ExtendRequest } from "../middlewares/validateJwt"


const router = express.Router();

router.get("/", validateJWT, async (req: ExtendRequest, res) => {
    const userId = req?.user?._id;
    const cart = await GetActiveCartForUser({userId , populateproduct: true});
    res.status(200).send(cart);
  });


router.post("/items" , validateJWT , async (req: ExtendRequest, res) => {
  const userId = req?.user?._id;
  const {productId , quantity} = req.body
  const response = await addItemToCart({userId , productId ,  quantity })
  res.status(response.statuscode).send(response.data);
})

router.put("/items", validateJWT , async(req : ExtendRequest , res)=>{
  const userId = req?.user?._id;
  const {productId , quantity}= req.body;
  const response = await UpdateItemFromCart({userId , productId , quantity });
  res.status(response.statuscode).send(response.data);
})

router.delete("/items/:proudctId", validateJWT , async(req : ExtendRequest , res)=>{
  const userId = req.user._id;
  const {productId } = req.params;
  const response = await DeleteItemFromCart({userId , productId});
  res.status(response.statuscode).send(response.data);
})

router.delete("/", validateJWT , async(req : ExtendRequest , res)=>{
  const userId = req.user._id;
  const response = await ClearCart({userId});
  res.status(response.statuscode).send(response.data);
})

router.post("/checkout" , validateJWT , async(req : ExtendRequest , res)=>{

  const userId = req.user._id;
  const {address} = req.body;
  const response = await checkout({userId , address});
  res.status(response.statusCode).send(response.data);


})

export default router;
