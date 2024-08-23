import React, { useEffect, useState } from 'react';
import './Scroll.css';

function Scroll() {
    const [events, setEvents] = useState([
        {
          "dateTime": "Aug 26, 2024",
          "title": "Waitlist is Removed for Fall 2024",
          "link": "https://hunter.cuny.edu/event/waitlist-is-removed-for-fall-2024/"
        },
        {
          "dateTime": "Aug 26, 2024 | 2:30 pm - 3:30 pm",
          "title": "Club Registration Information Session",
          "link": "https://hunter.cuny.edu/event/club-registration-information-session/"
        },
        {
          "dateTime": "Aug 26, 2024 | 6:00 pm - 7:00 pm",
          "title": "Club Registration Information Session",
          "link": "https://hunter.cuny.edu/event/club-registration-information-session-2/"
        },
        {
          "dateTime": "Aug 27, 2024",
          "title": "Course Drop Deadline",
          "link": "https://hunter.cuny.edu/event/course-drop-deadline-11/"
        },
        {
          "dateTime": "Aug 27, 2024 | 2:30 pm - 3:30 pm",
          "title": "Greek Letter Organization Clubs Information Session",
          "link": "https://hunter.cuny.edu/event/greek-letter-organization-clubs-information-session/"
        },
        {
          "dateTime": "Aug 27, 2024 | 5:30 pm - 6:30 pm",
          "title": "Study Abroad 101 Webinars",
          "link": "https://hunter.cuny.edu/event/study-abroad-101-webinars-5/"
        },
        {
          "dateTime": "Aug 27, 2024 | 6:00 pm - 7:00 pm",
          "title": "Club Registration Information Session",
          "link": "https://hunter.cuny.edu/event/club-registration-information-session-3/"
        },
        {
          "dateTime": "Aug 28, 2024",
          "title": "Fall 2024 Semester Begins",
          "link": "https://hunter.cuny.edu/event/fall-2024-semester-begins/"
        },
        {
          "dateTime": "Aug 30, 2024 | 1:00 pm - 2:00 pm",
          "title": "Study Abroad 101 Webinars",
          "link": "https://hunter.cuny.edu/event/study-abroad-101-webinars-6/"
        },
        {
          "dateTime": "Sep 1, 2024",
          "title": "Degrees Are Conferred for Summer 2024",
          "link": "https://hunter.cuny.edu/event/degrees-are-conferred-summer-2024/"
        }
      ]);

    // useEffect(() => {
    //     fetch('/scrapedData.json')
    //         .then(response => response.json())
    //         .then(data => setEvents(data))
    //         .catch(error => console.error('Error fetching data:', error));
    // }, []);
    // console.log(events)

    return (
        <div className="event-list">
            {events && events.map((event, index) => (
                <div key={index} className="event-item">
                    <a href={event.link} target="_blank" rel="noopener noreferrer">
                        <h3>{event.title}</h3>
                    </a>
                    <p>{event.dateTime}</p>
                </div>
            ))}
        </div>
    );
}

export default Scroll;