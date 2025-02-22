import { useState } from "react";
import { FaPaperPlane } from "react-icons/fa";

const Chatbot = ({ onClose }) => {
  const [messages, setMessages] = useState([{ text: "Hello! Ask me anything about skincare.", sender: "bot" }]);
  const [input, setInput] = useState("");

  // Function to send a message
  const sendMessage = () => {
    if (input.trim() === "") return;

    // Add user message
    const newMessages = [...messages, { text: input, sender: "user" }];
    setMessages(newMessages);
    setInput("");

    // Simulate bot response (Replace with real API call later)
    setTimeout(() => {
      setMessages([...newMessages, { text: "Thank you for your question! I'll help you.", sender: "bot" }]);
    }, 1000);
  };

  // Handle Enter key press
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Chat Window */}
      <div className="w-80 h-96 backdrop-blur-md bg-opacity-30 shadow-xl rounded-lg flex flex-col border border-gray-300">
        {/* Header */}
        <div className="bg-[#f6d365] text-gray-900 text-sm font-semibold p-3 flex justify-between items-center rounded-t-lg">
          <span>Dermatology Chatbot</span>
          <button onClick={onClose} className="text-gray-900 text-lg">×</button>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 flex-col flex p-3 text-sm overflow-y-auto space-y-2">
          {messages.map((msg, index) => (
            <div key={index} 
              className={`p-2 rounded-md inline-block text-gray-900 ${msg.sender === "user" ? "bg-[#f6d365] self-end" : "bg-gray-200"} max-w-max`}>
              {msg.text}
            </div>
          ))}
        </div>

        {/* Input Box */}
        <div className="p-2 border-t border-gray-300 flex items-center">
          <input
            type="text"
            placeholder="Type a message..."
            className="w-full p-2 text-sm border rounded-md focus:outline-none bg-transparent"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button onClick={sendMessage} className="ml-2 p-2 bg-[#f6d365] rounded-full text-gray-900 hover:scale-110 transition">
            <FaPaperPlane className="text-lg" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
