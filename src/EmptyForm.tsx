// import {useState} from "react";
// import {ItemInfo} from "./assets/interfaces/ItemInfo.ts";
import {Button, Grid, Paper, TextField, Typography} from "@mui/material";
import {Controller, SubmitHandler, useForm} from "react-hook-form";
import {DatePicker} from '@mui/x-date-pickers/DatePicker';
import {LocalizationProvider} from "@mui/x-date-pickers";
// import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFns";

type EmptyFormProps = {
    amendState: () => void;
}

type FormValues = {
    companySigDate: Date | null;
    companySignatureName: string;
    documentName: string;
    documentStatus: string;
    documentType: string;
    employeeNumber: string;
    employeeSigDate: Date | null;
    employeeSignatureName: string;
}

function EmptyForm(props: EmptyFormProps) {
    // const baseUrl: string = "https://test.v5.pryaniky.com"

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
    const {register, handleSubmit, formState, control} = form
    const {errors} = formState;

    const onSubmit: SubmitHandler<FormValues> = (data: FormValues) => {
        console.log(data)
        // const baseUrl: string = "https://test.v5.pryaniky.com"
        // fetch(baseUrl + `/ru/data/v3/testmethods/docs/userdocs/create`, {
        //     method: "POST",
        //     headers: {
        //         "Content-Type": "application/json",
        //         'x-auth': `${sessionStorage.getItem('token')}`
        //     },
        //     body: JSON.stringify(data)
        // })
        //     .then(response => response.json())
        //     .then(data => {
        //         console.log(data)
                props.amendState()
        //     })
        //     .catch(error => console.log(error))
        //     .finally(() => {
        //     });
    }


    return (
        <Paper>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <form onSubmit={handleSubmit(onSubmit)} noValidate>
                    <Grid container>
                        <Grid item>
                            <Typography>Создать новую запись</Typography>
                        </Grid>
                        <Grid item>
                            <Controller
                                name="companySigDate"
                                control={control}
                                rules={{required: "Обязательное поле"}}
                                render={({field: {onChange, value, ref}, fieldState: {error}}) => (
                                    <DatePicker
                                        label="Дата подписания компанией:"
                                        value={value}
                                        onChange={onChange}
                                        inputRef={ref}
                                        slotProps={{
                                            textField: {
                                                error: {error},
                                            helperText: {error? error.message : null},
                                        },
                                        }}
                                    />
                                )}
                            />
                            {/*<DatePicker label="Дата подписания компанией:" {...register("companySigDate", {required: "Обязательное поле"})}*/}
                            {/*    // error={!!errors.companySigDate}*/}
                            {/*    // helperText={errors.companySigDate?.message}*/}
                            {/*    //     value={companySigDate}*/}
                            {/*    // onChange={(event) => setCompanySigDate(event.target.value)}*/}
                        </Grid>
                        <Grid item>
                            <TextField id="companySignatureName"
                                       type="text"
                                       label="ЭЦП компании:"
                                       {...register("companySignatureName", {required: "Обязательное поле"})}
                                       error={!!errors.companySignatureName}
                                       helperText={errors.companySignatureName?.message}
                            />
                        </Grid>
                        <Grid item>
                            <TextField id="documentName"
                                       type="text"
                                       label="Название документа:"
                                       {...register("documentName", {required: "Обязательное поле"})}
                                       error={!!errors.documentName}
                                       helperText={errors.documentName?.message}
                            />
                        </Grid>
                        <Grid item>
                            <TextField id="documentStatus"
                                       type="text"
                                       label="Статус документа:"
                                       {...register("documentStatus", {required: "Обязательное поле"})}
                                       error={!!errors.documentStatus}
                                       helperText={errors.documentStatus?.message}
                            />
                        </Grid>
                        <Grid item>
                            <TextField id="documentType"
                                       type="text"
                                       label="Тип документа:"
                                       {...register("documentType", {required: "Обязательное поле"})}
                                       error={!!errors.documentType}
                                       helperText={errors.documentType?.message}
                            />
                        </Grid>
                        <Grid item>
                            <TextField id="employeeNumber"
                                       type="text"
                                       label="Номер сотрудника:"
                                       {...register("employeeNumber", {required: "Обязательное поле"})}
                                       error={!!errors.employeeNumber}
                                       helperText={errors.employeeNumber?.message}
                            />
                        </Grid>
                        <Grid item>
                            <Controller
                                name={name}
                                control={control}
                                render={({field: {onChange, value}}) => (
                                    <DatePicker
                                        label="Дата подписания сотрудником:" {...register("employeeSigDate", {required: "Обязательное поле"})}
                                        // error={!!errors.employeeSigDate}
                                        // helperText={errors.employeeSigDate?.message}
                                    />
                                    </Grid>
                                    <Grid item>
                                    <TextField id="employeeSignatureName"
                                    type="text"
                                    label="ЭЦП сотрудника:"
                                {...register("employeeSignatureName", {required: "Обязательное поле"})}
                                error={!!errors.employeeSignatureName}
                                helperText={errors.employeeSignatureName?.message}
                            />
                        </Grid>
                        <Grid item>
                            <Button type="submit" color="primary" variant="contained">Создать</Button>
                        </Grid>
                    </Grid>
                </form>
            </LocalizationProvider>
        </Paper>

    )

}

export {EmptyForm}