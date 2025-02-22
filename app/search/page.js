"use client"
import { useState,useEffect,useRef } from "react";
// import { useRouter } from "next/router";
import { FaSearch, FaMapMarkerAlt } from "react-icons/fa";
import { FaCalendarAlt, FaPhoneAlt } from "react-icons/fa";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

const doctors = [
    {
        id: 1,
        name: "Dr. L K Desai",
        specialty: "Dermatologist",
        expertise: ["Acne Treatment", "Skin Allergy", "Eczema", "Psoriasis"],
        experience: 30,
        location: "Sopan Baug, Pune",
        clinic: "Dr. Desai Dermacare",
        consultationFee: 700,
        patientStories: 338,
        rating: 94,
        availability: "Available Tomorrow",
        gender: "Male",
        img: "https://i.pinimg.com/474x/b7/14/a2/b714a2713d5d9259dab2a7c0b7df4ff9.jpg",
      },
      {
        id: 2,
        name: "Dr. Sonal Chavan",
        specialty: "Dermatologist",
        expertise: ["Hair Loss Treatment", "Laser Hair Removal", "Skin Rejuvenation"],
        experience: 19,
        location: "Pimple Saudagar, Pune",
        clinic: "Viva Luxe Aesthetic Clinic",
        consultationFee: 700,
        patientStories: 1531,
        rating: 90,
        availability: "Available Today",
        gender: "Female",
        img: "https://i.pinimg.com/474x/b7/14/a2/b714a2713d5d9259dab2a7c0b7df4ff9.jpg",
      },
      {
        id: 3,
        name: "Dr. Rajeev Agarwal",
        specialty: "Cosmetologist",
        expertise: ["Botox & Fillers", "Anti-Aging Treatment", "Chemical Peeling"],
        experience: 15,
        location: "Koregaon Park, Pune",
        clinic: "Skin Glow Clinic",
        consultationFee: 800,
        patientStories: 421,
        rating: 88,
        availability: "Available Tomorrow",
        gender: "Male",
        img: "https://i.pinimg.com/474x/b7/14/a2/b714a2713d5d9259dab2a7c0b7df4ff9.jpg",
      },
      {
        id: 4,
        name: "Dr. Priya Sharma",
        specialty: "Dermatologist",
        expertise: ["Pigmentation Treatment", "Dark Circle Removal", "Acne Scars"],
        experience: 10,
        location: "Andheri, Mumbai",
        clinic: "DermaCare Skin Clinic",
        consultationFee: 600,
        patientStories: 210,
        rating: 92,
        availability: "Available Today",
        gender: "Female",
        img: "https://i.pinimg.com/474x/b7/14/a2/b714a2713d5d9259dab2a7c0b7df4ff9.jpg",
      },
      {
        id: 5,
        name: "Dr. Aditya Mehta",
        specialty: "Plastic Surgeon",
        expertise: ["Rhinoplasty", "Face Lift", "Scar Revision Surgery"],
        experience: 20,
        location: "Bandra, Mumbai",
        clinic: "Aesthetic Surgeons",
        consultationFee: 1200,
        patientStories: 500,
        rating: 96,
        availability: "Available Next Week",
        gender: "Male",
        img: "https://i.pinimg.com/474x/b7/14/a2/b714a2713d5d9259dab2a7c0b7df4ff9.jpg",
      },
      {
        id: 6,
        name: "Dr. Neha Kapoor",
        specialty: "Trichologist",
        expertise: ["Hair Transplant", "Dandruff Treatment", "PRP Therapy"],
        experience: 8,
        location: "Powai, Mumbai",
        clinic: "Hair & Scalp Care",
        consultationFee: 650,
        patientStories: 189,
        rating: 85,
        availability: "Available Today",
        gender: "Female",
        img: "https://i.pinimg.com/474x/b7/14/a2/b714a2713d5d9259dab2a7c0b7df4ff9.jpg",
      },
      {
        id: 7,
        name: "Dr. Vikram Singh",
        specialty: "Dermatologist",
        expertise: ["Laser Treatment", "Mole & Wart Removal", "Tattoo Removal"],
        experience: 25,
        location: "Vashi, Navi Mumbai",
        clinic: "Healthy Skin Clinic",
        consultationFee: 900,
        patientStories: 620,
        rating: 94,
        availability: "Available Tomorrow",
        gender: "Male",
        img: "https://i.pinimg.com/474x/b7/14/a2/b714a2713d5d9259dab2a7c0b7df4ff9.jpg",
      },
      {
        id: 8,
        name: "Dr. Radhika Nair",
        specialty: "Cosmetologist",
        expertise: ["Skin Brightening", "HydraFacial", "Body Contouring"],
        experience: 12,
        location: "Whitefield, Bangalore",
        clinic: "Glow & Glam Clinic",
        consultationFee: 700,
        patientStories: 378,
        rating: 91,
        availability: "Available Today",
        gender: "Female",
        img: "https://i.pinimg.com/474x/b7/14/a2/b714a2713d5d9259dab2a7c0b7df4ff9.jpg",
      },
      {
        id: 9,
        name: "Dr. Anil Verma",
        specialty: "Aesthetic Surgeon",
        expertise: ["Liposuction", "Fat Grafting", "Breast Augmentation"],
        experience: 18,
        location: "Indiranagar, Bangalore",
        clinic: "Aesthetic Solutions",
        consultationFee: 1500,
        patientStories: 450,
        rating: 97,
        availability: "Available Next Week",
        gender: "Male",
        img: "https://i.pinimg.com/474x/b7/14/a2/b714a2713d5d9259dab2a7c0b7df4ff9.jpg",
      },
      {
        id: 10,
        name: "Dr. Pooja Saxena",
        specialty: "Dermatologist",
        expertise: ["Stretch Marks Removal", "Chemical Peeling", "Microneedling"],
        experience: 9,
        location: "South Delhi",
        clinic: "Skin Perfection",
        consultationFee: 750,
        patientStories: 276,
        rating: 89,
        availability: "Available Tomorrow",
        gender: "Female",
        img: "https://i.pinimg.com/474x/b7/14/a2/b714a2713d5d9259dab2a7c0b7df4ff9.jpg",
      }, ];


