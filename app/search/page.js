"use client"
import { useState,useEffect,useRef } from "react";
// import { useRouter } from "next/router";
import { FaSearch, FaMapMarkerAlt } from "react-icons/fa";
import { FaCalendarAlt, FaPhoneAlt } from "react-icons/fa";
import Link from "next/link";
import { fetchDoctor, getDoctorsByExpertise,getDoctorAll } from "@/actions/useraction";
import { FaStar } from "react-icons/fa";
// const doctors = [];


export default function Home() {
  const [search, setSearch] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedExperience, setSelectedExperience] = useState("");
  const [selectedStories, setSelectedStories] = useState("");
  const [selectedGender, setSelectedGender] = useState("");
  const [sortOption, setSortOption] = useState("Relevance");
  const [doctors, setDoctors] = useState([]);
const [loading, setLoading] = useState(false);
// const [page, setPage] = useState(0);
const [skip, setSkip] = useState(0);
const [hasMore, setHasMore] = useState(true);

const searchOptions = [
  "Acne / Pimples Treatment",
  "Acne/ Pimple Scars Treatment",
  "Hair Loss Treatment",
  "Acne",
  "Skin Treatment",
  "Varicose Veins Treatment",
  "Acne Treatment",
  "Arm Pimples","Acne Treatment", "Skin Allergy", "Eczema", "Psoriasis", "Hair Loss Treatment",
    "Laser Hair Removal", "Skin Rejuvenation", "Botox & Fillers", "Anti-Aging Treatment",
    "Chemical Peeling", "Pigmentation Treatment", "Dark Circle Removal", "Acne Scars",
    "Rhinoplasty", "Face Lift", "Scar Revision Surgery", "Hair Transplant",
    "Dandruff Treatment", "PRP Therapy", "Laser Treatment", "Mole & Wart Removal",
    "Tattoo Removal", "Skin Brightening", "HydraFacial", "Body Contouring",
    "Liposuction", "Fat Grafting", "Breast Augmentation", "Stretch Marks Removal",
    "Microneedling",
];

