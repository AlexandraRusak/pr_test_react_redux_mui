// import {useSelector} from "react-redux";
// import {useNavigate} from "react-router-dom";
// import {IRootState} from "./store.ts";
// import {useEffect} from "react";

function Home () {

    // const state = useSelector((state: IRootState) => state.loggedIn)
    // const navigate = useNavigate();
    //
    // useEffect(() => {
    //     if (!state) {
    //               navigate("/login")
    //     }
    // });

    return (
        <>
            <h1>Описание приложения</h1>
            <p>Для использования приложения необходимо войти в профиль.</p>

        </>

    )

}

export {Home}