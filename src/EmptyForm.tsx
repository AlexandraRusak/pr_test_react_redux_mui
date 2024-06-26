import {Accordion, AccordionDetails, AccordionSummary, Alert, Button, Grid} from "@mui/material";
import {SubmitHandler, useForm} from "react-hook-form";
import {useState} from "react";
import {Spinner} from "./Spinner.tsx";
import {DateInput} from "./form_components/DateInput.tsx";
import {TextInput} from "./form_components/TextInput.tsx";
import {FormValues} from "./form_components/FormValues.tsx";
import Typography from '@mui/joy/Typography';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

type EmptyFormProps = {
    amendState: () => void;
}


function EmptyForm(props: EmptyFormProps) {

    const form = useForm<FormValues>({
        defaultValues: {
            companySigDate: null,
            companySignatureName: "",
            documentName: "",
            documentStatus: "",
            documentType: "",
            employeeNumber: "",
            employeeSigDate: null,
            employeeSignatureName: "",
        }
    })
    const {handleSubmit, control} = form
    const [isLoading, setIsLoading] = useState(false);
    const [alert, setAlert] = useState(false);
    const [alertContent, setAlertContent] = useState('');


    const onSubmit: SubmitHandler<FormValues> = (data: FormValues) => {
        setAlertContent("");
        setAlert(false);
        setIsLoading(true);
        fetch(import.meta.env.VITE_BACKEND_URL + `/ru/data/v3/testmethods/docs/userdocs/create`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                'x-auth': `${sessionStorage.getItem('token')}`
            },
            body: JSON.stringify(data)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error("Данные не могут быть загружены.");
                }
                return response.json()})
            .then(data => {
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

    if (isLoading) {
        return (
            <Spinner/>
        )
    }

    return (
        <div style={{margin: "20px auto"}}>
            {alert ? <Alert severity="error">{alertContent}</Alert> : <></>}
            <Accordion>
                <AccordionSummary
                    expandIcon={<ArrowDownwardIcon/>}
                    aria-controls="panel1-content"
                    id="panel1-header"
                >
                    <Typography level="title-lg">Создать новую запись</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <form onSubmit={handleSubmit(onSubmit)} noValidate>
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <DateInput name="companySigDate" control={control}
                                           label="Подписано компанией:"></DateInput>
                            </Grid>
                            <Grid item xs={6}>
                                <TextInput name="companySignatureName" label="ЭЦП компании:" control={control}/>
                            </Grid>
                            <Grid item xs={6}>
                                <TextInput name="documentName" label="Название документа:" control={control}/>
                            </Grid>
                            <Grid item xs={6}>
                                <TextInput name="documentStatus" label="Статус документа:" control={control}/>
                            </Grid>
                            <Grid item xs={6}>
                                <TextInput name="documentType" label="Тип документа:" control={control}/>
                            </Grid>
                            <Grid item xs={6}>
                                <TextInput name="employeeNumber" label="Номер сотрудника:" control={control}/>
                            </Grid>
                            <Grid item xs={6}>
                                <DateInput name="employeeSigDate" control={control}
                                           label="Подписано сотрудником:"></DateInput>
                            </Grid>
                            <Grid item xs={6}>
                                <TextInput name="employeeSignatureName" label="ЭЦП сотрудника:" control={control}/>
                            </Grid>
                            <Grid item>
                                <Button type="submit" color="primary" variant="contained">Создать</Button>
                            </Grid>
                        </Grid>
                    </form>
                </AccordionDetails>
            </Accordion>
        </div>
    )
}

export {EmptyForm}