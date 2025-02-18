"use client";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import Footer from "@/Components/Footer";


const reviews = [
  {
    question: "How was your experience with our service?",
    answers: [
      { name: "Amit", answer: "It was fantastic! Loved the support.", image: "/user1.jpg" },
      { name: "Priya", answer: "Great experience, highly recommended!", image: "/user2.jpg" },
    ],
  },
  {
    question: "Did you find our platform helpful?",
    answers: [
      { name: "Ravi", answer: "Yes, it made everything super easy.", image: "/user3.jpg" },
      { name: "Neha", answer: "Absolutely! The best service I’ve used.", image: "/user4.jpg" },
    ],
  },
  {
    question: "Would you recommend us to others?",
    answers: [
      { name: "Arjun", answer: "100%! My friends already love it.", image: "/user5.jpg" },
      { name: "Sonia", answer: "Yes, the best experience ever!", image: "/user6.jpg" },
    ],
  },
];

// **Duplicate the first review for smooth transition**
const extendedReviews = [...reviews, reviews[0]];


const nutrients = [
  {
    name: "Zinc",
    importance: "Boosts immunity & heals wounds.",
    veg: ["Pumpkin Seeds", "Chickpeas", "Cashews"],
    nonVeg: ["Oysters", "Beef", "Chicken"],
  },
  {
    name: "Omega-3",
    importance: "Supports brain & heart health.",
    veg: ["Flaxseeds", "Chia Seeds", "Walnuts"],
    nonVeg: ["Salmon", "Mackerel", "Tuna"],
  },
  {
    name: "Iron",
    importance: "Carries oxygen in the blood.",
    veg: ["Spinach", "Lentils", "Tofu"],
    nonVeg: ["Red Meat", "Chicken Liver", "Fish"],
  },
  {
    name: "Calcium",
    importance: "Strengthens bones & teeth.",
    veg: ["Almonds", "Broccoli", "Soy Milk"],
    nonVeg: ["Milk", "Cheese", "Yogurt"],
  },
  {
    name: "Vitamin C",
    importance: "Boosts immunity & skin health.",
    veg: ["Oranges", "Kiwi", "Bell Peppers"],
    nonVeg: ["Fish Liver Oil", "Eggs", "Liver"],
  },
];
const HomePage = () => {
  // Replace these URLs with actual images of "imperfect patient models"
  const images = [
    "https://www.shutterstock.com/image-photo/closeup-woman-face-acne-600w-2461413987.jpg",
    "https://www.shutterstock.com/image-photo/closeup-woman-face-acne-600w-2461413987.jpg",
    "https://www.shutterstock.com/image-photo/closeup-woman-face-acne-600w-2461413987.jpg",
    "https://www.shutterstock.com/image-photo/closeup-woman-face-acne-600w-2461413987.jpg",
    "https://www.shutterstock.com/image-photo/closeup-woman-face-acne-600w-2461413987.jpg",
    "https://www.shutterstock.com/image-photo/closeup-woman-face-acne-600w-2461413987.jpg",
    "https://www.shutterstock.com/image-photo/closeup-woman-face-acne-600w-2461413987.jpg"
  ];

  // const doctors = [
  //   { id: 1, name: "Dr. Aryan Mehta", img: "https://www.practostatic.com/consumer-home/desktop/images/1597423628/dweb_find_doctors.png", quote: "Your health, our priority!" },
  //   { id: 2, name: "Dr. Sophia Kapoor", img: "https://www.practostatic.com/consumer-home/desktop/images/1597423628/dweb_find_doctors.png", quote: "Healing with care and compassion." },
  //   { id: 3, name: "Dr. Rahul Singh", img: "https://www.practostatic.com/consumer-home/desktop/images/1597423628/dweb_find_doctors.png", quote: "Better care, better health." },
  //   { id: 4, name: "Dr. Priya Sharma", img: "https://www.practostatic.com/consumer-home/desktop/images/1597423628/dweb_find_doctors.png", quote: "Your well-being matters!" },
  //   { id: 5, name: "Dr. Rajan Verma", img: "https://www.practostatic.com/consumer-home/desktop/images/1597423628/dweb_find_doctors.png", quote: "Dedicated to your care." }
  // ];


  const dermatologyServices = [
    {
      title: "Acne & Skincare",
      description: "Get expert advice on acne, scars, and skincare routines.",
      image: "https://www.practostatic.com/consumer-home/desktop/images/1558283618/sp-dietitian@2x.jpg", // Add proper images
    },
    {
      title: "Hair & Scalp Treatments",
      description: "Solutions for hair loss, dandruff, and scalp infections.",
      image: "https://www.practostatic.com/consumer-home/desktop/images/1558283618/sp-dietitian@2x.jpg",
    },
    {
      title: "Skin Allergies & Rashes",
      description: "Find relief for skin allergies, irritation, and redness.",
      image: "https://www.practostatic.com/consumer-home/desktop/images/1558283618/sp-dietitian@2x.jpg",
    },
    {
      title: "Anti-Aging & Botox",
      description: "Advanced treatments for youthful and glowing skin.",
      image: "https://www.practostatic.com/consumer-home/desktop/images/1558283618/sp-dietitian@2x.jpg",
    },

  ];

  const [flippedIndex, setFlippedIndex] = useState(null);




  const rowOneRef = useRef(null);
  const rowTwoRef = useRef(null);

  const tips = [
    "Stay Hydrated",
    "Exercise Regularly",
    "Get Enough Sleep",
    "Eat Healthy",
    "Practice Meditation",
    "Limit Screen Time",
    "Maintain Good Posture",
    "Take Breaks While Working",
  ];

  useEffect(() => {
    const animateScroll = (element, direction) => {
      let speed = 1; // Adjust speed for smooth effect

      const move = () => {
        if (direction === "ltr") {
          element.scrollLeft += speed;
          if (element.scrollLeft >= element.scrollWidth / 2) {
            element.scrollLeft = 0;
          }
        } else {
          element.scrollLeft -= speed;
          if (element.scrollLeft <= 0) {
            element.scrollLeft = element.scrollWidth / 2;
          }
        }
        requestAnimationFrame(move);
      };

      move();
    };

    animateScroll(rowOneRef.current, "ltr");
    animateScroll(rowTwoRef.current, "rtl");
  }, []);



  // const reviews = [
  //   {
  //     question: "How was the consultation process?",
  //     answers: [
  //       {
  //         name: "Rahul Sharma",
  //         image: "/images/user1.jpg",
  //         answer: "It was amazing! The doctors were very professional and helpful.",
  //       },
  //       {
  //         name: "Neha Mehta",
  //         image: "/images/user2.jpg",
  //         answer: "Very smooth experience. I got my consultation within minutes!",
  //       },
  //     ],
  //   },
  //   {
  //     question: "Was the platform easy to use?",
  //     answers: [
  //       {
  //         name: "Amit Patel",
  //         image: "/images/user3.jpg",
  //         answer: "Yes, the UI is very user-friendly and simple to navigate.",
  //       },
  //       {
  //         name: "Pooja Singh",
  //         image: "/images/user4.jpg",
  //         answer: "I loved the minimal and clean design. It made booking super easy.",
  //       },
  //     ],
  //   },
  //   {
  //     question: "Would you recommend it to others?",
  //     answers: [
  //       {
  //         name: "Sneha Kapoor",
  //         image: "/images/user5.jpg",
  //         answer: "Absolutely! The consultation process was smooth and fast.",
  //       },
  //       {
  //         name: "Vikram Joshi",
  //         image: "/images/user6.jpg",
  //         answer: "Highly recommended! Great support and professional doctors.",
  //       },
  //     ],
  //   },
  // ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true);
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }, 3000); // Auto-slide every 4 seconds

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Reset transition when reaching the duplicated last item
    if (currentIndex === reviews.length) {
      setTimeout(() => {
        setIsTransitioning(false);
        setCurrentIndex(0);
      }, 500); // Match transition duration
    } else {
      setTimeout(() => {
        setIsTransitioning(true);
      }, 1000);
      // setIsTransitioning(true);
    }
  }, [currentIndex]);


  const scrollRef = useRef(null);
  const [isScrollable, setIsScrollable] = useState(false);

  useEffect(() => {
    if (scrollRef.current) {
      setIsScrollable(scrollRef.current.scrollWidth > scrollRef.current.clientWidth);
    }
  }, []);
  const [expandedIndex, setExpandedIndex] = useState(null);



  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);




  return (
    <>

      {/* <img src="https://www.shutterstock.com/image-photo/closeup-woman-face-acne-600w-2461413987.jpg" alt="Skin 1" className="w-1/3 h-full object-cover"/> */}

      {/* <div className="relative w-full min-h-screen overflow-hidden bg-gray-50">
      <div className="absolute inset-0 flex items-center justify-center w-full h-full gap-5">
        <img src="https://www.shutterstock.com/image-photo/closeup-woman-face-acne-600w-2461413987.jpg" alt="Skin 1" className="w-[22%] h-[80%] object-cover rounded-lg shadow-lg transition-all duration-700"/>
        <img src="https://www.themodelbuilders.co.uk/wp-content/uploads/2022/05/shutterstock_1093078484.jpg" alt="Skin 2" className="w-[22%] h-[90%] object-cover rounded-lg shadow-lg transition-all duration-700"/>
        <img src="https://plus.unsplash.com/premium_photo-1706044172154-b16cc0126275?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8ZmFjZSUyMHdpdGglMjBwaW1wbGVzfGVufDB8fDB8fHww" alt="Skin 3" className="w-[22%] h-[85%] object-cover rounded-lg shadow-lg transition-all duration-700"/>
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLAhwzAWsDZw0qNTbA1P99xFhR25XHdfKcb5EG3hCKoI3SBcnDw4bnDAGjpWgmFafQwYs&usqp=CAU" alt="Skin 4" className="w-[22%] h-[80%] object-cover rounded-lg shadow-lg transition-all duration-700"/>
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-gray-50 via-transparent to-gray-100 opacity-90"></div>

      <div className="relative z-10 flex flex-col items-center justify-center h-screen text-center text-gray-800 px-6"
        style={{ 
          opacity: Math.max(1 - scrollY / 300, 0), 
          transform: `translateY(-${scrollY * 1.5}px)`, // Moves up fast
          transition: "transform 0.3s ease-out, opacity 0.3s ease-out"
        }}> 
        <h1 className="text-5xl sm:text-6xl font-extrabold tracking-wide drop-shadow-lg animate-fadeIn">
          Reveal Your Best Skin ✨
        </h1>
        <p className="text-lg sm:text-xl mt-4 max-w-xl animate-fadeIn delay-200">
          Advanced dermatology solutions for glowing skin.
        </p>
        <button className="mt-6 px-8 py-3 bg-blue-600 text-white text-lg font-semibold rounded-full shadow-lg transition-all transform hover:scale-110 animate-fadeIn delay-400">
          Book a Consultation
        </button>
      </div>
    </div> */}





    <div className="relative w-full min-h-screen mt-16 overflow-hidden bg-gradient-to-br from-[#f6d365] to-[#fda085]">
      {/* Animated Background Glow */}
      <div className="absolute inset-0 bg-opacity-20">
        <div className="absolute w-[500px] h-[500px] bg-blue-400 opacity-20 blur-3xl top-[-10%] left-[-10%] animate-glow"></div>
        <div className="absolute w-[400px] h-[400px] bg-pink-400 opacity-20 blur-3xl bottom-[-10%] right-[-10%] animate-glow"></div>
      </div>

      {/* Background Image Row */}
      <div className="absolute inset-0 flex items-center justify-center w-full h-full gap-5">
        <img src="https://st.depositphotos.com/1719616/53474/i/450/depositphotos_534748396-stock-photo-face-teenage-girl-pimples-acne.jpg" alt="Skin 1" className="w-[20%] h-[75%] object-cover rounded-xl shadow-lg"/>
        <img src="https://www.themodelbuilders.co.uk/wp-content/uploads/2022/05/shutterstock_1093078484.jpg" alt="Skin 2" className="w-[20%] h-[85%] object-cover rounded-xl shadow-lg"/>
        <img src="https://plus.unsplash.com/premium_photo-1706044172154-b16cc0126275?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8ZmFjZSUyMHdpdGglMjBwaW1wbGVzfGVufDB8fDB8fHww" alt="Skin 3" className="w-[20%] h-[80%] object-cover rounded-xl shadow-lg"/>
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLAhwzAWsDZw0qNTbA1P99xFhR25XHdfKcb5EG3hCKoI3SBcnDw4bnDAGjpWgmFafQwYs&usqp=CAU" alt="Skin 4" className="w-[20%] h-[75%] object-cover rounded-xl shadow-lg"/>
      </div>

      {/* Fading Gradient Effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#f6d365] via-transparent to-[#fda085] opacity-90"></div>

      {/* Writing Section with Font & Animation */}
      <div className="relative z-10 flex flex-col items-center justify-center h-screen text-center text-white px-6"
        style={{ 
          opacity: Math.max(1 - scrollY / 250, 0), 
          transform: `translateY(-${scrollY * 1.5}px)`,
          transition: "transform 0.3s ease-out, opacity 0.3s ease-out"
        }}>
        
        <h1 className="text-5xl sm:text-7xl font-extrabold tracking-wide drop-shadow-lg animate-fadeIn font-serif">
           Radiate Confidence, Glow Naturally 
        </h1>
        <p className="text-lg sm:text-2xl mt-4 max-w-xl font-light italic animate-fadeIn delay-200">
          Discover advanced skincare treatments for a flawless, youthful look.
        </p>
        <button className="mt-6 px-8 py-3 bg-white text-gray-800 text-lg font-semibold rounded-full shadow-lg 
                   transition-all transform hover:scale-110 hover:shadow-2xl relative overflow-hidden 
                   before:absolute before:inset-0 before:bg-gradient-to-r before:from-[#ffafbd] before:to-[#ffc3a0] 
                   before:opacity-0 before:transition-opacity before:duration-500 hover:before:opacity-100 
                   before:z-0">
  <span className="relative z-10">Book Your Glow-Up Now</span>
</button>
      </div>
    </div>





      {/* <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center pb-10 relative">
        <div className="relative w-full bg-gray-50 py-10 overflow-hidden">
          <div className="absolute top-0 left-0 h-full w-24 bg-gradient-to-r from-gray-200 to-transparent z-10"></div>
          <div className="absolute top-0 right-0 h-full w-24 bg-gradient-to-l from-gray-200 to-transparent z-10"></div>

          <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
            Skin & Hair Transformations
          </h2>
          <div className="relative w-full overflow-hidden">
            <div className="flex w-max animate-scroll">
              {images.concat(images).map((src, index) => (
                <div key={index} className="relative w-[220px] h-[320px] mx-2 group overflow-hidden rounded-lg shadow-lg">
                  <img
                    src={src}
                    alt={`Patient ${index + 1}`}
                    layout="fill"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div> */}




      {/* Meet Our Doctors Section */}
      {/* <div className="w-full mt-16 px-10">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">Meet Our Doctors</h2>

          <div className="flex overflow-x-auto space-x-6 p-4 scrollbar-hide">
            {doctors.map((doctor) => (
              <div key={doctor.id} className="min-w-[250px] bg-white shadow-lg rounded-lg p-4 flex flex-col items-center">
                <div className="relative w-[180px] h-[180px] mb-4">
                  <img
                    src={doctor.img}
                    alt={doctor.name}
                    layout="fill"
                    className="rounded-full border-4 object-cover border-blue-500"
                  />
                </div>
                <h3 className="text-lg font-semibold text-gray-700">{doctor.name}</h3>
                <p className="text-sm text-gray-500 italic text-center">"{doctor.quote}"</p>
              </div>
            ))}
          </div>
        </div> */}
      <div className=" py-16 relative bg-gradient-to-b from-[#fda085] to-white">
        {/* Soft Background Elements */}
        <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-16 h-16 bg-blue-100 rounded-full blur-lg opacity-40"></div>
        <div className="absolute right-0 top-1/3 w-20 h-20 bg-pink-200 rounded-full blur-lg opacity-40"></div>

        <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">
          Book a Dermatologist Consultation
        </h2>
        <p className="text-center text-gray-600 mb-8">
          Get expert advice for skincare, hair, and anti-aging treatments.
        </p>

        {/* Scrollable Wrapper (only if there are more than 4 items) */}
        <div className={`relative w-full ${isScrollable ? "overflow-hidden" : ""}`}>
          <div
            ref={scrollRef}
            className={`flex gap-4 px-5 ${isScrollable ? "overflow-x-auto scrollbar-hide scroll-smooth snap-x" : "justify-center"}`}
            style={{ scrollBehavior: "smooth" }}
          >
            {dermatologyServices.map((service, index) => (
              <div
                key={index}
                className="w-[260px] h-[350px] bg-white shadow-md rounded-lg overflow-hidden flex-shrink-0 hover:shadow-2xl hover:scale-105 transition-all duration-300 snap-center group"
              >
                {/* Image Section */}
                <div className="relative w-full h-48 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-30 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>

                {/* Content Section */}
                <div className="p-4 text-center">
                  <h3 className="text-lg font-semibold text-gray-800">{service.title}</h3>
                  <p className="text-sm text-gray-600 mt-2">{service.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>


      <div className="border-t-2 border-gray-300 w-3/4 mx-auto "></div>

      <div className="relative w-full bg-gray-50 pt-10 overflow-hidden">
        {/* Soft Gradient Shadows (Left & Right) */}
        <div className="absolute top-0 left-0 h-full w-24 bg-gradient-to-r from-gray-200 to-transparent z-10"></div>
        <div className="absolute top-0 right-0 h-full w-24 bg-gradient-to-l from-gray-200 to-transparent z-10"></div>



        <div className="bg-gradient-to-r from-green-50 to-teal-50 pt-14 pb-20 px-6 w-full">
          <h2 className="text-3xl font-bold text-center mb-10 text-gray-800 tracking-wide">
            Nourish Your Body 🍏
          </h2>

          {/* Horizontal Scrollable Container */}
          <div className="flex overflow-x-auto space-x-6 px-6 scrollbar-hide">
            {nutrients.map((nutrient, index) => (
              <div
                key={index}
                className="w-64 h-44 perspective cursor-pointer group relative"
                onMouseEnter={() => setFlippedIndex(index)}
                onMouseLeave={() => setFlippedIndex(null)}
                style={{ overflow: "hidden" }}
              >
                <div
                  className={`relative w-full h-full transition-transform duration-500 transform-style-preserve-3d ${flippedIndex === index ? "rotate-y-180" : ""
                    }`}
                  style={{
                    transformStyle: "preserve-3d",
                    transform: flippedIndex === index ? "rotateY(180deg)" : "rotateY(0deg)",
                  }}
                >
                  {/* Front Side */}
                  <div
                    className="absolute w-full h-full bg-white shadow-xl rounded-xl flex flex-col items-center justify-center text-center p-5 border border-gray-300 transition-all group-hover:shadow-2xl"
                    style={{ backfaceVisibility: "hidden" }}
                  >
                    <h3 className="text-xl font-bold text-green-600">{nutrient.name}</h3>
                    <p className="text-sm text-gray-600 mt-2">{nutrient.importance}</p>
                  </div>

                  {/* Back Side (Now Fixed) */}
                  <div
                    className="absolute w-full h-full bg-green-500 text-white shadow-xl rounded-xl flex flex-col justify-center items-center text-center p-5 border border-gray-300"
                    style={{
                      backfaceVisibility: "hidden",
                      transform: "rotateY(180deg)",
                    }}
                  >
                    <h3 className="text-lg font-semibold mb-2">What to Eat?</h3>
                    <p className="text-sm">
                      <strong>Veg:</strong> {nutrient.veg.join(", ")}
                    </p>
                    <p className="text-sm">
                      <strong>Non-Veg:</strong> {nutrient.nonVeg.join(", ")}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>


        {/* <div className="h-16 bg-gradient-to-b from-transparent to-gray-100"></div> */}




        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 py-12 px-6 w-full overflow-hidden">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-800 tracking-wide">
            Essential Self-Care Tips
          </h2>

          {/* Row 1 - Left to Right */}
          <div className="overflow-hidden whitespace-nowrap relative mb-4">
            <div
              ref={rowOneRef}
              className="flex space-x-4 animate-marquee"
              style={{ width: "max-content" }}
            >
              {[...tips, ...tips].map((tip, index) => (
                <div
                  key={index}
                  className="bg-white shadow-md rounded-lg px-6 py-3 text-sm font-medium text-gray-700 flex items-center justify-center min-w-[180px] border border-gray-300 transition-all duration-300 hover:bg-indigo-100 hover:scale-105"
                >
                  {tip}
                </div>
              ))}
            </div>
          </div>

          {/* Row 2 - Right to Left */}
          <div className="overflow-hidden whitespace-nowrap relative">
            <div
              ref={rowTwoRef}
              className="flex space-x-4 animate-marquee-reverse"
              style={{ width: "max-content" }}
            >
              {[...tips, ...tips].map((tip, index) => (
                <div
                  key={index}
                  className="bg-white shadow-md rounded-lg px-6 py-3 text-sm font-medium text-gray-700 flex items-center justify-center min-w-[180px] border border-gray-300 transition-all duration-300 hover:bg-indigo-100 hover:scale-105"
                >
                  {tip}
                </div>
              ))}
            </div>
          </div>
        </div>




        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 py-14 px-6 w-full">
          <h2 className="text-3xl font-bold text-center mb-10 text-gray-800 tracking-wide">
            Hear from Our Happy Patients 💙
          </h2>

          {/* Review Card Container */}
          <div className="max-w-2xl mx-auto overflow-hidden relative">
            <div
              className={`flex  ${isTransitioning ? "transition-transform duration-500 ease-in-out" : "transition-none duration-0"}`}
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {extendedReviews.map((review, index) => (
                <div
                  key={index}
                  className="min-w-full bg-white shadow-xl rounded-2xl p-6 border border-gray-200 text-center transform transition-all duration-300 hover:scale-[1.02]"
                >
                  <p className="text-gray-900 font-semibold text-xl italic">
                    {review.question}
                  </p>

                  <div className="mt-6 space-y-6">
                    {review.answers.map((user, idx) => (
                      <div
                        key={idx}
                        className="flex items-center bg-gray-100 p-4 rounded-lg shadow-md hover:shadow-lg transition-all"
                      >
                        <img
                          src={user.image}
                          alt={user.name}
                          className="w-14 h-14 rounded-full border-2 border-indigo-500 object-cover"
                        />
                        <div className="ml-4 text-left">
                          <p className="text-gray-900 font-medium text-lg">{user.name}</p>
                          <p className="text-gray-600 text-sm italic">
                            "{user.answer}"
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
      <Footer />
    </>
  );
};

export default HomePage;
