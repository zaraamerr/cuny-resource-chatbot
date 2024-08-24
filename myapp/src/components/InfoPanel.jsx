import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import "./../components/InfoPanel.css";
import Scroll from "./Scroll";

class InfoPanel extends Component {
  render() {
    return (
      <div className="infopanel-main">
        <h2 style={{ textAlign: "center" }}>More Information</h2>
        <p
          style={{
            paddingBottom: "35px",
            paddingTop: "25px",
            borderBottom: "1px solid",
          }}
        >
          <Link to="/events-calendar" className="infopanel-link">
            Link to Website{" "}
            <i style={{ float: "right" }} class="fa-solid fa-link"></i>
          </Link>
        </p>

        <Link to="/events-calendar" className="infopanel-link">
          <p style={{ paddingTop: "15px" }}>Upcoming Events</p>
        </Link>

        <div className="textarea">
          <Scroll></Scroll>
        </div>
      </div>
    );
  }
}

export default InfoPanel;
