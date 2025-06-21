"use client"
import { useRouter } from 'next/navigation';
import { useEffect, useState, useRef } from 'react';
import { useSession } from 'next-auth/react';
import { PhoneOff } from 'lucide-react';
import io from 'socket.io-client';
import SimplePeer from 'simple-peer';
import html2canvas from 'html2canvas';
import { fetchDoctorbyid } from '@/actions/useraction';
import LoadingOverlay from '@/Components/LoadingOverlay';
let socket;

export default function chat() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const router = useRouter();
  const [patientId, setPatientId] = useState(null);

  useEffect(() => {
        const id = new URLSearchParams(window.location.search).get("userId");
        if (id) setPatientId(id);
      }, []);

  const { data: session, status } = useSession();
  const [doctorId, setDoctorId] = useState("");
  const [patients, setPatients] = useState([]);
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState('');
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [socketReady, setSocketReady] = useState(false);
  const [iscalling, setiscalling] = useState(false)
  const [callAccepted, setCallAccepted] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [pendingFile, setPendingFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [showPrescriptionForm, setShowPrescriptionForm] = useState(false);
  const [diagnosis, setDiagnosis] = useState("");
  const [medicines, setMedicines] = useState([]);
  const [newMed, setNewMed] = useState({ name: "", instruction: "" });
  const [date, setDate] = useState(() => new Date().toLocaleDateString("en-IN"));
  const [doctorDetails, setDoctorDetails] = useState({});
  const regNo = "MP/23/2241";






  const localVideoRef = useRef();
  const remoteVideoRef = useRef();
  const peerRef = useRef();
  const streamRef = useRef(null);
  const bottomRef = useRef(null);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (status === "loading") {
      console.log("loading")
      setIsLoading(true)
      return;
    }  // wait till session loads

    if (!session) {
      console.log("kyu loggin")
      router.push("/login"); // redirect if no session
    } else {
      setDoctorId(session.user.id);

      setIsLoading(false); // session available, allow access
    }
  }, [session, status]);



  useEffect(() => {
    if (doctorId) {
      getDoctorDetails();
    }
  }, [doctorId]);

  const getDoctorDetails = async () => {
    // const res = await fetch(`/api/doctor/${doctorId}`);
    let doctorData = await fetchDoctorbyid(doctorId)
    // const data = await res.json();
    setDoctorDetails(doctorData);
  };

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


        // peer.on("signal", (data) => {
        //   socket.emit("signal", { from: doctorId, to: patientId, signal: data });
        // });
        console.log("startpeer ho rha hai doctor side ka")
        // let hasSentOffer = false;
        peer.on("signal", data => {
          // if (data.type === "offer" && hasSentOffer) return;
          // if (data.type === "offer") hasSentOffer = true;
          // console.log("webrtc signal emit ho rha hai doctor side ka to server ja rha hai")

          socket.emit("webrtc-signal", { signal: data, roomId: roomId });
        });

        peer.on("stream", remoteStream => {
          // console.log("peer se patient ki video kko remotevideoref mai daal rahe hai")
          remoteVideoRef.current.srcObject = remoteStream;
        });

        peer.on('error', err => {
          console.error('Peer error:', err);
        });

        peerRef.current = peer;
      })
      .catch(err => console.error("getUserMedia error:", err));
  };

  // Toggle audio mute/unmute
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


  // useEffect(() => {
  //   if (session?.user?.id) {
  //     setDoctorId(session.user.id);
  //   } else {
  //     router.push("/login")
  //   }
  // }, [session]);

  const [roomId, setRoomId] = useState(null)
  useEffect(() => {
  if (doctorId && patientId) {
    setRoomId([doctorId, patientId].sort().join('-'));
  }
}, [doctorId, patientId]);
  // const roomId = [doctorId, patientId].sort().join('-');

  useEffect(() => {
    const fetchPatients = async () => {
      const res = await fetch(`/api/doctor/patients`);
      const data = await res.json();
      setPatients(data);
      if (!patientId && data.length > 0) {
        router.push(`/doctor/chat?userId=${data[0]._id}`);
      }
    };
    if (doctorId) fetchPatients();
  }, [doctorId]);

  useEffect(() => {
    if (patientId && patients.length > 0) {
      const found = patients.find(p => p._id === patientId);
      setSelectedPatient(found);
    }
  }, [patientId, patients]);

  useEffect(() => {
    if (!doctorId || !patientId) return;

    const roomId = [doctorId, patientId].sort().join('-');

    const fetchMessages = async () => {
      try {
        const res = await fetch(`/api/messages?roomId=${roomId}`);
        const data = await res.json();
        setMessages(data);
      } catch (err) {
        console.error("Message fetch error:", err);
      }
    };

    fetchMessages();

    socket = io({ path: "/api/socket" });

    socket.on("connect", () => {
      console.log("Connected to socket:", socket.id);
      socket.emit("joinRoom", roomId);
      setSocketReady(true);
    });

    socket.on("receiveMessage", (msg) => {
      setMessages(prev => [...prev, msg]);
    });

    socket.on("callAccepted", () => {
      console.log("Patient accepted the call");
      setCallAccepted(true);
      // Start peer connection as initiator
      startPeer(true);
    });

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

  const requestVideoCall = () => {
    if (!socket || !doctorId || !patientId) return;
    console.log("request bheji ja rhi hai")
    setiscalling(true)
    socket.emit("video-call-request", { from: doctorId, to: patientId, roomId });
  };




  const sendMessage = () => {
    if (!messageInput.trim() || !socketReady || !doctorId || !patientId) return;

    const msg = {
      senderId: doctorId,
      receiverId: patientId,
      text: messageInput,
      roomId,
    };

    socket.emit("sendMessage", msg);
    setMessageInput("");
  };

  const endCall = () => {
    // 1. Destroy Peer Connection
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
    setCallAccepted(false);
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



  const handlePrescriptionSubmit = async () => {
    const node = document.getElementById("prescription-preview");
    node.classList.remove("hidden");

    await new Promise(resolve => setTimeout(resolve, 300)); // let it layout

    const canvas = await html2canvas(node, {
      scale: 2,  // better resolution
      useCORS: true,
    });

    const dataUrl = canvas.toDataURL("image/png");
    node.classList.add("hidden");

    console.log("kya dikkat hai bhai")
    console.log(dataUrl)
    // upload to Cloudinary
    const formData = new FormData();
    formData.append("file", dataUrl);
    formData.append("upload_preset", "anandamchat"); // Replace
    const res = await fetch("https://api.cloudinary.com/v1_1/degtuxmkp/image/upload", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    console.log(data)
    // emit to socket
    socket.emit("sendMessage", {
      text: "",
      media: data.secure_url,
      mediaType: "image/prescription/png",
      senderId: doctorId,
      receiverId: patientId,
      roomId,
      timestamp: new Date().toISOString(),
    });

    setShowPrescriptionForm(false);
    setDiagnosis("");
    setMedicines([]);
  };


  const uploadToCloudinary = async (base64) => {
    const formData = new FormData();
    formData.append("file", base64);
    formData.append("upload_preset", "your_preset"); // from Cloudinary
    const res = await fetch("https://api.cloudinary.com/v1_1/your_cloud_name/image/upload", {
      method: "POST",
      body: formData,
    });
    const data = await res.json();
    return data.secure_url;
  };




  return (
    <>
      {isLoading && <LoadingOverlay />}

      <div className="flex h-screen bg-gray-100 text-gray-800 relative overflow-hidden px-1 sm:px-2 md:px-4  lg:px-28 pt-24 lg:pt-28 pb-5 lg:pb-9">

        {/* Toggle button for mobile */}
        {/* <button
    className="lg:hidden absolute top-4 left-4 z-50 bg-green-500 text-white px-3 py-2 rounded-md shadow"
    onClick={() => setIsSidebarOpen(true)}
  >
    ☰ Patients
  </button> */}

        {/* Overlay when sidebar open on mobile */}
        {/* {isSidebarOpen && (
    <div
      className="fixed inset-0 bg-black bg-opacity-40 z-40"
      onClick={() => setIsSidebarOpen(false)}
    />
  )} */}

        {/* Sidebar */}
        <div
          className={`fixed lg:static top-6 left-0 z-40 bg-white w-64 lg:w-72 rounded-lg  overflow-y-auto border-r shadow-xl transform transition-transform duration-300 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
            }`}
        >
          <div className="p-5 bg-green-600 text-white font-bold text-lg text-center shadow-md sticky top-0 z-10 rounded-b-md">
            Patients
          </div>
          {patients.map(p => (
            <div
              key={p._id}
              onClick={() => {
                router.push(`/doctor/chat?userId=${p._id}`);
                // setIsSidebarOpen(false);
              }}
              className={`flex items-center gap-4 p-4 border-b  cursor-pointer hover:bg-green-100 transition-all duration-200 ${selectedPatient?._id === p._id ? 'bg-green-200' : ''
                }`}
            >
              {p.photo ? (
                <img src={p.photo} alt="patient" className="w-10 h-10 rounded-full object-cover shadow" />
              ) : (
                // <div className='w-10 h-10 rounded-full items-center justify-center shadow font-bold text-xl'> 
                <div className='w-10 h-10 rounded-full overflow-hidden bg-gray-100 border border-gray-300 flex items-center justify-center text-gray-600 font-bold text-xl'>
                  <div>{p.username?.charAt(0)?.toUpperCase()}</div>
                </div>
              )}
              <div>
                <p className="font-semibold text-sm">{p.username}</p>
              </div>


            </div>
          ))}
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col bg-white rounded-xl shadow-md overflow-hidden lg:ml-6  mx-2 lg:mx-6">

          {/* Top Bar */}
          <div className="flex  sm:items-center justify-between gap-4 px-6 py-4 border-b bg-gray-50">
            <div className="flex items-center gap-4">
              {selectedPatient?.photo ? (
                <img src={selectedPatient.photo} alt="patient" className="w-10 h-10 rounded-full object-cover shadow" />
              ) : (
                // <div className='w-10 h-10 rounded-full items-center justify-center shadow font-bold text-xl'> 
                <div className='w-10 h-10 rounded-full overflow-hidden bg-gray-100 border border-gray-300 flex items-center justify-center text-gray-600 font-bold text-xl'>
                  <div>{selectedPatient?.username?.charAt(0)?.toUpperCase()}</div>
                </div>
              )}
              <div>
                <h2 className="font-semibold whitespace-nowrap overflow-hidden text-ellipsis text-base">{selectedPatient?.username}</h2>
                <p className="text-xs text-gray-500">Patient</p>
              </div>
            </div>
            <div className='flex gap-2'>
              <button
                onClick={() => setShowPrescriptionForm(true)}
                className="flex items-center gap-2 bg-blue-600 hover:scale-105 text-white px-4 py-2 text-sm rounded-md shadow-md transition-all duration-200 hover:bg-blue-700 "
              >
                <img src="/prescription.png" alt="" className='w-5' />
                <span className="hidden sm:inline"> Prescription</span>
              </button>
              <button
                onClick={requestVideoCall}
                className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white text-sm px-4 py-2 rounded-md shadow-md transition-all duration-200 hover:scale-105"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M4 6h8a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V8a2 2 0 012-2z"
                  />
                </svg>
                <span className="hidden sm:inline">Video Call</span>
              </button>
            </div>

          </div>

          {/* Messages + Video Call UI */}
          <div className="flex-1 overflow-y-auto px-6 py-5 space-y-4 text-sm bg-gray-50 relative">

            {showPrescriptionForm && (
              <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50">
                <div className="bg-white rounded-lg p-6 w-full max-w-lg text-black">
                  <h2 className="text-xl font-bold mb-4">Create Prescription</h2>

                  <p><strong>Patient:</strong> {selectedPatient.username}, {selectedPatient.age} yrs, {selectedPatient.gender}</p>
                  <p><strong>Date:</strong> {date}</p>

                  <textarea
                    className="w-full border p-2 rounded mt-3"
                    placeholder="Enter Provisional Diagnosis"
                    value={diagnosis}
                    onChange={(e) => setDiagnosis(e.target.value)}
                  ></textarea>

                  <div className="flex gap-2 mt-3">
                    <input
                      type="text"
                      placeholder="Medicine name"
                      className="border p-2 rounded w-1/2"
                      value={newMed.name}
                      onChange={(e) => setNewMed({ ...newMed, name: e.target.value })}
                    />
                    <input
                      type="text"
                      placeholder="Instruction"
                      className="border p-2 rounded w-1/2"
                      value={newMed.instruction}
                      onChange={(e) => setNewMed({ ...newMed, instruction: e.target.value })}
                    />
                    <button
                      className="bg-green-600 text-white px-2 rounded"
                      onClick={() => {
                        setMedicines([...medicines, newMed]);
                        setNewMed({ name: "", instruction: "" });
                      }}
                    >
                      Add
                    </button>
                  </div>

                  <ul className="list-disc ml-6 mt-2">
                    {medicines.map((med, idx) => (
                      <li key={idx}>
                        {med.name} - <span className="text-sm">{med.instruction}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="flex justify-between mt-6">
                    <button className="bg-gray-500 text-white px-4 py-2 rounded" onClick={() => setShowPrescriptionForm(false)}>Cancel</button>
                    <button className="bg-blue-700 text-white px-4 py-2 rounded" onClick={handlePrescriptionSubmit}>Send Prescription</button>
                  </div>
                </div>
              </div>
            )}



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

                  {!callAccepted ? (
                    <div className="flex flex-col items-center justify-center h-full text-center">
                      <img
                        src={selectedPatient?.photo || "/default-avatar.png"}
                        alt={selectedPatient?.username || "Patient"}
                        className="w-28 h-28 rounded-full border-4 border-white shadow-md object-cover mb-6"
                      />
                      <h2 className="text-2xl font-semibold text-white mb-2">
                        {selectedPatient?.username || "Patient"}
                      </h2>
                      <p className="text-gray-300 text-lg animate-pulse mb-8">Ringing...</p>
                      <button
                        onClick={endCall}
                        className="bg-red-600 hover:bg-red-700 rotate-[137deg] transition-transform duration-300 ease-in-out hover:scale-110 shadow-xl rounded-full w-16 h-16 flex items-center justify-center"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M21 15.46l-5.27-.61a1 1 0 00-.9.55l-1.38 2.77a16.08 16.08 0 01-7.72-7.72l2.77-1.38a1 1 0 00.55-.9L8.54 3H3.05A1 1 0 002 4.05C2.5 11.49 9.51 18.5 17 19a1 1 0 001.05-.95v-5.49z" />
                        </svg>
                      </button>
                    </div>
                  ) : (
                    // <div className="flex flex-col h-full">
                    //   <div className="flex flex-row gap-4 p-4 h-[calc(100%-80px)]">
                    //     <video ref={localVideoRef} autoPlay muted playsInline className="w-1/2 rounded-lg border border-white object-cover shadow-md" />
                    //     <video ref={remoteVideoRef} autoPlay playsInline className="w-1/2 rounded-lg border border-white object-cover shadow-md" />
                    //   </div>
                    //   <div className="flex justify-center items-center gap-6 py-3 bg-black bg-opacity-40">
                    //     <button onClick={toggleMute} className="relative bg-gray-700 hover:bg-gray-600 text-white rounded-full p-3 w-12 h-12 shadow-md flex items-center justify-center">
                    //       <img src="/mute-icon.png" alt="Mute" className={`absolute transition-all duration-300 ${isMuted ? 'opacity-100 scale-[0.60]' : 'opacity-0 scale-0'}`} />
                    //       <img src="/unmute-icon.png" alt="Unmute" className={`absolute transition-all duration-300 ${!isMuted ? 'opacity-100 scale-[0.60]' : 'opacity-0 scale-0'}`} />
                    //     </button>
                    //     <button onClick={toggleVideo} className="relative bg-gray-700 hover:bg-gray-600 text-white rounded-full p-3 w-12 h-12 shadow-md flex items-center justify-center">
                    //       <img src="/videooff-icon.png" alt="Video Off" className={`absolute transition-all duration-300 ${isVideoOff ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}`} />
                    //       <img src="/videoon-icon.png" alt="Video On" className={`absolute transition-all duration-300 ${!isVideoOff ? 'opacity-100 scale-[0.60]' : 'opacity-0 scale-0'}`} />
                    //     </button>
                    //     <button onClick={endCall} className="bg-red-600 hover:bg-red-700 rotate-[137deg] transition-transform duration-300 hover:scale-110 shadow-xl rounded-full w-16 h-16 flex items-center justify-center">
                    //       <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    //         <path strokeLinecap="round" strokeLinejoin="round" d="M21 15.46l-5.27-.61a1 1 0 00-.9.55l-1.38 2.77a16.08 16.08 0 01-7.72-7.72l2.77-1.38a1 1 0 00.55-.9L8.54 3H3.05A1 1 0 002 4.05C2.5 11.49 9.51 18.5 17 19a1 1 0 001.05-.95v-5.49z" />
                    //       </svg>
                    //     </button>
                    //   </div>
                    // </div>
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
                  )}
                </div>
              </div>
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

            {/* Text Messages */}
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex transition-all duration-300 ease-in-out ${msg.senderId === doctorId ? 'justify-end' : 'justify-start'
                  }`}
              >
                <div
                  className={`
        px-3 py-2 rounded-md 
        max-w-[80%] sm:max-w-[75%] md:max-w-[65%] lg:max-w-[60%] 
        text-sm sm:text-sm md:text-base 
        transform transition-all duration-300
        ${msg.senderId === doctorId
                      ? 'bg-green-500 text-white animate-slide-in-right'
                      : 'bg-gray-200 text-black animate-slide-in-left'}
      `}
                >
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
            ))}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div className="p-1 sm:p-4 border-t bg-white flex items-center gap-3 shadow-inner">
            <input
              value={messageInput}
              onChange={e => setMessageInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && sendMessage()}
              placeholder="Type your message..."
              className="flex-1 border rounded-md px-2 sm:px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-green-500"
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

        {doctorDetails &&
          <div id="prescription-preview" className="absolute top-0 left-[-9999px] w-[500px] h-auto bg-white  pointer-events-none  rounded shadow-md font-sans text-black text-sm">
            {/* Header */}
            {/* <img src="https://www.practo.com/nav/9.0.1/consumer/images/practo.svg" alt="Practo" className="h-6 mb-1" /> */}
            <div className="flex justify-between items-start bg-black p-6">
              <span className="text-[#f6d365] p-2 pr-0 text-3xl font-bold font-[Inter] tracking-wide">Anandam</span>
              <div className='text-sky-600 text-right'>
                <div className="text-lg font-semibold mt-2">{doctorDetails.username}</div>
                <div className="text-xs pt-1">MBBS</div>
                <div className="text-xs">{doctorDetails.location}</div>
                <div className="text-xs  py-1">Medical Registration Number: 2006/02/424</div>

              </div>
            </div>

            {/* Divider */}

            <div className="text-right flex  justify-between px-6 items-center">
              <div className='flex text-left flex-col'>
                <div className="font-semibold mt-2">{selectedPatient?.username}</div>
                <div className="text-xs">{selectedPatient?.age} 21 years, {selectedPatient?.gender}</div>

              </div>
              <div className='flex flex-col'>
                <div className="text-xs mt-2">{date}</div>
                <div className="text-xs">Prescription Id: 7791394</div>

              </div>
            </div>
            <div className="border-t border-gray-300 my-4"></div>
            {/* Diagnosis */}
            <p className="font-semibold text-xs mb-1 px-6">PROVISIONAL DIAGNOSIS</p>
            <p className="text-xs mb-4 px-6">{diagnosis}</p>

            {/* Medicine Table */}
            <div className="border-t border-gray-300 my-4"></div>
            <p className="font-semibold text-xs mb-2 px-6">MEDICINES</p>
            <div className="grid grid-cols-12 gap-2 px-6 py-2 font-medium text-xs bg-gray-100  rounded">
              <div className="col-span-1">#</div>
              <div className="col-span-5">NAME</div>
              <div className="col-span-6">INSTRUCTION</div>
            </div>

            {medicines.map((med, idx) => (
              <div key={idx} className="grid grid-cols-12 gap-2 text-xs border-b px-6 py-2">
                {/* <li key={idx}>{med.name} - <span className="text-sm">{med.instruction}</span></li> */}

                <div className="col-span-1">{idx}</div>
                <div className="col-span-5">
                  {med.name}<br />
                  <span className="text-gray-600 text-[11px]">AMOXICILLIN+CLAVULANIC ACID (500/125 mg) Tablet</span>
                </div>
                <div className="col-span-6">1 unit, {med.instruction} times, daily, for 1 week, after food</div>
              </div>
            ))}

            {/* <div className="grid grid-cols-12 gap-2 text-xs border-b py-2">
            <div className="col-span-1">2</div>
            <div className="col-span-5">
              Altraday Capsule<br />
              <span className="text-gray-600 text-[11px]">Aceclofenac SR (200 mg) + Rabeprazole (20 mg) Capsule</span>
            </div>
            <div className="col-span-6">1 unit, {1} time, daily, for 1 week, after food</div>
          </div>

          <div className="grid grid-cols-12 gap-2 text-xs border-b py-2">
            <div className="col-span-1">3</div>
            <div className="col-span-5">Sporlac Tablet 20's</div>
            <div className="col-span-6">1 unit, 2 times, daily, for 1 week, after food</div>
          </div>

          <div className="grid grid-cols-12 gap-2 text-xs border-b py-2">
            <div className="col-span-1">4</div>
            <div className="col-span-5">
              T-Bact Cream<br />
              <span className="text-gray-600 text-[11px]">Mupirocin (2%) Cream</span>
            </div>
            <div className="col-span-6">1 fingertip, 2 times, daily, for 1 week apply</div>
          </div> */}

            {/* General Advice */}

            <p className="font-semibold text-xs mt-4 mb-2 px-6">GENERAL ADVICE/NOTES</p>
            <ul className="list-disc list-inside text-xs px-6 text-gray-700">
              <li>Keep hand elevated</li>
              <li>Avoid water and dust</li>
            </ul>


            <div className="border-t border-gray-300 my-4"></div>

            {/* Signature */}
            <div className="text-right mt-8 text-xs px-6">
              <div>{doctorDetails.username}</div>
              <div>MBBS</div>
            </div>

            {/* Disclaimer */}
            <p className="mt-6 text-[10px] text-gray-500 border-t px-6 pt-2">
              Disclaimer: This prescription is based on the information provided by you in an online consultation and not on any physical verification. Visit a doctor in case of emergency. This prescription is valid in India only.
            </p>
          </div>


        }

      </div>
    </>
  );
}






























// "use client";

// import { useRouter, useSearchParams } from "next/navigation";
// import { useEffect, useState, useRef } from "react";
// import { useSession } from "next-auth/react";
// import io from "socket.io-client";
// import SimplePeer from "simple-peer"; // Make sure you have this installed

// let socket;

// export default function Chat() {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const patientId = searchParams.get("userId");

//   const { data: session } = useSession();
//   const [doctorId, setDoctorId] = useState("");
//   const [patients, setPatients] = useState([]);
//   const [messages, setMessages] = useState([]);
//   const [messageInput, setMessageInput] = useState("");
//   const [selectedPatient, setSelectedPatient] = useState(null);
//   const [socketReady, setSocketReady] = useState(false);

//   const localVideoRef = useRef();
//   const remoteVideoRef = useRef();
//   const peerRef = useRef();
//   const [isCalling, setIsCalling] = useState(false);
//   const [incomingCall, setIncomingCall] = useState(null); // { fromId, fromName }

//   // Track if client-side
//   const [isClient, setIsClient] = useState(false);


//   useEffect(() => {
//     if (isCalling && peerRef.current && localVideoRef.current) {
//       const localStream = peerRef.current._stream;
//       if (localStream) {
//         localVideoRef.current.srcObject = localStream;
//       }
//     }
//   }, [isCalling]);
//   useEffect(() => {
//     if (!isCalling) return;

//     setTimeout(() => {
//       const localStream = peerRef.current?._stream;
//       if (localStream && localVideoRef.current) {
//         localVideoRef.current.srcObject = localStream;
//         console.log("Re-applied local stream after render");
//       }
//     }, 100);
//   }, [isCalling]);



//   useEffect(() => {
//     setIsClient(true);
//   }, []);

//   useEffect(() => {
//     if (session?.user?.id) {
//       setDoctorId(session.user.id);
//     } else {
//       router.push("/login");
//     }
//   }, [session, router]);

//   const roomId = [doctorId, patientId].sort().join("-");

//   useEffect(() => {
//     const fetchPatients = async () => {
//       const res = await fetch(`/api/doctor/patients`);
//       const data = await res.json();
//       setPatients(data);
//       if (!patientId && data.length > 0) {
//         router.push(`/doctor/chat?userId=${data[0]._id}`);
//       }
//     };
//     if (doctorId) fetchPatients();
//   }, [doctorId, patientId, router]);

//   useEffect(() => {
//     if (patientId && patients.length > 0) {
//       const found = patients.find((p) => p._id === patientId);
//       setSelectedPatient(found);
//     }
//   }, [patientId, patients]);

//   useEffect(() => {
//     if (!doctorId || !patientId) return;

//     const roomId = [doctorId, patientId].sort().join("-");

//     const fetchMessages = async () => {
//       try {
//         const res = await fetch(`/api/messages?roomId=${roomId}`);
//         const data = await res.json();
//         setMessages(data);
//       } catch (err) {
//         console.error("Message fetch error:", err);
//       }
//     };

//     fetchMessages();

//     socket = io({ path: "/api/socket" });

//     socket.on("connect", () => {
//       console.log("Connected to socket:", socket.id);
//       socket.emit("joinRoom", roomId);
//       setSocketReady(true);
//     });

//     socket.on("receiveMessage", (msg) => {
//       setMessages((prev) => [...prev, msg]);
//     });

//     return () => {
//       socket.disconnect();
//     };
//   }, [doctorId, patientId]);

//   useEffect(() => {
//     if (!socket) return;

//     // Incoming call metadata received (not the offer yet)
//     socket.on("incoming-call", ({ fromId, fromName }) => {
//       setIncomingCall({ fromId, fromName });
//     });

//     // Callee accepted, initiator now sends the WebRTC offer
//     socket.on("call-accepted", async ({ to }) => {
//       const localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
//       localVideoRef.current.srcObject = localStream;

//       const peer = new SimplePeer({
//         initiator: true,
//         trickle: false,
//         stream: localStream,
//       });

//       peer.on('signal', (signal) => {
//         socket.emit("video-offer", {
//           to,
//           from: userId,
//           signal
//         });
//       });

//       peer.on('stream', (stream) => {
//         remoteVideoRef.current.srcObject = stream;
//       });

//       peerRef.current = peer;
//       setIsCalling(true);
//     });

//     // Receiver receives the video offer and responds
//     socket.on("video-offer", async ({ from, signal }) => {
//       const localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
//       localVideoRef.current.srcObject = localStream;

//       const peer = new SimplePeer({
//         initiator: false,
//         trickle: false,
//         stream: localStream,
//       });

//       peer.on("signal", (answerSignal) => {
//         socket.emit("video-answer", {
//           to: from,
//           signal: answerSignal,
//         });
//       });

//       peer.on("stream", (remoteStream) => {
//         remoteVideoRef.current.srcObject = remoteStream;
//       });

//       peer.signal(signal);
//       peerRef.current = peer;
//       setIsCalling(true);
//     });

//     // Final connection: initiator receives the answer
//     socket.on("video-answer", ({ signafinl }) => {
//       peerRef.current?.signal(signal);
//     });

//     return () => {
//       socket.off("incoming-call");
//       socket.off("call-accepted");
//       socket.off("video-offer");
//       socket.off("video-answer");
//     };
//   }, [socket]);


//   // Cleanup peer on call end
//   useEffect(() => {
//     return () => {
//       if (peerRef.current) {
//         peerRef.current.destroy();
//         peerRef.current = null;
//       }
//     };
//   }, []);

//   // The fixed startVideoCall function with proper client & user-action checks
//   const startVideoCall = async () => {
//     console.log("Start Video Call");

//     try {
//       const localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
//       console.log("Got local stream");

//       const peer = new SimplePeer({
//         initiator: true,
//         trickle: false,
//         stream: localStream
//       });

//       peer.on('signal', signal => {
//         console.log("Sending video-offer signal");
//         socket.emit("video-offer", {
//           to: patientId,
//           from: doctorId,
//           signal
//         });
//       });

//       peer.on('stream', stream => {
//         console.log("Received remote stream");
//         if (remoteVideoRef.current) {
//           remoteVideoRef.current.srcObject = stream;
//         }
//       });

//       peerRef.current = peer;

//       // 🟡 Set video after DOM is ready
//       setTimeout(() => {
//         if (localVideoRef.current) {
//           localVideoRef.current.srcObject = localStream;
//           console.log("Set local video stream");
//         }
//         setIsCalling(true); // ✅ Move after setting stream
//       }, 100); // delay ensures video refs are mounted

//       socket.emit("incoming-call", {
//         to: patientId,
//         fromId: doctorId,
//         fromName: session?.user?.name || "Patient",
//       });

//     } catch (err) {
//       console.error("Error in startVideoCall:", err);
//     }
//   };


//   const sendMessage = () => {
//     if (!messageInput.trim() || !socketReady || !doctorId || !patientId) return;

//     const msg = {
//       senderId: doctorId,
//       receiverId: patientId,
//       text: messageInput,
//       roomId,
//     };

//     socket.emit("sendMessage", msg);
//     setMessageInput("");
//   };

//   return (
//     <div className="flex h-screen bg-gray-100 text-gray-800 relative overflow-hidden">
//       {/* Toggle button - shown on mobile */}
//       <button
//         className="lg:hidden absolute top-4 left-4 z-50 bg-green-500 text-white px-3 py-2 rounded-md"
//         onClick={() => setIsSidebarOpen(true)}
//       >
//         ☰ Patients
//       </button>

//       {/* Sidebar Overlay */}
//       {isSidebarOpen && (
//         <div
//           className="fixed inset-0 bg-black bg-opacity-40 z-40"
//           onClick={() => setIsSidebarOpen(false)}
//         />
//       )}

//       {/* Sidebar */}
//       <div
//         className={`fixed lg:static top-0 left-0 z-50 bg-white w-64 lg:w-1/4 h-full overflow-y-auto border-r shadow-lg transform transition-transform duration-300 ${isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
//           }`}
//       >
//         <div className="p-4 bg-green-600 text-white font-bold text-center rounded-t-lg sticky top-0 z-10">
//           Patients List
//         </div>
//         {patients.map((p) => (
//           <div
//             key={p._id}
//             onClick={() => {
//               router.push(`/doctor/chat?userId=${p._id}`);
//               setIsSidebarOpen(false);
//             }}
//             className={`flex items-center gap-3 p-4 border-b cursor-pointer hover:bg-green-50 ${selectedPatient?._id === p._id ? "bg-green-100" : ""
//               }`}
//           >
//             <img src={p.photo} alt="patient" className="w-10 h-10 rounded-full" />
//             <div>
//               <p className="font-semibold text-sm">{p.username}</p>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Chat Area */}
//       <div className="flex-1 flex flex-col bg-white rounded-lg shadow-sm overflow-hidden lg:ml-3 pt-20 px-4 pb-4">
//         {/* Top Bar */}
//         <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 px-4 py-3 border-b">
//           <div className="flex items-center gap-3">
//             <img
//               src={selectedPatient?.photo}
//               alt="patient"
//               className="w-10 h-10 rounded-full"
//             />
//             <div>
//               <h2 className="font-semibold text-sm sm:text-base">
//                 {selectedPatient?.username}
//               </h2>
//               <p className="text-xs text-gray-500">Patient</p>
//             </div>
//           </div>
//           <button
//             onClick={startVideoCall}
//             className="bg-green-500 hover:bg-green-600 text-white text-sm px-4 py-2 rounded-md shadow"
//           >
//             Video Call
//           </button>
//         </div>

//         {/* Messages */}
//         <div className="flex-1 overflow-y-auto p-4 space-y-3 text-sm">
//           {isCalling && (
//             <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50">
//               <div className="relative w-[95vw] max-w-[800px] h-[80vh] bg-white rounded-md overflow-hidden flex flex-col md:flex-row justify-between p-4">
//                 <div className="video-container">
//                   <video ref={localVideoRef} autoPlay muted playsInline className="w-1/2" />
//                   <video ref={remoteVideoRef} autoPlay playsInline className="w-1/2" />
//                 </div>
//                 <button
//                   className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded text-sm"
//                   onClick={() => {
//                     peerRef.current?.destroy();
//                     setIsCalling(false);
//                   }}
//                 >
//                   End Call
//                 </button>
//               </div>
//             </div>
//           )}

//           {incomingCall && (
//             <div className="flex justify-center">
//               <div className="bg-yellow-300 text-black px-4 py-2 rounded-md flex items-center gap-4">
//                 {incomingCall.fromName} is calling...
//                 <button
//                   onClick={() => {
//                     socket.emit("call-accepted", {
//                       to: incomingCall.fromId,
//                     });
//                     setIncomingCall(null);
//                   }}

//                   className="bg-green-600 text-white px-3 py-1 rounded"
//                 >
//                   Pickup
//                 </button>
//               </div>
//             </div>
//           )}

//           {messages.map((msg, idx) => (
//             <div
//               key={idx}
//               className={`flex ${msg.senderId === doctorId ? "justify-end" : "justify-start"
//                 }`}
//             >
//               <div
//                 className={`px-3 py-2 rounded-md max-w-[80%] ${msg.senderId === doctorId
//                   ? "bg-green-500 text-white"
//                   : "bg-gray-200 text-black"
//                   }`}
//               >
//                 {msg.text}
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Input */}
//         <div className="p-4 border-t bg-gray-50 flex items-center gap-2">
//           <input
//             value={messageInput}
//             onChange={(e) => setMessageInput(e.target.value)}
//             onKeyDown={(e) => e.key === "Enter" && sendMessage()}
//             placeholder="Type your message..."
//             className="flex-1 border rounded-md px-4 py-2 text-sm focus:outline-none"
//           />
//           <button
//             onClick={sendMessage}
//             className="bg-green-500 text-white px-4 py-2 rounded-md text-sm"
//           >
//             Send
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }
