"use client";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { FaClipboardList, FaFlask, FaPills, FaUserMd, FaNewspaper, FaComment, FaWallet } from "react-icons/fa";
import { useEffect, useState } from "react";

const Sidebar = () => {
    const pathname = usePathname();
    const router = useRouter()
    const [isLoading, setisLoading] = useState(false)
    const { data: session, status } = useSession()
    // useEffect(() => {
    //   if(!session){
    //     router.push("login")
    //   }

    // }, [])

    useEffect(() => {
        if (status === "loading") {
            setisLoading(true);
            return; // Stop execution until session is loaded
        }

        if (!session) {
            if (status === "unauthenticated") {
                router.push("/login");
            }
        }
        else {
            // Only push to login if session is explicitly null/undefined
            console.log(session)
            console.log(session.user.name)
            console.log(session.user.email)
            setisLoading(false)
        }
    }, [status, session]);

    const menuItems = [
        { name: "Medical Records", slug: "medical-records", icon: <FaClipboardList /> },
        { name: "Appointments", slug: "appointments", icon: <FaUserMd /> },
        { name: "Lab Tests", slug: "tests", icon: <FaFlask /> },
        { name: "Medicine Orders", slug: "medicine-orders", icon: <FaPills /> },
        { name: "Online Consultations", slug: "online-consultations", icon: <FaUserMd /> },
        { name: "Articles", slug: "articles", icon: <FaNewspaper /> },
        { name: "Feedback", slug: "feedback", icon: <FaComment /> },
        { name: "Payments", slug: "payments", icon: <FaWallet /> },
    ];

    return (
        <>
            
                <div className="w-64 bg-white shadow-lg rounded-md h-[85vh] p-4 border-r mt-6 ml-10">
                    {/* Profile Section */}
                    <div className="flex items-center mb-4 space-x-3 border-b pb-4">
                        <div className="w-12 h-8 bg-gray-300 rounded-full"></div>
                        <div>
                            {session?.user ? ( // ✅ Safe check before accessing session.user
                                <>
                                    <h2 className="text-base font-semibold text-gray-800">
                                        {session.user.name}
                                    </h2>
                                    <p className="text-xs text-gray-500">{session.user.email}</p>
                                </>
                            ) : (
                                <p className="text-xs text-gray-500">Loading...</p> // Shows a placeholder while loading
                            )}
                        </div>
                        {/* <div>
          <h2 className="text-base font-semibold text-gray-800">{session.user.name}</h2>
          <p className="text-xs text-gray-500">{session.user.email}</p>
        </div> */}
                    </div>

                    {/* Menu */}
                    <ul className="space-y-1">
                        {menuItems.map((item) => {
                            const isActive = pathname === `/${item.slug}`;
                            return (
                                <li key={item.slug}>
                                    <Link href={`/${item.slug}`}>
                                        <div
                                            className={`flex items-center space-x-3 text-sm px-4 py-3 rounded-md cursor-pointer transition-all relative ${isActive
                                                    ? "bg-gray-200 text-gray-900 font-medium"
                                                    : "text-gray-700 hover:bg-gray-100"
                                                }`}
                                        >
                                            {isActive && <div className="absolute left-0 h-full w-1 bg-blue-500 rounded"></div>}
                                            <span className="text-lg">{item.icon}</span>
                                            <span>{item.name}</span>
                                        </div>
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </div>
        </>
    );
};

export default Sidebar;
