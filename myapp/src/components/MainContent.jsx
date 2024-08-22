import React, { Component } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./../components/MainContent.css";

class MainContent extends Component {
  render() {
      return (
	  <div className="main-content">
	      
	  <div className="suggestions">
              <button className="suggestion-button" style={{ backgroundColor: "#ffc72a" }}>
		  Suggestion 1
              </button>
	      <button className="suggestion-button" style={{ backgroundColor: "#ffc72a" }}>
		  Suggestion 2
              </button>
	  </div>
	
	  <div className="text-input">
              <input
		  style={{backgroundColor: "#D6CAE3" }}
		  type="text"
		  placeholder="Where can I find..."
              />
              <button className="send-button" style={{ backgroundColor: "#2F124F" }}>
		  <i style={{ color: "#FFC72A" }} className="far fa-paper-plane"></i>
              </button>
	  </div>
	      
	  </div>
      );
  }
}

export default MainContent;
