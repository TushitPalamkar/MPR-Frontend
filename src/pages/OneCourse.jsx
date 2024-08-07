import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios';

export default function OneCourse() {
    const [course, setCourse] = useState(null); // Initial state should match expected data structure
    const { id } = useParams(); // Destructure the specific parameter
    const userID=window.localStorage.getItem('userID')
    useEffect(() => {
        async function getSingleCourse() {
            try {
                const response = await axios.get(`https://mpr-backend-iivi.onrender.com/getonecourse/${id}`);
                setCourse(response.data);
                console.log(response.data);
            } catch (error) {
                console.error("Error fetching the course data", error);
            }
        }

        if (id) {
            getSingleCourse();
        }
    }, [id]); // Include id in the dependency array
    async function savecourses(){
        const responses= await axios.put('https://mpr-backend-iivi.onrender.com/savecourses',{userID,courseID:id})
        console.log(responses.data)
    }
    console.log(id);
    return (
       <div className="course-container">
        <h1>Course Details</h1>
        {course ? (
            <div>
                <h2 className="course-title">{course.title}</h2>
                <div className="course-details">
                    <p className="course-description">{course.description}</p>
                    <img className="course-image" src={course.courseimg} alt={course.title} />
                </div>
                <button className="course-button" onClick={savecourses}>Save Course</button>
            </div>
        ) : (
            <p>Loading...</p>
        )}
    </div>
    );
}
