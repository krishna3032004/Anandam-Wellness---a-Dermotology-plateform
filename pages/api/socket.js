import { Server } from "socket.io";
import connectDB from "@/db/connectDB";
import Message from "@/models/Message";
import User from "@/models/User";
import Doctor from "@/models/Doctor";

export default function handler(req, res) {
  if (!res.socket.server.io) {
    console.log("Initializing Socket.IO server...");

    const io = new Server(res.socket.server, {
      path: "/api/socket",
    });

    res.socket.server.io = io;

    io.on("connection", (socket) => {
      console.log("User connected:", socket.id);

      socket.on("joinRoom", (roomId) => {
        socket.join(roomId);
        console.log(`User joined room: ${roomId}`);
      });

      socket.on("sendMessage", async (message) => {
        try {
          await connectDB();
          const { senderId, receiverId, text, roomId,media,mediaType,   } = message;
          const savedMessage = await Message.create(message);
          console.log("Message saved:", savedMessage);
          io.to(message.roomId).emit("receiveMessage", savedMessage);

          // 3. Update chattedWith if not already added
          
          const user = await User.findById(senderId);
          const doctor = await Doctor.findById(receiverId);

          if (user && doctor) {
            if (!user.chattedWith.includes(receiverId)) {
              await User.updateOne(
                { _id: senderId, chattedWith: { $ne: receiverId } },
                { $push: { chattedWith: receiverId } }
              );
            }

            if (!doctor.chattedWith.includes(senderId)) {
              await Doctor.updateOne(
                { _id: receiverId, chattedWith: { $ne: senderId } },
                { $push: { chattedWith: senderId } }
              );
            }
          }
        } catch (err) {
          console.error("Message DB error:", err);
        }
      });

      // socket.on("joinRoom", (roomId) => {
      //   socket.join(roomId);
      // });

      socket.on("pickup-call", ({ from, to, roomId }) => {
        console.log(`Pickup call by ${from} to ${to}`);
        io.to(roomId).emit("pickup-call", { from, to });

        // Emit 'callAccepted' for doctor-side  
        // io.to(roomId).emit("callAccepted"); // <-- add this!
      });
      socket.on("callAccepted", ({ to, roomId }) => {
        // Emit 'callAccepted' for doctor-side
        console.log("accept krli request")
        io.to(roomId).emit("callAccepted"); // <-- add this!
      });
      // After receiver accepts the call
      // socket.on("video-call-accepted", ({ from, to ,roomId}) => {
      //   io.to(to).emit("video-accepted", { from ,roomId});
      // });

      // 💥 Actual WebRTC signaling (offer, answer, ICE)
      socket.on("webrtc-signal", ({signal,roomId }) => {
        console.log(`Signal ja rha hai to ${roomId} server par aa chuka hai`);
        io.to(roomId).emit("webrtc-signal", { signal });
      });

      socket.on("video-call-request", ({ from, to, roomId }) => {
        console.log("request server pai aa gyi")
        io.to(roomId).emit("video-call-request", {
          from,
          to,
          roomId,
          type: "video-call-request",
          text: "Video call requested. Click to join.",
        });
      });

      // socket.on("sendMessage", (msg) => {
      //   io.to(msg.roomId).emit("receiveMessage", msg);
      // });

      socket.on("disconnect", () => {
        console.log("User disconnected:", socket.id);
      });
    });
  }

  res.end();
}
