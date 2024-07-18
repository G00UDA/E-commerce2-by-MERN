// import express from "express";
// import mongoose from "mongoose";
// import userRouter from "./routers/UserRouter";

// const app = express();

// const port = 5000;

// app.use(express.json());
// app.use(cors());


// mongoose
//   .connect("mongodb://localhost:27017/ecommerce")
//   .then(() => console.log("mongo is Connected"))
//   .catch((err) => console.log("failed to connect", err));


// app.use("user/", UserRouter);

// app.listen(port, () => {
//   console.log(`Server is running at: http://localhost:${port}`);
// });

import dotenv from "dotenv"
import express from "express";
import mongoose from "mongoose";
import userRouter from "./routers/UserRouter";
import { seedInitialProducts } from "./services/productServices";
import productsRouter from "./routers/ProductsRouter";
import CartRoute from "./routers/CartRoute";
import ItemsRoute from "./routers/CartRoute";
import cors from "cors"
const app = express();
const port = 5000;

dotenv.config();

app.use(express.json());
app.use(cors());

mongoose
    .connect("mongodb://localhost:27017/ecommerce")
    .then(() => console.log("Mongo connected!"))
    .catch((err) => console.log("Failed to connect!", err));


    seedInitialProducts();


app.use("/user", userRouter);
app.use("/products", productsRouter);
app.use("/cart", CartRoute);

app.listen(port, () => {
  console.log(`Server is running at: http://localhost:${port}`);
});