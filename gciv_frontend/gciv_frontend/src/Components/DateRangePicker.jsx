import React from 'react';
import styled from 'styled-components';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const StyledDatePicker = styled(DatePicker)`
  font-family: Arial, sans-serif;
  color: #333;
  border: 2px solid #ccc;
  border-radius: 5px;
  padding: 10px;
  &:focus {
    outline: none;
    border: 2px solid #007bff;
  }
`;

const CustomDatePicker = ({ startDate, handleStartDateChange, endDate }) => {
  return (
    <StyledDatePicker
      selected={startDate}
      onChange={handleStartDateChange}
      selectsStart
      startDate={startDate}
      endDate={endDate}
    />
  );
};

export default CustomDatePicker;
