"use client"
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const router = useRouter()
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSaveChanges = () => {
    // Navigate to the search page
    router.push("/search");
  };

  return (
    <div className="max-w-4xl mx-auto mt-16 p-6 bg-white shadow-md rounded-lg border border-gray-200">
      {/* Title */}
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Profile Settings</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Profile Photo */}
        <div className="flex flex-col items-center space-y-2">
          <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
            Photo
          </div>
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
