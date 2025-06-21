"use client";

import { useEffect, useState } from "react";
import { getAllDoctors, toggleDoctorLiveStatus } from "@/actions/useraction";
// import { Switch } from "@/components/ui/switch";
import Switch from "@/Components/Switch";
import { CircularProgressbarWithChildren, buildStyles } from "react-circular-progressbar";
import 'react-circular-progressbar/dist/styles.css';
import LoadingOverlay from "@/Components/LoadingOverlay";
import { setLazyProp } from "next/dist/server/api-utils";

export default function AdminDoctorControl() {
    const [doctors, setDoctors] = useState([]);
    // const [loading, setLoading] = useState(true);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedDoctor, setSelectedDoctor] = useState(null);



    useEffect(() => {
        fetchDoctors();
    }, []);

    const fetchDoctors = async () => {
        setIsLoading(true);
        const data = await getAllDoctors();
        setDoctors(data);
        setIsLoading(false);
    };

    const handleToggleLive = async (email, doctorId, currentStatus) => {
        setIsLoading(true)
        await toggleDoctorLiveStatus(email, doctorId, !currentStatus);
        fetchDoctors();
        setIsLoading(false)
    };

    const liveDoctors = doctors.filter(doc => doc.live);
    const notLiveDoctors = doctors.filter(doc => !doc.live);

    const livePercentage = Math.round((liveDoctors.length / doctors.length) * 100);

    const ratingDistribution = [0, 0, 0, 0, 0];
    doctors.forEach(doc => {
        const bucket = Math.min(4, Math.floor(doc.rating));
        ratingDistribution[bucket]++;
    });

    return (
        <>
            {isLoading && <LoadingOverlay />}

            <div className="p-6 space-y-8">
                <h2 className="text-2xl font-bold">Doctor Control Panel</h2>

                {/* Percentage Chart */}
                <div className="flex flex-col sm:flex-row gap-10 items-center">
                    <div className="w-40 h-40">
                        <CircularProgressbarWithChildren
                            value={livePercentage}
                            styles={buildStyles({
                                pathColor: `rgba(34, 197, 94, ${livePercentage / 100})`,
                                trailColor: "#eee",
                                strokeLinecap: "round",
                                pathTransitionDuration: 0.8,
                            })}
                        >
                            <div className="text-center">
                                <div className="text-xl font-semibold">{livePercentage}%</div>
                                <div className="text-sm">Live Doctors</div>
                            </div>
                        </CircularProgressbarWithChildren>
                    </div>

                    {/* Rating Distribution */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                        {ratingDistribution.map((count, index) => {
                            const percentage = doctors.length ? (count / doctors.length) * 100 : 0;
                            return (
                                <div key={index} className="w-28 h-28">
                                    <CircularProgressbarWithChildren
                                        value={percentage}
                                        styles={buildStyles({
                                            pathColor: "#6366f1",
                                            trailColor: "#e5e7eb",
                                            strokeLinecap: "round",
                                            pathTransitionDuration: 0.8,
                                        })}
                                    >
                                        <div className="text-center">
                                            <div className="text-base font-semibold">{percentage.toFixed(0)}%</div>
                                            <div className="text-xs text-gray-600">{index + 1}★</div>
                                        </div>
                                    </CircularProgressbarWithChildren>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Live Doctors List */}
                {selectedDoctor && (
                    <div className="mb-6 p-6 rounded-xl bg-white shadow-xl border border-gray-200 w-full max-w-5xl mx-auto relative">
                        {/* Close button */}
                        <button
                            onClick={() => setSelectedDoctor(null)}
                            className="absolute top-4 right-4 text-sm text-red-500 hover:text-red-700"
                        >
                            ✖ Close
                        </button>

                        {/* Doctor details */}
                        <div className="flex flex-col sm:flex-row items-start gap-6">
                            <img
                                src={selectedDoctor.photo || "/default-doctor.png"}
                                alt="Doctor"
                                className="w-24 h-24 object-cover rounded-lg border"
                            />
                            <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 text-sm text-gray-700">
                                <div><strong>Name:</strong> {selectedDoctor.username}</div>
                                <div><strong>Email:</strong> {selectedDoctor.email}</div>
                                <div><strong>Age:</strong> {selectedDoctor.age || "N/A"}</div>
                                <div><strong>Gender:</strong> {selectedDoctor.gender || "N/A"}</div>
                                <div><strong>Experience:</strong> {selectedDoctor.experience || "N/A"} yrs</div>
                                <div><strong>Degree:</strong> {selectedDoctor.degree || "N/A"}</div>
                                <div><strong>Rating:</strong> {selectedDoctor.rating}</div>
                                <div><strong>Patient Stories:</strong> {selectedDoctor.patientStories}</div>
                                <div><strong>Live Status:</strong>
                                    <span className={selectedDoctor.live ? "text-green-600 font-medium" : "text-red-500 font-medium"}>
                                        {selectedDoctor.live ? "Live ✅" : "Not Live ❌"}
                                    </span>
                                </div>
                                <div><strong>License No:</strong> {selectedDoctor.licenseNumber || "N/A"}</div>
                                <div><strong>Clinic Name:</strong> {selectedDoctor.clinicName || "N/A"}</div>
                                <div><strong>Location:</strong> {selectedDoctor.location || "N/A"}</div>
                                <div><strong>Online Fee:</strong> ₹{selectedDoctor.onlineFee || 0}</div>
                                <div><strong>Physical Fee:</strong> ₹{selectedDoctor.physicalFee || 0}</div>
                                <div className="col-span-2"><strong>Specialty:</strong> {selectedDoctor.specialty?.join(", ") || "N/A"}</div>
                                <div className="col-span-2"><strong>Expertise:</strong> {selectedDoctor.expertise?.join(", ") || "N/A"}</div>
                                <div className="col-span-2"><strong>Technologies:</strong> {selectedDoctor.technologies?.join(", ") || "N/A"}</div>
                                <div className="col-span-2"><strong>Timings:</strong> {selectedDoctor.timings?.join(" | ") || "N/A"}</div>
                                <div className="col-span-2"><strong>Available Days:</strong> {selectedDoctor.availableDays?.join(", ") || "N/A"}</div>
                            </div>
                        </div>
                    </div>
                )}

                <div className="flex flex-col sm:flex-row justify-evenly">
                    <div>
                        <h3 className="text-lg font-semibold my-2">Live Doctors</h3>
                        <div className="sm:w-[35vw]" >
                            {liveDoctors.map(doc => (
                                <div key={doc._id} onClick={() => setSelectedDoctor(doc)} className="bg-white rounded-lg shadow p-4 flex justify-between items-center">
                                    <div>
                                        <h4 className="font-medium">{doc.username}</h4>
                                        <p className="text-sm text-gray-500">Rating: {doc.rating}</p>
                                    </div>
                                    <Switch isOn={doc.live} onToggle={() => handleToggleLive(doc.email, doc._id, doc.live)} />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Not Live Doctors List */}
                    <div>
                        <h3 className="text-lg font-semibold my-2">Not Live Doctors</h3>
                        <div className="sm:w-[35vw]">
                            {notLiveDoctors.map(doc => (
                                <div key={doc._id} onClick={() => setSelectedDoctor(doc)} className="bg-white rounded-lg shadow p-4 flex justify-between items-center">
                                    <div>
                                        <h4 className="font-medium">{doc.username}</h4>
                                        <p className="text-sm text-gray-500">Rating: {doc.rating}</p>
                                    </div>
                                    <Switch isOn={doc.live} onToggle={() => handleToggleLive(doc.email, doc._id, doc.live)} />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
