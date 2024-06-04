import Typography from '@mui/joy/Typography';
import {Link, Paper, Stack} from "@mui/material";
import {useSelector} from "react-redux";
import {IRootState} from "./store.ts";
import {Link as RouterLink} from "react-router-dom";

function Home() {

    const state = useSelector((state: IRootState) => state.loggedIn)


    return (
        <Paper sx={{padding: "30px 20px",  margin: "20px auto"}}>
            <Stack spacing={2}>
                <Typography level="title-lg">Описание приложения</Typography>
                <Typography>Здесь должно быть описание приложения.</Typography>
                {!state ? <Typography>Для использования приложения необходимо <Link component={RouterLink} to={`${import.meta.env.VITE_URL_PREFIX}/login`} color="inherit">войти</Link> в профиль.</Typography> : <></>}
            </Stack>
        </Paper>
    )

}

export {Home}