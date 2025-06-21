"use client"
import React from 'react'
import { useParams } from "next/navigation";
import Sidebar2 from '@/Components/sidebar2';
import Sidebar from '@/Components/Sidebar';
import DoctorList from '@/Components/DoctorList';

const Page = () => {
    const { slug } = useParams();

    // Content Mapping
    const pageContent = {
        "medical-records": "You dont have any medical records.",
        "appointments": "Sorry, you don’t have any appointments.",
        "lab-tests": "You have no scheduled lab tests.",
        "medicine-orders": "No medicine orders found.",
        "online-consultations": "No consultations booked.",
        "articles": "No articles available.",
        "feedback": "No feedback submitted.",
        "payments": "No payments made.",
    };

    return (
        <div className="flex  mt-16 bg-gray-50">
            {/* Sidebar */}
            {/* <Sidebar2 /> */}
            <div className='hidden md:block'>
            <Sidebar />
            </div>

            {/* Main Content */}
            {/* <div className="flex-1 flex flex-col items-center justify-center px-6 py-12 bg-white shadow-md rounded-md mt-6 mr-6 ml-4">
        <img src="/empty.png" alt="No Data" className="w-20 h-20 mb-4 opacity-75" />
        <p className="text-gray-600 text-sm">{pageContent[slug] || "Page not found"}</p>
      </div> */}
            <div className="text-gray-600 text-sm h-[85vh] flex-1 flex flex-col  px-6 py-7 bg-white shadow-md rounded-md mt-6 mr-6 ml-4">
                {slug === "online-consultations" ? <DoctorList /> : <div className='flex flex-col justify-center h-full items-center'>{pageContent[slug]}</div> || "Page not found"}
            </div>
        </div>
    );
};

export default Page;
