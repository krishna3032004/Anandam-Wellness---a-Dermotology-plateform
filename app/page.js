"use client";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Footer from "@/Components/Footer";
import { FaUserCircle, FaComments } from "react-icons/fa";
import ChatBot from "@/Components/ChatBot";

const reviews = [
  {
    question: "How was your experience with our service?",
    answers: [
      { name: "Amit", answer: "It was fantastic! Loved the support.", image: "https://media.istockphoto.com/id/1223671392/vector/default-profile-picture-avatar-photo-placeholder-vector-illustration.jpg?s=612x612&w=0&k=20&c=s0aTdmT5aU6b8ot7VKm11DeID6NctRCpB755rA1BIP0=" },
      { name: "Priya", answer: "Great experience, highly recommended!", image: "https://media.istockphoto.com/id/1223671392/vector/default-profile-picture-avatar-photo-placeholder-vector-illustration.jpg?s=612x612&w=0&k=20&c=s0aTdmT5aU6b8ot7VKm11DeID6NctRCpB755rA1BIP0=" },
    ],
  },
  {
    question: "Did you find our platform helpful?",
    answers: [
      { name: "Ravi", answer: "Yes, it made everything super easy.", image: "https://media.istockphoto.com/id/1223671392/vector/default-profile-picture-avatar-photo-placeholder-vector-illustration.jpg?s=612x612&w=0&k=20&c=s0aTdmT5aU6b8ot7VKm11DeID6NctRCpB755rA1BIP0=" },
      { name: "Neha", answer: "Absolutely! The best service I’ve used.", image: "https://media.istockphoto.com/id/1223671392/vector/default-profile-picture-avatar-photo-placeholder-vector-illustration.jpg?s=612x612&w=0&k=20&c=s0aTdmT5aU6b8ot7VKm11DeID6NctRCpB755rA1BIP0=" },
    ],
  },
  {
    question: "Would you recommend us to others?",
    answers: [
      { name: "Arjun", answer: "100%! My friends already love it.", image: "https://media.istockphoto.com/id/1223671392/vector/default-profile-picture-avatar-photo-placeholder-vector-illustration.jpg?s=612x612&w=0&k=20&c=s0aTdmT5aU6b8ot7VKm11DeID6NctRCpB755rA1BIP0=" },
      { name: "Sonia", answer: "Yes, the best experience ever!", image: "https://media.istockphoto.com/id/1223671392/vector/default-profile-picture-avatar-photo-placeholder-vector-illustration.jpg?s=612x612&w=0&k=20&c=s0aTdmT5aU6b8ot7VKm11DeID6NctRCpB755rA1BIP0=" },
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




  const dermatologyServices = [
    {
      title: "Acne & Skincare",
      problem: "Acne Treatment",
      description: "Get expert advice on acne, scars, and skincare routines.",
      image: "https://www.shutterstock.com/image-photo/young-beautiful-girl-undergoes-medical-600nw-2251288587.jpg", // Add proper images
      // image: "/skincare.webp", // Add proper images
    },
    {
      title: "Hair & Scalp Treatments",
      problem: "Hair Loss Treatment",
      description: "Solutions for hair loss, dandruff, and scalp infections.",
      // image: "https://media.istockphoto.com/id/1470018432/photo/hair-therapist-is-checking-a-mans-scalp.jpg?s=612x612&w=0&k=20&c=Dn_Fi4NvxI_zJD1tr4o_2d7DuP-NVOA5Yal3tnhmcYE=",
      image: "https://www.shutterstock.com/image-photo/doctor-examining-young-mans-hair-600nw-2323849531.jpg",
      // image: "/skincare2.webp",
    },
    {
      title: "Skin Allergies & Rashes",
      problem: "Skin Allergy",
      description: "Find relief for skin allergies, irritation, and redness.",
      image: "https://media.istockphoto.com/id/1462387172/photo/kid-patient-suffering-from-a-skin-rash.jpg?s=612x612&w=0&k=20&c=uEgGi9n6Owsa8OoPjoG-dD7ZxPCM2IBo_bAvSqz9Z4k=",
    },
    {
      title: "Anti-Aging & Botox",
      problem: "Anti-Aging Treatment",
      description: "Advanced treatments for youthful and glowing skin.",
      image: "https://media.istockphoto.com/id/874020412/photo/doctor-doing-botox-injections-on-a-mature-clients-face.jpg?s=612x612&w=0&k=20&c=xbdSyUMgrC9KiTMExPXC041QRI5bxcTsXjVPcLDWxZM=",
    },

  ];

  const router = useRouter();

  // Function to navigate when a service is clicked
  const handleClick = (title) => {
    const formattedTitle = encodeURIComponent(title.toLowerCase().replace(/[^a-z0-9]+/g, "-")); // Convert to URL-friendly format
    router.push(`/search?problem=${formattedTitle}`); // Using ?problem= format
  };


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

  // const [ischatopen, setischatopen] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [animate, setAnimate] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimate(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);





  return (
    <>

      <div className="fixed bg-[#f6d365] min-h-screen z-50 flex justify-center items-center text-[#222222]">

        {/* Chat Button */}
        {/* <button
        onClick={() => setShowChat(!showChat)}
        className={`fixed bottom-5 right-5 px-6 py-3 rounded-full text-lg font-semibold shadow-lg 
          bg-[#222222] text-[#f6d365] transition-all hover:scale-105 
          ${animate ? "animate-slide" : ""}`}
      >
        Chat with Bot
      </button> */}
        <button
          onClick={() => setShowChat(true)}
          className="flex items-center fixed right-5 bottom-5 space-x-2 bg-[#f6d365] text-gray-900 px-4 py-2 rounded-full shadow-lg 
                     transition hover:scale-110 animate-slide-in"
        >
          <FaComments className="text-lg" />
          <span className="text-sm font-medium">Chat with Bot</span>
        </button>

        {/* Chat Window */}
        {showChat && (
          <div className="fixed bottom-16 right-5 w-0 h-0 bg-white rounded-lg shadow-lg p-4">
            <ChatBot onClose={() => setShowChat(false)} />
          </div>
        )}
      </div>




      <div className="relative w-full min-h-screen mt-16 overflow-hidden bg-gradient-to-br from-[#f6d365] to-[#fda085]">
        {/* Animated Background Glow */}
        <div className="absolute inset-0 bg-opacity-20">
          <div className="absolute w-[500px] h-[500px] bg-blue-400 opacity-20 blur-3xl top-[-10%] left-[-10%] animate-glow"></div>
          <div className="absolute w-[400px] h-[400px] bg-pink-400 opacity-20 blur-3xl bottom-[-10%] right-[-10%] animate-glow"></div>
        </div>

        {/* Background Image Row */}
        <div className="absolute inset-0 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-5 px-4 sm:px-0">
          <img src="https://st.depositphotos.com/1719616/53474/i/450/depositphotos_534748396-stock-photo-face-teenage-girl-pimples-acne.jpg" alt="Skin 1" className="w-[90%] sm:w-[20%] h-[200px] sm:h-[75%] object-cover rounded-xl shadow-lg" />
          <img src="https://www.themodelbuilders.co.uk/wp-content/uploads/2022/05/shutterstock_1093078484.jpg" alt="Skin 2" className="w-[90%] sm:w-[20%] h-[220px] sm:h-[85%] object-cover rounded-xl shadow-lg" />
          <img src="https://plus.unsplash.com/premium_photo-1706044172154-b16cc0126275?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8ZmFjZSUyMHdpdGglMjBwaW1wbGVzfGVufDB8fDB8fHww" alt="Skin 3" className="w-[90%] sm:w-[20%] h-[210px] sm:h-[80%] object-cover rounded-xl shadow-lg" />
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLAhwzAWsDZw0qNTbA1P99xFhR25XHdfKcb5EG3hCKoI3SBcnDw4bnDAGjpWgmFafQwYs&usqp=CAU" alt="Skin 4" className="w-[90%] sm:w-[20%] h-[200px] sm:h-[75%] object-cover rounded-xl shadow-lg" />
        </div>

        {/* Fading Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#f6d365] via-transparent to-[#fda085] opacity-90"></div>

        {/* Writing Section */}
        <div className="relative z-10 flex flex-col items-center justify-center h-screen text-center text-white px-2 sm:px-10"
          style={{
            opacity: Math.max(1 - scrollY / 250, 0),
            transform: `translateY(-${scrollY * 1.5}px)`,
            transition: "transform 0.3s ease-out, opacity 0.3s ease-out"
          }}>

          <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-wide drop-shadow-lg animate-fadeIn font-serif leading-snug sm:leading-tight">
            Radiate Confidence, <br className="block sm:hidden" /> Glow Naturally
          </h1>

          <p className="text-sm sm:text-lg md:text-2xl mt-3 sm:mt-4 max-w-full sm:max-w-[38rem] font-light italic animate-fadeIn delay-200">
            Embrace it with patience, nourish it with care, and remember true beauty shines from confidence, not perfection
          </p>

          <button
            onClick={() => router.push(`/search`)}
            className="mt-6 px-8 sm:px-8 py-3 sm:py-3 text-gray-800 text-sm sm:text-lg font-semibold rounded-full shadow-lg 
                 transition-all transform hover:scale-110 hover:shadow-2xl relative overflow-hidden 
                 before:absolute before:inset-0 bg-gradient-to-r from-[#ffafbd] to-[#ffc3a0] 
                 before:opacity-0 before:transition-opacity before:duration-500 hover:before:opacity-100 
                 before:z-0"
          >
            <span className="relative z-10">Book Your Glow-Up Now</span>
          </button>
        </div>
      </div>






      <div className="w-full overflow-x-hidden">
        {/* Section: Book a Dermatologist */}
        <div className="py-16 relative bg-gradient-to-b from-[#fda085] to-green-50">
          <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-16 h-16 bg-blue-100 rounded-full blur-lg opacity-40"></div>
          <div className="absolute right-0 top-1/3 w-20 h-20 bg-pink-200 rounded-full blur-lg opacity-40"></div>

          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-4">
            Book a Dermatologist Consultation
          </h2>
          <p className="text-center text-gray-600 mb-8 max-w-xl mx-auto px-4">
            Get expert advice for skincare, hair, and anti-aging treatments.
          </p>

          <div className={`relative w-full ${isScrollable ? "overflow-hidden" : ""}`}>
            <div
              ref={scrollRef}
              className={`flex gap-4 sm:gap-20 lg:gap-4 px-0 md:px-5 lg:px-0   ${isScrollable ? "overflow-x-auto scrollbar-hide scroll-smooth snap-x" : "justify-center flex-wrap"}`}
            >
              {dermatologyServices.map((service, index) => (
                <div
                  key={index}
                  onClick={() => handleClick(service.problem)}
                  className="w-[260px] md:w-[280px] lg:w-[220px] xl:w-[260px] cursor-pointer   h-[350px] bg-white shadow-md rounded-lg overflow-hidden flex-shrink-0 hover:shadow-2xl hover:scale-105 transition-all duration-300 snap-center group"
                >
                  <div className="relative w-full h-48 overflow-hidden">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover  transform group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-30 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </div>
                  <div className="p-4 text-center">
                    <h3 className="text-lg font-semibold text-gray-800">{service.title}</h3>
                    <p className="text-sm text-gray-600 mt-2">{service.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Gradient Transition Between Sections */}
        {/* <div className="h-20 bg-gradient-to-r from-[#fda085] via-white to-green-50"></div> */}

        {/* Section: Nutrients */}
        <div className="relative w-full bg-gradient-to-r from-green-50 to-blue-50 pt-14 pb-20 px-4 md:px-10 overflow-hidden">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-10 text-gray-800 tracking-wide">
            Nourish Your Body 🍏
          </h2>

          <div className="flex overflow-x-auto space-x-6 scrollbar-hide">
            {nutrients.map((nutrient, index) => (
              <div
                key={index}
                className="w-64 h-44 perspective cursor-pointer group relative flex-shrink-0"
                onMouseEnter={() => setFlippedIndex(index)}
                onMouseLeave={() => setFlippedIndex(null)}
              >
                <div
                  className="relative w-full h-full transition-transform duration-500"
                  style={{
                    transformStyle: "preserve-3d",
                    transform: flippedIndex === index ? "rotateY(180deg)" : "rotateY(0deg)",
                  }}
                >
                  {/* Front */}
                  <div
                    className="absolute w-full h-full bg-white shadow-xl rounded-xl flex flex-col items-center justify-center text-center p-5 border border-gray-300 transition-all group-hover:shadow-2xl"
                    style={{ backfaceVisibility: "hidden" }}
                  >
                    <h3 className="text-xl font-bold text-green-600">{nutrient.name}</h3>
                    <p className="text-sm text-gray-600 mt-2">{nutrient.importance}</p>
                  </div>

                  {/* Back */}
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

        {/* Section: Self-Care Tips */}
        <div className="bg-gradient-to-r from-green-50 to-blue-50 py-14 px-0 sm:px-4 md:px-10 w-full overflow-hidden">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 text-gray-800 tracking-wide">
            Essential Self-Care Tips 💆‍♀️
          </h2>

          {/* Row 1 */}
          <div className="overflow-hidden whitespace-nowrap relative mb-4">
            <div ref={rowOneRef} className="flex space-x-2 sm:space-x-4 animate-marquee" style={{ width: "max-content" }}>
              {[...tips, ...tips].map((tip, index) => (
                <div
                  key={index}
                  className="bg-white shadow-md rounded-lg px-3 sm:px-6 py-2 sm:py-3 text-xs sm:text-sm font-medium text-gray-700 flex items-center justify-center min-w-[180px] border border-gray-300 hover:bg-indigo-100 hover:scale-105 transition-all"
                >
                  {tip}
                </div>
              ))}
            </div>
          </div>

          {/* Row 2 */}
          <div className="overflow-hidden whitespace-nowrap relative">
            <div ref={rowTwoRef} className="flex space-x-2 sm:space-x-4 animate-marquee-reverse" style={{ width: "max-content" }}>
              {[...tips, ...tips].map((tip, index) => (
                <div
                  key={index}
                  className="bg-white shadow-md rounded-lg px-3 sm:px-6 py-2 sm:py-3 text-xs sm:text-sm font-medium text-gray-700 flex items-center justify-center min-w-[180px] border border-gray-300 hover:bg-indigo-100 hover:scale-105 transition-all"
                >
                  {tip}
                </div>
              ))}
            </div>
          </div>
        </div>



        {/* Section: Reviews */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 py-14 px-4 md:px-10 w-full">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-10 text-gray-800 tracking-wide">
            Hear from Our Happy Patients 💙
          </h2>

          <div className="max-w-2xl rounded-2xl mx-auto overflow-hidden relative">
            <div
              className={`flex  ${isTransitioning ? "transition-transform duration-500 ease-in-out" : ""}`}
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {extendedReviews.map((review, index) => (
                <div
                  key={index}
                  className="min-w-full bg-white shadow-xl rounded-2xl p-6 border border-gray-200 text-center hover:scale-[1.02] transition-transform duration-300"
                >
                  <p className="text-gray-900 font-semibold text-base sm:text-xl italic">{review.question}</p>

                  <div className="mt-6 space-y-6">
                    {review.answers.map((user, idx) => (
                      <div
                        key={idx}
                        className="flex items-center bg-gray-100 p-3 sm:p-4 rounded-lg shadow-md hover:shadow-lg transition"
                      >
                        {/* Circular Profile Image */}
                        <div className="w-10 h-10 p-1 sm:w-14 sm:h-14 rounded-full border-2 border-indigo-500 bg-white overflow-hidden flex-shrink-0">
                          <img
                            src={user.image}
                            alt={user.name}
                            className="w-full h-full  object-cover rounded-full"
                          />
                        </div>

                        {/* Name and Answer */}
                        <div className="ml-4 text-left">
                          <p className="text-gray-900 font-medium text-sm sm:text-base">{user.name}</p>
                          <p className="text-gray-600 text-xs sm:text-sm italic">"{user.answer}"</p>
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
