import React, { useState,useEffect } from 'react';
import "../CheckInOut.css";
import axios from 'axios';
import {BACKEND_URL} from '../config';


function GymCheckInOut() {
  const [customers, setCustomers] = useState(['Chandu', 'Varsha', 'Gautam', 'Ilyas']);
  const [activeCustomers, setActiveCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState('');
  const [selectedUser, setSelectedUser] = useState('');//selectedCustomer
  const [users,setUsers]=useState([]);//customers
  const [nullcicos,setNullCicos]=useState([]);//activecustomer
  const location=JSON.parse(window.sessionStorage.getItem("location"));


  useEffect(()=>{
    getUsers();
    getNullCicos();
  },[location])


  
  const getUsers=async()=>{
    const res=await axios.get(
      `${BACKEND_URL}/api/getUsersByLocation/${location}`
    ).catch(err=>console.log(err))
    const data=await res.data;
    setUsers(data.user);
    console.log("Users",data.user)
    return data;
  }

  const getNullCicos=async()=>{
    const res=await axios.get(
      `${BACKEND_URL}/cico/viewNullCicos/${location}`
    ).catch(err=>console.log(err))
    const data=await res?.data;
    setNullCicos(data);
    return data;
  }
  console.log("AC:",nullcicos)
  console.log("SU",selectedUser)

  const handleCheckIn = async() => {
    const customer = selectedUser;
    const checkintime = new Date();
    setActiveCustomers([...nullcicos, { customer, checkintime }]);
    const res=await axios.post(`${BACKEND_URL}/cico/addCico`,{
            email:customer,
            location:location,
            checkintime:checkintime,
            checkouttime:null
        }).catch(err=>console.log(err))
        const data=await res.data;
        return data;
  };

  const check=async()=>{
    await handleCheckIn().then(()=>{
      window.location.reload();
    })
  }

  useEffect(()=>{

  },[selectedUser,handleCheckIn,activeCustomers,nullcicos,setNullCicos])

  const handleCheckOut = async(index) => {
    const checkOutTime = new Date();
    const { email,checkintime } = nullcicos[index];///editCico/:email
    const checkInOutObject = {
      email,
      checkintime,
      checkouttime: checkOutTime.toISOString()
    };
    //setActiveCustomers(activeCustomers.filter((_, i) => i !== index));
    setNullCicos(nullcicos.filter((_, i) => i !== index));
    console.log(checkInOutObject);
    await axios.put(`${BACKEND_URL}/cico/editCico/${email}`,{
            checkintime:checkInOutObject.checkintime,
            checkouttime:checkInOutObject.checkouttime
        }).catch(err=>console.log(err))
  };

  return (
    <div>
      <h1> Gym Check-In/Check-Out</h1>
      <label htmlFor="customers">Select a customer:</label>
      <select
        id="users"
        value={selectedUser}
        onChange={(e) => {setSelectedUser(e.target.value);console.log("UV:",e.target.value)}}
      >
        <option value="">Select a customer </option>
        {users.map((customer) => (
          <option key={customer._id} value={customer.email}>
            {customer.firstname}
          </option>
        ))}
      </select> 
      <button onClick={check}> Check In </button>
      <h2>Active Customers:</h2>
      {nullcicos && <ul>
        {nullcicos.map((activeCustomer, index) => (
          <li key={index}>
            {activeCustomer.email} checked in at {activeCustomer.checkintime}
            <button onClick={() => handleCheckOut(index)}>Check Out</button>
          </li>
        ))}
      </ul>}
    </div>
  );
}

export default GymCheckInOut;