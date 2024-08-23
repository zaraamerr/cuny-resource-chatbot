import React from "react";
import { useState } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./../components/MainContent.css";

const MainContent = () => {
  const [inputValue, setInputValue] = useState("");
  const [output, setOutput] = useState("");

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    console.log(e.target.value);
  };

  const handleSendMessage = async () => {
    const url = "http://localhost:5000/message";
    const payload = {
      message: inputValue.trim(),
    };
    console.log(payload);

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    console.log(response);

    if (!response.ok) {
      console.log("Error in request: ", response.statusText);
    }

    const data = await response.json();
    setOutput(data.response);
    console.log(data.response);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      handleSendMessage();
    }
  };

  return (
    <div className="main-content">
      <div className="suggestions">
        <button
          className="suggestion-button"
          style={{ backgroundColor: "#ffc72a" }}
        >
          Suggestion 1
        </button>
        <button
          className="suggestion-button"
          style={{ backgroundColor: "#ffc72a" }}
        >
          Suggestion 2
        </button>
      </div>

      <div className="text-input">
        <input
          style={{ backgroundColor: "#D6CAE3" }}
          type="text"
          placeholder="Where can I find..."
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
        />
        <button
          onClick={handleSendMessage}
          className="send-button"
          style={{ backgroundColor: "#2F124F" }}
        >
          <i style={{ color: "#FFC72A" }} className="far fa-paper-plane"></i>
        </button>
      </div>
    </div>
  );
};

export default MainContent;
