import React from 'react';
import "./../components/CalendarApp.css";

const Calendar = ({ year, month }) => {
    // Days of the week
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    // Get the first and last day of the month
    const firstDay = new Date(year, month, 1).getDay();
    const lastDate = new Date(year, month + 1, 0).getDate();

    const days = [];
    let day = 1;

    // Add empty cells for days before the 1st of the month
    for (let i = 0; i < firstDay; i++) {
        days.push(<td key={`empty-${i}`} className="empty"></td>);
    }

    // Add cells for each day in the month
    for (day; day <= lastDate; day++) {
        days.push(<td key={day}>{day}</td>);
    }

    // Fill in the remaining cells for the last row
    const remainingDays = (firstDay + lastDate) % 7;
    if (remainingDays !== 0) {
        for (let i = remainingDays; i < 7; i++) {
            days.push(<td key={`remaining-${i}`} className="empty"></td>);
        }
    }

    // Split days array into rows
    const rows = [];
    for (let i = 0; i < days.length; i += 7) {
        rows.push(<tr key={`row-${i}`}>{days.slice(i, i + 7)}</tr>);
    }

    return (
        <table className="table-calendar">
            <thead>
                <tr>
                    {daysOfWeek.map((day, index) => (
                        <th key={index}>{day}</th>
                    ))}
                </tr>
            </thead>
            <tbody>{rows}</tbody>
        </table>
    );
};

const CalendarApp = () => {
    const now = new Date();
    return (
        <div className="App">
            <Calendar year={now.getFullYear()} month={now.getMonth()} />
        </div>
    );
};

export default CalendarApp;
