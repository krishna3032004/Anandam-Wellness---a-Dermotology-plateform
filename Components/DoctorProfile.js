"use client"
import { FaCalendarAlt, FaClinicMedical, FaUserMd, FaMoneyBillWave, FaPhone, FaStar, FaCheckCircle } from "react-icons/fa";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { initiatepayment } from "@/actions/useraction";
import Script from "next/script";
import Razorpay from "razorpay";
const DoctorProfile = ({ doctor }) => {
  const { data: session, status } = useSession()
  const [activeTab, setActiveTab] = useState("info");


  const pay = async (amount) => {
    try {
      console.log(session.user.email)
      let amount2 = Number.parseInt(amount);
      let a = await initiatepayment(amount2, session.user.email);
      // let a = await initiatepayment(amount2, session.user.email, form);
      // setIsLoading(true);

      let orderID = a.id;
      var options = {
        "key_id": process.env.NEXT_PUBLIC_KEY_ID, // Razorpay Key ID
        "amount": amount2 * 100, // Convert amount to paisa (INR subunit)
        "currency": "INR",
        "name": "Anandam", // Business name
        "description": "Test Transaction",
        "image": "https://example.com/your_logo",
        "order_id": orderID, // Order ID from backend response
        "callback_url": `${process.env.NEXT_PUBLIC_URL2}/api/razorpay`,
        "prefill": {
          "name": session.user.name, // Use actual session user name
          "email": session.user.email,
          "contact": "9000090000"
        },
        "notes": {
          "address": "Razorpay Corporate Office"
        },
        "theme": {
          "color": "#3399cc"
        },
        "modal": {
          "ondismiss": function () {
            console.log("Payment cancelled by user!");
            // alert("Payment was cancelled! Redirecting to homepage...");
            // toast.warning('Payment was cancelled! Try again', {
            //   position: "bottom-right",
            //   autoClose: 3000,
            //   hideProgressBar: true,
            //   stacked: false,
            //   closeOnClick: true,
            //   pauseOnHover: true,
            //   draggable: true,
            //   progress: undefined,
            //   theme: "colored",
            //   transition: Bounce,
            // });
            // setTimeout(() => {
            //   window.location.href = `/product/${params.slug1}`; // Redirect user to home page

            // }, 2000);
          }
        }
      };

      var rzp1 = new window.Razorpay(options);

      rzp1.open();

    } catch (error) {
      console.error("Error in payment:", error);
      alert("Something went wrong with the payment. Please try again.");
    }
  }


  const handlecheck = () => {
    if (!session) {
      alert("first do login")
    }
  }
  return (
    <>
     <Script src="https://checkout.razorpay.com/v1/checkout.js"></Script>
    <div className="max-w-6xl mt-16 mx-auto p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Left Side - Doctor Info */}
      <div className="md:col-span-2 bg-white flex flex-col gap-5 p-6 shadow-lg rounded-lg">
        {/* Doctor Header */}
        <div className="flex items-center">
          <img src={doctor.image} alt={doctor.name} className="w-24 h-24 rounded-full border-4 border-blue-500" />
          <div className="ml-4">
            <h2 className="text-2xl font-bold text-blue-700">{doctor.name}</h2>
            <p className="text-gray-600">{doctor.specialty} • {doctor.experience} years experience</p>
            <p className="text-gray-800 font-semibold">{doctor.clinic}</p>
            <p className="text-gray-500">{doctor.location}</p>
            <p className="text-green-600 font-bold flex items-center">
              <FaStar className="text-yellow-500 mr-1" /> {doctor.rating} ({doctor.patientStories} Patient Stories)
            </p>
          </div>
        </div>

        {/* Clinic & Doctor Details */}
        <div className="mt-4 space-y-3">
          <div className="flex items-center space-x-2">
            <FaClinicMedical className="text-blue-600" />
            <span>{doctor.clinic}</span>
          </div>
          <div className="flex items-center space-x-2">
            <FaUserMd className="text-blue-600" />
            <span>{doctor.specialty}</span>
          </div>
          <div className="flex items-center space-x-2">
            <FaMoneyBillWave className="text-blue-600" />
            <span>₹{doctor.fee} Consultation Fee</span>
          </div>
          <div className="flex items-center space-x-2">
            <FaCalendarAlt className="text-blue-600" />
            <span>{doctor.availability.join(" | ")}</span>
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
              className={`px-6 py-2 font-semibold ${activeTab === tab ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-600"}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab === "info" && "Info"}
              {tab === "stories" && `Stories (${doctor.patientStories})`}
              {tab === "qa" && "Consult Q&A"}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="mt-6">
          {activeTab === "info" && (
            <div>
              <p className="text-gray-500">{doctor.location}</p>
              <h2 className="text-lg font-bold text-blue-700">{doctor.clinic}</h2>
              <p className="text-green-600 font-bold flex items-center">
                <FaStar className="text-yellow-500 mr-1" /> {doctor.rating}
              </p>
              <p className="text-gray-600">{doctor.address}</p>

              <div className="flex space-x-2 text-blue-600 mt-2">
                <a href="#" className="underline">Get Directions</a>
              </div>

              <div className="mt-4">
                <h3 className="text-blue-700 font-semibold">Availability</h3>
                {doctor.availability.map((slot, index) => (
                  <p key={index} className="text-gray-700">{slot}</p>
                ))}
              </div>

              <div className="mt-4">
                <p className="text-gray-700 font-semibold">Consultation Fee: ₹{doctor.fee}</p>
                <p className="text-gray-600 flex items-center">
                  <FaCheckCircle className="text-purple-600 mr-1" /> Prime Verified Details
                </p>
              </div>

              <button onClick={()=>{handlecheck
                pay(700)
              }} className="mt-4 w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-700 flex items-center justify-center space-x-2">
                <FaCalendarAlt />
                <span>Book Appointment</span>
              </button>
            </div>
          )}

          {activeTab === "stories" && (
            <div>
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
          )}

          {activeTab === "qa" && (
            <div>
              <h3 className="text-xl font-bold text-blue-700">Consult Q&A</h3>
              <div className="mt-3 space-y-4">
                {doctor.faqs.map((faq, index) => (
                  <div key={index} className="p-4 border rounded-md bg-gray-50">
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
        <h3 className="text-lg font-bold text-blue-700">Clinic Appointment</h3>
        <p className="text-gray-600">₹{doctor.fee} fee</p>

        <div className="mt-4 space-y-2">
          {doctor.slots.map((slot, index) => (
            <button key={index} className="px-4 py-2 border rounded-md text-blue-600 hover:bg-blue-600 hover:text-white">
              {slot}
            </button>
          ))}
        </div>

        <div className="mt-4 space-y-3">
          <button className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-700 flex items-center justify-center space-x-2">
            <FaCalendarAlt />
            <span>Book Clinic Visit</span>
          </button>
          <button className="w-full border py-2 rounded-md flex items-center justify-center space-x-2 hover:bg-gray-100">
            <FaPhone className="text-blue-600" />
            <span>Contact Clinic</span>
          </button>
        </div>
      </div>
    </div>
    </>
  );
};

export default DoctorProfile;
