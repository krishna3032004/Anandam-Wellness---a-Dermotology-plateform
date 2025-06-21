"use client";
import { useState, Fragment, useEffect } from "react";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { FaSearch } from "react-icons/fa";
import { useRouter } from "next/navigation";
import SidebarItem from "./SidebarItem";
import { UserIcon } from "@heroicons/react/24/solid";
import LoadingOverlay from "./LoadingOverlay";



export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { data: session, status } = useSession()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const router = useRouter()
  
  const [isLoading, setIsLoading] = useState(false);
  // useEffect(() => {
  //   console.log(session.user)


  // }, [])



  return (
    <>
          {isLoading && <LoadingOverlay />}

    <nav className="fixed top-0 left-0 w-full z-50 pl-4 pr-6 py-4 flex items-center justify-between 
  backdrop-blur-md bg-[#222222] text-white shadow-md">


      <div className=" tracking-wide">
        <button
          className="md:hidden text-white mr-2  py-2 rounded-md shadow"
          onClick={() => setIsSidebarOpen(true)}
        >
          ☰
        </button>
        <Link href="/">
          <span className="text-[#f6d365] text-lg sm:text-2xl font-bold font-[Inter] tracking-wide">Anandam</span>
        </Link>
      </div>
      {/* Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-40"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-screen w-72 bg-gradient-to-b from-[#fef9f9] via-[#f1f3f9] to-[#e6ecf0] z-50 transform transition-transform duration-300 shadow-xl ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } overflow-y-auto`}
      >
        {/* Header */}
        <div className="flex items-center gap-3 p-4 border-b">
          <button onClick={() => setIsSidebarOpen(false)} className="text-2xl text-gray-500">×</button>
          <span className="text-xl font-bold font-[Inter] tracking-wide text-[#f6d365]">Anandam</span>
        </div>

        {/* Menu Items */}
        <div className="p-4 space-y-3 text-gray-800">
          <Link href={"/search"} onClick={() => setIsSidebarOpen(false)}><SidebarItem icon="🔍" title="Find Doctors" subtitle="Book an appointment" /></Link>
          {/* <SidebarItem icon="🎥" title="Video Consult" subtitle="Consult top doctors" /> */}
          {/* <SidebarItem icon="🏥" title="Surgeries" subtitle="Expert surgical care" /> */}
          <Link href={"/articles"} onClick={() => setIsSidebarOpen(false)}><SidebarItem icon="📄" title="Read health articles" /></Link>

          <Link href={"/articles"} onClick={() => setIsSidebarOpen(false)}><SidebarItem icon="💊" title="Read about medicines" /></Link>
          {/* <SidebarItem icon="👨‍⚕️" title="Anandam for Providers" /> */}
        </div>

        {/* Basic Navigation */}
        <ul className="p-4 mt-6 border-t text-gray-800 flex flex-col space-y-8 font-medium text-base">
          <Link href={"/"} onClick={() => setIsSidebarOpen(false)}><li className="hover:text-indigo-600 cursor-pointer"> Home</li></Link>
          <Link href={"/services"} onClick={() => setIsSidebarOpen(false)}><li className="hover:text-indigo-600 cursor-pointer"> Services</li></Link>
          <Link href={"/contact"} onClick={() => setIsSidebarOpen(false)}><li className="hover:text-indigo-600 cursor-pointer"> Contact Us</li></Link>
        </ul>
      </div>



      {/* Links */}
      <ul className="md:flex hidden space-x-6 items-center text-lg font-medium">
        <Link href={"/"}><li className="hover:text-[#f6d365] transition-all cursor-pointer">Home</li></Link>
        <Link href={"/services"}><li className="hover:text-[#f6d365] transition-all cursor-pointer">Services</li></Link>
        <Link href={"/contact"}><li className="hover:text-[#f6d365] transition-all cursor-pointer">Contact</li></Link>
        {/* <li className="hover:text-[#f6d365] transition-all cursor-pointer">Consultation</li> */}
        <button
          onClick={() => {router.push("/search")
          }}
          className="p-3 bg-[#f6d365] text-gray-900 rounded-full shadow-lg 
                   transition-all hover:scale-110 flex items-center justify-center"
        >
          <FaSearch className="text-xl" />
        </button>
      </ul>
      {/* Search Button */}

      {/* Book Button */}
      {/* <button className="px-5 py-2 bg-[#f6d365] text-gray-900 font-semibold rounded-full shadow-lg 
    transition-all hover:scale-110">
        Book Now
      </button> */}


      <div className="flex">
        {session ? (!session.user.doctor ?
          <Menu as="div" className="relative">
            <Menu.Button className="flex items-center text-sm space-x-2 px-3 sm:px-5 py-1 sm:py-2 bg-[#f6d365] text-gray-900 font-semibold rounded-full shadow-lg 
    transition-all hover:scale-110">

              {/* <span className="block sm:hidden text-gray-900 font-bold">
                {session.user.name.charAt(0)}
              </span> */}
              <UserIcon className="w-5 h-5 text-gray-900 sm:hidden" />
              <span className=" text-gray-900 hidden sm:block">{session.user.name}</span>
              {/* <span className=" text-gray-900">{session.user.name}</span> */}
              <ChevronDownIcon className="w-4 h-4 text-gray-900 hidden sm:block" />
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
              <Menu.Items className="absolute -right-7 h-screen overflow-hidden top-9 sm:right-0 mt-2 w-[102vw] sm:w-60 bg-white border border-gray-200 rounded-none sm:rounded-lg shadow-lg text-gray-900 font-sans">

                <div className="p-7 border-b border-gray-200">
                  <p className="font-semibold text-gray-900">{session.user.name}</p>
                  <p className="text-sm text-gray-500">{session.user.email}</p>
                </div>

                <div className="p-4">
                  {[
                    { label: "My Appointments", href: "/user/appointments" },
                    { label: "My Tests", href: "/user/tests" },
                    { label: "My Medicine Orders", href: "/user/medicine-orders" },
                    { label: "My Medical Records", href: "/user/medical-records" },
                    { label: "My Online Consultations", href: "/user/online-consultations" },
                    { label: "My Feedback", href: "/user/feedback" },
                    { label: "My Articles", href: "/user/articles" },
                    // { label: "My Payments", href: "/user/payments" },
                    { label: "View / Update Profile", href: "/profile" },
                    { label: "Settings", href: "/user/settings" },
                  ].map((item, index) => (
                    <Menu.Item key={index}>
                      {({ active }) => (
                        <Link
                          href={item.href}
                          className={`block px-4 py-3 sm:py-2  text-sm  ${active ? "text-blue-500" : "text-gray-900"
                            } hover:text-blue-500`}
                        >
                          {item.label}
                        </Link>
                      )}
                    </Menu.Item>
                  ))}

                  <Menu.Item>
                    {({ active }) => (
                      <button onClick={() => {
                        signOut()
                        setIsLoading(true)
                      }}
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
          </Menu> :
          <Menu as="div" className="relative">
            <Menu.Button className="flex items-center text-sm space-x-2 px-3 sm:px-5 py-1 sm:py-2 bg-[#f6d365] text-gray-900 font-semibold rounded-full shadow-lg transition-all hover:scale-110">
              <UserIcon className="w-5 h-5 text-gray-900 sm:hidden" />
              <span className=" text-gray-900 hidden sm:block">{session.user.name}</span>
              {/* <span className=" text-gray-900">{session.user.name}</span> */}
              <ChevronDownIcon className="w-4 h-4 text-gray-900 hidden sm:block" />
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
              <Menu.Items className="absolute -right-7 top-9 sm:right-0 mt-2 w-[102vw] sm:w-60 bg-white border border-gray-200 rounded-lg shadow-lg text-gray-900 font-sans max-h-[90vh] overflow-y-auto scrollbar-thin scrollbar-thumb-blue-300s">
                <div className="p-4 border-b border-gray-200">
                  <p className="font-semibold text-gray-900">{session.user.name}</p>
                  <p className="text-sm text-gray-500">{session.user.email}</p>
                </div>

                <div className="mt-3 flex justify-center gap-2">
                  <Link href="/account">
                    <button className="border border-gray-400 text-sm px-3 py-1 rounded-md hover:bg-gray-100 transition">
                      Account
                    </button>
                  </Link>
                  <Link href="/subscriptions">
                    <button className="border border-gray-400 text-sm px-3 py-1 rounded-md hover:bg-gray-100 transition">
                      Subscriptions
                    </button>
                  </Link>
                </div>

                <div className="p-4">
                  {[
                    // { label: "Account", href: "/doctorprofile" },
                    // { label: "Subscriptions", href: "/doctor/subscriptions" },
                    // { label: "Add New Practice", href: "/doctor/add-practice" },
                    // { label: "Account Settings", href: "/doctor/settings" },
                    { label: "My Appointments", href: "/doctor/appointments" },
                    { label: "My Tests", href: "/doctor/tests" },
                    { label: "My Medicine Orders", href: "/doctor/medicine-orders" },
                    { label: "My Medical Records", href: "/doctor/medical-records" },
                    { label: "My Online Consultations", href: "/doctor/online-consultations" },
                    { label: "My Feedback", href: "/doctor/feedback" },
                    { label: "My Articles", href: "/doctor/articles" },
                    { label: "My Payments", href: "/doctor/payments" },
                    { label: "View / Update Profile", href: "/doctorprofile" },
                    { label: "Settings", href: "/doctor/settings" },
                    // {
                    //   label: "Switch to Consumer Products",
                    //   href: "/",
                    //   extra: "Find and book a doctor or lab test, consult with doctors online, store medical records and more",
                    // },
                  ].map((item, index) => (
                    <Menu.Item key={index}>
                      {({ active }) => (
                        <Link
                          href={item.href}
                          className={`block px-4 py-3 sm:py-2 text-sm ${active ? "text-blue-500" : "text-gray-900"
                            } hover:text-blue-500`}
                        >
                          <div>
                            <span>{item.label}</span>
                            {item.extra && (
                              <p className="text-xs text-gray-500">{item.extra}</p>
                            )}
                          </div>
                        </Link>
                      )}
                    </Menu.Item>
                  ))}

                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={() => signOut()}
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

        )
          :
          <Link href="/login">
            <button className="px-5 py-2 text-sm sm:text-base bg-[#f6d365] text-gray-900 font-semibold rounded-full shadow-lg 
    transition-all hover:scale-110">
              Login/Signup
            </button>
          </Link>
        }
      </div>

      {/* <button
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
 */}

    </nav>
    </>




  );
}
