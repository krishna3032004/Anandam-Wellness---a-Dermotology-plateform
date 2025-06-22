"use client"
import DoctorProfile from "@/Components/DoctorProfile";
import { useEffect, useState, use } from "react"
import { fetchDoctorbyid } from "@/actions/useraction";
import { useSearchParams } from "next/navigation";

// const doctors = [
//   {
//     id: 1,
//     name: "Dr. L K Desai",
//     image: "https://media.istockphoto.com/id/1223671392/vector/default-profile-picture-avatar-photo-placeholder-vector-illustration.jpg?s=612x612&w=0&k=20&c=s0aTdmT5aU6b8ot7VKm11DeID6NctRCpB755rA1BIP0=",
//     specialty: "Dermatologist",
//     experience: 30,
//     clinic: "Dr. Desai Dermacare",
//     location: "Sopan Baug, Pune",
//     rating: 4.5,
//     patientStories: 338,
//     fee: 700,
//     availability: ["Mon, Thu, Sat: 11:30 AM - 02:00 PM", "06:30 PM - 08:30 PM"],
//     slots: ["06:30 PM", "06:40 PM", "07:00 PM", "07:20 PM"],
//     reviews: [
// {
//   title: "Visited For Skin Disease Treatment",
//   date: "8 months ago",
//   recommended: true,
//   tags: ["Doctor Friendliness", "Treatment Satisfaction", "Value for Money"],
//   comment: "I visited Dr. L K Desai after suffering a lot. He explained everything clearly, and I started getting relief with the 1st dose itself.",
// },
//     ],
//     faqs: [
// {
//   question: "Where does Dr. L K Desai practice?",
//   answer: "Dr. L K Desai practices at Dr. Desai Dermacare - Skin, Hair & Laser Clinic - Sopan Baug.",
// },
// {
//   question: "How can I take Dr. L K Desai's appointment?",
//   answer: "You can take an appointment online through Practo for in-clinic visits with the doctor.",
// },
//     ],
//   }
// ]


const Page = () => {
  // const { id } = param.slug2;
  // const unwrappedParams = use(params); // Unwrap params using use()
  const searchParams = typeof window !== 'undefined' ? useSearchParams() : null;

  const [doctor, setDoctor] = useState(null);
  // const id = searchParams.get("id");
  const [id, setid] = useState(null)
  // useEffect(() => {
  //   const searchParams = useSearchParams();
  //   const id2 = searchParams.get("doctorId");
  //   setid(id2)
  // }, []);
  useEffect(() => {
    if (!searchParams) return;

    const id = searchParams.get("id");
    console.log("userId from query:", id);
    if (id) setid(id);
  }, [searchParams]);
  // useEffect(() => {
  //   const id = new URLSearchParams(window.location.search).get("id");
  //   console.log(id)
  //   if (id) setid(id);
  // }, []);
  useEffect(() => {
    async function fetchdoctor() {
      if (id) {
        let doctorData = await fetchDoctorbyid(id)
        // const doctorData = doctors.find((doc) => doc.id === parseInt(1));
        console.log(doctorData)
        setDoctor(doctorData || null);
      }
    }
    fetchdoctor()
  }, [id]);

  // useEffect(() => {
  //   if (unwrappedParams?.slug2) {
  //     const doctorData = doctors.find((doc) => doc.id === parseInt(unwrappedParams.slug2));
  //     setDoctor(doctorData || null);
  //   }
  // }, [unwrappedParams.slug2]); // Correct dependency

  return doctor ? <DoctorProfile doctor={doctor} /> : <p>Doctor not found</p>;
  // return <div>
  //   {doctor.username}
  // </div>
};

export default Page;