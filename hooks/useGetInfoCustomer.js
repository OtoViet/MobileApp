import FormApi from '../api/formApi.js';
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
function useGetInfoCustomer() {
    const [info, setInfo] = useState([]);
    const [loading, setLoading] = useState(true);
    const getInfoCustomer = () => {
        FormApi.getInfoCustomer().then((infoRes) => {
            setInfo(infoRes);
            setLoading(false)
        })
        .catch((error) => {
            AsyncStorage.removeItem('token');
            AsyncStorage.removeItem('refreshToken');
            setLoading('error');
        });
    };
    useEffect(() => {
        getInfoCustomer();
    }, []);
    return [loading, info];
}
export default useGetInfoCustomer;