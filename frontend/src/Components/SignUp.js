import React,{useState} from "react";
import { BACKEND_URL } from "../config";


const SignUp = () =>{
    const [name,setName]=useState("");
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");

    async function registerUser(event){
        event.preventDefault();
        const response = await fetch(`${BACKEND_URL}/api/register`,{
            method:'POST',
            headers:{
                'Content-Type':'application/json',
            },
            body:JSON.stringify({
                name,
                email,
                password,
            })
        })

        const data=await response.json();
        console.log("Data",data);
    }

    return (
    <div>
        <h1>Register</h1>
        <form onSubmit={registerUser}>
            <input
            value={name}
            onChange={(e)=>setName(e.target.value)}
            type="text"
            placeholder="Name"/>
            <input
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            type="text"
            placeholder="Email"/>
            <input
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            type="password"
            placeholder="Password"/>
            <input type="submit" value="Register"/>
        </form>
    </div>
    );
}

export default SignUp;