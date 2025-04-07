"use client"
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { updateProfilefull } from "@/actions/useraction";
import { FaCamera } from "react-icons/fa";
import { useSession } from "next-auth/react";


const doctors = [
  {
      id: 1,
      name: "Dr. L K Desai",
      specialty: "Dermatologist",
      expertise: ["Acne Treatment", "Skin Allergy", "Eczema", "Psoriasis"],
      experience: 30,
      location: "Sopan Baug, Pune",
      clinic: "Dr. Desai Dermacare",
      consultationFee: 700,
      patientStories: 338,
      rating: 94,
      availability: "Available Tomorrow",
      gender: "Male",
      img: "https://i.pinimg.com/474x/b7/14/a2/b714a2713d5d9259dab2a7c0b7df4ff9.jpg",
    },
    {
      id: 2,
      name: "Dr. Sonal Chavan",
      specialty: "Dermatologist",
      expertise: ["Hair Loss Treatment", "Laser Hair Removal", "Skin Rejuvenation"],
      experience: 19,
      location: "Pimple Saudagar, Pune",
      clinic: "Viva Luxe Aesthetic Clinic",
      consultationFee: 700,
      patientStories: 1531,
      rating: 90,
      availability: "Available Today",
      gender: "Female",
      img: "https://i.pinimg.com/474x/b7/14/a2/b714a2713d5d9259dab2a7c0b7df4ff9.jpg",
    },
    {
      id: 3,
      name: "Dr. Rajeev Agarwal",
      specialty: "Cosmetologist",
      expertise: ["Botox & Fillers", "Anti-Aging Treatment", "Chemical Peeling"],
      experience: 15,
      location: "Koregaon Park, Pune",
      clinic: "Skin Glow Clinic",
      consultationFee: 800,
      patientStories: 421,
      rating: 88,
      availability: "Available Tomorrow",
      gender: "Male",
      img: "https://i.pinimg.com/474x/b7/14/a2/b714a2713d5d9259dab2a7c0b7df4ff9.jpg",
    },
    {
      id: 4,
      name: "Dr. Priya Sharma",
      specialty: "Dermatologist",
      expertise: ["Pigmentation Treatment", "Dark Circle Removal", "Acne Scars"],
      experience: 10,
      location: "Andheri, Mumbai",
      clinic: "DermaCare Skin Clinic",
      consultationFee: 600,
      patientStories: 210,
      rating: 92,
      availability: "Available Today",
      gender: "Female",
      img: "https://i.pinimg.com/474x/b7/14/a2/b714a2713d5d9259dab2a7c0b7df4ff9.jpg",
    },
    {
      id: 5,
      name: "Dr. Aditya Mehta",
      specialty: "Plastic Surgeon",
      expertise: ["Rhinoplasty", "Face Lift", "Scar Revision Surgery"],
      experience: 20,
      location: "Bandra, Mumbai",
      clinic: "Aesthetic Surgeons",
      consultationFee: 1200,
      patientStories: 500,
      rating: 96,
      availability: "Available Next Week",
      gender: "Male",
      img: "https://i.pinimg.com/474x/b7/14/a2/b714a2713d5d9259dab2a7c0b7df4ff9.jpg",
    },
    {
      id: 6,
      name: "Dr. Neha Kapoor",
      specialty: "Trichologist",
      expertise: ["Hair Transplant", "Dandruff Treatment", "PRP Therapy"],
      experience: 8,
      location: "Powai, Mumbai",
      clinic: "Hair & Scalp Care",
      consultationFee: 650,
      patientStories: 189,
      rating: 85,
      availability: "Available Today",
      gender: "Female",
      img: "https://i.pinimg.com/474x/b7/14/a2/b714a2713d5d9259dab2a7c0b7df4ff9.jpg",
    },
    {
      id: 7,
      name: "Dr. Vikram Singh",
      specialty: "Dermatologist",
      expertise: ["Laser Treatment", "Mole & Wart Removal", "Tattoo Removal"],
      experience: 25,
      location: "Vashi, Navi Mumbai",
      clinic: "Healthy Skin Clinic",
      consultationFee: 900,
      patientStories: 620,
      rating: 94,
      availability: "Available Tomorrow",
      gender: "Male",
      img: "https://i.pinimg.com/474x/b7/14/a2/b714a2713d5d9259dab2a7c0b7df4ff9.jpg",
    },
    {
      id: 8,
      name: "Dr. Radhika Nair",
      specialty: "Cosmetologist",
      expertise: ["Skin Brightening", "HydraFacial", "Body Contouring"],
      experience: 12,
      location: "Whitefield, Bangalore",
      clinic: "Glow & Glam Clinic",
      consultationFee: 700,
      patientStories: 378,
      rating: 91,
      availability: "Available Today",
      gender: "Female",
      img: "https://i.pinimg.com/474x/b7/14/a2/b714a2713d5d9259dab2a7c0b7df4ff9.jpg",
    },
    {
      id: 9,
      name: "Dr. Anil Verma",
      specialty: "Aesthetic Surgeon",
      expertise: ["Liposuction", "Fat Grafting", "Breast Augmentation"],
      experience: 18,
      location: "Indiranagar, Bangalore",
      clinic: "Aesthetic Solutions",
      consultationFee: 1500,
      patientStories: 450,
      rating: 97,
      availability: "Available Next Week",
      gender: "Male",
      img: "https://i.pinimg.com/474x/b7/14/a2/b714a2713d5d9259dab2a7c0b7df4ff9.jpg",
    },
    {
      id: 10,
      name: "Dr. Pooja Saxena",
      specialty: "Dermatologist",
      expertise: ["Stretch Marks Removal", "Chemical Peeling", "Microneedling"],
      experience: 9,
      location: "South Delhi",
      clinic: "Skin Perfection",
      consultationFee: 750,
      patientStories: 276,
      rating: 89,
      availability: "Available Tomorrow",
      gender: "Female",
      img: "https://i.pinimg.com/474x/b7/14/a2/b714a2713d5d9259dab2a7c0b7df4ff9.jpg",
    }, ];

    
