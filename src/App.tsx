import './App.css'
import {Routes, Route} from "react-router-dom"
import {Navbar} from "./Navbar.tsx";
import {Home} from "./Home.tsx";
import {DataList} from "./DataList.tsx";
import {Login} from "./Login.tsx";
import {Container} from "@mui/material";

function App() {
    const url_prefix = import.meta.env.VITE_URL_PREFIX
    return (
        <>
            <Navbar/>
            <Container>
                <Routes>
                    <Route path={ url_prefix + "/"} element={<Home/>}></Route>
                    <Route path={ url_prefix + "/data-list"} element={<DataList/>}></Route>
                    <Route path={ url_prefix + "/login"} element={<Login/>}></Route>
                </Routes>
            </Container>

        </>
      )
}

export default App
