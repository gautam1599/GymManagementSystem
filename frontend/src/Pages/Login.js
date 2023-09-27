import React,{useState} from "react";
import {Box,Button,TextField, Typography} from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { BACKEND_URL } from "../config";

const Login=()=>{
    const history=useNavigate();
    const [inputs,setInputs]=useState({
        email:'',
        password:'',
    });
    const handleChange=(e)=>{
        setInputs((prev)=>({
            ...prev,
            [e.target.name]:e.target.value,
        }))
    }
    const sendRequest=async()=>{
        const res=await axios.post(`${BACKEND_URL}/api/login`,{
            email:inputs.email,
            password:inputs.password,
        }).catch(err=>console.log(err))
        const data=await res.data;
        return data;
    }
    const handleSubmit=(e)=>{
        e.preventDefault();
        console.log(inputs);
        //sendRequest().then(()=>history("/user"));
        sendRequest().then(async()=>{
            const res=await axios.get(
              `${BACKEND_URL}/api/getUser/${inputs.email}`
            );
            console.log("USER DETAILS:",res.data.user);
            window.sessionStorage.setItem("userdetails",JSON.stringify(res.data.user));
            window.sessionStorage.setItem("isLoggedIn",true);
            if(res.data.user.role=="user"||res.data.user.role=="User"){
            history("/user");}
            else if(res.data.user.role=="admin"||res.data.user.role=="Admin"){
                history("/admin");
            }else{
                history("/");
            }
          });
    };
    return(
        <>
        <p>Login Page</p>
        <div>
            <form onSubmit={handleSubmit}>
                <Box marginLeft="auto" marginRight="auto" justifyContent="center" alignItems="center" width={300} display="flex" flexDirection="column">
                    <Typography variant='h2'>Login</Typography>
                    <TextField name='email' onChange={handleChange} value={inputs.email} variant='outlined' placeholder="Email" margin='normal'/>
                    <TextField name='password' onChange={handleChange} value={inputs.password} variant='outlined' placeholder='Password' margin='normal'/>
                </Box>
                <Button variant='contained' type='submit'>Login</Button>
            </form>
        </div>
        </>
    );
}

export default Login;