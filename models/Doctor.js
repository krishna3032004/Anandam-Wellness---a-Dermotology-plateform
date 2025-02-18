import mongoose from "mongoose";
const { Schema, model } = mongoose;

const DoctorSchema = new Schema({
    email: { type: String, required: true },
    password: { type: String },
    degree: { type: String },
    onlineconsultationfee: { type: Number },
    physicalconsultationfee: { type: Number },
    specialization: { type: String },
    address: { type: String },
    timing: { type: String },
    experienceyear: { type: Number },
    name: { type: String },
    gender: {type: String},
    username: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
})

export default mongoose.models.Doctor || model("Doctor", DoctorSchema)