import React, {useState} from 'react';
import './App.css';
import logo from './logo.svg';
import HomePage from "./Components/HomePage";
import Login from './Pages/Login';
import Navbar from "./Components/Navbar";
import Registration from "./Pages/Registration";
import { Route,Routes } from "react-router-dom";
import UserHome from "./Pages/UserHome";
import GymCheckInOut from './Components/CheckInOut';
import TimeSlotInput from './Components/TimeSlot';
import AdminHome from "./Pages/Admin";

function App() {
  const locationOptions = [
    { value: 'Downtown', label: 'Downtown' },
    { value: 'Milpitas', label: 'Milpitas' },
    { value: 'Sunnyvale', label: 'Sunnyvale' },
  ];  
  const [selectedLocation, setSelectedLocation] = useState(locationOptions[0].value);
  

  function handleLocationChange(value) {
    setSelectedLocation(value);
  }

  return (
    <div className="App">
        <Navbar selectedLocation={selectedLocation} handleLocationChange={handleLocationChange} />
        <Routes>
          <Route path='/' element={<HomePage selectedLocation={selectedLocation} />}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/signup' element={<Registration/>}/>
          <Route path='/user' element={<UserHome selectedLocation={selectedLocation}/>}/>
          <Route path='/admin' element={<AdminHome/>}/>
          <Route path='/machinelogs' element={<TimeSlotInput/>}/>
          <Route/>
        </Routes>
      </div>

  );
}

export default App;
