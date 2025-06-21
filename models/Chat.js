import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
  sender: String,       // email or userId
  receiver: String,     // doctorId or userId
  message: String,
  timestamp: { type: Date, default: Date.now },
});

const chatSchema = new mongoose.Schema({
  doctorId: String,
  userId: String,
  messages: [messageSchema],
});

export default mongoose.models.Chat || mongoose.model('Chat', chatSchema);