import SideBar from './components/SideBar';
import MainContent from './components/MainContent';
import InfoPanel from "./components/InfoPanel";
import CalendarApp from "./components/CalendarApp";
import './App.css';


function App() {
  return (
    <div className="App">
      <SideBar></SideBar>
      <MainContent></MainContent>
      <InfoPanel></InfoPanel>
      <CalendarApp></CalendarApp>
    </div>
  );
}

export default App;
