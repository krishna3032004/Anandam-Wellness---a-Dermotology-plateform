import mongoose from "mongoose";
const { Schema, model } = mongoose;

const UserSchema = new Schema({
    email: { type: String, required: true },
    password: { type: String },
    weight: { type: String },
    age: { type: String },
    address: { type: String },
    city: { type: String },
    skintype: { type: String },
    name: { type: String },
    gender: {type: String},
    username: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
})

export default mongoose.models.User || model("User", UserSchema)