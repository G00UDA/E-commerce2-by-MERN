import userModel from "../models/UsersModel";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
import { orderModel } from "../models/OrderModel";

interface RegisterParams {
    firstname: string;
    lastname: string;
    email: string;
    password: string;
  }
  
  export const register = async ({
    firstname,
    lastname,
    email,
    password,
  }: RegisterParams) => {
    const findUser = await userModel.findOne({ email });
  
    if (findUser) {
      return { data: "User already exists!", statusCode: 400 };
    }



    const hashedpassword = await bcrypt.hash(password,10);
    const newUser = new userModel({
      email,
      password:hashedpassword,
      firstname,
      lastname,
    });
    await newUser.save();
  
    return { data:generatejwt({email , firstname , lastname}), statusCode: 200 };
  };



interface LoginParams {
  email: string;
  password: string;
}

export const Login = async ({ email, password }: LoginParams) => {
  const finduser = await userModel.findOne({ email });

  if (!finduser) {
    return { data: "THE USER IS NOT EXISTS!", statusCode: 400 };
  }

  const passwordMatch = await bcrypt.compare(password , finduser.password);

  if (passwordMatch) {
    return {data: generatejwt({email , firstname: finduser.firstname , lastname: finduser.lastname}) , statusCode: 200};
  }

  return { data: "INCORRECT PASSWORD OR EMAIL" , statusCode:400 } ;
};

interface OrdersParams{
  userId: string;
}

export const GetMyOrders = async ({userId}: OrdersParams) => {
  try {
    return {data: await orderModel.find({userId}) , statusCode: 200} ;

  } catch (error) {
    throw error;
  }
}


const generatejwt = (data : any) => {
  return jwt.sign(data , process.env.JWT_SECRET || " " )
}