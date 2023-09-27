import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, registerables} from 'chart.js';

import { Card, CardContent, Grid } from '@mui/material';
//import { DateRangePicker } from 'rsuite';
//import DateRangePicker from '@wojtekmaj/react-daterange-picker';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import CustomDatePicker from './DateRangePicker';

import axios from 'axios';
import { BACKEND_URL } from '../config';

Chart.register(...registerables);

const GymUsageDashboard = () => {
  const [usageData, setUsageData] = useState({
    day: {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      data: (Array.from({length: 7}, () => Math.floor(Math.random() * 3)+1.5)),
    },
    week: {
      labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
      data: (Array.from({length: 4}, () => Math.floor(Math.random() * 10)+18)),
    },
    month: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      data: (Array.from({length: 12}, () => Math.floor(Math.random() * 200)+60)),
    },
  });

  const options = {
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Hours',
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

  //const [value, onChange] = useState([new Date(), new Date()]);

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const handleStartDateChange = (date) => {
    setStartDate(date);
  };

  const handleEndDateChange = (date) => {
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
      <h3>Gym Usage Analytics Dashboard</h3>
      {/* <div className="field"><DateRangePicker /></div> */}
      {/* <div>
      <DateRangePicker onChange={onChange} value={value} />
    </div> */}

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
          <h5>Usage by Day</h5>
                <Line data={{
                  labels: usageData.day.labels,
                  datasets: [{
                    label: 'Hours',
                    data: usageData.day.data,
                    fill: false,
                    borderColor: 'rgb(75, 192, 192)',
                    tension: 0.1,
                  }]
                }} options={options} />
          </Grid>

          <Grid item xs={12} sm={4}>
          <h5>Usage by Week</h5>
              <Line data={{
                labels: usageData.week.labels,
                datasets: [{
                  label: 'Hours',
                  data: usageData.week.data,
                  fill: false,
                  borderColor: 'rgb(255, 99, 132)',
                  tension: 0.1,
                }]
              }} options={options} />

          </Grid>


          <Grid item xs={12} sm={4}>
          <h5>Usage by Month</h5>
            <Line data={{
              labels: usageData.month.labels,
              datasets: [{
                label: 'Hours',
                data: usageData.month.data,
                fill: false,
                borderColor: 'rgb(54, 162, 235)',
                tension: 0.1,
              }]
            }} options={options} />
          </Grid>

          </Grid>
          </CardContent>
    </Card>


      
      
      
    </div>
  );
};

export default GymUsageDashboard;
