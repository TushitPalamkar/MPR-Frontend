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
            <div className="saved-courses-grid">
                {courses.length > 0 ? (
                    courses.map(course => (
                        <div key={course._id} className="course-container">
                            <h2 className="course-title">{course.title}</h2>
                            <div className="course-details">
                                <p className="course-description">{course.description}</p>
                                <img className="course-image" src={course.courseimg} alt={course.title} />
                            </div>
                            <div className="course-actions">
                               
                            </div>
                        </div>
                    ))
                ) : (
                    <p>Loading...</p>
                )}
            </div>
        </div>
    );
}
