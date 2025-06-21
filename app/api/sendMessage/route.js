// import connectDB from '@/app/db/connectDB';
import connectDB from '@/db/connectDB';
// import Chat from '@/app/models/Chat';
import Chat from '@/models/Chat';

export default async function handler(req, res) {
  await connectDB();

  if (req.method === 'POST') {
    const { doctorId, userId, message, sender } = req.body;

    let chat = await Chat.findOne({ doctorId, userId });

    if (!chat) {
      chat = new Chat({ doctorId, userId, messages: [] });
    }

    chat.messages.push({ sender, receiver: sender === userId ? doctorId : userId, message });
    await chat.save();

    return res.status(200).json({ success: true });
  }
}