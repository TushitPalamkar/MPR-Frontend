import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios';
import { useCookies } from "react-cookie";
export default function OneCourse() {
    const [course, setCourse] = useState(null); // Initial state should match expected data structure
    const { id } = useParams(); // Destructure the specific parameter
    const userID=window.localStorage.getItem('userID')
    const[cookies,setCookies]=useCookies(["access-tokens"])
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
        <div className="onecourse">
        <h1>Course Details</h1>
        {course ? (
            <div>
                <h2 className="course-title">{course.title}</h2>
                <div className="course-details">
                    <p className="course-description">{course.description}</p>
                    <img className="course-image" src={course.courseimg} alt={course.title} />
                </div>
                {
                    cookies["access-tokens"]?(<button className="course-button" onClick={savecourses}>Save Course</button>):(
                        <p>Login to Save the Course!</p>
                    )
                }
                
            </div>
        ) : (
            <p>Loading...</p>
        )}
    </div>
    );
}
