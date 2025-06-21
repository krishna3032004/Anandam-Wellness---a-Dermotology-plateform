import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

const ContactPage = () => {
  return (
    <div className="min-h-screen flex flex-col mt-16 items-center justify-center bg-gradient-to-b from-blue-50 via-white to-blue-100 px-4 py-10">
  {/* Contact Card */}
  <div className="bg-white rounded-3xl shadow-2xl border border-blue-200 p-8 md:p-12 w-full max-w-4xl transition-all duration-300 hover:scale-[1.01] hover:shadow-blue-200 animate-fade-in">
    <h2 className="text-3xl md:text-4xl font-extrabold text-blue-700 text-center mb-3">📩 Get in Touch</h2>
    <p className="text-gray-600 text-center mb-8 max-w-xl mx-auto">We'd love to hear from you! Feel free to reach out anytime.</p>

    {/* Contact Info */}
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10 text-center">
      <div className="flex flex-col items-center">
        <FaPhoneAlt className="text-blue-600 text-3xl mb-2" />
        <p className="text-gray-700 font-semibold">+91 123 456 7890</p>
      </div>
      <div className="flex flex-col items-center">
        <FaEnvelope className="text-blue-600 text-3xl mb-2" />
        <p className="text-gray-700 font-semibold break-all">support@dermatology.com</p>
      </div>
      <div className="flex flex-col items-center">
        <FaMapMarkerAlt className="text-blue-600 text-3xl mb-2" />
        <p className="text-gray-700 font-semibold">Pune, India</p>
      </div>
    </div>

    {/* Contact Form */}
    <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <input
        type="text"
        placeholder="Your Name"
        className="col-span-1 md:col-span-2 p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
        required
      />
      <input
        type="email"
        placeholder="Your Email"
        className="col-span-1 p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
        required
      />
      <input
        type="text"
        placeholder="Phone (optional)"
        className="col-span-1 p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
      />
      <textarea
        placeholder="Your Message"
        rows="4"
        className="col-span-1 md:col-span-2 p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transition resize-none"
        required
      ></textarea>
      <button
        type="submit"
        className="col-span-1 md:col-span-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition duration-300"
      >
        Send Message
      </button>
    </form>
  </div>
</div>

  );
};

export default ContactPage;
