import { useState, useEffect } from "react";

import "../../css/common.css";
import "../../css/reset.css";
import "../../css/expense.css";

function Chatbot() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const welcomeMessage = {
      sender: "bot",
      text: "안녕하세요! 무엇을 도와드릴까요?",
    };
    setMessages([welcomeMessage]);
  }, []);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };
    setMessages((prevMessages) => [...prevMessages, userMessage]);

    const response = await fetch("http://localhost:8080/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: input }),
    });

    const data = await response.json();
    console.log(data);
    const botMessage = { sender: "bot", text: data.reply };

    setMessages((prevMessages) => [...prevMessages, botMessage]);
    setInput("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
      <section id="expense" className="sec ">
        <div className="inner">
          <div className=" bg_n0 item bg_pm mt_md " style={{height:"50vh", overflowY:"scroll"}}>
            {messages.map((msg, index) => (
              <p
                key={index}
                style={{
                  textAlign: msg.sender === "user" ? "right" : "left",
                }}
              >
                <div
                  style={{
                    textAlign: msg.sender === "user" ? "right" : "left",
                    padding: "8px",
                    margin: "5px 0",
                    borderRadius: "10px",
                    background: msg.sender === "user" ? "#DCF8C6" : "#EAEAEA",
                    display: "inline-block",
                    maxWidth: "70%",
                  }}
                >
                  {msg.text}
                </div>
              </p>
            ))}
          </div>
          <div className=" bg_n0 item mt_md ">
            <input
              className="item input-txt fs_md width100"
              value={input}
              placeholder="입력해주세요"
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <button onClick={sendMessage} className="display_none">
              보내기
            </button>
          </div>
        </div>
      </section>
  );
}

export default Chatbot;
