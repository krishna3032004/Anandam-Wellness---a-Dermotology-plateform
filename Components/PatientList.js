"use client"
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Image from "next/image";

export default function PatientList() {
    const [patients, setPatients] = useState([]);
    const router = useRouter();

    useEffect(() => {
        const fetchPatients = async () => {
            try {
                const res = await fetch("/api/doctor/patients", {
                    method: "GET",
                    credentials: "include",
                });
                const data = await res.json();
                // console.log(data)
                setPatients(data);
            } catch (error) {
                console.error("Error fetching patients:", error);
            }
        };
        fetchPatients();
    }, []);

    if (!patients.length) {
        return (
            <div className="text-center text-gray-500 mt-10">
                No patients have booked a consultation yet.
            </div>
        );
    }

    return (
        <div className="w-full max-w-4xl mx-auto ">
        {/* Stylish Heading */}
        <h2 className="text-xl font-extrabold text-gray-900  mb-10 relative">
            <span className="relative z-10">👨‍⚕️ Your Consultation Patients</span>
            <span className="absolute left-11 bottom-0 w-24 h-[2px] bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></span>
        </h2>

        {/* Patient List */}
        <div className="flex flex-col space-y-5 overflow-y-auto h-[67vh]">
            {patients.map((patient) => (
                <div
                    key={patient._id}
                    onClick={() => router.push(`/doctor/chat?userId=${patient._id}`)}
                    className="flex items-center justify-between p-3 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md hover:border-blue-500 transition duration-300 ease-in-out cursor-pointer group"
                >
                    <div className="flex items-center space-x-4">
                        {/* Profile Image or Initial */}
                        <div className="w-14 h-14 rounded-full overflow-hidden bg-gray-100 border border-gray-300 flex items-center justify-center text-gray-600 font-bold text-xl">
                            {patient.photo ? (
                                <Image
                                    src={patient.photo}
                                    alt={`${patient.name}'s profile picture`}
                                    width={56}
                                    height={56}
                                    className="object-cover w-full h-full"
                                />
                            ) : (
                                <span>{patient.username?.charAt(0)?.toUpperCase()}</span>
                            )}
                        </div>

                        {/* Name Only */}
                        <div className=" font-semibold text-gray-800 ">
                            {patient.username}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    </div>
    );
}
