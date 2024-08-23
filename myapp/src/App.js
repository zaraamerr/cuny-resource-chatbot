import SideBar from "./components/SideBar";
import MainContent from './components/MainContent';
import InfoPanel from "./components/InfoPanel";
import EventsCalendar from "./components/EventsCalendar";
import './App.css';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


function App() {
    return (
        <Router>
            <div className="App">
                <SideBar />
                <Routes>
                    <Route path="/" element={<><MainContent /><InfoPanel /></>} />
                    <Route path="/events-calendar" element={<EventsCalendar />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