// const router = useRouter();
const [query, setQuery] = useState("");
const [filteredOptions, setFilteredOptions] = useState(searchOptions);
const [showDropdown, setShowDropdown] = useState(false);
const dropdownRef = useRef(null);
const [filteredDoctors, setFilteredDoctors] = useState(doctors);
const [showFilters, setShowFilters] = useState(false);

  // const { problem } = router.query;
  // const searchParams = useSearchParams();
  // const problem = searchParams.get("problem");
  const [problem, setproblem] = useState(null)
  // console.log(problem)
  useEffect(() => {
    const id = new URLSearchParams(window.location.search).get("problem");
    if (id) setproblem(id);
  }, []);
  // useEffect(() => {
  //   const searchParams = useSearchParams();
  //   const id2 = searchParams.get("problem");
  //   setproblem(id2)
  // }, []);

  useEffect(() => {
    if(problem){
      console.log(problem)
      const formattedProblem = problem ? problem.replace(/-/g, " ") : "Loading...";
      setQuery(formattedProblem)
    }
  
    
  }, [problem])
  
  useEffect(() => {
    
    if (query) {
      console.log("baki sabh theek")
      fetchDoctors(true);
    }else{
      
      console.log("bhas chl rha hai")
      fetchDoctorAll(true)
    }
  }, [query]);
  

  const fetchDoctorAll = async (reset = false) => {
    const skipValue = reset ? 0 : skip;
    const limitValue = 20;
  
    const data = await getDoctorAll(skipValue, limitValue);
  
    if (reset) {
      setDoctors(data.plainDoctors);
      setSkip(limitValue);
    } else {
      setDoctors((prev) => [...prev, ...data.plainDoctors]);
      setSkip((prev) => prev + limitValue);
    }
  
    setHasMore(data.hasMore);
  };
  

  const fetchDoctors = async (reset = false) => {
    if (!query) return;

    const data = await getDoctorsByExpertise(query, reset ? 0 : skip, 20);

    console.log(data)
    if (reset) {
      console.log(data)
      // console.log(data)
      setDoctors(data.plainDoctors);
      console.log(data.plainDoctors)

      setSkip(20);
    } else {
      setDoctors((prev) => [...prev, ...data.doctors]);
      setSkip((prev) => prev + 20);
    }

    setHasMore(data.hasMore);
  };

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
            if (!Array.isArray(doctors)) return;
            //   const filtered = doctors.filter((doctor) => query ? doctor.expertise.some((exp) => exp.toLowerCase().includes(query.toLowerCase())): true
            console.log(doctors)
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


        const filtered = doctors.filter((doctor) => Array.isArray(doctor.expertise) && query ? doctor.expertise.some((exp) => exp?.toLowerCase().includes(query.toLowerCase())): true)
      .filter((doctor) =>selectedLocation ?  doctor.location.toLowerCase().includes(selectedLocation.toLowerCase()) : true)
      .filter((doctor) => (selectedExperience ? doctor.experience >= parseInt(selectedExperience) : true))
      .filter((doctor) => (selectedStories ? doctor.patientStories >= parseInt(selectedStories) : true))
      .filter((doctor) =>  (selectedGender ? doctor.gender.toLowerCase() === selectedGender.toLowerCase() : true))
      .filter((doctor) => search ? doctor.username.toLowerCase().includes(search.toLowerCase()) : true)
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
    <div className="p-6 pt-20 bg-gray-100  min-h-screen">
      {/* Search & Filters */}
      <div className="bg-white p-4 rounded-lg shadow-md">
  {/* Search + Filter Row */}
  <div className="flex flex-col md:flex-row items-center gap-4">
    {/* Search Bar */}
    <div ref={dropdownRef} className="flex items-center border rounded-lg overflow-hidden shadow-sm w-full md:w-[400px]">
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

    {/* Filter Toggle Button */}
    <button
      onClick={() => setShowFilters(!showFilters)}
      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
    >
      {showFilters ? "Hide Filters" : "Show Filters"}
    </button>
  </div>

  {/* Suggestion Dropdown */}
  {showDropdown && filteredOptions.length > 0 && (
    <ul ref={dropdownRef} className="absolute z-10 mt-2 w-[90%] md:w-[400px] bg-white border rounded-lg shadow-lg max-h-60 overflow-auto">
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

  {/* Filter Panel (Conditional) */}
  {showFilters && (
    <div className="mt-4 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {/* Location */}
      <select
        className="p-2 border rounded"
        value={selectedLocation}
        onChange={(e) => setSelectedLocation(e.target.value)}
      >
        <option value="">All Locations</option>
        <option value="Pimple Saudagar">Pimple Saudagar</option>
        <option value="Hadapsar">Hadapsar</option>
        <option value="Kharadi">Kharadi</option>
        <option value="Pune">Pune</option>
      </select>

      {/* Experience */}
      <select className="p-2 border rounded" value={selectedExperience} onChange={(e) => setSelectedExperience(e.target.value)}>
        <option value="">Experience</option>
        <option value="5">5+ Years</option>
        <option value="10">10+ Years</option>
        <option value="15">15+ Years</option>
        <option value="20">20+ Years</option>
      </select>

      {/* Stories */}
      <select className="p-2 border rounded" value={selectedStories} onChange={(e) => setSelectedStories(e.target.value)}>
        <option value="">Patient Stories</option>
        <option value="30">30+ Stories</option>
        <option value="80">80+ Stories</option>
        <option value="250">250+ Stories</option>
      </select>

      {/* Gender */}
      <select className="p-2 border rounded" value={selectedGender} onChange={(e) => setSelectedGender(e.target.value)}>
        <option value="">Gender</option>
        <option value="Male">Male Doctor</option>
        <option value="Female">Female Doctor</option>
      </select>

      {/* Sorting */}
      <select className="p-2 border rounded" value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
        <option value="Relevance">Sort By: Relevance</option>
        <option value="Patient Stories - High to Low">Patient Stories - High to Low</option>
        <option value="Experience - High to Low">Experience - High to Low</option>
        <option value="Consultation Fee - High to Low">Consultation Fee - High to Low</option>
        <option value="Consultation Fee - Low to High">Consultation Fee - Low to High</option>
      </select>
    </div>
  )}
</div>


      {/* Doctor List */}
      <div className="mt-6 space-y-4">
      {!query && <p>Please select a treatment</p>}
        {filteredDoctors.length > 0 ? (

        filteredDoctors.map((doctor) => (


            <div key={doctor._id} className="flex flex-col sm:flex-row justify-between bg-white p-4 rounded-lg shadow-md items-center gap-4 border">
      {/* Doctor's Image */}
      <div className="flex flex-row items-center w-full sm:w-[68%] gap-4 sm:gap-7  ">
      <img
        src={doctor.photo}
        alt={doctor.username}
        className="sm:w-20 w-16 sm:h-20 h-16 rounded-full border"
      />

      {/* Doctor's Info */}
      <Link href={`/doctor?id=${doctor._id}`} passHref><div className="flex-1">
        {/* <h2 className="text-blue-500 font-semibold text-lg">{doctor.name}</h2> */}
        {/* <Link href={`/doctor?id=${doctor._id}`} passHref> */}
          <h2 className="text-blue-500 font-semibold text-lg cursor-pointer hover:underline">
            {doctor.username}
          </h2>
        {/* </Link> */}
        <p className="text-gray-600">{doctor.specialty}</p>
        <p className="text-gray-500 text-xs sm:text-sm">{doctor.experience} years experience overall</p>

        {/* Clinic Info */}
        <p className="font-semibold text-gray-700 text-sm sm:text-base">
          {doctor.clinicName}, <span className="text-gray-500 text-sm sm:text-base">{doctor.location}</span>
        </p>
        <p className="text-gray-600 text-xs sm:text-sm">{doctor.fee} Consultation fee at clinic</p>

        {/* Ratings & Reviews */}
        <div className="flex items-center mt-2">
          <span className="bg-green-500 flex text-white text-xs px-2 py-1 rounded">
            {doctor.rating} <FaStar className="text-yellow-500 mr-1 text-sm sm:text-base" />
          </span>
          <span className="ml-2 text-blue-600 font-semibold text-sm sm:text-base cursor-pointer">
            {doctor.reviews.length} Patient Stories
          </span>
        </div>
      </div></Link>
      </div>


      {/* Availability & Buttons */}
      <div className="flex flex-col  ">
        <p className="text-gray-500 flex items-center gap-1"> 
          <FaCalendarAlt className="text-gray-400 text-xs sm:text-sm" /> Available Tomorrow
        </p>
        <div className="flex flex-row sm:flex-col gap-2 sm:gap-0">
        <button className="bg-blue-500 text-xs sm:text-sm  text-white px-3 sm:px-7 py-1 rounded-lg mt-2 font-semibold shadow">
          Book Clinic Visit
          <p className="text-xs font-medium">No Booking Fee</p>
        </button>

        <button className="border text-blue-500 text-xs sm:text-sm px-2 sm:px-6 py-1 sm:py-3 rounded-lg mt-2 flex items-center gap-2 shadow">
          <FaPhoneAlt />
          Contact Clinic
        </button>
        </div>
      </div>
    </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No doctors found.</p>
        )}
      </div>
      {hasMore && (
  <button
    onClick={() => query ? fetchDoctors(false) : fetchDoctorAll(false)}
    disabled={loading}
    className="bg-blue-500 text-white px-4 py-2 rounded"
  >
    {loading ? "Loading..." : "Show More"}
  </button>
)}

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
