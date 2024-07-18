import mongoose, { Document, Schema } from "mongoose";

export interface Iuser extends Document{
    firstname: string;
    lastname: string;
    email: string;
    password: string;
}

const userSchema = new Schema<Iuser>({
    firstname: { type: String },
    lastname: { type: String },
    email: { type: String },
    password: { type: String },
})

const userModel = mongoose.model<Iuser>("User" , userSchema);

export default userModel;
