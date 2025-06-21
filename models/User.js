import mongoose from "mongoose";
import { stringifyResumeDataCache } from "next/dist/server/resume-data-cache/resume-data-cache";
const { Schema, model } = mongoose;


const AddressSchema = new mongoose.Schema({
  house: { type: String, trim: true },
  street: { type: String, trim: true },
  city: { type: String, trim: true },
  state: { type: String, trim: true },
  country: { type: String, default: "India", trim: true },
  pincode: { type: String, trim: true },
  extraPhone: { type: String, trim: true },
  language: { type: String, default: "English", trim: true },
});
// const UserSchema = new Schema({
//     email: { type: String, required: true },
//     password: { type: String },
//     weight: { type: String },
//     age: { type: String },
//     address: { type: String },
//     city: { type: String },
//     skintype: { type: String },
//     name: { type: String },
//     gender: {type: String},
//     username: { type: String, required: true },
//     createdAt: { type: Date, default: Date.now },
//     updatedAt: { type: Date, default: Date.now }
// })
const UserSchema = new Schema({
  name: { type: String, trim: true },
  photo: { type: String, default: "" },
  phone: { type: String, default: "" },
  username: { type: String, required: true },
  password: { type: String },
  email: { type: String, trim: true, lowercase: true },
  dob: { type: Date, default: null },
  gender: { type: String, enum: ["Male", "Female", "Other"], trim: true,default: "Other", },
  bloodGroup: { type: String, trim: true },
  weight: { type: Number, min: 0, default: null },
  chattedWith: [{ type: mongoose.Schema.Types.ObjectId, ref: "Doctor" }],
  paidDoctors: [{ type: mongoose.Schema.Types.ObjectId, ref: "Doctor" }],
  skinType: {
    type: String,
    enum: ["Oily", "Dry", "Combination", "Sensitive", "Normal"],
    trim: true,
    default: "Normal",
  },
  timezone: { type: String, default: "Asia/Kolkata", trim: true },
  address: AddressSchema,
},
  { timestamps: true }
)

export default mongoose.models.User || model("User", UserSchema)