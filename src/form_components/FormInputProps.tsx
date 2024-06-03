export interface FormInputProps {
    name: string;
    /* eslint-disable  @typescript-eslint/no-explicit-any */
    control: any;
    label: string;
    setValue?: any;
    disabled?: boolean;
}