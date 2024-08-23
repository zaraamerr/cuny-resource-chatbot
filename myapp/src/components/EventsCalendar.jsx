import React from "react";
import SideBar from "./SideBar";
import "./EventsCalendar.css";

function EventsCalendar() {
  return (
    <div className="events-calendar">
      <SideBar />
      <div className="calendar-content">
        <h1>Events Calendar</h1>
        {/* Add your calendar or event content here */}
      </div>
    </div>
  );
}

export default EventsCalendar;
