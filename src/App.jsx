import './App.css';
import {BrowserRouter as Router,Routes,Route}from 'react-router-dom'
import Login from './pages/Login';
import Register from './pages/Register';
import Layout from './pages/Layout';
import Home from './pages/Home';
import OneCourse from './pages/OneCourse';
import SavedCourses from './pages/SavedCourses';
function App() {
  return (
    <div className="App">
    <Router>
      <Routes>
        <Route path='/' element={<Layout/>}>
        <Route index element={<Home/>}/>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path='/getonecourse/:id' element={<OneCourse/>}/>
        <Route path='/getsavedcourses/:id' element={<SavedCourses/>}/>
        </Route> 
      </Routes>
    </Router>
  </div>
  );
}

export default App;
