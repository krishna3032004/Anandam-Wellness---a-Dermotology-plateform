import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

const ContactPage = () => {
  return (
    <div className="min-h-screen flex flex-col mt-16 items-center justify-center bg-white p-6">
      {/* Contact Card */}
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-3xl w-full text-center border border-gray-200 animate-fade-in">
        <h2 className="text-4xl font-extrabold text-blue-700 mb-3">📩 Get in Touch</h2>
        <p className="text-gray-600 mb-6">We'd love to hear from you! Feel free to reach out.</p>

        {/* Contact Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="flex flex-col items-center">
            <FaPhoneAlt className="text-blue-600 text-3xl mb-2" />
            <p className="text-gray-700 font-semibold">+91 123 456 7890</p>
          </div>
          <div className="flex flex-col items-center">
            <FaEnvelope className="text-blue-600 text-3xl mb-2" />
            <p className="text-gray-700 font-semibold">support@dermatology.com</p>
          </div>
          <div className="flex flex-col items-center">
            <FaMapMarkerAlt className="text-blue-600 text-3xl mb-2" />
            <p className="text-gray-700 font-semibold">Pune, India</p>
          </div>
        </div>

        {/* Contact Form */}
        <form className="space-y-4">
          <input type="text" placeholder="Your Name" className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500" required />
          <input type="email" placeholder="Your Email" className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500" required />
          <textarea placeholder="Your Message" rows="4" className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500" required></textarea>
          <button className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition duration-300">
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactPage;
