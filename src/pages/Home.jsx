import axios from "axios";
import { useEffect, useState } from "react";
import Courses from "./Courses";
export default function Home(){
    const[course,setCourse]=useState([])
    useEffect(()=>{
        async function getcourses(){

            const response=await axios.get('https://mpr-backend-iivi.onrender.com/getcourses')
            setCourse(response.data)
            console.log(response.data)
        }
        getcourses()
    },[])
    return(
       <div className="homepage">{
            course.map((item)=>(
                <Courses key={item._id}{...item}/>
            )
            
            )}</div>
    );
}
