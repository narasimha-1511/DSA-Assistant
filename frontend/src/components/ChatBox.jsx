import React, { useEffect, useRef, useState } from "react";
import "./css/chatbox.css";

const ChatBox = () => {
  const animation = useRef(null);
  const chatBox = useRef(null);
  const [isCustomDoubt, SetIsCustomDoubt] = useState(false);
  const [selectedOption, setSelectedOption] = useState("intuitions");
  const [leetcodeUrl, setLeetCodeUrl] = useState("");
  const [userInput, setUserInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    animation.current.style.display = "block";

    if (!ValidateUrl(leetcodeUrl)) {
      addMessage("Invalid URL", true);
      animation.current.style.display = "none";
      return;
    }

    if (isCustomDoubt && (userInput === "" || userInput.length < 10)) {
      addMessage("Message must atleast be 10 charecters", true);
      animation.current.style.display = "none";
      return;
    }

    const userMessage = `<a href="${leetcodeUrl}" target="_blank">${leetcodeUrl}</a><br>${userInput}`;
    addMessage(userMessage);

    getDataFromBackend(
      leetcodeUrl,
      isCustomDoubt ? userInput : selectedOption
    ).then((data) => {
      console.log(data);
      animation.current.style.display = "none";
    });

    setLeetCodeUrl("");
    setUserInput("");
  };

  const getDataFromBackend = async (url, message) => {
    // https://assignment-i3ww.vercel.app/
    const response = await fetch("https://assignment-i3ww.vercel.app/api", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url: url, prompt: message }),
    });

    const data = await response.json();
    return data;
  };

  return (
    <div className="chat-container">
      <div ref={chatBox} className="chat-messages">
        <div className="message bot-message">Hello, how can I assist you?</div>
        <div ref={animation} id="loading-animation" style={{ display: "none" }}>
          <div id="loader"></div>
        </div>
        <div className="message user-message"> kafskajbf</div>
      </div>
      <form className="chat-input" onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            value={leetcodeUrl}
            onChange={(e) => setLeetCodeUrl(e.target.value)}
            placeholder="Enter LeetCode URL"
          />
        </div>
        <div>
          <label htmlFor="checkbox">Custom Doubt ?</label>
          <input
            type="checkbox"
            onChange={(e) => SetIsCustomDoubt(e.target.checked)}
          />
        </div>
        {isCustomDoubt ? (
          <div>
            <input
              type="text"
              id="user-input"
              placeholder="Type your Doubt..."
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
            />
          </div>
        ) : (
          <div>
            <label htmlFor="options">Select what you need:</label>
            <select
              id="options"
              value={selectedOption}
              onChange={(e) => setSelectedOption(e.target.value)}
            >
              <option value="intuitions">Intuitions</option>
              <option value="pseudocode">Pseudocode</option>
              <option value="examples">Examples</option>
              <option value="hints">Hints</option>
            </select>
          </div>
        )}
        <button id="send-button">Send</button>
      </form>
    </div>
  );

  function addMessage(message, isBot = false) {
    if (isBot) {
      let botMessage = document.createElement("div");
      botMessage.classList.add("message");
      botMessage.classList.add("bot-message");

      botMessage.innerHTML = message;
      chatBox.current.appendChild(botMessage);
    } else {
      let userMessage = document.createElement("div");
      userMessage.classList.add("message");
      userMessage.classList.add("user-message");

      userMessage.innerHTML = message;
      chatBox.current.appendChild(userMessage);
    }
  }

  function ValidateUrl(url) {
    var pattern = new RegExp(
      "^(https?:\\/\\/)?" + // protocol
        "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
        "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
        "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
        "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
        "(\\#[-a-z\\d_]*)?$",
      "i"
    ); // fragment locator
    if (!pattern.test(url)) {
      return false;
    } else {
      if (url.includes("leetcode.com")) return true;
      else return false;
    }
  }
};

export default ChatBox;
