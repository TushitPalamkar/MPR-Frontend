import axios from "axios";
import { Link } from "react-router-dom";
export default function Courses({_id,title,description,instructor,courseimg}){
  
    return(
        <>
       <div className="course-container">
            <h2 className="course-title">{title}</h2>
            <div className="course-details">
                <p className="course-description">{description}</p>
                <p className="course-instructor">Instructor: {instructor}</p>
                <img className="course-image" src={courseimg} alt="Course" />
                <Link className="course-link" to={`/getonecourse/${_id}`}>View Course</Link>
             
                
            </div>
        </div>
        </>
    );
}
