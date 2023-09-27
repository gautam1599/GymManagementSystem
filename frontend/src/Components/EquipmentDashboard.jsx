import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import CustomDatePicker from './DateRangePicker';
import axios from 'axios';
import { BACKEND_URL } from '../config';

const EquipmentAnalyticsDashboard = () => {
  const [chartData, setChartData] = useState({
    labels: ['Treadmill', 'Cycling', 'Stair machines', 'Weight training','Rowing machine', 'Elliptical'],
    datasets: [
      {
        label: 'Time spent (hours)',
        data: (Array.from({length: 6}, () => Math.floor(Math.random() * 20)+0.5)),
        backgroundColor: ['#5b9bd5', '#ed7d31', '#a5a5a5', '#ffc000']
      }
    ]
  });

  const [chartOptions, setChartOptions] = useState({
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true,
          fontColor: '#6c757d'
        },
        gridLines: {
          color: '#e5e5e5'
        }
      }],
      xAxes: [{
        ticks: {
          fontColor: '#6c757d'
        },
        gridLines: {
          color: '#e5e5e5'
        }
      }]
    },
    legend: {
      labels: {
        fontColor: '#6c757d'
      }
    }
  });

  const [selectedInterval, setSelectedInterval] = useState('month');
  const [intervalData, setIntervalData] = useState({
    month: (Array.from({length: 6}, () => Math.floor(Math.random() * 20)+10)),
    week: (Array.from({length: 6}, () => Math.floor(Math.random() * 10)+2)),
    hour: (Array.from({length: 6}, () => Math.floor(Math.random() * 2)+0.25))
  });

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  useEffect(() => {
    // Simulating data fetching from server
    setTimeout(() => {
      setChartData(prevChartData => {
        return {
          ...prevChartData,
          datasets: [
            {
              ...prevChartData.datasets[0],
              data: intervalData.month
            }
          ]
        }
      });
      setSelectedInterval('month');
    }, 1000);
  }, []);

  const handleIntervalChange = (interval) => {
    setChartData(prevChartData => {
      return {
        ...prevChartData,
        datasets: [
          {
            ...prevChartData.datasets[0],
            data: intervalData[interval]
          }
        ]
      }
    });
    setSelectedInterval(interval);
  };

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
    const res = await axios.post(`${BACKEND_URL}/log/getLogsByDateRange`, { 
      startdate: startDate.toISOString(),
      enddate: endDate.toISOString(),
      location: "Milpitas",
      machinetype: "WeightTraining"
    });
    console.log("API RESP",res);
  };

  const handleFetchData = () => {
    fetchData(startDate, endDate);
  };

  return (
    <div className="card">
      <h3 className="card-header bg-white border-bottom-0">
        Equipment Analytics Dashboard
        <div>
      <h5>Start Date:</h5>
      <CustomDatePicker
        startDate={startDate}
        handleStartDateChange={handleStartDateChange}
        endDate={endDate}
      />
      <h5>End Date:</h5>
      <CustomDatePicker
        startDate={endDate}
        handleStartDateChange={handleEndDateChange}
        endDate={endDate}
      />
    </div>
    <div>
      <button onClick={fetchData}>Fetch Data</button>
    </div>
        <div className="btn-group float-right" role="group">
          <button
            type="button"
            className={`btn btn-secondary ${selectedInterval === 'hour' ? 'active' : ''}`}
            onClick={() => handleIntervalChange('hour')}
          >
            Hour
          </button>
          <button
            type="button"
            className={`btn btn-secondary ${selectedInterval === 'week' ? 'active' : ''}`}
            onClick={() => handleIntervalChange('week')}
          >
            Week
          </button>
          <button
            type="button"
            className={`btn btn-secondary ${selectedInterval === 'month' ? 'active' : ''}`}
            onClick={() => handleIntervalChange('month')}
          >
            Month
          </button>
        </div>
      </h3>
      <div className="card-body" style={{ width: '900px', height: '300px' }}>
        <Bar data={chartData} options={chartOptions} />
      </div>
    </div>
  );
};

export default EquipmentAnalyticsDashboard;