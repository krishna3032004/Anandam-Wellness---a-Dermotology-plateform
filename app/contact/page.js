"use client"
import React, { useEffect, useState } from "react";

const HomePage = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative w-full h-96">
      {/* Hero Section with Shrinking Effect */}
      <div
        className="fixed top-0 left-0 w-full bg-cover bg-center bg-no-repeat transition-all duration-500 ease-out z-[-1]"
        style={{
          backgroundImage: "url('https://www.shutterstock.com/image-photo/closeup-woman-face-acne-600w-2461413987.jpg')",
          height: `${Math.max(250, 500 - scrollY)}px`, // Shrinks from 500px to 250px
          backgroundPosition: `center ${scrollY / 3}px`, // Parallax Effect
        }}
      ></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center min-h-screen pt-32 px-6">
        <h1
          className="text-4xl sm:text-5xl font-bold text-gray-900 transition-all duration-500"
          style={{
            transform: `scale(${1 - scrollY / 2000})`,
            opacity: `${1 - scrollY / 500}`,
          }}
        >
          Glow With Confidence ✨
        </h1>
        <p
          className="text-lg text-gray-600 mt-4 max-w-2xl transition-all duration-500"
          style={{
            transform: `translateY(${scrollY / 10}px) scale(${1 - scrollY / 1800})`,
            opacity: `${1 - scrollY / 400}`,
          }}
        >
          Your skin deserves expert care. Get personalized dermatology treatments now!
        </p>
        <button
          className="mt-6 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white text-lg font-semibold rounded-lg shadow-lg transition-all transform hover:scale-105"
        >
          Book a Consultation
        </button>
      </div>
    </div>
  );
};

export default HomePage;
