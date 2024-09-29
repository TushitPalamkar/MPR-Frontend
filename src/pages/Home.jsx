import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import Courses from "./Courses";
import * as THREE from 'three';

export default function Home() {
    const [course, setCourse] = useState([]);
    const mountRef = useRef(null);
    const displayRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);
    const [animationVisible, setAnimationVisible] = useState(true);
    const [renderer, setRenderer] = useState(null);
    const [scene, setScene] = useState(null);
    const [camera, setCamera] = useState(null);

    useEffect(() => {
        async function getCourses() {
            const response = await axios.get('https://mpr-backend-iivi.onrender.com/getcourses');
            setCourse(response.data);
        }
        getCourses();
    }, []);

    useEffect(() => {
        const mount = mountRef.current;
        if (!mount) return;

        // Basic Three.js Scene Setup
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ alpha: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        mount.appendChild(renderer.domElement);
        setRenderer(renderer);
        setScene(scene);
        setCamera(camera);

        // Create multiple books as boxes without textures
        const bookGeometry = new THREE.BoxGeometry(1, 1.5, 0.1);
        const bookMaterial = new THREE.MeshBasicMaterial({ color: 0x0077ff }); // A solid blue color for the books

        const books = [];
        for (let i = 0; i < 10; i++) {
            const book = new THREE.Mesh(bookGeometry, bookMaterial);
            book.position.set(
                (Math.random() - 0.5) * 10,
                (Math.random() - 0.5) * 5,
                (Math.random() - 0.5) * 5
            );
            book.rotation.set(
                Math.random() * 2 * Math.PI,
                Math.random() * 2 * Math.PI,
                Math.random() * 2 * Math.PI
            );
            scene.add(book);
            books.push(book);
        }

        camera.position.z = 5;

        function animate() {
            requestAnimationFrame(animate);
            books.forEach(book => {
                book.rotation.x += 0.005;
                book.rotation.y += 0.005;
                book.position.y += Math.sin(Date.now() * 0.001) * 0.002;
            });
            renderer.render(scene, camera);
        }
        animate();

        // Resize handler to maintain aspect ratio
        const handleResize = () => {
            const width = mount.clientWidth;
            const height = mount.clientHeight;
            renderer.setSize(width, height);
            camera.aspect = width / height;
            camera.updateProjectionMatrix();
        };

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
            if (mount && renderer.domElement) {
                mount.removeChild(renderer.domElement);
            }
        };
    }, []);

    // Check if the display section is in view
    useEffect(() => {
        const handleScroll = () => {
            if (displayRef.current) {
                const rect = displayRef.current.getBoundingClientRect();
                if (rect.top <= window.innerHeight && rect.bottom >= 0) {
                    setIsVisible(true);
                    setAnimationVisible(false);
                } else {
                    setIsVisible(false);
                    setAnimationVisible(true);
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div className="homepage">
            <div ref={mountRef} className="three-animation">
                {animationVisible && (
                    <div className="animated-info">
                        <h2 style={{ opacity: animationVisible ? 1 : 0 }}>Enhance Your Skills</h2>
                    </div>
                )}
            </div>
            <div ref={displayRef} className={`home-display ${isVisible ? 'visible' : ''}`}>
                {isVisible && (
                    <div className="animated-info">
                        <h2>Enhance Your Skills with Our Top Courses</h2>
                        <p>Discover a variety of professional courses designed to boost your knowledge and advance your career. Learn from the best instructors and get certified!</p>
                        <ul>
                            <li>Flexible Learning</li>
                            <li>Industry Expert Instructors</li>
                            <li>Certification Upon Completion</li>
                        </ul>
                    </div>
                )}
            </div>
            <div className="course-grid">
                {course.map((item) => (
                    <Courses key={item._id} {...item} />
                ))}
            </div>
        </div>
    );
}
