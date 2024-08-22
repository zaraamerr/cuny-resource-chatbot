import React, { Component } from "react";
import "./../components/InfoPanel.css";

class InfoPanel extends Component {
  render() {
    return (
      <div className="infopanel-main">
        <h2 style={{textAlign:"left"}}>More Information</h2>
          <p style={{paddingBottom: "15px", borderBottom: "1px solid"}}>
            Link to Website <i style={{float: "right"}} class="fa-solid fa-link"></i>
          </p>

        <p style={{paddingTop: "35px"}}>Upcoming Events</p>
        <textarea></textarea>
      </div>
    );
  }
}

export default InfoPanel;