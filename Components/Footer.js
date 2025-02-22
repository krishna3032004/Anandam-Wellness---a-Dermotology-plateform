import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaYoutube } from "react-icons/fa";
import Link from "next/link";
export default function Footer() {
  return (
    <footer className="relative bg-gray-900 text-white w-full py-12 px-6">
      {/* Floating Gradient Effect */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-blue-500 to-indigo-500 opacity-10"></div>

      {/* Footer Content */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 relative z-10">
        {/* Logo & Description */}
        <div>
          {/* <h2 className="text-3xl font-extrabold text-white mb-4">Anandam Wellness</h2> */}
          <Link href="/">
    <span className="text-[#f6d365] text-3xl font-semibold font-[Poppins]">Anandam</span>
    <span className="text-white font-thin font-[Lora] italic">Well</span>
  </Link>
          <p className="text-gray-300 text-sm leading-6">
            Your trusted healthcare partner for a healthier life. Stay connected with us for the best medical solutions.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-4">Quick Links</h3>
          <ul className="space-y-3 text-gray-400 text-sm">
            {["Home", "About Us", "Services", "Doctors", "Contact Us"].map((link, index) => (
              <li key={index} className="hover:text-blue-400 transition duration-300 cursor-pointer">
                {link}
              </li>
            ))}
          </ul>
        </div>

        {/* Services */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-4">Our Services</h3>
          <ul className="space-y-3 text-gray-400 text-sm">
            {["Online Consultation", "Emergency Care", "Health Checkups", "Pharmacy", "Mental Health"].map((service, index) => (
              <li key={index} className="hover:text-blue-400 transition duration-300 cursor-pointer">
                {service}
              </li>
            ))}
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-4">Follow Us</h3>
          <div className="flex flex-wrap justify-center max-w-[300px] gap-4 overflow-hidden ">
            {[FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaYoutube].map((Icon, index) => (
              <a
                key={index}
                href="#"
                className="bg-gray-800 p-3 rounded-full hover:bg-blue-500 transition duration-300 shadow-lg"
              >
                <Icon className="text-white w-5 h-5" />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="mt-10 text-center border-t border-gray-700 pt-5 text-gray-400 text-sm relative z-10">
        &copy; {new Date().getFullYear()} MediCare+. All rights reserved.
      </div>
    </footer>
  );
}
