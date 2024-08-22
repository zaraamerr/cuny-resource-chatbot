import React, { Component } from "react";
import "./../components/SideBar.css";

class SideBar extends Component {
  render() {
    return (
      <div className="side-bar">
        <p style={{ textTransform: "uppercase" }}>
          <span style={{ fontWeight: "bold" }}>Hunter </span>Essentials
        </p>
        <div className="content">
          <button className="new-chat">+</button>
          <span className="new-chat-text">New Chat</span>
        </div>
      </div>
    );
  }
}

export default SideBar;