export default function Home() {
  const [search, setSearch] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("Pune");
  const [selectedExperience, setSelectedExperience] = useState("");
  const [selectedStories, setSelectedStories] = useState("");
  const [selectedGender, setSelectedGender] = useState("");
  const [sortOption, setSortOption] = useState("Relevance");


  // const router = useRouter();
  // const { problem } = router.query;
  const searchParams = useSearchParams();
  const problem = searchParams.get("problem");
  console.log(problem)
  useEffect(() => {
    if(problem){
      const formattedProblem = problem ? problem.replace(/-/g, " ") : "Loading...";
      setQuery(formattedProblem)
    }
  
    
  }, [])
  
  

//   const filteredDoctors = doctorsData
//     .filter((doctor) => doctor.location.includes(selectedLocation))
//     .filter((doctor) => (selectedExperience ? doctor.experience >= parseInt(selectedExperience) : true))
//     .filter((doctor) => (selectedStories ? doctor.patientStories >= parseInt(selectedStories) : true))
//     .filter((doctor) => (selectedGender ? doctor.gender === selectedGender : true))
//     .filter((doctor) => doctor.name.toLowerCase().includes(search.toLowerCase()))
//     .sort((a, b) => {
//       if (sortOption === "Patient Stories - High to Low") return b.patientStories - a.patientStories;
//       if (sortOption === "Experience - High to Low") return b.experience - a.experience;
//       if (sortOption === "Consultation Fee - High to Low") return b.fee - a.fee;
//       if (sortOption === "Consultation Fee - Low to High") return a.fee - b.fee;
//       return 0;
//     });



  const searchOptions = [
    "Acne / Pimples Treatment",
    "Acne/ Pimple Scars Treatment",
    "Hair Loss Treatment",
    "Acne",
    "Skin Treatment",
    "Varicose Veins Treatment",
    "Acne Treatment",
    "Arm Pimples",
  ];

    const [query, setQuery] = useState("");
    const [filteredOptions, setFilteredOptions] = useState(searchOptions);
    const [showDropdown, setShowDropdown] = useState(false);
    const dropdownRef = useRef(null);
    const [filteredDoctors, setFilteredDoctors] = useState(doctors);
  
    useEffect(() => {
      const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
          setShowDropdown(false);
        }
      };
  
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, []);
  
    const handleInputChange = (e) => {
      const value = e.target.value;
      setQuery(value);
      setShowDropdown(true);
      setFilteredOptions(
        value
          ? searchOptions.filter((option) =>
              option.toLowerCase().includes(value.toLowerCase())
            )
          : searchOptions
      );
    };


    useEffect(() => {
        const filterDoctors = () => {
            console.log(query)
            console.log(selectedGender)
            console.log(selectedLocation)
        //   const filtered = doctors.filter((doctor) => query ? doctor.expertise.some((exp) => exp.toLowerCase().includes(query.toLowerCase())): true
        //     )
        //     .filter((doctor) =>
        //       selectedLocation ? doctor.location.toLowerCase() === selectedLocation.toLowerCase() : true
        //     )
        //     .filter((doctor) =>
        //       selectedExperience ? doctor.experience >= parseInt(selectedExperience) : true
        //     )
        //     .filter((doctor) =>
        //       selectedStories ? doctor.patientStories >= parseInt(selectedStories) : true
        //     )
        //     .filter((doctor) =>
        //       selectedGender ? doctor.gender.toLowerCase() === selectedGender.toLowerCase() : true
        //     )
        //     .sort((a, b) => {
        //       if (sortOption === "Patient Stories - High to Low") return b.patientStories - a.patientStories;
        //       if (sortOption === "Experience - High to Low") return b.experience - a.experience;
        //       if (sortOption === "Consultation Fee - High to Low") return b.fee - a.fee;
        //       if (sortOption === "Consultation Fee - Low to High") return a.fee - b.fee;
        //       return 0;
        //     });
      
        //   setFilteredDoctors(filtered);


        const filtered = doctors.filter((doctor) => doctor.expertise.some((exp) => exp.toLowerCase().includes(query.toLowerCase())))
      .filter((doctor) => doctor.location.toLowerCase().includes(selectedLocation.toLowerCase()))
      .filter((doctor) => (selectedExperience ? doctor.experience >= parseInt(selectedExperience) : true))
      .filter((doctor) => (selectedStories ? doctor.patientStories >= parseInt(selectedStories) : true))
      .filter((doctor) => (selectedGender ? doctor.gender.toLowerCase() === selectedGender.toLowerCase() : true))
      .filter((doctor) => doctor.name.toLowerCase().includes(search.toLowerCase()))
      .sort((a, b) => {
        if (sortOption === "Patient Stories - High to Low") return b.patientStories - a.patientStories;
        if (sortOption === "Experience - High to Low") return b.experience - a.experience;
        if (sortOption === "Consultation Fee - High to Low") return b.fee - a.fee;
        if (sortOption === "Consultation Fee - Low to High") return a.fee - b.fee;
        return 0;
      });
      setFilteredDoctors(filtered);
          console.log(filtered)
        };
      
        filterDoctors();
      }, [query, selectedLocation, selectedExperience, selectedStories, selectedGender, sortOption, doctors]);
      
  
    const handleSearch = (searchTerm) => {

      setQuery(searchTerm);
      setShowDropdown(false);
      console.log(searchTerm)
      
    //   const filtered = doctors.filter((doctor) => doctor.expertise.some((exp) => exp.toLowerCase().includes(searchTerm.toLowerCase())))
    //   .filter((doctor) => doctor.location.toLowerCase().includes(selectedLocation.toLowerCase()))
    //   .filter((doctor) => (selectedExperience ? doctor.experience >= parseInt(selectedExperience) : true))
    //   .filter((doctor) => (selectedStories ? doctor.patientStories >= parseInt(selectedStories) : true))
    //   .filter((doctor) => (selectedGender ? doctor.gender.toLowerCase() === selectedGender.toLowerCase() : true))
    //   .filter((doctor) => doctor.name.toLowerCase().includes(search.toLowerCase()))
    //   .sort((a, b) => {
    //     if (sortOption === "Patient Stories - High to Low") return b.patientStories - a.patientStories;
    //     if (sortOption === "Experience - High to Low") return b.experience - a.experience;
    //     if (sortOption === "Consultation Fee - High to Low") return b.fee - a.fee;
    //     if (sortOption === "Consultation Fee - Low to High") return a.fee - b.fee;
    //     return 0;
    //   });
    //   setFilteredDoctors(filtered);
    //   console.log(filtered)
    };
  
    const handleKeyDown = (e) => {
      if (e.key === "Enter" && filteredOptions.length > 0) {
        handleSearch(filteredOptions[0]); // Auto-select first option
      }
    };

    
    
  return (
    <div className="p-6 bg-gray-100 mt-16 min-h-screen">
      {/* Search & Filters */}
      <div className="bg-white p-4 rounded-lg shadow-md flex flex-wrap gap-4">
        {/* Location */}
        <select
          className="p-2 border rounded"
          value={selectedLocation}
          onChange={(e) =>{ setSelectedLocation(e.target.value)
          }}
        >
          <option value="Pune">Pune</option>
          <option value="Pimple Saudagar">Pimple Saudagar</option>
          <option value="Hadapsar">Hadapsar</option>
          <option value="Kharadi">Kharadi</option>
          <option value="">All Locations</option>
        </select>

        {/* Search Bar */}
        <div ref={dropdownRef} className="flex items-center border  rounded-lg overflow-hidden shadow-sm">
        <FaSearch className="ml-3 text-gray-500" />
        <input
          type="text"
          placeholder="Search for treatments, symptoms, doctors..."
          value={query}
          onChange={handleInputChange}
          onFocus={() => setShowDropdown(true)}
          onKeyDown={handleKeyDown}
          className="w-full px-4 py-2 focus:outline-none"
        />
      </div>

      {showDropdown && filteredOptions.length > 0 && (
        <ul ref={dropdownRef} className="absolute w-72 top-36 left-52 bg-white border rounded-lg mt-1 shadow-lg">
          {filteredOptions.map((option, index) => (
            <li
              key={index}
              className="px-4 py-2 cursor-pointer hover:bg-gray-100"
              onClick={() => handleSearch(option)}
            >
              {option}
            </li>
          ))}
        </ul>
      )}

        {/* Experience */}
        <select className="p-2 border rounded" onChange={(e) => {setSelectedExperience(e.target.value)
        }}>
          <option value="">Experience</option>
          <option value="5">5+ Years</option>
          <option value="10">10+ Years</option>
          <option value="15">15+ Years</option>
          <option value="20">20+ Years</option>
        </select>

        {/* Patient Stories */}
        <select className="p-2 border rounded" onChange={(e) =>{ setSelectedStories(e.target.value)
        }}>
          <option value="">Patient Stories</option>
          <option value="30">30+ Stories</option>
          <option value="80">80+ Stories</option>
          <option value="250">250+ Stories</option>
        </select>

        {/* Gender */}
        <select className="p-2 border rounded" onChange={(e) => {setSelectedGender(e.target.value)
        }}>
          <option value="">Gender</option>
          <option value="Male">Male Doctor</option>
          <option value="Female">Female Doctor</option>
        </select>

        {/* Sorting */}
        <select className="p-2 border rounded" onChange={(e) => {setSortOption(e.target.value)
        }}>
          <option value="Relevance">Sort By: Relevance</option>
          <option value="Patient Stories - High to Low">Patient Stories - High to Low</option>
          <option value="Experience - High to Low">Experience - High to Low</option>
          <option value="Consultation Fee - High to Low">Consultation Fee - High to Low</option>
          <option value="Consultation Fee - Low to High">Consultation Fee - Low to High</option>
        </select>
      </div>

      {/* Doctor List */}
      <div className="mt-6 space-y-4">
        {filteredDoctors.length > 0 ? (
        //   filteredDoctors.map((doctor, index) => (
        //     <div key={index} className="bg-white p-4 rounded-lg shadow-md flex items-center gap-4">
        //       <div className="w-16 h-16 bg-gray-300 rounded-full"></div>
        //       <div className="flex-1">
        //         <h2 className="text-lg font-semibold text-blue-600">{doctor.name}</h2>
        //         <p className="text-gray-600">{doctor.experience} years experience</p>
        //         <p className="text-gray-500">{doctor.location}</p>
        //         <p className="text-gray-700">₹{doctor.fee} Consultation Fee</p>
        //       </div>
        //       <button className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600">
        //         Book Clinic Visit
        //       </button>
        //     </div>
        //   ))
        

        filteredDoctors.map((doctor) => (
            // <div key={doc.id} className="flex items-center border p-4 rounded-lg mb-4 shadow-md bg-white">
            //   <img src={doc.img} alt={doc.name} className="w-20 h-20 rounded-full mr-4" />
            //   <div className="flex-1">
            //     <h3 className="text-lg font-semibold text-blue-600">{doc.name}</h3>
            //     <p className="text-gray-600">{doc.specialty} • {doc.experience} years experience</p>
            //     <p className="text-gray-500"><FaMapMarkerAlt className="inline mr-1" /> {doc.location}</p>
            //     <p className="text-gray-700">₹{doc.consultationFee} Consultation Fee</p>
            //     <p className="text-green-600 font-semibold">{doc.availability}</p>
            //   </div>
            //   <button className="bg-blue-500 text-white px-4 py-2 rounded-lg">Book Appointment</button>
            // </div>



            <div key={doctor.id} className="flex bg-white p-4 rounded-lg shadow-md items-center gap-4 border">
      {/* Doctor's Image */}
      <img
        src={doctor.img}
        alt={doctor.name}
        className="w-20 h-20 rounded-full border"
      />

      {/* Doctor's Info */}
      <div className="flex-1">
        {/* <h2 className="text-blue-500 font-semibold text-lg">{doctor.name}</h2> */}
        <Link href={`/doctor?id=${doctor.id}`} passHref>
  <h2 className="text-blue-500 font-semibold text-lg cursor-pointer hover:underline">
    {doctor.name}
  </h2>
</Link>
        <p className="text-gray-600">{doctor.specialty}</p>
        <p className="text-gray-500 text-sm">{doctor.experience} years experience overall</p>

        {/* Clinic Info */}
        <p className="font-semibold text-gray-700">
          {doctor.clinicName}, <span className="text-gray-500">{doctor.location}</span>
        </p>
        <p className="text-gray-600 text-sm">{doctor.fee} Consultation fee at clinic</p>

        {/* Ratings & Reviews */}
        <div className="flex items-center mt-2">
          <span className="bg-green-500 text-white text-xs px-2 py-1 rounded">
            {doctor.rating}%
          </span>
          <span className="ml-2 text-blue-600 font-semibold cursor-pointer">
            {doctor.patientStories} Patient Stories
          </span>
        </div>
      </div>

      {/* Availability & Buttons */}
      <div className="flex flex-col items-end">
        <p className="text-gray-500 flex items-center gap-1">
          <FaCalendarAlt className="text-gray-400 text-sm" /> Available Tomorrow
        </p>

        <button className="bg-blue-500 text-sm text-white px-7 py-1 rounded-lg mt-2 font-semibold shadow">
          Book Clinic Visit
          <p className="text-xs font-medium">No Booking Fee</p>
        </button>

        <button className="border text-blue-500 text-sm px-6 py-3 rounded-lg mt-2 flex items-center gap-2 shadow">
          <FaPhoneAlt />
          Contact Clinic
        </button>
      </div>
    </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No doctors found.</p>
        )}
      </div>
    </div>
  );
}
























// import { useState, useRef, useEffect } from "react";
// import { FaSearch } from "react-icons/fa"; // Import search icon

// const doctors = [
//   { name: "Dr. L K Desai", specialty: "Dermatologist", expertise: "Acne / Pimples Treatment" },
//   { name: "Dr. Sonal Chavan", specialty: "Dermatologist", expertise: "Hair Loss Treatment" },
//   { name: "Dr. Rajesh Sharma", specialty: "Cosmetologist", expertise: "Acne/ Pimple Scars Treatment" },
//   { name: "Dr. Priya Mehta", specialty: "Dermatologist", expertise: "Skin Treatment" },
// ];

// const searchOptions = [
//   "Acne / Pimples Treatment",
//   "Acne/ Pimple Scars Treatment",
//   "Hair Loss Treatment",
//   "Acne",
//   "Skin Treatment",
//   "Varicose Veins Treatment",
//   "Acne Treatment",
//   "Arm Pimples",
// ];

// const SearchBar = ({ setFilteredDoctors }) => {
//   const [query, setQuery] = useState("");
//   const [filteredOptions, setFilteredOptions] = useState(searchOptions);
//   const [showDropdown, setShowDropdown] = useState(false);
//   const dropdownRef = useRef(null);

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setShowDropdown(false);
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, []);

