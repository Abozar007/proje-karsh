import React, { useState } from "react";
import "./ChatWidget.css";

const ChatWidgetPro = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: "bot", text: "👋 سلام! به TechSphere خوش اومدی. چطور میتونم کمک کنم؟" }
  ]);
  const [userInput, setUserInput] = useState("");

  const handleSend = async () => {
    if (userInput.trim() === "") return;
  
    setMessages((prev) => [...prev, { sender: "user", text: userInput }]);
  
    try {
      const response = await fetch("https://api-inference.huggingface.co/models/facebook/blenderbot-3B", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${process.env.REACT_APP_HF_TOKEN}` // می‌تونی خالی بذاری یا کلید رایگان عمومی بذارم؟
        },
        body: JSON.stringify({
          inputs: userInput,
        }),
      });
  
      const data = await response.json();
      console.log("💬 پاسخ مدل:", data);
      const reply = data.generated_text || "❓ پاسخ نامشخص بود.";
  
      setMessages((prev) => [...prev, { sender: "bot", text: reply }]);
    } catch (error) {
      console.error(error);
      setMessages((prev) => [...prev, { sender: "bot", text: "❌ خطا در ارتباط با مدل رایگان" }]);
    }
  
    setUserInput("");
  };
  
  

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSend();
  };

  return (
    <div className="chat-widget-pro">
      {isOpen && (
        <div className="chat-box">
          <div className="chat-header">
            SmartTech Chat
            <button className="close-btn" onClick={() => setIsOpen(false)}>×</button>
          </div>
          <div className="chat-body">
            {messages.map((msg, index) => (
              <div key={index} className={`chat-message ${msg.sender}`}>
                {msg.text}
              </div>
            ))}
          </div>
          <div className="chat-footer">
            <input
              type="text"
              placeholder="پیامتو بنویس..."
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <button onClick={handleSend}>➤</button>
          </div>
        </div>
      )}

      <button className="chat-toggle" onClick={() => setIsOpen(!isOpen)}>
        💬
      </button>
    </div>
  );
};

export default ChatWidgetPro;
