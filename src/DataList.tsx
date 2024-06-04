import {useSelector} from "react-redux";
import {IRootState} from "./store.ts";
import {useNavigate} from "react-router-dom";
import {useEffect, useReducer, useState} from "react";
import {Form} from "./Form.tsx";
import {EmptyForm} from "./EmptyForm.tsx";
import {Spinner} from "./Spinner.tsx";
import {FormValues} from "./form_components/FormValues.tsx";


function DataList() {


    const state = useSelector((state: IRootState) => state.loggedIn)
    const [isLoading, setIsLoading] = useState(false);
    const [info, setInfo] = useState<FormValues[]>([])
    const navigate = useNavigate();
    const [reducerValue, forceUpdate] = useReducer(x => x + 1, 0)


    useEffect(() => {
        if (!state) {
            navigate("/login")
        }
    });

    useEffect(() => {
        setIsLoading(true);
        fetch(import.meta.env.VITE_BACKEND_URL + "/ru/data/v3/testmethods/docs/userdocs/get", {
            method: "GET",
            headers: {'x-auth': `${sessionStorage.getItem('token')}`}
        })
            .then(response => response.json())
            .then(data => {
                if (data) {
                    // console.log(data.data)
                    setInfo(data.data)
                }
            })
            .catch(error => console.log(error))
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
            {
                info.map((item: FormValues) => <Form key={item.id} item={item} amendState={() => amendState()}/>)
            }
        </>
    )
}

export {DataList}