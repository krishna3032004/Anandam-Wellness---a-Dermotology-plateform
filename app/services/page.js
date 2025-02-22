import { FaUserMd, FaCalendarCheck, FaHeartbeat,FaBook } from "react-icons/fa";
import Footer from "@/Components/Footer";
import Link from "next/link";
const Services = () => {
  return (
    <>
    <div className="max-w-6xl mx-auto mt-16 p-6 space-y-16 bg-[#F9F9F9]">
      {/* Header */}
      <div className="text-center p-10 bg-white  shadow-lg">
        {/* Animated Title */}
        <h2 className="text-3xl font-bold text-blue-700 drop-shadow-md animate-fade-in">
          Premium Services
        </h2>

        {/* Subtitle with Animation */}
        <p className="text-gray-600 mt-3 text-lg animate-slide-up">
          Elevate your dermatology experience with top-tier services designed for you.
        </p>

        {/* Decorative Line */}
        <div className="w-16 h-1 bg-blue-500 mx-auto mt-4 animate-expand"></div>
      </div>

      {/* Services Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Follow-Up Consultation */}
        <div className="group p-6 bg-white text-gray-800 shadow-xl rounded-xl text-center border-t-4 border-[#4A90E2] transition-all duration-500 hover:scale-105 hover:shadow-2xl">
          <FaCalendarCheck className="text-[#4A90E2] text-6xl mx-auto mb-4 group-hover:rotate-12 transition-transform" />
          <h3 className="text-2xl font-semibold">Follow-Up Consultation</h3>
          <p className="mt-2 text-gray-600">Continue your treatment with a premium follow-up session.</p>
          <button className="mt-4 px-5 py-2 bg-[#4A90E2] text-white font-bold rounded-md hover:bg-[#0056B3] transition-all duration-300">
            Book Now
          </button>
        </div>

        {/* Second Consultation */}
        <div className="group p-6 bg-white text-gray-800 shadow-xl rounded-xl text-center border-t-4 border-[#D72638] transition-all duration-500 hover:scale-105 hover:shadow-2xl">
          <FaUserMd className="text-[#D72638] text-6xl mx-auto mb-4 group-hover:rotate-12 transition-transform" />
          <h3 className="text-2xl font-semibold">Second Consultation</h3>
          <p className="mt-2 text-gray-600">Get a second opinion from top-rated dermatologists.</p>
          <button className="mt-4 px-5 py-2 bg-[#D72638] text-white font-bold rounded-md hover:bg-[#A71D31] transition-all duration-300">
            Book Now
          </button>
        </div>

        {/* New Consultation */}
        <div className="group p-6 bg-white text-gray-800 shadow-xl rounded-xl text-center border-t-4 border-[#FF9800] transition-all duration-500 hover:scale-105 hover:shadow-2xl">
    <FaBook className="text-[#FF9800] text-6xl mx-auto mb-4 group-hover:rotate-12 transition-transform" />
    <h3 className="text-2xl font-semibold">Common Skincare Articles</h3>
    <p className="mt-2 text-gray-600">Explore expert skincare tips and dermatology insights.</p>
    <Link href="/articles">
    <button className="mt-4 px-5 py-2 bg-[#FF9800] text-white font-bold rounded-md hover:bg-[#E07B00] transition-all duration-300">
      Read Now
    </button>
    </Link>
  </div>
      </div>

      {/* About Us Section */}
      <div className="p-10 bg-[#FAFAFA] text-gray-800 rounded-lg shadow-lg text-center">
        <h3 className="text-3xl font-bold text-[#333] drop-shadow-md"> Why Choose Us? </h3>
        <p className="mt-4 text-lg text-gray-600">
          Our platform offers **expert dermatology care** with a seamless and premium experience.
        </p>
        <p className="mt-2 text-gray-500">
          Get access to **top-rated specialists, priority consultations, and advanced treatments** all in one place.
        </p>
      </div>
    </div>
    <Footer />
    </>
  );
};

export default Services;
