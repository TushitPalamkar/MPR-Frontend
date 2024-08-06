import { Outlet } from "react-router-dom";
import Header from "./Headers";
export default function Layout(){
    return(
        <main>
            <Header/>
            <Outlet/>
        </main>
    );
}