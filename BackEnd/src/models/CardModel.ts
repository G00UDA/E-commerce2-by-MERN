import mongoose , {Schema , Document, ObjectId} from "mongoose";
import { Iproducts } from "./ProductsModel";

const CardStatusEnum = ["active", "completed"]

export interface ICardItem{
    product: Iproducts;
    unitprice: number;
    quantity: number;
}

export interface Icard extends Document{
    userId: ObjectId|string;
    item: ICardItem[];
    totalAmounds: number;
    status: "active" | "completed";
}

const cardItemsSchema = new Schema<ICardItem>({
    product: {type: Schema.Types.ObjectId , ref:"Product", required: true},
    unitprice: {type: Number , required: true},
    quantity:{type: Number , required: true , default: 1},
})

const CardSchema = new Schema<Icard>({
    userId:{type:Schema.Types.ObjectId , ref: "User" , required: true},
    item:[cardItemsSchema],
    totalAmounds:{type: Number , required: true},
    status:{type: String ,enum: CardStatusEnum , default:"active"}
})

export const CardModel = mongoose.model<Icard>("Cart" , CardSchema)