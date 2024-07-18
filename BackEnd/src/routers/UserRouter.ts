
import express from "express";
import { Login, register } from "../services/userServices";


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

export default router;



