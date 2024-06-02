import * as React from 'react';
import {Link as RouterLink, useNavigate} from 'react-router-dom';
import './App.css'
import {useSelector} from "react-redux";
import {IRootState, logOut} from "./store.ts";
import {useDispatch} from "react-redux";
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import {AppBar, Button, Toolbar, IconButton, Typography} from "@mui/material";
import LoginIcon from '@mui/icons-material/Login';


function Navbar() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const state = useSelector((state: IRootState) => state.loggedIn);

    function handleLogOutButton(event: React.FormEvent) {
        event.preventDefault()
        dispatch(logOut())
        navigate("/")
    }

    function handleLogInButton(event: React.FormEvent) {
        event.preventDefault()
        navigate("/login")
    }


    return (
        <AppBar position="static">
            <Toolbar>
                <IconButton component={RouterLink} to="/login" color="inherit"
                            aria-label="profile"><PersonIcon/></IconButton>
                <Typography sx={{flexGrow: 1}}>PRYANIKY</Typography>
                <Button component={RouterLink} to="/" color="inherit">Главная</Button>
                <Button component={RouterLink} to="/data-list" color="inherit">Данные</Button>
                {state ? <IconButton color="inherit" onClick={handleLogOutButton}
                                     aria-label="logout"><LogoutIcon/></IconButton> :
                    <IconButton color="inherit" onClick={handleLogInButton}
                                aria-label="logout"><LoginIcon/></IconButton>}
            </Toolbar>
        </AppBar>
    );
}

export {Navbar}