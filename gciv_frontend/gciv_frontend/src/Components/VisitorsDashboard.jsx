import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';

import { Chart, registerables} from 'chart.js';

import { Card, CardContent, Grid } from '@mui/material';

import CustomDatePicker from './DateRangePicker';

import axios from 'axios';
import { BACKEND_URL } from '../config';

Chart.register(...registerables);

const VisitorAnalyticsDashboard = () => {
  const [visitorData, setVisitorData] = useState({
    hourly: {
      labels: ['12 AM', '1 AM', '2 AM', '3 AM', '4 AM', '5 AM', '6 AM', '7 AM', '8 AM', '9 AM', '10 AM', '11 AM', '12 PM', '1 PM', '2 PM', '3 PM', '4 PM', '5 PM', '6 PM', '7 PM', '8 PM', '9 PM', '10 PM', '11 PM'],
      data: (Array.from({length: 24}, () => Math.floor(Math.random() * 10)+0.5)),
    },
    weekday: {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
      data: (Array.from({length: 5}, () => Math.floor(Math.random() * 25)+140)),
    },
    weekend: {
      labels: ['Sat', 'Sun'],
      data: (Array.from({length: 2}, () => Math.floor(Math.random() * 30)+200)),
    },
  });

  const options = {
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Count',
        },
      },
      x: {
        title: {
          display: true,
          text: 'Time Period',
        },
      },
    },
    plugins: {
      legend: {
        position: 'bottom',
      },
    },
  };
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const handleStartDateChange = date => {
    setStartDate(date);
  };

  const handleEndDateChange = date => {
    setEndDate(date);
  };


  const fetchData = async() => {
    window.location.reload();
    const queryParams = {
      startdate: startDate.toISOString(),
      enddate: endDate.toISOString(),
      location: 'your-location',
      machinetype: 'your-machine-type'
    };
    //console.log("startDate.toISOString()",startDate.toISOString());
    const res=await axios.post(`${BACKEND_URL}/log/getLogsByDateRange`, { 
      startdate: startDate.toISOString(),
      enddate: endDate.toISOString(),
    location: "Milpitas",
    machinetype: "WeightTraining" })
    console.log("API RESP",res);
      // .then(response => {
      //   // Handle the fetched data
      //   console.log("API RESP",response.data);
      // })
      // .catch(error => {
      //   console.log(error);
      // });
  };


  return (
    <div>
      
      
      <h3>Visitor Analytics Dashboard</h3>
      <div>
      <div>
      <h5>Start Date:</h5>
      <CustomDatePicker
        startDate={startDate}
        handleStartDateChange={handleStartDateChange}
      />
      <h5>End Date:</h5>
      <CustomDatePicker
        handleStartDateChange={handleEndDateChange}
        startDate={endDate}
      />
    </div>
      <button onClick={fetchData}>Fetch Data</button>
    </div>

      <Card sx={{ maxWidth: 936, margin: 'auto', padding: '20px' }}>
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={19} sm={4}>
          <h5>Visitors by Hour</h5>
              <Bar data={{
                labels: visitorData.hourly.labels,
                datasets: [{
                  label: 'Visitors',
                  data: visitorData.hourly.data,
                  backgroundColor: 'rgb(75, 192, 192)',
                }]
      }} options={options} />
          </Grid>
          <Grid item xs={12} sm={4}>
          <h5>Visitors by Weekday</h5>
            <Bar data={{
              labels: visitorData.weekday.labels,
              datasets: [{
                label: 'Visitors',
                data: visitorData.weekday.data,
                backgroundColor: 'rgb(255, 99, 132)',
              }]
            }} options={options} />

          </Grid>
          <Grid item xs={12} sm={4}>
          <h5>Visitors by Weekend</h5>
          <Bar data={{
            labels: visitorData.weekend.labels,
            datasets: [{
              label: 'Visitors',
              data: visitorData.weekend.data,
              backgroundColor: 'rgb(54, 162, 235)',
            }]
          }} options={options} />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
      
      
    </div>
  );
};

export default VisitorAnalyticsDashboard;




// return (
//   <div>
//     <h2>Visitor Analytics Dashboard</h2>
//     <h5>Visitors by Hour</h5>
//     <Bar data={{
//       labels: visitorData.hourly.labels,
//       datasets: [{
//         label: 'Visitors',
//         data: visitorData.hourly.data,
//         backgroundColor: 'rgb(75, 192, 192)',
//       }]
//     }} options={options} />
//     <h5>Visitors by Weekday</h5>
//     <Bar data={{
//       labels: visitorData.weekday.labels,
//       datasets: [{
//         label: 'Visitors',
//         data: visitorData.weekday.data,
//         backgroundColor: 'rgb(255, 99, 132)',
//       }]
//     }} options={options} />
//     <h5>Visitors by Weekend</h5>
//     <Bar data={{
//       labels: visitorData.weekend.labels,
//       datasets: [{
//         label: 'Visitors',
//         data: visitorData.weekend.data,
//         backgroundColor: 'rgb(54, 162, 235)',
//       }]
//     }} options={options} />
//   </div>
// );
// };

// export default VisitorAnalyticsDashboard;