//   const handleInputChange = (e) => {
//     const value = e.target.value;
//     setQuery(value);
//     setShowDropdown(true);
//     setFilteredOptions(
//       value
//         ? searchOptions.filter((option) =>
//             option.toLowerCase().includes(value.toLowerCase())
//           )
//         : searchOptions
//     );
//   };

//   const handleSearch = (searchTerm) => {
//     setQuery(searchTerm);
//     setShowDropdown(false);
    
//     const filtered = doctors.filter((doctor) =>
//       doctor.expertise.toLowerCase().includes(searchTerm.toLowerCase())
//     );
//     setFilteredDoctors(filtered);
//   };

//   const handleKeyDown = (e) => {
//     if (e.key === "Enter" && filteredOptions.length > 0) {
//       handleSearch(filteredOptions[0]); // Auto-select first option
//     }
//   };

//   return (
//     <div className="relative w-full max-w-md" ref={dropdownRef}>
//       <div className="flex items-center border rounded-lg overflow-hidden shadow-sm">
//         <FaSearch className="ml-3 text-gray-500" />
//         <input
//           type="text"
//           placeholder="Search for treatments, symptoms..."
//           value={query}
//           onChange={handleInputChange}
//           onFocus={() => setShowDropdown(true)}
//           onKeyDown={handleKeyDown}
//           className="w-full px-4 py-2 focus:outline-none"
//         />
//       </div>

