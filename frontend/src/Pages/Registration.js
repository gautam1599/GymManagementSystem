import React, { useState } from 'react';
import {Box,Button,TextField, Typography, Select, MenuItem} from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { BACKEND_URL } from '../config';

const Registration=()=>{
    const history=useNavigate();
    const [inputs,setInputs]=useState({
        firstname:'',
        lastname:'',
        email:'',
        password:'',
        role:'',
        contact:'',
        location:'',
        gender:'',
        age:0,
    });
    const roleOptions = [
        { value: 'User', label: 'User' },
        { value: 'Admin', label: 'Admin' },
        { value: 'FreetrialUser', label: 'FreetrialUser' },
      ]; 
    const handleChange=(e)=>{
        setInputs((prev)=>({
            ...prev,
            [e.target.name]:e.target.value,
        }))
    }
    const sendRequest=async()=>{
        const res=await axios.post(`${BACKEND_URL}/api/signup`,{
            firstname:inputs.firstname,
            lastname:inputs.lastname,
            email:inputs.email,
            password:inputs.password,
            role:inputs.role,
            contact:inputs.contact,
            age:inputs.age,
            location:inputs.location,
            gender:inputs.gender,
        }).catch(err=>console.log(err))
        const data=await res.data;
        return data;
    }
    const handleSubmit=(e)=>{
        e.preventDefault();
        console.log(inputs);
        sendRequest().then(()=>history("/login"));
    };
    return(
        <>
        <p>Registration Page</p>
        <div>
            <form onSubmit={handleSubmit}>
                <Box marginLeft="auto" marginRight="auto" justifyContent="center" alignItems="center" width={300} display="flex" flexDirection="column">
                    <Typography variant='h2'>Sign Up</Typography>
                    <TextField name='firstname' onChange={handleChange} value={inputs.firstname} variant='outlined' placeholder='FirstName' margin='normal'/>
                    <TextField name='lastname' onChange={handleChange} value={inputs.lastname} variant='outlined' placeholder="LastName" margin='normal'/>
                    <TextField name='email' onChange={handleChange} value={inputs.email} variant='outlined' placeholder="Email" margin='normal'/>
                    <TextField name='password' onChange={handleChange} value={inputs.password} variant='outlined' placeholder='Password' margin='normal'/>
                    {/* <TextField name='role' onChange={handleChange} value={inputs.role} variant='outlined' placeholder='Role' margin='normal'/> */}
                    <Select
                    name="role"
                    value={inputs.role}
                    label="Role"
                    onChange={handleChange}
                    >
                        {roleOptions.map(option => (
                        <MenuItem value={option.value}>{option.label}</MenuItem>
                        ))}
                    </Select>
                    <TextField name='contact' onChange={handleChange} value={inputs.contact} variant='outlined' placeholder="Contact" margin='normal'/>
                    <TextField name='location' onChange={handleChange} value={inputs.location} variant='outlined' placeholder="Location" margin='normal'/>
                    <TextField name='gender' onChange={handleChange} value={inputs.gender} variant='outlined' placeholder='Gender' margin='normal'/>
                    <TextField name='age' onChange={handleChange} value={inputs.age} variant='outlined' placeholder='Age' margin='normal'/>
                </Box>
                <Button variant='contained' type='submit'>Signup</Button>
            </form>
        </div>
        </>
    );
}

export default Registration;