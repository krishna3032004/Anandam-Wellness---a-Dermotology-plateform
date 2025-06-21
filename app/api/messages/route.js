import connectDB from "@/db/connectDB";
import Message from "@/models/Message";

export async function GET(req) {
  await connectDB();
  const { searchParams } = new URL(req.url);
  const roomId = searchParams.get("roomId");

  const messages = await Message.find({ roomId }).sort({ timestamp: 1 });

  return new Response(JSON.stringify(messages), {
    headers: { "Content-Type": "application/json" },
  });
}
