// import { useState } from 'react'
import './App.css'
import {Routes, Route} from "react-router-dom"
import {Navbar} from "./Navbar.tsx";
import {Home} from "./Home.tsx";
import {DataList} from "./DataList.tsx";
import {Login} from "./Login.tsx";
import {Container} from "@mui/material";

function App() {

    return (
        <>
            <Navbar/>
            <Container>
                <Routes>
                    <Route path="/" element={<Home/>}></Route>
                    <Route path="/data-list" element={<DataList/>}></Route>
                    <Route path="/login" element={<Login/>}></Route>
                </Routes>
            </Container>

        </>
        // <BrowserRouter>


        // </BrowserRouter>

    )
}

export default App
