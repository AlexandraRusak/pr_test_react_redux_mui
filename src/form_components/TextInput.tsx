import {Controller} from "react-hook-form";
import {TextField} from "@mui/material";
import {FormInputProps} from "./FormInputProps.tsx";


const TextInput = ({name, control, label, disabled}: FormInputProps) => {
    return (
        <Controller
            name={name}
            control={control}
            rules={{required: "Обязательное поле"}}
            render={({field: {onChange, value, ref}, fieldState: {error}}) => (
                <TextField
                    helperText={error ? error.message : null}
                    size="small"
                    error={!!error}
                    onChange={onChange}
                    value={value}
                    inputRef={ref}
                    fullWidth
                    label={label}
                    disabled={disabled}
                    variant="outlined"
                />
            )}
        />
    );
};

export {TextInput}