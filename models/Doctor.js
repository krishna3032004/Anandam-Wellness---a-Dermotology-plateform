import mongoose from "mongoose";
const { Schema, model } = mongoose;

const DoctorSchema = new Schema({
  // email: { type: String, required: true },
  // password: { type: String },
  // degree: { type: String },
  // onlineconsultationfee: { type: Number },
  // physicalconsultationfee: { type: Number },
  // specialization: { type: String },
  // address: { type: String },
  // timing: { type: String },
  // experienceyear: { type: Number },
  // name: { type: String },
  // gender: {type: String},
  // username: { type: String, required: true },
  // createdAt: { type: Date, default: Date.now },
  // updatedAt: { type: Date, default: Date.now },



  //     email: { type: String, required: true, unique: true },
  //   username: {type :String},
  //   password: { type: String },
  //   licenseNumber: { type:String},
  //   experience: {type :Number},
  //   degree: {type :String},
  //   age: {type :Number},
  //   gender: {type: String},
  //   photo: {type :String},
  //   onlineFee: {type :Number},
  //   physicalFee: {type :Number},
  //   technologies: {type :String},
  //   clinicName: {type :String},
  //   location: {type:String},
  //   timings: {type :String},
  //   specialization: {type :String},
  //   onlineSlots: {type :String},
  //   availableDays: {type :String},
  //   category: {type :String},



  live: {
    type: Boolean,
    default: false,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  licenseNumber: {
    type: String,
  },
  gender: { type: String },
  experience: {
    type: Number,
  },
  degree: {
    type: String,
  },
  age: {
    type: Number,
  },
  photo: {
    type: String, // Store as a URL or base64
    default: "",
  },
  onlineFee: {
    type: Number,
  },
  physicalFee: {
    type: Number,
  },
  technologies: {
    type: [String], // e.g., ["Laser", "PRP"]
    default: [],
  },
  clinicName: {
    type: String,
  },
  location: {
    type: String,
  },
  timings: {
    type: [String], // e.g., ["10:00-13:00", "17:00-20:00"]
    default: [],
  },
  specialty: {
    type: [String], // e.g., ["Hair", "Skin"]
    default: [],
  },
  onlineSlots: {
    type: [String], // e.g., ["10:00 AM", "11:00 AM"]
    default: [],
  },
  availableDays: {
    type: [String], // e.g., ["Monday", "Wednesday"]
    default: [],
  },
  // category: {
  //   type: String,
  //   enum: ["Ayurvedic", "Dermatology", "Cosmetology"],
  // },
  expertise: {
    type: [String],
    default: [],
  },
  patientStories: {
    type: Number,
    default: 0,
  },
  rating: {
    type: Number,
    default: 0,
  },
  reviews: [
    {
      userId: String,
      title: String,         // e.g., "Visited for Skin Treatment"
      date: String,          // ISO string
      rating: Number,        // 1 to 5 stars (✅ NEW)
      recommended: Boolean,  // true/false
      tags: [String],        // e.g., ["Doctor Friendliness", "Value for Money"]
      comment: String,       // optional
    },
  ],
  faqs: [
    {
      question: String,
      answer: String,
    },
  ],
  chattedWith: [{ type: mongoose.Schema.Types.ObjectId, ref: "Doctor" }],
  // paidDoctors: [{ type: mongoose.Schema.Types.ObjectId, ref: "Doctor" }],

  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
})

export default mongoose.models.Doctor || model("Doctor", DoctorSchema)