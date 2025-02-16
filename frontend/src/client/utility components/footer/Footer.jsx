import { Box, Typography } from "@mui/material";

export default function Footer(){

    return(
        <>
        <Box sx={{display: "flex", justifyContent: "center", alignItems:"center", flexDirection: 'column'}} component={"div"}>

            <Typography>
                School Management System
            </Typography>
            <Typography variant="p">
                Copyright 2025	&#169;
            </Typography>

        </Box>
        </>
    )
}