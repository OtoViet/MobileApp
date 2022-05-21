import FormApi from '../api/formApi.js';
import { useState, useEffect } from 'react';

function useGetAllEmployee(isFocused, isRefreshed) {
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);
    const getListEmployee = () => {
        setLoading(true);
        FormApi.getAllEmployee().then((employees) => {
            setEmployees(employees);
            setLoading(false)
        })
        .catch((error) => {
            console.log(error);
            setLoading('error');
        });
    };
    useEffect(() => {
        if(isRefreshed) getListEmployee();
    }, [isRefreshed]);
    useEffect(() => {
        getListEmployee();
    }, [isFocused]);
    return [loading, employees];
}
export default useGetAllEmployee;