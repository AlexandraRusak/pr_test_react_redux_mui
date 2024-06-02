import {useState} from "react";
import {useSelector} from "react-redux";
import {IRootState} from "./store.ts";
import {useNavigate} from "react-router-dom";
import {useForm} from "react-hook-form";
import {useDispatch} from "react-redux";
import {logIn} from "./store.ts";
import {Button, Paper, Stack, TextField, Typography, Alert, CircularProgress, Box} from "@mui/material";
// import {DevTool} from "@hookform/devtools";

const baseUrl: string = "https://test.v5.pryaniky.com"

function Login() {

    const [alert, setAlert] = useState(false);
    const [alertContent, setAlertContent] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const state = useSelector((state: IRootState) => state.loggedIn)

    type FormValues = {
        username: string;
        password: string;
    }
    const form = useForm<FormValues>({
        defaultValues: {
            username: "",
            password: "",
        }
    })
    const {register, handleSubmit, formState} = form
    const {errors} = formState;

    const onSubmit = (data: FormValues) => {
        setAlertContent("");
        setAlert(false);
        // console.log(data)
        sessionStorage.setItem("username", data.username)
        console.log(sessionStorage.getItem("username"))// event.preventDefault()
        setIsLoading(true);
        fetch(baseUrl + "/ru/data/v3/testmethods/docs/login", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(data)
        })
            .then(response => response.json())
            .then(data => {
                // console.log(data)
                if (data.error_code === 0) {
                    // console.log(data.data.token)
                    dispatch(logIn())
                    sessionStorage.setItem("token", data.data.token)
                    navigate("/data-list")
                } else {
                    setAlertContent(data.error_text);
                    setAlert(true);
                }
            })
            .catch(error => {
                // console.log(error)
                sessionStorage.clear()
                setAlertContent(error);
                setAlert(true);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }

    if (isLoading) {
        return    (
            <Box sx={{ display: 'flex' }}>
                <CircularProgress />
            </Box>
        )
    }

    if (!state) {
        return (

            <Paper elevation={20} sx={{padding: "30px 20px", width: 300, margin: "20px auto"}}>
                <Typography gutterBottom>Войдите в профиль:</Typography>
                <form onSubmit={handleSubmit(onSubmit)} noValidate>
                    <Stack spacing={2}>
                        {alert ? <Alert severity="error">{alertContent}</Alert> : <></>}
                        <TextField type="text"
                                   label="имя пользователя"
                                   id="username"
                                   {...register("username", {required: "Обязательное поле"})}
                                   error={!!errors.username}
                                   helperText={errors.username?.message}/>

                        <TextField type="password"
                                   label="пароль"
                                   id="password"
                                   {...register("password", {required: "Обязательное поле"})}
                                   error={!!errors.password}
                                   helperText={errors.password?.message}/>

                        <Button variant="contained" color="primary" type="submit">Войти</Button>
                    </Stack>
                </form>
                {/*<DevTool control={control}/>*/}
            </Paper>
        )
    } else {
        return (
            <Paper elevation={20} sx={{padding: "30px 20px", width: 300, margin: "20px auto"}}>
                <Stack spacing={2}>
                    <Typography>Данные пользователя</Typography>
                    <Typography>username: {sessionStorage.getItem("username")}</Typography>
                </Stack>
            </Paper>
        )
    }
}

export {Login}