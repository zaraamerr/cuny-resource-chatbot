import React, { Component } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./../components/MainContent.css";

class MainContent extends Component {
  render() {
    return (
      <div className="text-input">
        <input
          style={{backgroundColor: "#D6CAE3" }}
          type="text"
          placeholder="Enter Inquiry Here"
        />
        <button class="send-button" style={{ backgroundColor: "#2F124F" }}>
          <i style={{ color: "#FFC72A" }} class="far fa-paper-plane"></i>
        </button>
      </div>
    );
  }
}

export default MainContent;
