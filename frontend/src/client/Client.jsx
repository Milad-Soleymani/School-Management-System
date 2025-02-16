import { Outlet } from "react-router-dom";
import Navbar from "./utility components/navbar/navBar";

export default function Client() {



    return (
        <>
        <Navbar />
            <h1>Client Main component</h1>

            <Outlet />
        </>
    )
}