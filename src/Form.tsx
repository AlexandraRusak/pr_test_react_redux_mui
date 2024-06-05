import {useState} from "react";
import {
    Alert,
    Button,
    Dialog, DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Grid,
    IconButton,
    Paper
} from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import {SubmitHandler, useForm} from "react-hook-form";
import {FormValues} from "./form_components/FormValues.tsx";
import {DateInput} from "./form_components/DateInput.tsx";
import {TextInput} from "./form_components/TextInput.tsx";
import {Spinner} from "./Spinner.tsx";


type FormProps = {
    amendState: () => void;
    item: FormValues;
}

function Form(props: FormProps) {

    const [alert, setAlert] = useState(false);
    const [alertContent, setAlertContent] = useState('');

    function convertIsoToLocal(isoString: string): string {
        const date = new Date(isoString);
        if (isNaN(date.getTime())) {
            setAlert(true)
            setAlertContent('Неверный формат даты');
        }
        return date.toLocaleDateString();
    }

    const form = useForm<FormValues>({
        defaultValues: {
            id: props.item.id,
            companySigDate: new Date(convertIsoToLocal(`${props.item.companySigDate}`)),
            companySignatureName: props.item.companySignatureName,
            documentName: props.item.documentName,
            documentStatus: props.item.documentStatus,
            documentType: props.item.documentType,
            employeeNumber: props.item.employeeNumber,
            employeeSigDate: new Date(convertIsoToLocal(`${props.item.employeeSigDate}`)),
            employeeSignatureName: props.item.employeeSignatureName
        }
    })

    const {register, handleSubmit, control} = form

    const [isDisabled, setIsDisabled] = useState(true)
    const [isLoading, setIsLoading] = useState(false);


    const [open, setOpen] = useState(false);

    const handleClose = () => {
        setOpen(false);
    };

    const postFetcher = (data: FormValues, url: string) => {
        console.log("fetching")
        const {id, ...rest} = data
        setAlertContent("");
        setAlert(false);
        setIsLoading(true);
        fetch(import.meta.env.VITE_BACKEND_URL + `/ru/data/v3/testmethods/docs/userdocs/${url}/${id}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                'x-auth': `${sessionStorage.getItem('token')}`
            },
            body: JSON.stringify(rest)
        })
            .then(response => {
                if (!response.ok) {
                    // 4xx or 5xx error
                    // console.log("there is error")
                    throw new Error("Данные не могут быть загружены.");
                }
                return response.json()})
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

    const onDelete = () => {
        setOpen(true);
    }
    const onConfirm: SubmitHandler<FormValues> = (data: FormValues) => {
        postFetcher(data, "delete")
    }

    function handleEditButton(event: React.FormEvent) {
        event.preventDefault()
        setIsDisabled(!isDisabled);
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
        <>
            <Paper sx={{paddingTop: "10px", paddingBottom: "30px", paddingInline: "20px", m: "20px auto"}}>
                {alert ? <Alert severity="error">{alertContent}</Alert> : <></>}
                <div style={{display: "flex", justifyContent: "flex-end", columnGap: "2px"}}>
                    <IconButton onClick={onDelete} aria-label="удалить"><DeleteIcon/></IconButton>
                    <IconButton onClick={handleEditButton} aria-label="редактировать"><EditIcon/></IconButton>
                </div>
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
                            <TextInput name="documentType" label="Тип документа:" control={control}
                                       disabled={isDisabled}/>
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
                <div style={{marginTop: "15px"}}>
                    {isDisabled ? "" :
                        <Button onClick={handleSubmit(onSubmit)} variant="contained" color="primary" id={props.item.id}>Сохранить
                            изменения</Button>}
                </div>
            </Paper>

            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    Удалить запись?
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Вы уверены, что хотите удалить запись?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>нет</Button>
                    <Button onClick={handleSubmit(onConfirm)} autoFocus>
                        да
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export {Form}