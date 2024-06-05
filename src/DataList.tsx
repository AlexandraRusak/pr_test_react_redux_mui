import {useSelector} from "react-redux";
import {IRootState} from "./store.ts";
import {useNavigate} from "react-router-dom";
import {useEffect, useReducer, useState} from "react";
import {Form} from "./Form.tsx";
import {EmptyForm} from "./EmptyForm.tsx";
import {Spinner} from "./Spinner.tsx";
import {FormValues} from "./form_components/FormValues.tsx";
import {Alert} from "@mui/material";


function DataList() {


    const state = useSelector((state: IRootState) => state.loggedIn)
    const [isLoading, setIsLoading] = useState(false);
    const [info, setInfo] = useState<FormValues[]>([])
    const navigate = useNavigate();
    const [reducerValue, forceUpdate] = useReducer(x => x + 1, 0)
    const [alert, setAlert] = useState(false);
    const [alertContent, setAlertContent] = useState('');

    useEffect(() => {
        if (!state) {
            navigate(`${import.meta.env.VITE_URL_PREFIX}/login`)
        }
    });

    useEffect(() => {
        setIsLoading(true);
        setAlertContent("");
        setAlert(false);
        fetch(import.meta.env.VITE_BACKEND_URL + "/ru/data/v3/testmethods/docs/userdocs/get", {
            method: "GET",
            headers: {'x-auth': `${sessionStorage.getItem('token')}`}
        })
            .then(response => {
                if (!response.ok) {
                    // 4xx or 5xx error
                    // console.log("there is error")
                    throw new Error("Данные не могут быть загружены.");
                }
                return response.json()})
            .then(data => {
                if (data.error_code === 0) {
                    setInfo(data.data)
                } else {
                    setAlertContent(data.error_text);
                    setAlert(true);
                }
            })
            .catch(error => {
                setAlertContent(error);
                setAlert(true);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, [reducerValue]);


    function amendState() {
        forceUpdate()
    }

    if (isLoading) {
        return (
            <Spinner/>
        )
    }

    return (
        <>
            <EmptyForm amendState={() => amendState()}/>
            {alert ? <div><Alert severity="error">{alertContent}</Alert></div>  : <></>}
            {
                info.map((item: FormValues) => <Form key={item.id} item={item} amendState={() => amendState()}/>)
            }
        </>
    )
}

export {DataList}