
import express from "express";
import { GetMyOrders, Login, register } from "../services/userServices";
import validateJWT, { ExtendRequest } from "../middlewares/validateJwt";


const router = express.Router();


// router.post("/register",async (req, res) => {
//     const {firstname , lastname , email , password} = req.body;
//     const {statusCode , data} = await register({firstname , lastname , email , password});
//     res.status(statusCode).send(data);
// })


router.post("/register", async (request, response) => {
    try {
      const { firstname, lastname, email, password } = request.body;
      console.log(request.body);
      const { statusCode, data } = await register({
        firstname,
        lastname,
        email,
        password,
      });
      response.status(statusCode).json(data);
    } catch {
      response.status(500).send("Something went wrong!");
    }
  });


  router.post("/login", async (request, response) => {
    const {email , password} = request.body;
    const {statusCode , data } = await Login({email , password});
    response.status(statusCode).json(data);
  })

  router.get("/my-orders" , validateJWT , async (request: ExtendRequest, response) => {
    try {
      const userId = request.user._id;
      const {data , statusCode} = await GetMyOrders({userId});
      response.status(statusCode).send(data);
    } catch (error) {
      
    }
  })

export default router;



