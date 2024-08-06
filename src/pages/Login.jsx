import Header from "./Headers";
import { useState } from "react";
import {useCookies} from 'react-cookie'
import axios from 'axios'
export default function Login(){
    const[username,setUsername]=useState('')
    const[password,setPassword]=useState('')
    const[cookies,setCookies]=useCookies(["access-tokens"])
    async function submitlogin(event){
        event.preventDefault()
        try{
            const response = await axios.post('https://mpr-backend-iivi.onrender.com/login', {username, password})
            if(response.data.userID && response.data.token)
            {

                console.log(response.data)
                window.localStorage.setItem('userID',response.data.userID)
                console.log(response.data.token)
                setCookies("access-tokens",response.data.token)
                alert('Login Successfull')
            }
           
            
        }catch(error){
            alert('Wrong Credentials')
            console.log(error)
        }
    }
    return(
        <>

        <div className="loginpage">
            <h2>Login</h2>
        <form onSubmit={submitlogin}>
         <input type="text" placeholder="username" value={username} onChange={(event)=>{setUsername(event.target.value)}} />
         <input type="password" placeholder="password" value={password} onChange={(event)=>{setPassword(event.target.value)}}/>
         <button type="submit">Submit</button>
        </form>
        </div>
        </>
    );
}