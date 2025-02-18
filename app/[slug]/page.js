"use client"
import React from 'react'
import { useParams } from "next/navigation";
import Sidebar from '@/Components/Sidebar';
const Page = () => {
  const { slug } = useParams();

  // Content Mapping
  const pageContent = {
    "medical-records": "Your medical records are here.",
    appointments: "Sorry, you don’t have any appointments.",
    "lab-tests": "You have no scheduled lab tests.",
    "medicine-orders": "No medicine orders found.",
    "online-consultations": "No consultations booked.",
    articles: "No articles available.",
    feedback: "No feedback submitted.",
    payments: "No payments made.",
  };

  return (
    <div className="flex min-h-screen mt-16 bg-gray-50">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12 bg-white shadow-md rounded-md mt-6 mr-6 ml-4">
        <img src="/empty.png" alt="No Data" className="w-20 h-20 mb-4 opacity-75" />
        <p className="text-gray-600 text-sm">{pageContent[slug] || "Page not found"}</p>
      </div>
    </div>
  );
};

export default Page;
