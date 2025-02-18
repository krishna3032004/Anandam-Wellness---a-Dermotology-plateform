"use client"
import { useState,useEffect,useRef } from "react";
import { useRouter } from "next/navigation";
import { FaSearch } from "react-icons/fa";

const doctors = [
    { name: "Dr. L K Desai", specialty: "Dermatologist", expertise: "Acne / Pimples Treatment",location:"pune" },
    { name: "Dr. Sonal Chavan", specialty: "Dermatologist", expertise: "Hair Loss Treatment",location:"pune"  },
    { name: "Dr. Rajesh Sharma", specialty: "Cosmetologist", expertise: "Acne/ Pimple Scars Treatment",location:"pune"  },
    { name: "Dr. Priya Mehta", specialty: "Dermatologist", expertise: "Skin Treatment",location:"pune"  },
  ];


export default function Home() {
  const [search, setSearch] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("Pune");
  const [selectedExperience, setSelectedExperience] = useState("");
  const [selectedStories, setSelectedStories] = useState("");
  const [selectedGender, setSelectedGender] = useState("");
  const [sortOption, setSortOption] = useState("Relevance");

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
  
    const handleSearch = (searchTerm) => {
      setQuery(searchTerm);
      setShowDropdown(false);
      
      const filtered = doctors.filter((doctor) => doctor.expertise.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .filter((doctor) => doctor.location.toLowerCase().includes(selectedLocation.toLowerCase()))
      .filter((doctor) => (selectedExperience ? doctor.experience >= parseInt(selectedExperience) : true))
      .filter((doctor) => (selectedStories ? doctor.patientStories >= parseInt(selectedStories) : true))
      .filter((doctor) => (selectedGender ? doctor.gender === selectedGender : true))
      .filter((doctor) => doctor.name.toLowerCase().includes(search.toLowerCase()))
      .sort((a, b) => {
        if (sortOption === "Patient Stories - High to Low") return b.patientStories - a.patientStories;
        if (sortOption === "Experience - High to Low") return b.experience - a.experience;
        if (sortOption === "Consultation Fee - High to Low") return b.fee - a.fee;
        if (sortOption === "Consultation Fee - Low to High") return a.fee - b.fee;
        return 0;
      });
      setFilteredDoctors(filtered);
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
          onChange={(e) => setSelectedLocation(e.target.value)}
        >
          <option value="Pune">Pune</option>
          <option value="Pimple Saudagar">Pimple Saudagar</option>
          <option value="Hadapsar">Hadapsar</option>
          <option value="Kharadi">Kharadi</option>
          <option value="">All Locations</option>
        </select>

        {/* Search Bar */}
        <div className="flex items-center border rounded-lg overflow-hidden shadow-sm">
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
        <ul className="absolute w-full bg-white border rounded-lg mt-1 shadow-lg">
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
        <select className="p-2 border rounded" onChange={(e) => setSelectedExperience(e.target.value)}>
          <option value="">Experience</option>
          <option value="5">5+ Years</option>
          <option value="10">10+ Years</option>
          <option value="15">15+ Years</option>
          <option value="20">20+ Years</option>
        </select>

        {/* Patient Stories */}
        <select className="p-2 border rounded" onChange={(e) => setSelectedStories(e.target.value)}>
          <option value="">Patient Stories</option>
          <option value="30">30+ Stories</option>
          <option value="80">80+ Stories</option>
          <option value="250">250+ Stories</option>
        </select>

        {/* Gender */}
        <select className="p-2 border rounded" onChange={(e) => setSelectedGender(e.target.value)}>
          <option value="">Gender</option>
          <option value="Male">Male Doctor</option>
          <option value="Female">Female Doctor</option>
        </select>

        {/* Sorting */}
        <select className="p-2 border rounded" onChange={(e) => setSortOption(e.target.value)}>
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
          filteredDoctors.map((doctor, index) => (
            <div key={index} className="bg-white p-4 rounded-lg shadow-md flex items-center gap-4">
              <div className="w-16 h-16 bg-gray-300 rounded-full"></div>
              <div className="flex-1">
                <h2 className="text-lg font-semibold text-blue-600">{doctor.name}</h2>
                <p className="text-gray-600">{doctor.experience} years experience</p>
                <p className="text-gray-500">{doctor.location}</p>
                <p className="text-gray-700">₹{doctor.fee} Consultation Fee</p>
              </div>
              <button className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600">
                Book Clinic Visit
              </button>
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
