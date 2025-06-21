// import connectDB from '@/app/db/connectDB';
import connectDB from '@/db/connectDB';
// import Chat from '@/app/models/Chat';
import Chat from '@/models/Chat';

export default async function handler(req, res) {
  await connectDB();

  const { doctorId, userId } = req.query;
  const chat = await Chat.findOne({ doctorId, userId });

  if (!chat) return res.status(200).json([]);

  res.status(200).json(chat.messages);
}