"use client"
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
// import { useSearchParams } from "next/navigation";
import { SquareDashedMousePointer } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import io from 'socket.io-client';
import SimplePeer from 'simple-peer';
import { useRef } from 'react';
import LoadingOverlay from '@/Components/LoadingOverlay';


let socket;

export default function Chat() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const doctorIdf = searchParams.get('doctorId');

    const { data: session, status } = useSession()

    // const searchParams = useSearchParams();
    const [doctorId, setDoctorId] = useState(null);

    useEffect(() => {
        // if (userId) {
          console.log("Updated patientId from query:", userId);
          setDoctorId(doctorIdf);
        // }
      }, [doctorIdf]);
    // useEffect(() => {
    //     const id = new URLSearchParams(window.location.search).get("doctorId");
    //     if (id) setDoctorId(id);
    // }, []);
    // const userId = "67c04abd7270925f79ef38a1"; // Replace with actual user ID from session or auth
    const [userId, setuserId] = useState("")

    const roomId = doctorId && userId ? [doctorId, userId].sort().join('-') : null;
    const [doctors, setDoctors] = useState([]);
    const [messages, setMessages] = useState([]);
    const [messageInput, setMessageInput] = useState('');
    const [selectedDoctor, setSelectedDoctor] = useState(null);
    const [socketReady, setSocketReady] = useState(false);
    const [authorized, setAuthorized] = useState(false);
    const [iscalling, setiscalling] = useState(false)
    const [isMuted, setIsMuted] = useState(false);
    const [isVideoOff, setIsVideoOff] = useState(false);
    const [pendingFile, setPendingFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [hasReviewed, setHasReviewed] = useState(false)
    const [consultationEnded, setconsultationEnded] = useState(false)
    const [showReviewModal, setShowReviewModal] = useState(false)
    const [reviewPrompted, setReviewPrompted] = useState(false);
    const [callingEnded, setcallingEnded] = useState(true)


    const localVideoRef = useRef();
    const remoteVideoRef = useRef();
    const peerRef = useRef();
    const streamRef = useRef(null);
    const bottomRef = useRef(null);

    const [treatment, setTreatment] = useState("");
    const [rating, setRating] = useState(0);
    const [recommended, setRecommended] = useState(null);
    const [tags, setTags] = useState([]);
    const [reviewText, setReviewText] = useState("");


    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (status === "loading") return; // wait till session loads

        if (!session) {
            router.push("/login"); // redirect if no session
        } else {
            setIsLoading(false); // session available, allow access
        }
    }, [session, status]);




    const handleReviewSubmit = async () => {
        if (!treatment.trim() || rating === 0 || recommended === null || tags.length === 0) {
            alert("Please fill all required fields except comment.");
            return;
        }

        const reviewData = {
            userId,
            doctorId,
            title: treatment,
            rating,
            recommended,
            tags,
            comment: reviewText.trim(), // optional
            date: new Date().toISOString(),
        };

        try {
            await fetch("/api/reviews/add", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(reviewData),
            });

            setShowReviewModal(false);
            console.log("Review submitted successfully!");
        } catch (error) {
            alert("Something went wrong. Please try again.");
            console.error("Review error:", error);
        }
    };


    // const checkReviewStatus = async () => {
    //     if (!selectedDoctor || !Array.isArray(selectedDoctor.reviews)) return;

    //     const reviewed = selectedDoctor.reviews.some(
    //         (review) => review.userId === userId
    //     );

    //     setHasReviewed(reviewed);

    //     if (consultationEnded && !reviewed && !reviewPrompted) {
    //         setShowReviewModal(true);
    //         setReviewPrompted(true); // Prevent it from showing again
    //     }
    // };


    // useEffect(() => {
    //     if (doctorId && userId && selectedDoctor) {
    //         checkReviewStatus();
    //     }
    // }, [doctorId, userId, selectedDoctor]);




    // useEffect(() => {
    //     const checkReviewStatus = async () => {
    //         //   const doctor = await fetchDoctorById(doctorId);
    //         if (selectedDoctor) {
    //             console.log(selectedDoctor)
    //             const reviewed = selectedDoctor?.reviews.some(
    //                 (review) => review.userId === userId
    //             );
    //             console.log(userId)
    //             console.log(reviewed)
    //             setHasReviewed(reviewed);

    //             if (consultationEnded && !reviewed && !reviewPrompted) {
    //                 setShowReviewModal(true);
    //                 setReviewPrompted(true); // Prevent it from showing again
    //             }

    //         }
    //     };
    //     if (doctorId && userId) {
    //         checkReviewStatus();
    //     }

    // }, [doctorId, userId, selectedDoctor]);


    const startPeer = (initiator) => {
        navigator.mediaDevices.getUserMedia({ video: true, audio: true })
            .then(stream => {
                streamRef.current = stream;
                localVideoRef.current.srcObject = stream;

                const peer = new SimplePeer({
                    initiator,
                    trickle: false,
                    stream
                });

                console.log("startpeer ho rha hai patient side")
                peer.on("signal", data => {
                    // console.log("webrtc signal emit ho rha hai patient side ka to server ja rha hai")
                    socket.emit("webrtc-signal", { signal: data, roomId: roomId });
                });

                peer.on("stream", remoteStream => {
                    remoteVideoRef.current.srcObject = remoteStream;
                });

                peer.on('error', err => {
                    console.error('Peer error:', err);
                });

                peerRef.current = peer;
            })
            .catch(err => console.error("getUserMedia error:", err));
    };


    const toggleMute = () => {
        const stream = localVideoRef.current?.srcObject;
        if (stream) {
            const audioTracks = stream.getAudioTracks();
            audioTracks.forEach(track => (track.enabled = !track.enabled));
            setIsMuted(prev => !prev);
        }
    };

    const toggleVideo = () => {
        const stream = localVideoRef.current?.srcObject;
        if (stream) {
            const videoTracks = stream.getVideoTracks();
            videoTracks.forEach(track => (track.enabled = !track.enabled));
            setIsVideoOff(prev => !prev);
        }
    };

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'auto' });
    }, [messages]);



    useEffect(() => {
        const checkAccess = async () => {
            if (!session?.user?.id || !doctorId) return;

            const res = await fetch(`/api/consultation/check-access`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    userId: session.user.id,
                    doctorId,
                }),
            });

            if (res.ok) {
                setAuthorized(true);
            } else {
                alert("Access denied! Please complete payment first.");
                router.push("/doctors");
            }
        };

        checkAccess();
    }, [session, doctorId]);

    useEffect(() => {
        if (status === "authenticated") {
            console.log("Session:", session.user.id);
            setuserId(session.user.id)
        } else if (status === "unauthenticated") {
            console.log("User is not logged in");
        }
    }, [session, status]);


    useEffect(() => {
        const fetchDoctors = async () => {
            const res = await fetch("/api/user/doctors", {
                method: "GET",
                credentials: "include",
            });
            const data = await res.json();
            setDoctors(data);
            if (!doctorId && data.length > 0) {
                // If no doctor is selected yet, set the first one
                router.push(`/chat?doctorId=${data[0]._id}`);
            }
        };
        if (session?.user?.id) fetchDoctors();
    }, [session?.user?.id]);


    useEffect(() => {
        if (doctorId && doctors.length > 0) {
            const found = doctors.find(doc => doc._id === doctorId);
            console.log(found)
            setSelectedDoctor(found);
        }
    }, [doctorId, doctors]);

    useEffect(() => {
        if (!selectedDoctor || !userId) return;

        console.log(selectedDoctor)
        console.log(selectedDoctor.reviews)
        const reviewed = Array.isArray(selectedDoctor.reviews)
            ? selectedDoctor.reviews.some((review) => review.userId === userId)
            : false;

        setHasReviewed(reviewed);

        console.log(reviewed)
        if (consultationEnded && !reviewed && !reviewPrompted) {
            setShowReviewModal(true);
            setReviewPrompted(true);
        }
    }, [selectedDoctor, userId, consultationEnded, reviewPrompted]);

    const handleDoctorClick = (docId) => {

        router.push(`/chat?doctorId=${docId}`);
    };





    useEffect(() => {
        if (!doctorId || !userId) return;

        const roomId = [doctorId, userId].sort().join('-');

        const fetchMessages = async () => {
            try {
                const res = await fetch(`/api/messages?roomId=${roomId}`);
                const data = await res.json();
                console.log(data)
                setMessages(data); // Load existing messages
            } catch (error) {
                console.error("Failed to fetch messages:", error);
            }
        };

        fetchMessages();

        socket = io({
            path: "/api/socket",
        });

        socket.on("connect", () => {
            console.log("Connected to socket:", socket.id);
            socket.emit("joinRoom", roomId);
            setSocketReady(true); // ✅ Now safe to send messages
        });

        socket.on("receiveMessage", (message) => {
            console.log("ye kese chl sakta hai")
            setMessages((prev) => [...prev, message]);
        });

        socket.on("video-call-request", ({ from, to, roomId }) => {
            console.log("request aa gyi")
            setMessages(prev => [...prev, {
                type: 'callRequest',
                mediaType: "call/png",
                from,
                roomId
            }]);
        });
        // let alreadySignaled = false;

        socket.on("webrtc-signal", ({ signal }) => {
            const type = signal.type;
            console.log("Received signal:", type);
            console.log("Current signalingState:", peerRef.current?._pc?.signalingState);

            try {
                if (peerRef.current) {
                    const peer = peerRef.current;

                    if (
                        type === 'offer' &&
                        peer._pc.signalingState === 'stable'
                    ) {
                        peer.signal(signal);
                    } else if (
                        type === 'answer' &&
                        peer._pc.signalingState === 'have-local-offer'
                    ) {
                        peer.signal(signal);
                    }
                }
            } catch (err) {
                console.error("Peer error:", err);
            }
        });



        return () => {
            socket.disconnect();
        };
    }, [roomId]);

    const sendMessage = () => {
        if (!messageInput.trim() || !socketReady || !doctorId || !userId) {
            console.warn("Socket not initialized yet!");
            return;
        }
        const roomId = [doctorId, userId].sort().join('-');
        const message = {
            senderId: userId,
            receiverId: doctorId,
            text: messageInput,
            roomId,
        };

        socket.emit("sendMessage", message);
        // setMessages((prevMessages) => [...prevMessages, message]);
        setMessageInput("");
    };

    useEffect(() => {
        if (!messages) return;

        const lastPrescriptionMsg = [...messages]
            .reverse()
            .find((msg) => {
                if (msg?.mediaType) {
                    msg.mediaType.includes("prescription") && msg.senderId === doctorId
                }
            });

        if (!lastPrescriptionMsg) return;

        const sentTime = new Date(lastPrescriptionMsg.timestamp);
        const now = new Date();

        const diffInMs = now - sentTime;

        console.log(diffInMs)
        if (diffInMs >= 60000) {
            // Already sent more than 1 minute ago
            setconsultationEnded(true);
        } else {
            // Wait for remaining time
            const remaining = 60000 - diffInMs;
            const timeoutId = setTimeout(() => {
                setconsultationEnded(true);
            }, remaining);

            return () => clearTimeout(timeoutId); // Clean up if component unmounts
        }
    }, [messages, doctorId]);



    const endCall = () => {
        // 1. Destroy Peer Connection
        setcallingEnded(false)
        if (peerRef.current) {
            try {
                peerRef.current.destroy();
            } catch (err) {
                console.warn("Peer destroy error", err);
            }
            peerRef.current = null;
        }

        // 2. Stop all media tracks from local video stream
        const localStream = localVideoRef.current?.srcObject;
        if (localStream) {
            localStream.getTracks().forEach((track) => {
                console.log("Stopping track:", track.kind);
                track.stop();
            });
        }

        // 3. Clear the video element's source to release the stream
        if (localVideoRef.current) {
            localVideoRef.current.srcObject = null;
            localVideoRef.current.removeAttribute("src");
            localVideoRef.current.load();
        }
        if (remoteVideoRef.current) {
            remoteVideoRef.current.srcObject = null;
            remoteVideoRef.current.removeAttribute("src");
            remoteVideoRef.current.load();
        }

        // 4. Extra: kill any leftover global streams
        if (streamRef.current) {
            streamRef.current.getTracks().forEach((track) => {
                track.stop();
            });
            streamRef.current = null;
        }

        // 5. Reset calling state
        setiscalling(false);
        // setCallAccepted(false);
    };


    const handlePendingFile = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        console.log(file)
        setPendingFile(file);
        setPreviewUrl(URL.createObjectURL(file));
    };


    const uploadAndSendFile = async () => {
        if (!pendingFile) return;

        const formData = new FormData();
        formData.append("file", pendingFile);
        formData.append("upload_preset", "anandamchat"); // for Cloudinary

        const res = await fetch("https://api.cloudinary.com/v1_1/degtuxmkp/auto/upload", {
            method: "POST",
            body: formData,
        });

        const data = await res.json();
        const mediaUrl = data.secure_url;

        console.log(pendingFile.type)
        console.log(selectedDoctor._id)
        // Emit message through socket
        socket.emit("sendMessage", {
            text: "",
            media: mediaUrl,
            mediaType: pendingFile.type,
            senderId: userId,
            receiverId: selectedDoctor._id,
            roomId: roomId,
            timestamp: new Date().toISOString(),
        });

        // Clear pending preview
        setPendingFile(null);
        setPreviewUrl(null);
    };



    if (!authorized) return <p>Checking access...</p>;
    return (
        <>
            {isLoading && <LoadingOverlay />}
            <div className="flex h-screen bg-gray-100 text-gray-800 relative overflow-hidden px-1 sm:px-2 md:px-4  lg:px-32 pt-24 lg:pt-28 pb-5 lg:pb-9">
                {/* Sidebar */}
                <div className="fixed   lg:static ztop-6 left-0- z-40 bg-white w-64 lg:w-72 rounded-lg  overflow-y-auto border-r shadow-xl transform transition-transform duration-300 -translate-x-full lg:translate-x-0">
                    <div className="p-4 bg-blue-600 text-white font-bold text-center rounded-t-lg">
                        Start a new consultation
                    </div>
                    {doctors.map(doc => (
                        <div
                            key={doc._id}
                            onClick={() => handleDoctorClick(doc._id)}
                            className={`flex items-center gap-3 p-4 border-b cursor-pointer hover:bg-blue-50 transition-all duration-200 ${selectedDoctor?._id === doc._id ? 'bg-blue-100' : ''
                                }`}
                        >
                            <img src={doc.photo} alt="doctor" className="w-10 h-10 rounded-full object-cover shadow" />
                            <div>
                                <p className="font-semibold text-sm">{doc.username}</p>
                                {/* <p className="text-xs text-gray-500">{doc.lastMsg}</p> */}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Chat area */}
                <div className="flex-1 flex flex-col bg-white rounded-lg shadow-sm ml-0 sm:ml-3 overflow-hidden">
                    {/* Chat header */}
                    <div className="flex items-center justify-between px-6 py-4 border-b relative">
                        <div className="flex items-center gap-3">
                            <img src={selectedDoctor?.photo} alt="doctor" className="w-10 h-10 rounded-full" />
                            <div>
                                <h2 className="font-semibold">{selectedDoctor?.username}</h2>
                                <p className="text-xs text-gray-500">{selectedDoctor?.messagesLeft} msgs left</p>
                            </div>
                        </div>
                        {/* <input
                        type="file"
                        accept="image/*,.pdf"
                        onChange={handlePendingFile}
                        className="hidden"
                        id="fileInput"
                    />
                    <label htmlFor="fileInput" className="cursor-pointer bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded text-sm">
                        📎
                    </label> */}

                    </div>

                    {/* Chat messages */}
                    <div className="flex-1 overflow-y-auto p-6 space-y-4">
                        {pendingFile && (
                            <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50 p-4">
                                <div className="bg-white p-6 rounded-xl shadow-2xl flex flex-col items-center gap-4 max-w-md w-full">
                                    {pendingFile.type.startsWith("image") ? (
                                        <img src={previewUrl} alt="preview" className="max-h-80 rounded-md" />
                                    ) : (
                                        <p className="text-blue-600 underline text-center break-words">📄 {pendingFile.name}</p>
                                    )}

                                    <div className="flex gap-3">
                                        <button
                                            onClick={uploadAndSendFile}
                                            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md"
                                        >
                                            Send File
                                        </button>
                                        <button
                                            onClick={() => {
                                                setPendingFile(null);
                                                setPreviewUrl(null);
                                            }}
                                            className="bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded-md"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                        {iscalling && (
                            <div className="fixed inset-0 bg-black bg-opacity-70 backdrop-blur-sm flex justify-center items-center z-50 p-4">
                                <div className="relative w-full max-w-4xl h-[80vh] bg-gradient-to-br from-gray-800 via-gray-900 to-black rounded-xl shadow-2xl overflow-hidden flex flex-col">
                                    <div className="flex flex-col h-full">
                                        {/* 👇 Responsive layout: vertical on small, horizontal on sm and up */}
                                        <div className="flex flex-col sm:flex-row gap-4 p-4 h-[calc(100%-80px)]">
                                            <video
                                                ref={localVideoRef}
                                                autoPlay
                                                muted
                                                playsInline
                                                className="w-full sm:w-1/2 h-1/2 sm:h-full rounded-lg border border-white object-cover shadow-md"
                                            />
                                            <video
                                                ref={remoteVideoRef}
                                                autoPlay
                                                playsInline
                                                className="w-full sm:w-1/2 h-1/2 sm:h-full rounded-lg border border-white object-cover shadow-md"
                                            />
                                        </div>

                                        <div className="flex justify-center items-center gap-6 py-3 bg-black bg-opacity-40">
                                            {/* Mute/Unmute */}
                                            <button
                                                onClick={toggleMute}
                                                className="relative bg-gray-700 hover:bg-gray-600 text-white rounded-full p-3 w-12 h-12 shadow-md flex items-center justify-center"
                                            >
                                                <img
                                                    src="/mute-icon.png"
                                                    alt="Mute"
                                                    className={`absolute transition-all duration-300 ${isMuted ? 'opacity-100 scale-[0.60]' : 'opacity-0 scale-0'}`}
                                                />
                                                <img
                                                    src="/unmute-icon.png"
                                                    alt="Unmute"
                                                    className={`absolute transition-all duration-300 ${!isMuted ? 'opacity-100 scale-[0.60]' : 'opacity-0 scale-0'}`}
                                                />
                                            </button>

                                            {/* Video On/Off */}
                                            <button
                                                onClick={toggleVideo}
                                                className="relative bg-gray-700 hover:bg-gray-600 text-white rounded-full p-3 w-12 h-12 shadow-md flex items-center justify-center"
                                            >
                                                <img
                                                    src="/videooff-icon.png"
                                                    alt="Video Off"
                                                    className={`absolute transition-all duration-300 ${isVideoOff ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}`}
                                                />
                                                <img
                                                    src="/videoon-icon.png"
                                                    alt="Video On"
                                                    className={`absolute transition-all duration-300 ${!isVideoOff ? 'opacity-100 scale-[0.60]' : 'opacity-0 scale-0'}`}
                                                />
                                            </button>

                                            {/* End Call */}
                                            <button
                                                onClick={endCall}
                                                className="bg-red-600 hover:bg-red-700 rotate-[137deg] transition-transform duration-300 hover:scale-110 shadow-xl rounded-full w-16 h-16 flex items-center justify-center"
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="w-6 h-6"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                    strokeWidth={2}
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        d="M21 15.46l-5.27-.61a1 1 0 00-.9.55l-1.38 2.77a16.08 16.08 0 01-7.72-7.72l2.77-1.38a1 1 0 00.55-.9L8.54 3H3.05A1 1 0 002 4.05C2.5 11.49 9.51 18.5 17 19a1 1 0 001.05-.95v-5.49z"
                                                    />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            // <div className="fixed inset-0 bg-black bg-opacity-70 backdrop-blur-sm flex justify-center items-center z-50 p-4">
                            //     <div className="relative w-full max-w-4xl h-[80vh] bg-gradient-to-br from-gray-800 via-gray-900 to-black rounded-xl shadow-2xl overflow-hidden flex flex-col">


                            //         <div className="flex flex-col h-full">
                            //             <div className="flex flex-col sm:flex-row gap-4 p-4 h-[calc(100%-80px)]">
                            //                 <video ref={localVideoRef} autoPlay muted playsInline className="w-1/2 rounded-lg border border-white object-cover shadow-md" />
                            //                 <video ref={remoteVideoRef} autoPlay playsInline className="w-1/2 rounded-lg border border-white object-cover shadow-md" />
                            //             </div>
                            //             <div className="flex justify-center items-center gap-6 py-3 bg-black bg-opacity-40">
                            //                 <button onClick={toggleMute} className="relative bg-gray-700 hover:bg-gray-600 text-white rounded-full p-3 w-12 h-12 shadow-md flex items-center justify-center">
                            //                     <img src="/mute-icon.png" alt="Mute" className={`absolute transition-all duration-300 ${isMuted ? 'opacity-100 scale-[0.60]' : 'opacity-0 scale-0'}`} />
                            //                     <img src="/unmute-icon.png" alt="Unmute" className={`absolute transition-all duration-300 ${!isMuted ? 'opacity-100 scale-[0.60]' : 'opacity-0 scale-0'}`} />
                            //                 </button>
                            //                 <button onClick={toggleVideo} className="relative bg-gray-700 hover:bg-gray-600 text-white rounded-full p-3 w-12 h-12 shadow-md flex items-center justify-center">
                            //                     <img src="/videooff-icon.png" alt="Video Off" className={`absolute transition-all duration-300 ${isVideoOff ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}`} />
                            //                     <img src="/videoon-icon.png" alt="Video On" className={`absolute transition-all duration-300 ${!isVideoOff ? 'opacity-100 scale-[0.60]' : 'opacity-0 scale-0'}`} />
                            //                 </button>
                            //                 <button onClick={endCall} className="bg-red-600 hover:bg-red-700 rotate-[137deg] transition-transform duration-300 hover:scale-110 shadow-xl rounded-full w-16 h-16 flex items-center justify-center">
                            //                     <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            //                         <path strokeLinecap="round" strokeLinejoin="round" d="M21 15.46l-5.27-.61a1 1 0 00-.9.55l-1.38 2.77a16.08 16.08 0 01-7.72-7.72l2.77-1.38a1 1 0 00.55-.9L8.54 3H3.05A1 1 0 002 4.05C2.5 11.49 9.51 18.5 17 19a1 1 0 001.05-.95v-5.49z" />
                            //                     </svg>
                            //                 </button>
                            //             </div>
                            //         </div>

                            //     </div>
                            // </div>
                        )}
                        {imagePreview && (
                            <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
                                <img src={imagePreview} alt="Preview" className="max-w-[90%] max-h-[90%] rounded-lg shadow-lg" />
                                <button
                                    onClick={() => setImagePreview(null)}
                                    className="absolute top-5 right-5 text-white text-3xl font-bold hover:text-red-400"
                                >
                                    &times;
                                </button>
                            </div>
                        )}
                        {showReviewModal && (
                            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                                <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md space-y-4">
                                    <h3 className="text-lg font-semibold">How was your consultation with  {selectedDoctor?.username}?</h3>

                                    {/* Treatment */}
                                    <input
                                        type="text"
                                        placeholder="What was the treatment for?"
                                        value={treatment}
                                        onChange={(e) => setTreatment(e.target.value)}
                                        className="w-full border p-2 rounded"
                                    />

                                    {/* Rating with text */}
                                    <div>
                                        <label className="block font-medium mb-1">Rate your experience:</label>
                                        <div className="flex gap-1 items-center">
                                            {[1, 2, 3, 4, 5].map((star) => (
                                                <button
                                                    key={star}
                                                    onClick={() => setRating(star)}
                                                    className={`text-2xl ${star <= rating ? "text-yellow-400" : "text-gray-300"}`}
                                                >
                                                    ★
                                                </button>
                                            ))}
                                            <span className="ml-2 text-sm text-gray-600">
                                                {["Poor", "Fair", "Good", "Very Good", "Excellent"][rating - 1] || ""}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Recommendation */}
                                    <div className="flex items-center gap-4">
                                        <label className="font-medium">Would you recommend?</label>
                                        <label className="flex items-center gap-1">
                                            <input type="radio" value={true} checked={recommended === true} onChange={() => setRecommended(true)} />
                                            Yes
                                        </label>
                                        <label className="flex items-center gap-1">
                                            <input type="radio" value={false} checked={recommended === false} onChange={() => setRecommended(false)} />
                                            No
                                        </label>
                                    </div>

                                    {/* Tags */}
                                    <div>
                                        <label className="block font-medium mb-1">What stood out for you?</label>
                                        <div className="flex flex-wrap gap-2">
                                            {["Doctor Friendliness", "Treatment Satisfaction", "Value for Money", "Explanation Clarity", "Wait Time"].map(
                                                (tag) => (
                                                    <label key={tag} className="flex items-center gap-1">
                                                        <input
                                                            type="checkbox"
                                                            checked={tags.includes(tag)}
                                                            onChange={() => {
                                                                setTags((prev) =>
                                                                    prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
                                                                );
                                                            }}
                                                        />
                                                        <span className="text-sm">{tag}</span>
                                                    </label>
                                                )
                                            )}
                                        </div>
                                    </div>

                                    {/* Comment */}
                                    <textarea
                                        placeholder="Share your experience"
                                        value={reviewText}
                                        onChange={(e) => setReviewText(e.target.value)}
                                        className="w-full p-2 border rounded"
                                    />

                                    {/* Buttons */}
                                    <div className="flex justify-end gap-3 pt-2">
                                        <button
                                            onClick={handleReviewSubmit}
                                            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                                        >
                                            Submit Review
                                        </button>
                                        <button
                                            onClick={() => setShowReviewModal(false)}
                                            className="text-gray-600 border border-gray-400 px-4 py-2 rounded hover:bg-gray-100"
                                        >
                                            Later
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}


                        {messages.map((msg, idx) => {
                            // if(msg.text === ""){
                            //     console.log("media hai yrr ")
                            // }
                            if (msg.type === "callRequest") {
                                return (
                                    <div key={idx} className="text-center">
                                        {callingEnded ?
                                            <div className="bg-yellow-100 p-3 rounded-md inline-block text-sm">
                                                Incoming Video Call...
                                                <button
                                                    className="ml-4 bg-green-500 text-white px-3 py-1 rounded"
                                                    onClick={() => {
                                                        setiscalling(true)
                                                        socket.emit("callAccepted", { to: msg.from, roomId: msg.roomId });
                                                        startPeer(false); // Start peer connection as non-initiator
                                                    }}
                                                >
                                                    Pickup
                                                </button>
                                            </div>
                                            :
                                            <div className="bg-red-500 p-2 rounded-md inline-block text-sm">
                                                Call ended
                                                {/* <button
                                            className="ml-4 bg-green-500 text-white px-3 py-1 rounded"
                                            onClick={() => {
                                                setiscalling(true)
                                                socket.emit("callAccepted", { to: msg.from, roomId: msg.roomId });
                                                startPeer(false); // Start peer connection as non-initiator
                                            }}
                                        >
                                            Pickup
                                        </button> */}
                                            </div>}
                                    </div>
                                )
                            }
                            return <div
                                key={idx}
                                className={`flex transition-all duration-300 ease-in-out ${msg.senderId === userId ? 'justify-end' : 'justify-start'
                                    }`}
                            >
                                <div
                                    className={`
                  px-3 py-2 rounded-md 
                  max-w-[80%] sm:max-w-[75%] md:max-w-[65%] lg:max-w-[60%] 
                  text-sm sm:text-sm md:text-base 
                  transform transition-all duration-300
                  ${msg.senderId === userId
                                            ? 'bg-green-500 text-white animate-slide-in-right'
                                            : 'bg-gray-200 text-black animate-slide-in-left'}
                `}
                                >
                                    {/* {msg.media && (<div> sahi mai kya </div> )} */}
                                    {msg.media ? (
                                        msg.mediaType.includes("image") ? (
                                            <img src={msg.media} alt="sent media" className="w-40 h-40 object-cover rounded-lg cursor-pointer hover:scale-105 transition-transform duration-300"
                                                onClick={() => setImagePreview(msg.media)} />
                                        ) : (
                                            <a href={msg.media} target="_blank" rel="noopener noreferrer" className="text-blue-700 underline">
                                                📄 View PDF
                                            </a>
                                        )
                                    ) : (
                                        msg.text
                                    )}
                                </div>
                            </div>

                        })}
                        <div ref={bottomRef} />
                    </div>

                    {/* Message input */}
                    <div className="p-1 sm:p-4 border-t bg-gray-50 flex items-center gap-1 sm:gap-2">
                        <input
                            value={messageInput}
                            onChange={e => setMessageInput(e.target.value)}
                            onKeyDown={e => e.key === 'Enter' && sendMessage()}
                            placeholder="Type your message..."
                            className="flex-1 border rounded-md px-2 sm:px-4 py-2 text-sm focus:outline-none"
                        />
                        <input
                            type="file"
                            accept="image/*,.pdf"
                            onChange={handlePendingFile}
                            className="hidden"
                            id="fileInput"
                        />
                        <label htmlFor="fileInput" className="cursor-pointer w-12 bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded text-sm">
                            <img src="/link.png" alt="" />
                        </label>
                        <button onClick={sendMessage} className="bg-blue-300 w-12 text-white px-4 py-2 rounded-md text-sm">
                            <img src="/send-message.png" alt="" />
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
