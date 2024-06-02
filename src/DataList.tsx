import {useSelector} from "react-redux";
import {IRootState} from "./store.ts";
import {useNavigate} from "react-router-dom";
import {useEffect, useReducer, useState} from "react";
import {Spinner} from "./Spinner.tsx";
import {Form} from "./Form.tsx";
// import {ItemInfo} from "./assets/interfaces/ItemInfo.ts";
import {Info} from "./assets/interfaces/Info.ts";
import {EmptyForm} from "./EmptyForm.tsx";


function DataList() {


    const state = useSelector((state: IRootState) => state.loggedIn)
    const [isLoading, setIsLoading] = useState(false);
    const [info, setInfo] = useState<Info[]>([])
    const navigate = useNavigate();

    const [reducerValue, forceUpdate] = useReducer(x => x+1, 0)

    const baseUrl = 'https://test.v5.pryaniky.com'



    useEffect(() => {
        if (!state) {
            navigate("/login")
        }
    });

    useEffect(() => {
        setIsLoading(true);
        fetch(baseUrl + "/ru/data/v3/testmethods/docs/userdocs/get", {
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
        return <Spinner/>
    }
    return (<>
            <EmptyForm amendState={()=>amendState()}/>
            {
                info.map((item: Info) => <Form key={item.id} item={item} amendState={()=>amendState()}/>)
            }

        </>
    )
}

export {DataList}