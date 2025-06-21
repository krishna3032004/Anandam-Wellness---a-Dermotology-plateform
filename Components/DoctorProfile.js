"use client"
import { FaCalendarAlt, FaClinicMedical, FaUserMd, FaMoneyBillWave, FaPhone, FaStar, FaCheckCircle } from "react-icons/fa";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { initiatepayment } from "@/actions/useraction";
import Script from "next/script";
import LoadingOverlay from "./LoadingOverlay";
import Razorpay from "razorpay";

const DoctorProfile = ({ doctor }) => {
  const { data: session, status } = useSession()
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("info");
 let doctorId = doctor._id
 
 const [isLoading, setIsLoading] = useState(false);

const faqs = [
  {
    "question": "Where does Dr. L K Desai practice?",
    "answer": "Dr. L K Desai practices at Dr. Desai Dermacare - Skin, Hair & Laser Clinic - Sopan Baug.",
    "_id": {
      "$oid": "683ff800ecf106eeaaa20c61"
    }
  },
  {
    "question": "How can I take Dr. L K Desai's appointment?",
    "answer": "You can take an appointment online through Practo for in-clinic visits with the doctor.",
    "_id": {
      "$oid": "683ff800ecf106eeaaa20c62"
    }
  }
]

  const handleBook = () => {
    setIsLoading(true)
    router.push(`/payment?doctorId=${doctorId}`);
  };

  

  const handlecheck = () => {
    if (!session) {
      alert("first do login")
    }
  }

  const timeAgo = (dateString) => {
    const now = new Date();
    const date = new Date(dateString);
    const seconds = Math.floor((now - date) / 1000);
  
    if (seconds < 60) return `${seconds} sec ago`;
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes} min ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    const days = Math.floor(hours / 24);
    if (days < 7) return `${days} day${days > 1 ? 's' : ''} ago`;
    const weeks = Math.floor(days / 7);
    if (weeks < 4) return `${weeks} week${weeks > 1 ? 's' : ''} ago`;
    const months = Math.floor(days / 30);
    if (months < 12) return `${months} month${months > 1 ? 's' : ''} ago`;
    const years = Math.floor(days / 365);
    return `${years} year${years > 1 ? 's' : ''} ago`;
  };
  
  return (
    <>
    {isLoading && <LoadingOverlay />}
      <Script
        src="https://checkout.razorpay.com/v1/checkout.js"
        strategy="afterInteractive" // ✅ Important
        onLoad={() => {
          console.log("✅ Razorpay script loaded successfully");
        }}
      />
      {/* <Script src="https://checkout.razorpay.com/v1/checkout.js"></Script> */}
      {/* <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="beforeInteractive"></Script> */}

      <div className="max-w-6xl mt-16 mx-auto py-6 px-2 sm:px-6  grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Side - Doctor Info */}
        <div className="md:col-span-2 bg-white flex flex-col gap-5 py-6 px-2 sm:px-6 shadow-lg rounded-lg">
          {/* Doctor Header */}
          <div className="flex items-center">
            <img src={doctor.photo} alt={doctor.username} className="w-20 sm:w-24 h-20 sm:h-24 rounded-full border-4 border-blue-500" />
            <div className="ml-4">
              <h2 className="text-xl sm:text-2xl font-bold text-blue-700">{doctor.username}</h2>
              <p className="text-sm sm:text-base text-gray-600">{doctor.specialty} • {doctor.experience} years experience</p>
              {/* <p className="text-gray-800 font-semibold">{doctor.clinicName}</p> */}
              <p className="text-sm sm:text-base text-gray-500">{doctor.location}</p>
              <p className="text-green-600 font-bold flex items-center text-sm sm:text-base">
                <FaStar className="text-yellow-500 mr-1 text-sm sm:text-base" /> {doctor.rating} ({doctor.reviews.length} Patient Stories)
              </p>
            </div>
          </div>

          {/* Clinic & Doctor Details */}
          <div className="mt-4 space-y-3">
            <div className="flex text-sm sm:text-base items-center space-x-2">
              <FaClinicMedical className="text-blue-600" />
              <span>{doctor.clinicName}</span>
            </div>
            <div className="flex text-sm sm:text-base items-center space-x-2">
              <FaUserMd className="text-blue-600" />
              <span>{doctor.specialty}</span>
            </div>
            <div className="flex text-sm sm:text-base items-center space-x-2">
              <FaMoneyBillWave className="text-blue-600" />
              <span>₹{doctor.onlineFee} Consultation Fee</span>
            </div>
            <div className="flex text-sm sm:text-base items-center space-x-2">
              <FaCalendarAlt className="text-blue-600" />
              <span>{doctor.availableDays.join(" | ")}</span>
            </div>
          </div>

          {/* Patient Stories (Reviews) */}
          {/* <div className="mt-6">
          <h3 className="text-xl font-bold text-blue-700">Patient Stories</h3>
          <div className="mt-3 space-y-4">
            {doctor.reviews.map((review, index) => (
              <div key={index} className="p-4 border rounded-md bg-gray-50">
                <p className="font-semibold">{review.title}</p>
                <p className="text-sm text-gray-600">{review.date} • {review.recommended ? "✔ Recommended" : "✖ Not Recommended"}</p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {review.tags.map((tag, i) => (
                    <span key={i} className="px-2 py-1 text-xs border rounded-md text-blue-600 bg-blue-50">{tag}</span>
                  ))}
                </div>
                <p className="mt-2 text-gray-700">{review.comment}</p>
              </div>
            ))}
          </div>
        </div>

        Common Questions & Answers 
        <div className="mt-6">
          <h3 className="text-xl font-bold text-blue-700">Common Questions & Answers</h3>
          <div className="mt-3 space-y-4">
            {doctor.faqs.map((faq, index) => (
              <div key={index} className="p-4 border rounded-md bg-gray-50">
                <p className="font-semibold text-blue-700">Q: {faq.question}</p>
                <p className="text-gray-700">A: {faq.answer}</p>
              </div>
            ))}
          </div>
        </div> */}


          <div className="flex border-b ">
            {["info", "stories", "qa"].map((tab) => (
              <button
                key={tab}
                className={`px-3 sm:px-6 py-1 sm:py-2 font-semibold ${activeTab === tab ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-600"}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab === "info" && "Info"}
                {tab === "stories" && `Stories (${doctor.reviews.length})`}
                {tab === "qa" && "Consult Q&A"}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="mt-6">
            {activeTab === "info" && (
              <div>
                <p className="text-gray-500 text-sm sm:text-base">{doctor.location}</p>
                <h2 className="text-base sm:text-lg font-bold text-blue-700">{doctor.clinicName}</h2>
                <p className="text-green-600 font-bold flex items-center text-sm sm:text-base">
                  <FaStar className="text-yellow-500 mr-1" /> {doctor.rating}
                </p>
                <p className="text-gray-600 text-sm sm:text-base">{doctor.address}</p>

                <div className="flex space-x-2 text-blue-600 mt-2 text-sm sm:text-base">
                  <a href="#" className="underline">Get Directions</a>
                </div>

                <div className="mt-4">
                  <h3 className="text-blue-700 font-semibold text-sm sm:text-base">Availability</h3>
                  {doctor.availableDays.map((slot, index) => (
                    <p key={index} className="text-gray-700 text-sm sm:text-base">{slot}</p>
                  ))}
                </div>

                <div className="mt-4">
                  <p className="text-gray-700 font-semibold text-sm sm:text-base">Consultation Fee: ₹{doctor.physicalFee}</p>
                  <p className="text-gray-600 flex items-center text-sm sm:text-base">
                    <FaCheckCircle className="text-purple-600 mr-1" /> Prime Verified Details
                  </p>
                </div>
                
                  <button onClick={handleBook} className="mt-4 w-full bg-blue-500 text-sm sm:text-base text-white py-2 rounded-md hover:bg-blue-700 flex items-center justify-center space-x-2">
                    <FaCalendarAlt />
                    <span>Book Appointment</span>
                  </button>
                
              </div>
            )}

            {activeTab === "stories" && (
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-blue-700">Patient Stories</h3>
                <div className="mt-3 space-y-4 overflow-y-auto max-h-[78vh]">
                  {doctor.reviews.map((review, index) => (
                    <div key={index} className="p-4 border rounded-md bg-gray-50">
                      <p className="font-semibold text-sm sm:text-base">{review.title}</p>
                      <p className="text-xs sm:text-sm text-gray-600">{timeAgo(review.date)} • {review.recommended ? "✔ Recommended" : "✖ Not Recommended"}</p>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {review.tags.map((tag, i) => (
                          <span key={i} className="px-2 py-1 text-xs border rounded-md text-blue-600 bg-blue-50">{tag}</span>
                        ))}
                      </div>
                      <p className="mt-2 text-gray-70 text-sm sm:text-base">{review.comment}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "qa" && (
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-blue-700">Consult Q&A</h3>
                <div className="mt-3 space-y-4">
                  {faqs.map((faq, index) => (
                    <div key={index} className="p-4 border rounded-md text-sm sm:text-base bg-gray-50">
                      <p className="font-semibold text-blue-700">Q: {faq.question}</p>
                      <p className="text-gray-700">A: {faq.answer}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Side - Clinic Appointment */}
        <div className="bg-white p-6 shadow-lg rounded-lg">
          <h3 className="text-base sm:text-lg font-bold text-blue-700">Clinic Appointment</h3>
          <p className="text-gray-600 text-sm sm:text-base">₹{doctor.physicalFee} fee</p>

          <div className="mt-4 space-y-2">
            {doctor.onlineSlots.map((slot, index) => (
              <button key={index} className="px-4 py-2 border mr-2 text-sm sm:text-base rounded-md text-blue-600 hover:bg-blue-600 hover:text-white">
                {slot}
              </button>
            ))}
          </div>

          <div className="mt-4 space-y-3">
            <button className="w-full bg-blue-500 text-sm sm:text-base text-white py-2 rounded-md hover:bg-blue-700 flex items-center justify-center space-x-2">
              <FaCalendarAlt />
              <span>Book Clinic Visit</span>
            </button>
            <button className="w-full border py-2 text-sm sm:text-base rounded-md flex items-center justify-center space-x-2 hover:bg-gray-100">
              <FaPhone className="text-blue-600" />
              <span>Contact Clinic</span>
            </button>
          </div>
        </div>
      </div >
    </>
  );
};

export default DoctorProfile;
