import React, { Component } from "react";
import "./../components/InfoPanel.css";

class InfoPanel extends Component {
  render() {
    return (
      <div className="infopanel-main">
        <h2>More Information</h2>
        <p>Link to Website</p>
        <p>Upcoming Events</p>
        <textarea></textarea>
      </div>
    );
  }
}

export default InfoPanel;
