import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";
export default function Header(){
    const[cookies,setCookies]=useCookies(["access-tokens"])
    const id=window.localStorage.getItem('userID')
    console.log(window.localStorage.getItem('userID'))
    console.log(cookies['access-tokens'])
    async function Logout(){
        setCookies("access-tokens","")
        
        window.localStorage.removeItem('userID')
    }
    return(
        <header>
        <h2>
          <Link to="/">EducationApp</Link>
        </h2>
        <nav>
          {!cookies['access-tokens'] ? (
            <>
               <Link to="/login">Login</Link>
               <Link to="/register">Register</Link>
               
               </>
          ) : (
            <>
            <Link to={`/getsavedcourses/${id}`}>Saved Courses</Link>
            <Link to='/' onClick={Logout}>Logout</Link>
            </>
          )}
        </nav>
      </header>
    );
}
