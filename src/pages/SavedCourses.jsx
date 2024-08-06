import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function SavedCourses() {
    const [courses, setCourses] = useState([]);
    const { id } = useParams();

    useEffect(() => {
        async function viewSavedCourses() {
            try {
                const response = await axios.get(`https://mpr-backend-iivi.onrender.com/getsavedcourses/${id}`);
                setCourses(response.data);
            } catch (error) {
                console.error('Error fetching course data:', error);
            }
        }

        if (id) {
            viewSavedCourses();
        }
    }, [id]);

    return (
        <div>
            <h1>Saved Courses</h1>
            {courses.length > 0 ? (
                courses.map(course => (
                    <div key={course._id}>
                        <h2>{course.title}</h2>
                        <p>{course.description}</p>
                        <img src={course.courseimg} alt={course.title} />
                    </div>
                ))
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}
