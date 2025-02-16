import { Outlet } from "react-router-dom";
import Navbar from "./utility components/navbar/navBar";
import Footer from "./utility components/footer/Footer";
import { Box } from "@mui/material";

export default function Client() {



    return (
        <>
            <Navbar />
            <Box sx={{minHeight: '80vh'}} component={'div'}>
              <Outlet />  
            </Box>
            
            <Footer />
        </>
    )
}