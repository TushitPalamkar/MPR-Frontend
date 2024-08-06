import Header from "./Headers";
import { useState } from "react";
import axios from 'axios'
export default function Register(){
    const[username,setUsername]=useState('')
    const[password,setPassword]=useState('')
    async function submitlogin(event){
        event.preventDefault()
        try{

            const response = await axios.post('https://mpr-backend-iivi.onrender.com/register', {username, password})
            console.log(response.data)
            alert('Registered Successfully! Now Login')
        }catch(error){
            console.log(error)
        }
    }
    return(
        <>
        
        <div className="loginpage">
            <h2>Register</h2>
            <form onSubmit={submitlogin}>
         <input type="text" placeholder="username" value={username} onChange={(event)=>{setUsername(event.target.value)}} />
         <input type="password" placeholder="password" value={password} onChange={(event)=>{setPassword(event.target.value)}}/>
         <button type="submit">Submit</button>
        </form>
        </div>
        </>
    );
}