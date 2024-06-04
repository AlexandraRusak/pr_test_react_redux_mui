import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFns";
import {LocalizationProvider} from "@mui/x-date-pickers";
import {Controller} from "react-hook-form";
import {DatePicker} from "@mui/x-date-pickers/DatePicker";
import {FormInputProps} from "./FormInputProps.tsx";


const DateInput = ({ name, control, label, disabled }: FormInputProps) => {

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Controller
                name={name}
                control={control}
                rules={{required: "Обязательное поле"}}
                render={({field: {onChange, value, ref}, fieldState: {error}}) => (
                    <DatePicker
                        label={label}
                        disabled={disabled}
                        value={value}
                        onChange={onChange}
                        inputRef={ref}
                        slotProps={{
                            textField: {
                                error: !!error,
                                helperText: error ? error.message : null,
                            },
                        }}
                        sx={{
                            "& .MuiInputBase-input.Mui-disabled": {
                                WebkitTextFillColor: "#000000",
                            },
                        }}
                    />
                )}
            />
        </LocalizationProvider>
        )

}

export {DateInput}