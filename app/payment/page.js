"use client"
import Script from 'next/script';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { fetchDoctorbyid } from '@/actions/useraction';
import { initiatepayment } from '@/actions/useraction';
import LoadingOverlay from '@/Components/LoadingOverlay';
import { stubTrue } from 'lodash';

export default function PaymentPage() {
    const { data: session, status } = useSession()
    const router = useRouter();
    //   const { doctorId } = router.query;
    const [doctor, setDoctor] = useState(null);
    const [doctorId, setdoctorId] = useState(null)
    // const searchParams = useSearchParams();
    // const doctorId = searchParams.get("doctorId");
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const id = new URLSearchParams(window.location.search).get("doctorId");
        if (id) setdoctorId(id);
      }, []);
    // useEffect(() => {
    //     const searchParams = useSearchParams();
    //     const id2 = searchParams.get("doctorId");
    //     setdoctorId(id2)
    //   }, []);

    useEffect(() => {
        if (status === "loading") return; // wait till session loads

        if (!session) {
            router.push("/login"); // redirect if no session
        } else {
            setIsLoading(false); // session available, allow access
        }
    }, [session, status]);



    useEffect(() => {
        const getDoctorDetails = async () => {
            try {
                const data = await fetchDoctorbyid(doctorId);
                setDoctor(data);
            } catch (error) {
                console.error('Error fetching doctor:', error);
            }
        };

        if (doctorId) {
            getDoctorDetails();
        }
    }, [doctorId]);

    const pay = async (amount) => {
        setIsLoading(stubTrue)
        try {
            if (typeof window === "undefined" || typeof window.Razorpay === "undefined") {
                alert("Razorpay SDK not loaded yet. Try again in a second.");
                return;
            }

            let amount2 = Number.parseInt(amount);
            let a = await initiatepayment(amount2, session.user.email);
            // let a = await initiatepayment(amount2, session.user.email, form);
            // setIsLoading(true);
            console.log(a)

            let orderID = a.id;
            var options = {
                "key": process.env.NEXT_PUBLIC_KEY_ID, // Razorpay Key ID
                // "key_id": process.env.NEXT_PUBLIC_KEY_ID, // Razorpay Key ID
                "amount": amount2 * 100, // Convert amount to paisa (INR subunit)
                "currency": "INR",
                "name": "Anandam", // Business name
                "description": "Test Transaction",
                "image": "https://example.com/your_logo",
                "order_id": orderID, // Order ID from backend response
                // "callback_url": `${process.env.NEXT_PUBLIC_URL2}/api/razorpay`,
                "handler": async function (response) {
                    setIsLoading(true)
                    console.log('Payment success:', response);

                    // ✅ Call backend API to update both user and doctor models
                    let a = await fetch("/api/consultation/update-history", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            userId: session.user.id,
                            doctorId,
                        }),
                    });

                    if (a.ok) {
                        router.push(`/chat?doctorId=${doctorId}`);

                    } else {
                        alert("update hi nhi hua")
                    }
                    // ✅ Redirect to chat page
                },
                "prefill": {
                    "name": session.user.name, // Use actual session user name
                    "email": session.user.email,
                    "contact": "9000090000"
                },
                "notes": {
                    "address": "Razorpay Corporate Office"
                },
                "theme": {
                    "color": "#3399cc"
                },
                "modal": {
                    "ondismiss": function () {
                        console.log("Payment cancelled by user!");
                        // alert("Payment was cancelled! Redirecting to homepage...");
                        // toast.warning('Payment was cancelled! Try again', {
                        //   position: "bottom-right",
                        //   autoClose: 3000,
                        //   hideProgressBar: true,
                        //   stacked: false,
                        //   closeOnClick: true,
                        //   pauseOnHover: true,
                        //   draggable: true,
                        //   progress: undefined,
                        //   theme: "colored",
                        //   transition: Bounce,
                        // });
                        // setTimeout(() => {
                        //   window.location.href = `/product/${params.slug1}`; // Redirect user to home page

                        // }, 2000);
                    }
                }
            };

            var rzp1 = new window.Razorpay(options);
            setIsLoading(false)
            rzp1.open();

        } catch (error) {
            console.error("Error in payment:", error);
            alert("Something went wrong with the payment. Please try again.");
        }
    }

    return (
        <>
            {isLoading && <LoadingOverlay />}

            <Script
                src="https://checkout.razorpay.com/v1/checkout.js"
                strategy="afterInteractive" // ✅ Important
                onLoad={() => {
                    console.log("✅ Razorpay script loaded successfully");
                }}
            />
            <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
                {!session?.user?.doctor ?
                    (doctor ? (
                        <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full text-center">
                            <img
                                src={doctor.photo || '/default-doctor.png'}
                                alt="Doctor"
                                className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                            />
                            <h2 className="text-xl sm:text-2xl font-semibold text-gray-800"> {doctor.username}</h2>
                            <p className="text-gray-500 mb-2 text-sm sm:text-base">{doctor.specialty[0] || 'Dermatologist'}</p>
                            <p className="text-md sm:text-lg text-gray-700 mb-4">Consultation Fee: <span className="font-bold text-indigo-600">₹{doctor.onlineFee}</span></p>

                            <button
                                onClick={() => pay(doctor.onlineFee)}
                                className="bg-indigo-600 text-white px-6 py-2 rounded-md text-sm sm:text-base hover:bg-indigo-700 transition duration-300"
                            >
                                Pay & Start Chat
                            </button>
                        </div>
                    ) : (
                        <div className="text-center">
                            <p className="text-gray-600 font-medium text-base sm:text-lg">Loading doctor info...</p>
                        </div>
                    )) :
                    <div className="text-center">
                        <p className="text-gray-600 font-medium text-base sm:text-lg">Sorry , you are a doctor not patient . if you want to consult with other doctor try login as a patient </p>
                    </div>}
            </div>
        </>
    );
}