export default function ProfilePage() {
  const router = useRouter()
  const { data: session, status } = useSession()
  const [formData, setFormData] = useState({
    name: "Krishna Gupta",
    phone: "+919109697516",
    email: "",
    dob: "",
    gender: "",
    bloodGroup: "",
    weight: "",
    skinType: "",
    timezone: "Asia/Kolkata",
    address: {
      house: "",
      street: "",
      city: "",
      state: "",
      country: "India",
      pincode: "",
      extraPhone: "",
      language: "English",
    },
  });
  useEffect(() => {
    if(session){
    console.log(session)
    }
  
  }, [session])
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSaveChanges = async () => {
    // await updateProfilefull(formData)
    // Navigate to the search page
    router.push("/search");
  };


  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    setFormData((prev) => ({ ...prev, photo: URL.createObjectURL(file) }));
  };


  return (
    <div className="max-w-4xl mx-auto mt-16 p-6 bg-white shadow-md rounded-lg border border-gray-200">
      {/* Title */}
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Profile Settings</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Profile Photo */}
        <div className="flex flex-col items-center space-y-2">
          <label className="relative cursor-pointer">
            {formData.photo ? (
              <img
                src={formData.photo}
                alt="Doctor"
                className="w-24 h-24 rounded-full object-cover border-4 border-blue-500"
              />
            ) : (
              <div className="w-24 h-24 rounded-full flex items-center justify-center bg-gray-200 border-4 border-gray-300">
                <FaCamera className="text-gray-500 text-2xl" />
              </div>
            )}
            <input type="file" className="hidden" onChange={handleFileUpload} />
          </label>
          <p className="text-blue-500 text-sm font-medium cursor-pointer hover:underline">Add Photo</p>
        </div>

        {/* Name Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Name*</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 text-sm"
          />
        </div>

        {/* Phone Number */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Phone Number</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            disabled
            className="mt-1 block w-full bg-gray-100 border border-gray-300 rounded-md p-2 text-sm"
          />
        </div>

        {/* Email Address */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Email Address</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2 text-sm"
          />
        </div>

        {/* Date of Birth */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
          <input
            type="date"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2 text-sm"
          />
        </div>

        {/* Gender */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Gender</label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2 text-sm"
          >
            <option>Select</option>
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>
        </div>

        {/* Weight */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Weight (kg)</label>
          <select
            name="weight"
            value={formData.weight}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2 text-sm"
          >
            <option>Select</option>
            {Array.from({ length: 100 }, (_, i) => i + 30).map((kg) => (
              <option key={kg} value={kg}>
                {kg} kg
              </option>
            ))}
          </select>
        </div>

        {/* Skin Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Skin Type</label>
          <select
            name="skinType"
            value={formData.skinType}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2 text-sm"
          >
            <option>Select</option>
            <option>Dry</option>
            <option>Oily</option>
            <option>Combination</option>
            <option>Normal</option>
            <option>Sensitive</option>
          </select>
        </div>

        {/* Blood Group */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Blood Group</label>
          <select
            name="bloodGroup"
            value={formData.bloodGroup}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2 text-sm"
          >
            <option>Select</option>
            <option>A+</option>
            <option>B+</option>
            <option>O+</option>
            <option>AB+</option>
            <option>A-</option>
            <option>B-</option>
            <option>O-</option>
            <option>AB-</option>
          </select>
        </div>

        {/* Timezone */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Timezone</label>
          <select
            name="timezone"
            value={formData.timezone}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2 text-sm"
          >
            <option value="Asia/Kolkata">(UTC+05:30) Asia/Kolkata</option>
          </select>
        </div>
      </div>

      {/* Address Section */}
      <h2 className="text-lg font-semibold text-gray-800 mt-6 mb-3">Address</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <input type="text" name="house" placeholder="House No." className="border border-gray-300 p-2 rounded-md text-sm" />
        <input type="text" name="street" placeholder="Street" className="border border-gray-300 p-2 rounded-md text-sm" />
        <input type="text" name="city" placeholder="City" className="border border-gray-300 p-2 rounded-md text-sm" />
        <input type="text" name="state" placeholder="State" className="border border-gray-300 p-2 rounded-md text-sm" />
        <select name="country" className="border border-gray-300 p-2 rounded-md text-sm">
          <option>India</option>
        </select>
        <input type="text" name="pincode" placeholder="Pincode" className="border border-gray-300 p-2 rounded-md text-sm" />
      </div>

      {/* Save Changes Button */}
      <div className="mt-6 flex justify-end">
        <button onClick={handleSaveChanges} className="px-4 py-2 bg-blue-500 text-white text-sm font-medium rounded-md shadow-md hover:bg-blue-600 transition">
          Save Changes
        </button>
      </div>
    </div>
  );
}
