"use client";
import { useState } from "react";
import { FaCamera } from "react-icons/fa";

const DoctorDashboard = () => {
  const [doctorData, setDoctorData] = useState({
    name: "",
    licenseNumber: "",
    experience: "",
    degree: "",
    age: "",
    photo: null,
    onlineFee: "",
    physicalFee: "",
    technologies: [],
    clinicName: "",
    location: "",
    timings: [],
    specialization: [],
    onlineSlots: [],
    availableDays: [],
    category: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDoctorData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    setDoctorData((prev) => ({ ...prev, photo: URL.createObjectURL(file) }));
  };

  return (
    <div className="min-h-screen mt-16 bg-gray-100 py-10 px-6">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">
          Doctor Dashboard
        </h2>

        {/* Profile Photo Upload */}
        <div className="flex flex-col items-center mb-6">
          <label className="relative cursor-pointer">
            {doctorData.photo ? (
              <img
                src={doctorData.photo}
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
          <p className="text-gray-500 text-sm mt-2">Click to upload photo</p>
        </div>

        {/* Form Fields */}
        <form className="space-y-4">
          <div>
            <label className="font-medium">Doctor Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter your full name"
              className="w-full p-3 border rounded mt-1"
              value={doctorData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="font-medium">License Number</label>
            <input
              type="text"
              name="licenseNumber"
              placeholder="Enter your license number"
              className="w-full p-3 border rounded mt-1"
              value={doctorData.licenseNumber}
              onChange={handleChange}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="font-medium">Years of Experience</label>
              <input
                type="number"
                name="experience"
                placeholder="Enter years of experience"
                className="w-full p-3 border rounded mt-1"
                value={doctorData.experience}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label className="font-medium">Age</label>
              <input
                type="number"
                name="age"
                placeholder="Enter your age"
                className="w-full p-3 border rounded mt-1"
                value={doctorData.age}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div>
            <label className="font-medium">Degree</label>
            <input
              type="text"
              name="degree"
              placeholder="Enter your highest degree"
              className="w-full p-3 border rounded mt-1"
              value={doctorData.degree}
              onChange={handleChange}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="font-medium">Online Consultation Fee</label>
              <input
                type="number"
                name="onlineFee"
                placeholder="Enter fee amount"
                className="w-full p-3 border rounded mt-1"
                value={doctorData.onlineFee}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label className="font-medium">Physical Consultation Fee</label>
              <input
                type="number"
                name="physicalFee"
                placeholder="Enter fee amount"
                className="w-full p-3 border rounded mt-1"
                value={doctorData.physicalFee}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div>
            <label className="font-medium">Clinic Name</label>
            <input
              type="text"
              name="clinicName"
              placeholder="Enter your clinic name"
              className="w-full p-3 border rounded mt-1"
              value={doctorData.clinicName}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="font-medium">Location</label>
            <input
              type="text"
              name="location"
              placeholder="Enter clinic location"
              className="w-full p-3 border rounded mt-1"
              value={doctorData.location}
              onChange={handleChange}
              required
            />
          </div>

          {/* Category */}
          <div>
            <label className="font-medium">Category</label>
            <select
              name="category"
              className="w-full p-3 border rounded mt-1"
              value={doctorData.category}
              onChange={handleChange}
              required
            >
              <option value="">Select Category</option>
              <option value="Ayurvedic">Ayurvedic</option>
              <option value="Dermatology">Dermatology</option>
              <option value="Cosmetology">Cosmetology</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700 transition mt-4"
          >
            Save Profile
          </button>
        </form>
      </div>
    </div>
  );
};

export default DoctorDashboard;
