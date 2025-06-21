"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function DoctorList() {
    const [doctors, setDoctors] = useState([]);
    const router = useRouter();

    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                const res = await fetch("/api/user/doctors", {
                    method: "GET",
                    credentials: "include",
                });
                const data = await res.json();
                console.log(data)
                setDoctors(data);
            } catch (error) {
                console.error("Error fetching doctors:", error);
            }
        };
        fetchDoctors();
    }, []);

    if (!doctors.length) {
        return <div className="text-center text-gray-600 mt-10">No consultations yet.</div>;
    }

    return (
        <div className="w-full max-w-4xl mx-auto  ">
            {/* Stylish Heading */}
            <h2 className="text-xl font-extrabold text-gray-900 mb-10 relative">
                <span className="relative z-10">🩺 Your Doctors</span>
                <span className="absolute left-12  bottom-0 w-24 h-1 bg-gradient-to-r from-pink-500 to-red-500 rounded-full"></span>
            </h2>

            {/* Doctor List */}
            <div className="flex flex-col space-y-5 overflow-y-auto h-[67vh]">
                {doctors.map((doctor) => (
                    <div
                        key={doctor._id}
                        onClick={() => router.push(`/chat?doctorId=${doctor._id}`)}
                        className="flex items-center  justify-between p-3 sm:p-5 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md hover:border-pink-500 transition duration-300 ease-in-out cursor-pointer group"
                    >
                        <div className="flex items-center space-x-4">
                            {/* Profile Image or Initial */}
                            <div className="w-14 h-14 rounded-full overflow-hidden bg-gray-100 border border-gray-300 flex items-center justify-center text-gray-600 font-bold text-xl">
                                {doctor.photo ? (
                                    <Image
                                        src={doctor.photo}
                                        alt={`${doctor.name}'s profile picture`}
                                        width={56}
                                        height={56}
                                        className="object-cover w-full h-full"
                                    />
                                ) : (
                                    <span>{doctor.username?.charAt(0)?.toUpperCase()}</span>
                                )}
                            </div>

                            {/* Doctor Name */}
                            <div className=" font-semibold text-gray-800 ">
                                {doctor.username}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