//       {showDropdown && filteredOptions.length > 0 && (
//         <ul className="absolute w-full bg-white border rounded-lg mt-1 shadow-lg">
//           {filteredOptions.map((option, index) => (
//             <li
//               key={index}
//               className="px-4 py-2 cursor-pointer hover:bg-gray-100"
//               onClick={() => handleSearch(option)}
//             >
//               {option}
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };

// const DoctorList = ({ doctors }) => {
//   return (
//     <div className="mt-4">
//       {doctors.length === 0 ? (
//         <p className="text-gray-500">No doctors found</p>
//       ) : (
//         doctors.map((doctor, index) => (
//           <div key={index} className="border p-4 mb-2 rounded-lg shadow">
//             <h2 className="text-lg font-semibold">{doctor.name}</h2>
//             <p className="text-gray-600">{doctor.specialty}</p>
//             <p className="text-sm text-blue-500">{doctor.expertise}</p>
//           </div>
//         ))
//       )}
//     </div>
//   );
// };

// const App = () => {
//   const [filteredDoctors, setFilteredDoctors] = useState(doctors);

//   return (
//     <div className="p-4 mt-16">
//       <SearchBar setFilteredDoctors={setFilteredDoctors} />
//       <DoctorList doctors={filteredDoctors} />
//     </div>
//   );
// };

// export default App;
