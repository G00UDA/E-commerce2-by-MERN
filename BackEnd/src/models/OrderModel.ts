import mongoose , {Schema , Document, ObjectId} from "mongoose";

export interface IorderItem {
    producttitle: string;
    productImage: string;
    unitprice: number;
    quantity: number;
}

export interface Iorder extends Document {
    orderitems: [IorderItem],
    total: number,
    address: string,
    userId: Object | string
}

const OrderItemSchema = new Schema<IorderItem>({
    producttitle: { type: String , required: true },
    productImage: { type: String , required: true},
    unitprice: { type: Number , required: true},
    quantity: { type: Number , required: true}
})

const OrderSchema = new Schema<Iorder>({
    orderitems: [OrderItemSchema],
    total: { type: Number, required: true},
    address: { type: String, required: true},
    userId: { type: Schema.Types.ObjectId,ref: "User" , required: true}
})

export const orderModel = mongoose.model("Order", OrderSchema);