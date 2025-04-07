import { useState,useEffect } from "react";
import { FaPaperPlane } from "react-icons/fa";
import { Send, Loader2 } from "lucide-react";

const Chatbot = ({ onClose }) => {
  const [messages, setMessages] = useState([]);
  // const [messages, setMessages] = useState([{ text: "Hello! Ask me anything about skincare.", sender: "bot" }]);
  const [input, setInput] = useState("");

  const [Loading, setLoading] = useState(false);

  // Function to send a message
  // const sendMessage = () => {
  //   if (input.trim() === "") return;

  //   // Add user message
  //   const newMessages = [...messages, { text: input, sender: "user" }];
  //   setMessages(newMessages);
  //   setInput("");

  //   // Simulate bot response (Replace with real API call later)
  //   setTimeout(() => {
  //     setMessages([...newMessages, { text: "Thank you for your question! I'll help you.", sender: "bot" }]);
  //   }, 1000);
  // };

  useEffect(() => {
    // ✅ Initial message from the bot when the chat loads
    setMessages([
      {
        sender: "bot",
        text: "👋 Hello! I'm your AI assistant. Ask me anything about dermotology! 🛍️",
      },
    ]);
  }, []);
  // Handle Enter key press
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  const ecommerceContext = `
   Anandam Wellness is a comprehensive dermatology platform designed to provide expert guidance, consultations, and resources for skin health and self-care.

  🌿 Key Features:
  ✅ AI-Powered Chatbot – Get instant answers to skincare queries.
  ✅ Doctor Consultations – Book new, follow-up, or second-opinion appointments.
  ✅ Common Skincare Articles – Learn about skin conditions, treatments, and best practices.
  ✅ Personalized Advice – Tailored recommendations based on your skin type, concerns, and medical history.
  ✅ User-Friendly Interface – A modern, easy-to-use platform for seamless navigation.

  💡 Empower yourself with expert skincare knowledge and consultation at your fingertips!

  📍 **Jabalpur-Specific Services:**
  ✅ Top dermatologists in Jabalpur available for consultations.
  ✅ Local skincare product recommendations based on Jabalpur’s climate.
  ✅ Nearby skincare clinics and treatment centers.
  ✅ Seasonal skincare tips suited for Jabalpur’s weather conditions.

  📊 **Example Dermatology Data for Jabalpur:**
  - **Top Dermatologists:**
    - **Dr. Ramesh Kumar** – 15+ years of experience, specializes in acne and pigmentation treatments. (Glow Skin Clinic, Jabalpur)
    - **Dr. Anjali Sharma** – Expert in laser skin treatments and anti-aging procedures. (DermaCare Jabalpur)
    - **Dr. Vivek Mehra** – Renowned for treating eczema and skin allergies. (SkinGlow Center)
    - **Dr. Priya Sinha** – Specialist in pediatric dermatology and hair loss treatment. (Jabalpur Skin & Hair Clinic)
    - **Dr. Rajesh Verma** – Focuses on advanced dermatological surgeries and mole removal. (Elite Derma Jabalpur)

  - **Popular Skin Clinics:**
    - Glow Skin Clinic, Wright Town
    - DermaCare Jabalpur, Napier Town
    - SkinGlow Center, Civil Lines
    - Jabalpur Skin & Hair Clinic, Sadar Bazaar
    - Elite Derma Jabalpur, Madan Mahal

  - **Weather-Based Skin Tips:**
    - Summers: Use SPF 50+ sunscreen and lightweight moisturizers.
    - Winters: Hydrating creams and oil-based serums for dry skin.
  - **Common Skin Issues in Jabalpur:** Acne, sunburn, pigmentation due to high humidity.
  `;
  


  const sendMessage = async () => {
    if (!input) return;

    const userMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    // const conversationHistory = messages.map(msg => `${msg.sender === 'user' ? 'User' : 'Bot'}: ${msg.text}`).join('\n');

    // // Add the current user message to the history
    // const fullConversation = ecommerceContext + conversationHistory + `\nUser: ${input}`;

    const conversationHistory = messages.map(msg => msg.text).join('\n');

    // Add the current user message to the history
    const fullConversation =  `This is a dermatology-focused chatbot. It should only provide responses related to skincare, dermatology, and related topics. If the user asks something unrelated, kindly guide them to ask about skincare.\n\n${ecommerceContext}\n${conversationHistory}\nUser: ${input}`;
    // const fullConversation = ecommerceContext + "\n" + conversationHistory + "\n" + input;
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("/api/gemini", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: fullConversation }),
      });

      const data = await response.json();
      console.log(data);
      // const botMessage = { sender: "bot", text: data.candidates?.[0]?.content.parts[0].text || "No response" };
      // setMessages((prev) => [...prev, botMessage]);

      const botResponse = data.candidates?.[0]?.content.parts[0].text || "No response";
      
      // Check if response contains bullet points
      let formattedMessage;
      if (botResponse.includes("•") || botResponse.includes("*")) {
        formattedMessage = botResponse
          .replace(/\*/g, "•") // Convert asterisks to bullet points
          .split('\n')
          .map(line => `<li>${line.trim()}</li>`)
          .join('');
        formattedMessage = `<ul>${formattedMessage}</ul>`;
      } else {
        formattedMessage = `<p>${botResponse.replace(/\n/g, '<br/>')}</p>`;
      }
      setMessages((prev) => [...prev, { sender: "bot", text: formattedMessage }]);
    } catch (error) {
      setMessages((prev) => [...prev, { sender: "bot", text: "Error: Could not fetch response" }]);
    } finally {
      setLoading(false);
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
              className={`p-2 rounded-md text-justify inline-block text-gray-900 ${msg.sender === "user" ? "bg-[#f6d365] self-end" : "bg-gray-200"} max-w-max`}>
              {/* {msg.text} */}
              <div dangerouslySetInnerHTML={{ __html: msg.text }} />
            </div>
          ))}
          {Loading && (
              <div className="flex justify-start">
                <div className="px-3 py-2 text-sm bg-gray-200 text-gray-900 rounded-xl flex items-center gap-2">
                  <Loader2 className="animate-spin w-4 h-4" />
                  Typing...
                </div>
              </div>
            )}
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
