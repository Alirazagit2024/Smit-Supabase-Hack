import { useState, useRef, useEffect } from "react";
import { IoMdSend } from "react-icons/io";
import { IoClose } from "react-icons/io5";
import Lottie from "lottie-react";
import typingAnimation from "/public/Animations/typing.json"; // Import the Lottie animation

function AiChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [isFirstMessage, setIsFirstMessage] = useState(true);
  const [isTyping, setIsTyping] = useState(false); // State to track typing animation
  const userInputRef = useRef(null);
  const chatMessagesRef = useRef(null);

  const API_KEY = import.meta.env.VITE_AI_API_KEY;
  const API_URL =
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent";

  const generateResponse = async (prompt) => {
    try {
      const response = await fetch(`${API_URL}?key=${API_KEY}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: prompt,
                },
              ],
            },
          ],
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate response");
      }

      const data = await response.json();
      return data.candidates[0].content.parts[0].text;
    } catch (error) {
      console.error("Error:", error);
      return "Sorry, I encountered an error. Please try again.";
    }
  };

  const cleanMarkdown = (text) => {
    return text
      .replace(/#{1,6}\s?/g, "")
      .replace(/\*\*/g, "")
      .replace(/\n{3,}/g, "\n\n")
      .trim();
  };

  const addMessage = (message, isUser) => {
    const newMessage = {
      text: message,
      isUser,
    };

    setMessages((prevMessages) => [...prevMessages, newMessage]);
  };

  const handleUserInput = async () => {
    const userMessage = userInputRef.current.value.trim();
    if (userMessage) {
      addMessage(userMessage, true);
      userInputRef.current.value = "";
      setIsFirstMessage(false);

      setIsTyping(true); // Start typing animation

      try {
        const botMessage = await generateResponse(userMessage);
        addMessage(cleanMarkdown(botMessage), false);
      } catch (error) {
        console.error("Error:", error);
        addMessage("Sorry, I encountered an error. Please try again.", false);
      } finally {
        setIsTyping(false); // Stop typing animation
      }
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleUserInput();
    }
  };

  useEffect(() => {
    if (chatMessagesRef.current) {
      chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <>
  {/* AI Chat Modal */}
  {open && (
    <div className="fixed bottom-20 sm:bottom-24 right-3 sm:right-6 w-[95%] sm:w-96 max-h-[80vh] sm:max-h-[75vh] rounded-xl bg-white shadow-xl border border-gray-200/80 flex flex-col z-50 backdrop-blur-sm">
      {/* Modal Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-gray-50 rounded-t-xl">
        <div className="flex items-center gap-3">
          <div className="relative">
            <img
              loading="lazy"
              src="/Images/bot.webp"
              className="w-10 h-10 rounded-full border-2 border-blue-400"
              alt="AI Assistant"
            />
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></span>
          </div>
          <div className="flex flex-col">
            <h2 className="font-semibold text-gray-800">AI Assistant</h2>
            <p className="text-xs text-gray-500">Online</p>
          </div>
        </div>
        <button 
          onClick={() => setOpen(false)}
          className="p-1 rounded-full hover:bg-gray-100 transition-colors"
          aria-label="Close chat"
        >
          <IoClose className="text-4xl p-1 border border-black cursor-pointer text-black rounded-full" />
        </button>
      </div>

      {/* Chat Area */}
      <div
        ref={chatMessagesRef}
        className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-white to-blue-50/50"
      >
        {isFirstMessage && (
          <div className="text-center py-4">
            <div className="inline-block px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
              How can I help you today?
            </div>
          </div>
        )}

        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`flex max-w-[80%] ${message.isUser ? 'flex-row-reverse' : ''}`}>
              <img
                loading="lazy"
                src={message.isUser ? "/Images/user.webp" : "/Images/bot.webp"}
                alt={message.isUser ? "User" : "AI"}
                className={`w-8 h-8 rounded-full border-2 ${message.isUser ? 'border-blue-400 ml-3' : 'border-blue-300 mr-3'}`}
              />
              <div
                className={`px-4 py-3 rounded-2xl ${message.isUser 
                  ? 'bg-blue-600 text-white rounded-tr-none' 
                  : 'bg-gray-100 text-gray-800 rounded-tl-none'}`}
              >
                {message.text}
              </div>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex justify-start pl-12">
            <div className="px-4 py-2 bg-gray-100 text-gray-800 rounded-2xl rounded-tl-none">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.4s'}}></div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="p-3 border-t border-gray-200 bg-white rounded-b-xl">
        <div className="flex gap-2 items-center">
          <input
            ref={userInputRef}
            type="text"
            placeholder="Type your message..."
            className="flex-1 px-4 py-2 text-sm text-gray-800 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            onKeyPress={handleKeyPress}
          />
          <button
            onClick={handleUserInput}
            className="p-2 text-white cursor-pointer bg-blue-600 rounded-full hover:bg-blue-700 transition-colors shadow-md"
            aria-label="Send message"
          >
            <IoMdSend className="text-lg" />
          </button>
        </div>
      </div>
    </div>
  )}

  {/* Floating AI Button */}
  <button
    onClick={() => setOpen(true)}
    className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-40 w-14 h-14 bg-gradient-to-br from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 group"
    aria-label="Open AI chat"
  >
    <img
      loading="lazy"
      src="/Images/bot.webp"
      className="rounded-full w-[50px] h-[50px] cursor-pointer border-2 border-white group-hover:scale-105 transition-transform"
      alt="AI Assistant"
    />
    <span className="absolute bottom-1 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-white"></span>
  </button>
</>
  );
}

export default AiChatWidget;
