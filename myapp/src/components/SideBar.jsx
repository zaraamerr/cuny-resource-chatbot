import React, { Component } from "react";
import "./../components/SideBar.css";

// only add a new chat if they entered at least one prompt 
// when adding one prompt it should change the name of new chat
function addNewChat(){

};
class SideBar extends Component {
  render() {
    return (
      <div className="side-bar">
        <p style={{ textTransform: "uppercase" }}>
          <span style={{ fontWeight: "bold" }}>Hunter </span>Essentials
        </p>
        <div className="content">
          <button className="new-chat" onClick={addNewChat()}>+</button>
          <span className="new-chat-text">New Chat</span>
        </div>
      </div>
    );
  }
};

export default SideBar;