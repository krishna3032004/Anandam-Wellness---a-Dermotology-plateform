"use client";
import { useState, Fragment } from "react";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { data: session, status } = useSession()


  return (
    // <nav className="bg-white shadow-lg">
    // <nav className="fixed top-0 left-0 w-full z-50 px-6 py-4 flex items-center justify-between backdrop-blur-md bg-gray-900/70 text-white shadow-md">
    //   <div className="container mx-auto flex justify-between items-center p-4">
    //     <Link href="/" className="text-2xl font-bold text-blue-600">
    //       Sknn
    //     </Link>

    //     <div className="hidden md:flex md:space-x-8">
    //       <Link href="/"><div className="text-gray-700 hover:text-blue-500 transition font-medium">Home</div></Link>
    //       <Link href="/services"><div className="text-gray-700 hover:text-blue-500 transition font-medium">Services</div></Link>
    //       <Link href="/contact"><div className="text-gray-700 hover:text-blue-500 transition font-medium">Contact</div></Link>
    //     </div>

      //   <div className="hidden md:flex">
      //     {session ? 
      //       <Menu as="div" className="relative">
      //         <Menu.Button className="flex items-center space-x-2 px-4 py-2 bg-white rounded-md  hover:bg-gray-100">
      //           <span className=" text-gray-900">{session.user.name}</span>
      //           <ChevronDownIcon className="w-4 h-4 text-gray-900" />
      //         </Menu.Button>

      //         <Transition
      //           as={Fragment}
      //           enter="transition ease-out duration-100"
      //           enterFrom="transform opacity-0 scale-95"
      //           enterTo="transform opacity-100 scale-100"
      //           leave="transition ease-in duration-75"
      //           leaveFrom="transform opacity-100 scale-100"
      //           leaveTo="transform opacity-0 scale-95"
      //         >
      //           <Menu.Items className="absolute right-0 mt-2 w-60 bg-white border border-gray-200 rounded-lg shadow-lg text-gray-900 font-sans">

      //             <div className="p-4 border-b border-gray-200">
      //               <p className="font-semibold text-gray-900">{session.user.name}</p>
      //               <p className="text-sm text-gray-500">{session.user.email}</p>
      //             </div>

      //             <div className="p-2">
      //               {[
      //                 { label: "My Appointments", href: "/appointments" },
      //                 { label: "My Tests", href: "/tests" },
      //                 { label: "My Medicine Orders", href: "/medicine-orders" },
      //                 { label: "My Medical Records", href: "/medical-records" },
      //                 { label: "My Online Consultations", href: "/online-consultations" },
      //                 { label: "My Feedback", href: "/feedback" },
      //                 { label: "My Articles", href: "/articles" },
      //                 { label: "My Payments", href: "/payments" },
      //                 { label: "View / Update Profile", href: "/profile" },
      //                 { label: "Settings", href: "/settings" },
      //               ].map((item, index) => (
      //                 <Menu.Item key={index}>
      //                   {({ active }) => (
      //                     <Link
      //                       href={item.href}
      //                       className={`block px-4 py-2 text-sm  ${active ? "text-blue-500" : "text-gray-900"
      //                         } hover:text-blue-500`}
      //                     >
      //                       {item.label}
      //                     </Link>
      //                   )}
      //                 </Menu.Item>
      //               ))}

      //               <Menu.Item>
      //                 {({ active }) => (
      //                   <button onClick={() => signOut()}
      //                     className={`block w-full text-left px-4 py-2 text-sm font-medium ${active ? "text-blue-500" : "text-gray-900"
      //                       } hover:text-blue-500`}

      //                   >
      //                     Logout
      //                   </button>
      //                 )}
      //               </Menu.Item>
      //             </div>
      //           </Menu.Items>
      //         </Transition>
      //       </Menu>
      //       :
      //       <Link href="/login">
      //         <button className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium transition hover:bg-blue-700 shadow-md">
      //           Login/Signup
      //         </button>
      //       </Link>
      //     }
      //   </div>

      //   <button
      //     className="md:hidden text-3xl text-blue-600"
      //     onClick={() => setIsOpen(!isOpen)}
      //   >
      //     ☰
      //   </button>
      // </div>

      // {isOpen && (
      //   <div className="md:hidden bg-white shadow-md mt-2 flex flex-col space-y-3 text-center p-4">
      //     <Link href="/" className="py-2 text-gray-700 hover:bg-blue-100 rounded-lg transition">Home</Link>
      //     <Link href="/services" className="py-2 text-gray-700 hover:bg-blue-100 rounded-lg transition">Services</Link>
      //     <Link href="/contact" className="py-2 text-gray-700 hover:bg-blue-100 rounded-lg transition">Contact</Link>
      //     <Link href="/login">
      //       <button className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium transition hover:bg-blue-700 w-full shadow-md">
      //         Login
      //       </button>
      //     </Link>
      //   </div>
      //  )}
    // </nav>



    <nav className="fixed top-0 left-0 w-full z-50 px-6 py-4 flex items-center justify-between 
  backdrop-blur-md bg-gray-900/70 text-white shadow-md">

      {/* Logo */}
      <div className="text-2xl font-bold tracking-wide">
      <Link href="/"><span className="text-[#f6d365]">Glow</span>Care</Link>
      </div>

      {/* Links */}
      <ul className="flex space-x-6 text-lg font-medium">
        <Link href={"/"}><li className="hover:text-[#f6d365] transition-all cursor-pointer">Home</li></Link>
        <Link href={"/services"}><li className="hover:text-[#f6d365] transition-all cursor-pointer">Services</li></Link>
        <Link href={"/contact"}><li className="hover:text-[#f6d365] transition-all cursor-pointer">Contact</li></Link>
        {/* <li className="hover:text-[#f6d365] transition-all cursor-pointer">Consultation</li> */}
      </ul>

      {/* Book Button */}
      {/* <button className="px-5 py-2 bg-[#f6d365] text-gray-900 font-semibold rounded-full shadow-lg 
    transition-all hover:scale-110">
        Book Now
      </button> */}


      <div className="hidden md:flex">
          {session ? 
            <Menu as="div" className="relative">
              <Menu.Button className="flex items-center text-sm space-x-2 px-5 py-2 bg-[#f6d365] text-gray-900 font-semibold rounded-full shadow-lg 
    transition-all hover:scale-110">
                <span className=" text-gray-900">{session.user.name}</span>
                {/* <span className=" text-gray-900">{session.user.name}</span> */}
                <ChevronDownIcon className="w-4 h-4 text-gray-900" />
              </Menu.Button>

              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute right-0 mt-2 w-60 bg-white border border-gray-200 rounded-lg shadow-lg text-gray-900 font-sans">

                  <div className="p-4 border-b border-gray-200">
                    <p className="font-semibold text-gray-900">{session.user.name}</p>
                    <p className="text-sm text-gray-500">{session.user.email}</p>
                  </div>

                  <div className="p-2">
                    {[
                      { label: "My Appointments", href: "/appointments" },
                      { label: "My Tests", href: "/tests" },
                      { label: "My Medicine Orders", href: "/medicine-orders" },
                      { label: "My Medical Records", href: "/medical-records" },
                      { label: "My Online Consultations", href: "/online-consultations" },
                      { label: "My Feedback", href: "/feedback" },
                      { label: "My Articles", href: "/articles" },
                      { label: "My Payments", href: "/payments" },
                      { label: "View / Update Profile", href: "/profile" },
                      { label: "Settings", href: "/settings" },
                    ].map((item, index) => (
                      <Menu.Item key={index}>
                        {({ active }) => (
                          <Link
                            href={item.href}
                            className={`block px-4 py-2 text-sm  ${active ? "text-blue-500" : "text-gray-900"
                              } hover:text-blue-500`}
                          >
                            {item.label}
                          </Link>
                        )}
                      </Menu.Item>
                    ))}

                    <Menu.Item>
                      {({ active }) => (
                        <button onClick={() => signOut()}
                          className={`block w-full text-left px-4 py-2 text-sm font-medium ${active ? "text-blue-500" : "text-gray-900"
                            } hover:text-blue-500`}

                        >
                          Logout
                        </button>
                      )}
                    </Menu.Item>
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>
            :
            <Link href="/login">
              <button className="px-5 py-2 bg-[#f6d365] text-gray-900 font-semibold rounded-full shadow-lg 
    transition-all hover:scale-110">
                Login/Signup
              </button>
            </Link>
          }
        </div>

        <button
          className="md:hidden text-3xl text-blue-600"
          onClick={() => setIsOpen(!isOpen)}
        >
          ☰
        </button>

      {isOpen && (
        <div className="md:hidden bg-white shadow-md mt-2 flex flex-col space-y-3 text-center p-4">
          <Link href="/" className="py-2 text-gray-700 hover:bg-blue-100 rounded-lg transition">Home</Link>
          <Link href="/services" className="py-2 text-gray-700 hover:bg-blue-100 rounded-lg transition">Services</Link>
          <Link href="/contact" className="py-2 text-gray-700 hover:bg-blue-100 rounded-lg transition">Contact</Link>
          <Link href="/login">
            <button className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium transition hover:bg-blue-700 w-full shadow-md">
              Login
            </button>
          </Link>
        </div>
       )}


    </nav>



    //  <nav className="fixed top-0 left-0 w-full z-50 px-6 py-4 flex items-center justify-between 
    //   bg-white shadow-lg">

    //   {/* Logo */}
    //   <div className="text-2xl font-bold tracking-wide text-gray-800">
    //     <span className="text-[#f6d365]">Glow</span>Care
    //   </div>

    //   {/* Links */}
    //   <ul className="flex space-x-6 text-lg font-medium text-gray-700">
    //     <li className="hover:text-[#f6d365] transition-all cursor-pointer">Home</li>
    //     <li className="hover:text-[#f6d365] transition-all cursor-pointer">Services</li>
    //     <li className="hover:text-[#f6d365] transition-all cursor-pointer">Consultation</li>
    //     <li className="hover:text-[#f6d365] transition-all cursor-pointer">Contact</li>
    //   </ul>

    //   {/* Book Button */}
    //   <button className="px-5 py-2 bg-[#f6d365] text-gray-900 font-semibold rounded-full shadow-lg 
    //     transition-all hover:scale-110">
    //     Book Now
    //   </button>
    // </nav> 


  );
}
