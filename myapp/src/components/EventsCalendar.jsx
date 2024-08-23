import React, { useState } from "react";
import SideBar from "./SideBar";
import Calendar from "react-calendar";
import './EventsCalendar.css';

function EventsCalendar() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [events] = useState([
      { date: new Date(2024, 7, 22), title: "Workshop: Your Financial Aid", description: "Join us to learn all you need to know about your financial aid account!" },
      { date: new Date(2024, 7, 22), title: "Info Session: Food Security at Hunter", description: "Join us for an info session about our food pantry and food security initiatives." },
    { date: new Date(2024, 7, 23), title: "Info Session: Students & Healthcare", description: "Learn about how you can take advantage of healthcare benefits." },
    { date: new Date(2024, 7, 24), title: "Networking Event", description: "Meet and connect with other students." },
      { date: new Date(2024, 7, 25), title: "Info Session: Food Security at Hunter", description: "Join us for an info session about our food pantry and food security initiatives." },
      { date: new Date(2024, 7, 26), title: "Waitlist is Removed for Fall 2024", description: "The waitlist is removed for the Fall 2024 semester.", link: "https://hunter.cuny.edu/event/waitlist-is-removed-for-fall-2024/" },
    { date: new Date(2024, 7, 26, 14, 30), title: "Club Registration Information Session", description: "Information session for club registration.", link: "https://hunter.cuny.edu/event/club-registration-information-session/" },
    { date: new Date(2024, 7, 26, 18, 0), title: "Club Registration Information Session", description: "Information session for club registration.", link: "https://hunter.cuny.edu/event/club-registration-information-session-2/" },
    { date: new Date(2024, 7, 27), title: "Course Drop Deadline", description: "Deadline to drop courses for the Fall 2024 semester.", link: "https://hunter.cuny.edu/event/course-drop-deadline-11/" },
    { date: new Date(2024, 7, 27, 14, 30), title: "Greek Letter Organization Clubs Information Session", description: "Information session for Greek Letter Organization Clubs.", link: "https://hunter.cuny.edu/event/greek-letter-organization-clubs-information-session/" },
    { date: new Date(2024, 7, 27, 17, 30), title: "Study Abroad 101 Webinars", description: "Introductory webinar for study abroad programs.", link: "https://hunter.cuny.edu/event/study-abroad-101-webinars-5/" },
    { date: new Date(2024, 7, 27, 18, 0), title: "Club Registration Information Session", description: "Information session for club registration.", link: "https://hunter.cuny.edu/event/club-registration-information-session-3/" },
    { date: new Date(2024, 7, 28), title: "Fall 2024 Semester Begins", description: "First day of classes for Fall 2024.", link: "https://hunter.cuny.edu/event/fall-2024-semester-begins/" },
    { date: new Date(2024, 7, 30, 13, 0), title: "Study Abroad 101 Webinars", description: "Introductory webinar for study abroad programs.", link: "https://hunter.cuny.edu/event/study-abroad-101-webinars-6/" },
    { date: new Date(2024, 8, 1), title: "Degrees Are Conferred for Summer 2024", description: "Degrees are officially conferred for Summer 2024 graduates.", link: "https://hunter.cuny.edu/event/degrees-are-conferred-summer-2024/" }
      
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
      <div className="calendar-container">
        <h1 className="calendar-header">Events Calendar</h1>
        <div className="calendar">
          <Calendar
            onChange={onDateChange}
            value={selectedDate}
            tileContent={getTileContent}
          />
        </div>
      </div>
      <div className="event-info-panel">
        <h2>Event Details</h2>
        {filteredEvents.length > 0 ? (
          <ul className="event-list">
            {filteredEvents.map((event, index) => (
              <li key={index} className="event-item">
                <h2>{event.title}</h2>
                  <p>{event.description}</p>
		  <a href={event.link} target="_blank" rel="noopener noreferrer">More Info</a>
              </li>
            ))}
          </ul>
        ) : (
          <p>No events for the selected date.</p>
        )}
      </div>
    </div>
  );
}

export default EventsCalendar;
