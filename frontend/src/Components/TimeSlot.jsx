import React, { useState } from "react";
import "../TimeSlotInput.css";
import axios from "axios";
import { BACKEND_URL } from "../config";

const TimeSlotInput = () => {
  const [machine, setMachine] = useState("");
  const [hours, setHours] = useState("");
  const [date, setDate] = useState("");
  const [timeSlots, setTimeSlots] = useState([]);
  let userdetails=JSON.parse(window.sessionStorage.getItem("userdetails"));
  let location=JSON.parse(window.sessionStorage.getItem("location"))

  const handleMachineChange = (event) => {
    setMachine(event.target.value);
  };

  const handleHoursChange = (event) => {
    setHours(event.target.value);
  };

  const handleDateChange = (event) => {
    setDate(event.target.value);
  };

  const sendRequest=async()=>{
    console.log("locationTesttt:",location);
    const res=await axios.post(`${BACKEND_URL}/log/addLog`,{
        location:location,
        machinetype:machine,
        email:userdetails?.email,
        date:date,
        hours:hours,
    }).catch(err=>console.log(err))
    const data=await res.data;
    return data;
}

  const handleSubmit = (event) => {
    event.preventDefault();
    const timeSlot = {
      machinetype: machine,
      hours: hours,
      date: date,
    };
    setTimeSlots([...timeSlots, timeSlot]);
    setMachine(machine);
    setHours(hours);
    setDate(date);
    sendRequest().then(()=>console.log("Submitted logs!"));
  };

  const displayTimeSlots = () => {
    console.log(timeSlots);
  };

  return (
    <div className="time-slot-input">
      <h2>Equipment Time Slots</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label>Equipment : </label>
          <select value={machine} onChange={handleMachineChange}>
            <option value=""></option>
            <option value="Treadmill">Treadmill</option>
            <option value="Elliptical">Elliptical</option>
            <option value="Bike">Bike</option>
          </select>
        </div>
        <div className="input-group">
          <label>Date : </label>
          <input
            type="date"
            value={date}
            onChange={handleDateChange}
          />
        </div>
        <div className="input-group">
          <label>Hours : </label>
          <input
            type="number"
            value={hours}
            onChange={handleHoursChange}
            step="0.5"
            min="0"
            max="24"
          />
        </div>
        
        <button type="submit">Submit</button>
      </form>
      <button onClick={displayTimeSlots}>Display Time Slots</button>
      {timeSlots.length > 0 && (
        <div className="time-slots-container">
          <h3>Time Slots:</h3>
          {timeSlots.map((timeSlot, index) => (
            <div key={index} className="time-slot">
              <span>{timeSlot.machinetype} - </span>
              <span>{timeSlot.hours} hours</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TimeSlotInput;
