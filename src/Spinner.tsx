import {Box, CircularProgress} from "@mui/material";

function Spinner() {

    return (
        <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', m: 10}}>
            <CircularProgress/>
        </Box>
    )
}
export {Spinner}