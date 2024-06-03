import {useState} from "react";
// import {ItemInfo} from "./assets/interfaces/ItemInfo.ts";
import {Alert, Button, Grid, IconButton, Paper} from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import {SubmitHandler, useForm} from "react-hook-form";
import {FormValues} from "./form_components/FormValues.tsx";
import {DateInput} from "./form_components/DateInput.tsx";
import {TextInput} from "./form_components/TextInput.tsx";
import {Spinner} from "./Spinner.tsx";
// import dayjs from 'dayjs';


type FormProps = {
    amendState: () => void;
    item: FormValues;
    //     {
    //     id: string;
    //     companySigDate: string;
    //     companySignatureName: string;
    //     documentName: string;
    //     documentStatus: string;
    //     documentType: string;
    //     employeeNumber: string;
    //     employeeSigDate: string;
    //     employeeSignatureName: string;
    // }

}


function Form(props: FormProps) {

    // const {id, ...rest} = props.item
    const cSDate: string = `${props.item.companySigDate}`.substring(0, 10)
    const eSDate: string = `${props.item.employeeSigDate}`.substring(0, 10)

    const form = useForm<FormValues>({
        defaultValues: {
            id: props.item.id,
            companySigDate: new Date(cSDate),
            companySignatureName: props.item.companySignatureName,
            documentName: props.item.documentName,
            documentStatus: props.item.documentStatus,
            documentType: props.item.documentType,
            employeeNumber: props.item.employeeNumber,
            employeeSigDate: new Date(eSDate),
            employeeSignatureName: props.item.employeeSignatureName
        }

    })

    const {register, handleSubmit, control} = form
    const [alert, setAlert] = useState(false);
    const [alertContent, setAlertContent] = useState('');
    const [isDisabled, setIsDisabled] = useState(true)
    const [isLoading, setIsLoading] = useState(false);


    const postFetcher = (data: FormValues, url: string) => {
        const {id, ...rest} = data
        setAlertContent("");
        setAlert(false);
        setIsLoading(true);
        fetch(import.meta.env.VITE_BASE_URL + `/ru/data/v3/testmethods/docs/userdocs/${url}/${id}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                'x-auth': `${sessionStorage.getItem('token')}`
            },
            body: JSON.stringify(rest)
        })
            .then(response => response.json())
            .then(data => {
                console.log(data)
                if (data.error_code === 0) {
                    props.amendState()
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
                setIsLoading(false)
            });
    }

    const onDelete: SubmitHandler<FormValues> = (data: FormValues) => {
        console.log(data)
        postFetcher(data, "delete")
    }

    function handleEditButton(event: React.FormEvent) {
        event.preventDefault()
        setIsDisabled(false);
    }

    const onSubmit: SubmitHandler<FormValues> = (data: FormValues) => {
        postFetcher(data, "set")
    }

    if (isLoading) {
        return (
            <Spinner/>
        )
    }

    return (
        <Paper sx={{padding: "30px 20px", margin: "20px auto"}}>
            {alert ? <Alert severity="error">{alertContent}</Alert> : <></>}
            <form noValidate>
                <Grid container spacing={2}>
                    <input id="id" {...register("id", {value: "data"})} type="hidden"/>
                    <Grid item xs={6}>
                        <DateInput name="companySigDate" label="Дата подписания компанией:" control={control}
                                   disabled={isDisabled}/>
                    </Grid>
                    <Grid item xs={6}>
                        <TextInput name="companySignatureName" label="ЭЦП компании:" control={control}
                                   disabled={isDisabled}/>

                    </Grid>
                    <Grid item xs={6}>
                        <TextInput name="documentName" label="Название документа:" control={control}
                                   disabled={isDisabled}/>
                    </Grid>
                    <Grid item xs={6}>
                        <TextInput name="documentStatus" label="Статус документа:" control={control}
                                   disabled={isDisabled}/>
                    </Grid>
                    <Grid item xs={6}>
                        <TextInput name="documentType" label="Тип документа:" control={control} disabled={isDisabled}/>
                    </Grid>
                    <Grid item xs={6}>
                        <TextInput name="employeeNumber" label="Номер сотрудника:" control={control}
                                   disabled={isDisabled}/>
                    </Grid>
                    <Grid item xs={6}>
                        <DateInput name="employeeSigDate" label="Дата подписания сотрудником:" control={control}
                                   disabled={isDisabled}/>
                    </Grid>
                    <Grid item xs={6}>
                        <TextInput name="employeeSignatureName" label="ЭЦП сотрудника:" control={control}
                                   disabled={isDisabled}/>
                    </Grid>
                </Grid>
            </form>
            {isDisabled ? "" :
                <Button onClick={handleSubmit(onSubmit)} variant="contained" color="primary" id={props.item.id}>Сохранить
                    изменения</Button>}
            <IconButton onClick={handleSubmit(onDelete)} aria-label="удалить"><DeleteIcon/></IconButton>
            <IconButton onClick={handleEditButton} aria-label="редактировать"><EditIcon/></IconButton>
        </Paper>
    )
}

export {Form}