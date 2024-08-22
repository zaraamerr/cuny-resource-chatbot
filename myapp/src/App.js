import SideBar from './components/SideBar';
import MainContent from './components/MainContent';
import InfoPanel from "./components/InfoPanel";
import './App.css';


function App() {
  return (
    <div className="App">
      <SideBar></SideBar>
      <MainContent></MainContent>
      <InfoPanel></InfoPanel>
    </div>
  );
}

export default App;
