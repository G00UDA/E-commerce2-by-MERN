import mongoose , {Schema , Document} from "mongoose";

export interface  Iproducts extends Document {
    title : string;
    image: string;
    price: number;
    stock: number;
}

const ProductSchema = new Schema<Iproducts>({
    title : {type: String , required: true},
    image:    {type: String , required: true},
    price:  {type: Number , required: true},
    stock:  {type: Number , required: true , default: 0},
})

export const ProductModel = mongoose.model<Iproducts>("Product", ProductSchema)
