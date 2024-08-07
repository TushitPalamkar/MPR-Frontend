import axios from "axios";
import { Link } from "react-router-dom";
export default function Courses({_id,title,description,instructor,courseimg}){
  
    return(
        <>
        <h2>{title}</h2>
        <div>
        
        <p>{instructor}</p>
        <img src={courseimg} alt="Course Image"/>
        <Link to={`/getonecourse/${_id}`}>View Course</Link>
        <button></button>
        </div>
        </>
    );
}
