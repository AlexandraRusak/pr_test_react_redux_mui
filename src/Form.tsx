// import {useForm} from "react-hook-form"
import {useState} from "react";
import {ItemInfo} from "./assets/interfaces/ItemInfo.ts";

type FormProps = {
    amendState: () => void;
    item: {
        id: string;
        companySigDate: string;
        companySignatureName: string;
        documentName: string;
        documentStatus: string;
        documentType: string;
        employeeNumber: string;
        employeeSigDate: string;
        employeeSignatureName: string;
    }
}


function Form(props: FormProps) {

    const [isDisabled, setIsDisabled] = useState(true)
    const [companySigDate, setCompanySigDate] = useState(props.item.companySigDate.substring(0, 10));
    const [companySignatureName, setCompanySignatureName] = useState(props.item.companySignatureName);
    const [documentName, setDocumentName] = useState(props.item.documentName);
    const [documentStatus, setDocumentStatus] = useState(props.item.documentStatus);
    const [documentType, setDocumentType] = useState(props.item.documentType);
    const [employeeNumber, setEmployeeNumber] = useState(props.item.employeeNumber);
    const [employeeSigDate, setEmployeeSigDate] = useState(props.item.employeeSigDate.substring(0, 10));
    const [employeeSignatureName, setEmployeeSignatureName] = useState(props.item.employeeSignatureName)


    const baseUrl: string = "https://test.v5.pryaniky.com"

    const postFetcher = (url: string, id: string) => {
        const body: ItemInfo = {
            companySigDate: new Date(companySigDate).toISOString(),
            companySignatureName: companySignatureName,
            documentName: documentName,
            documentStatus: documentStatus,
            documentType: documentType,
            employeeNumber: employeeNumber,
            employeeSigDate: new Date(employeeSigDate).toISOString(),
            employeeSignatureName: employeeSignatureName
        }

        console.log(body)
        fetch(baseUrl + `/ru/data/v3/testmethods/docs/userdocs/${url}/${id}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                'x-auth': `${sessionStorage.getItem('token')}`
            },
            body: JSON.stringify({...body})
        })
            .then(response => response.json())
            .then(data => {
                console.log(data)
                props.amendState()
            })
            .catch(error => console.log(error))
            .finally(() => {
            });
    }

    function handleDeleteButton(event: React.FormEvent) {
        event.preventDefault()
        postFetcher("delete", event.currentTarget.id)
    }

    function handleEditButton(event: React.FormEvent) {
        event.preventDefault()
        setIsDisabled(false);
    }

    function handleSubmitButton(event: React.FormEvent) {
        event.preventDefault()
        postFetcher("set", event.currentTarget.id)
    }


    return (
        <form id={props.item.id}>
            <label htmlFor="companySigDate">Дата подписания компанией:</label>
            <input id="companySigDate" type="date" value={companySigDate}
                   onChange={(event) => setCompanySigDate(event.target.value)} disabled={isDisabled}/>
            <label htmlFor="companySignatureName">ЭЦП компании:</label>
            <input id="companySignatureName" type="text" value={companySignatureName}
                   onChange={(event) => setCompanySignatureName(event.target.value)} disabled={isDisabled}/>
            <label htmlFor="documentName">Название документа</label>
            <input id="documentName" type="text" value={documentName}
                   onChange={(event) => setDocumentName(event.target.value)} disabled={isDisabled}/>
            <label htmlFor="documentStatus">Статус документа:</label>
            <input id="documentStatus" type="text" value={documentStatus}
                   onChange={(event) => setDocumentStatus(event.target.value)} disabled={isDisabled}/>
            <label htmlFor="documentType">Тип документа:</label>
            <input id="documentType" type="text" value={documentType}
                   onChange={(event) => setDocumentType(event.target.value)} disabled={isDisabled}/>
            <label htmlFor="employeeNumber">Номер сотрудника</label>
            <input id="employeeNumber" type="text" value={employeeNumber}
                   onChange={(event) => setEmployeeNumber(event.target.value)} disabled={isDisabled}/>
            <label htmlFor="employeeSigDate">Дата подписания сотрудником:</label>
            <input id="employeeSigDate" type="date" value={employeeSigDate}
                   onChange={(event) => setEmployeeSigDate(event.target.value)} disabled={isDisabled}/>
            <label htmlFor="employeeSignatureName">ЭЦП сотрудника:</label>
            <input id="employeeSignatureName" type="text" value={employeeSignatureName}
                   onChange={(event) => setEmployeeSignatureName(event.target.value)} disabled={isDisabled}/>
            {isDisabled ? "" : <button id={props.item.id} onClick={handleSubmitButton}>Сохранить изменения</button>}
            <button id={props.item.id} onClick={handleDeleteButton}>Удалить</button>
            <button onClick={handleEditButton}>Редактировать</button>
        </form>
    )
}

export {Form}