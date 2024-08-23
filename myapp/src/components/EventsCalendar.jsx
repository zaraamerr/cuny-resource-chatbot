import React, { useState } from "react";
import SideBar from "./SideBar";
import Calendar from "react-calendar";
import './EventsCalendar.css';

function EventsCalendar() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [events, setEvents] = useState([
    { date: new Date(2024, 7, 22), title: "Hackathon Kickoff", description: "Join us for the start of the hackathon!" },
    { date: new Date(2024, 7, 23), title: "Workshop: AI in Healthcare", description: "Learn about AI's role in healthcare." },
    { date: new Date(2024, 7, 24), title: "Networking Event", description: "Meet and connect with other professionals." },
    { date: new Date(2024, 7, 25), title: "Final Presentations", description: "Watch the final project presentations." },
  ]);

  const onDateChange = (date) => {
    setSelectedDate(date);
  };

  const getTileContent = ({ date, view }) => {
    if (view === 'month') {
      const event = events.find(event =>
        event.date.getDate() === date.getDate() &&
        event.date.getMonth() === date.getMonth() &&
        event.date.getFullYear() === date.getFullYear()
      );
      return event ? <span className="event-marker">•</span> : null;
    }
  };

  const filteredEvents = events.filter(
    (event) =>
      selectedDate &&
      event.date.getDate() === selectedDate.getDate() &&
      event.date.getMonth() === selectedDate.getMonth() &&
      event.date.getFullYear() === selectedDate.getFullYear()
  );

  return (
    <div className="events-calendar">
      <SideBar />
      <div className="calendar-content">
        <h1>Events Calendar</h1>
        <div className="calendar">
          <Calendar
            onChange={onDateChange}
            value={selectedDate}
            tileContent={getTileContent}
          />
        </div>
        <div className="event-info-panel">
          <h2>Event Details</h2>
          {filteredEvents.length > 0 ? (
            <ul className="event-list">
              {filteredEvents.map((event, index) => (
                <li key={index} className="event-item">
                  <h2>{event.title}</h2>
                  <p>{event.description}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p>No events for the selected date.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default EventsCalendar;
