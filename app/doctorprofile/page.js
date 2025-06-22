"use client";
import { useState, useEffect } from "react";
import { FaCamera } from "react-icons/fa";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { saveDoctorProfile, getDoctorProfileFromDB } from "@/actions/useraction";
import LoadingOverlay from "@/Components/LoadingOverlay";

const DoctorDashboard = () => {
  const { data: session, status } = useSession()

  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter()

  const [doctorData, setDoctorData] = useState({
    username: "",
    email: "",
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
    gender: "",
    specialty: "",
    onlineSlots: [],
    availableDays: [],
    // category: "",
    expertise: [],
    patientStories: "",
    rating: "",
    reviews: [
      {
        title: "",
        date: "",
        recommended: false,
        tags: [],
        comment: "",
      },
    ],
    faqs: [
      {
        question: "",
        answer: "",
      },
    ],
  });

  const expertiseOptions = [
    "Acne Treatment", "Skin Allergy", "Eczema", "Psoriasis", "Hair Loss Treatment",
    "Laser Hair Removal", "Skin Rejuvenation", "Botox & Fillers", "Anti-Aging Treatment",
    "Chemical Peeling", "Pigmentation Treatment", "Dark Circle Removal", "Acne Scars",
    "Rhinoplasty", "Face Lift", "Scar Revision Surgery", "Hair Transplant",
    "Dandruff Treatment", "PRP Therapy", "Laser Treatment", "Mole & Wart Removal",
    "Tattoo Removal", "Skin Brightening", "HydraFacial", "Body Contouring",
    "Liposuction", "Fat Grafting", "Breast Augmentation", "Stretch Marks Removal",
    "Microneedling"
  ];



  useEffect(() => {
    async function fetchData() {
      if (status === "loading") return;
      if (session?.user?.email) {
        setDoctorData((prev) => ({
          ...prev,
          email: session.user.email,
        }));
        const doctor = await getDoctorProfileFromDB(session.user.email);
        console.log(doctor)
        if (doctor) {
          setIsLoading(false)
          setDoctorData((prev) => ({
            ...prev,
            ...doctor,
          }));
        }

      } else {
        router.push("/login")
      }
    }
    fetchData();
  }, [session, status]);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setDoctorData((prev) => ({ ...prev, [name]: value }));
  };

  // const handleFileUpload = (e) => {
  //   const file = e.target.files[0];
  //   setDoctorData((prev) => ({ ...prev, photo: URL.createObjectURL(file) }));
  // };


  // const handleFileUpload = (e) => {
  //   const file = e.target.files[0];
  //   if (file) {
  //     setDoctorData((prev) => ({
  //       ...prev,
  //       photo: file, // store actual File object, not URL
  //     }));
  //   }
  // };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file); // for preview

      setDoctorData((prev) => ({
        ...prev,
        photo: file,            // actual file for upload
        preview: previewUrl,    // temp preview for UI
      }));
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    alert("Thank you! Your profile has been submitted. Our admin team will review it soon and make it live after verification.");

    const result = await saveDoctorProfile(doctorData);


    if (result.success) {
      alert("Profile saved!");
    } else {
      alert(result.message);
    }
  };

  return (
    <>
      {isLoading && <LoadingOverlay />}
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
                  src={doctorData.preview || doctorData.photo}
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
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="font-medium text-sm">Doctor Name</label>
              <input
                type="text"
                name="username"
                placeholder="Enter your full name"
                className="w-full shadow-sm p-2 text-sm border-gray-300 border rounded-md mt-1"
                value={doctorData.username}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label className="font-medium text-sm">License Number</label>
              <input
                type="text"
                name="licenseNumber"
                placeholder="Enter your license number"
                className="w-full shadow-sm p-2 text-sm border-gray-300 border rounded-md mt-1"
                value={doctorData.licenseNumber}
                onChange={handleChange}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="font-medium text-sm">Years of Experience</label>
                <input
                  type="number"
                  name="experience"
                  placeholder="Enter years of experience"
                  className="w-full shadow-sm p-2 text-sm border-gray-300 border rounded-md mt-1"
                  value={doctorData.experience}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label className="font-medium text-sm">Age</label>
                <input
                  type="number"
                  name="age"
                  placeholder="Enter your age"
                  className="w-full shadow-sm p-2 text-sm border-gray-300 border rounded-md mt-1"
                  value={doctorData.age}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label className="font-medium text-sm">Gender</label>
                <select
                  name="gender"
                  className="w-full shadow-sm p-2 text-sm border-gray-300 border rounded-md mt-1"
                  value={doctorData.gender}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            <div>
              <label className="font-medium text-sm">Degree</label>
              <input
                type="text"
                name="degree"
                placeholder="Enter your highest degree"
                className="w-full shadow-sm p-2 text-sm border-gray-300 border rounded-md mt-1"
                value={doctorData.degree}
                onChange={handleChange}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="font-medium text-sm">Online Consultation Fee</label>
                <input
                  type="number"
                  name="onlineFee"
                  placeholder="Enter fee amount"
                  className="w-full shadow-sm p-2 text-sm border-gray-300 border rounded-md mt-1"
                  value={doctorData.onlineFee}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label className="font-medium text-sm">Physical Consultation Fee</label>
                <input
                  type="number"
                  name="physicalFee"
                  placeholder="Enter fee amount"
                  className="w-full shadow-sm p-2 text-sm border-gray-300 border rounded-md mt-1"
                  value={doctorData.physicalFee}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div>
              <label className="font-medium text-sm">Clinic Name</label>
              <input
                type="text"
                name="clinicName"
                placeholder="Enter your clinic name"
                className="w-full shadow-sm p-2 text-sm border-gray-300 border rounded-md mt-1"
                value={doctorData.clinicName}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label className="font-medium text-sm">Location</label>
              <input
                type="text"
                name="location"
                placeholder="Enter clinic location"
                className="w-full shadow-sm p-2 text-sm border-gray-300 border rounded-md mt-1"
                value={doctorData.location}
                onChange={handleChange}
                required
              />
            </div>

            {/* Category */}
            <div>
              <label className="font-medium text-sm">Specialty</label>
              <select
                name="specialty"
                className="w-full shadow-sm p-2 text-sm border-gray-300 border rounded-md mt-1"
                value={doctorData.specialty}
                onChange={handleChange}
                required
              >
                <option value="">Select Category</option>
                <option value="Ayurvedic">Ayurvedic</option>
                <option value="Dermatology">Dermatology</option>
                <option value="Cosmetology">Cosmetology</option>
              </select>
            </div>
            <div>
              <label className="font-medium text-sm">Expertise</label>
              <div className="border p-2 rounded mt-1 bg-white relative">
                <div className="flex flex-wrap gap-2">
                  {doctorData.expertise?.map((item, index) => (
                    <span
                      key={index}
                      className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-sm flex items-center gap-1"
                    >
                      {item}
                      <button
                        type="button"
                        onClick={() =>
                          setDoctorData((prev) => ({
                            ...prev,
                            expertise: prev.expertise.filter((exp) => exp !== item),
                          }))
                        }
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>

                {/* Dropdown */}
                <select
                  className="w-full mt-2 p-2 border rounded"
                  value=""
                  onChange={(e) => {
                    const selected = e.target.value;
                    if (selected && !doctorData.expertise.includes(selected)) {
                      setDoctorData((prev) => ({
                        ...prev,
                        expertise: [...prev.expertise, selected],
                      }));
                    }
                    e.target.selectedIndex = 0;
                  }}
                >
                  <option value="">Select expertise</option>
                  {expertiseOptions.map((option, index) => (
                    <option key={index} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
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
    </>
  );
};

export default DoctorDashboard;
