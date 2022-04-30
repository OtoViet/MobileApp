import FormApi from '../api/formApi.js';
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
function useGetInfoCustomer(isFocused, isRefreshed) {
    const [info, setInfo] = useState([]);
    const [loading, setLoading] = useState(true);
    const getInfoCustomer = () => {
        setLoading(true);
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
        if(isRefreshed) getInfoCustomer();
    }, [isRefreshed]);

    useEffect(() => {
        getInfoCustomer();
    }, [isFocused]);
    
    return [loading, info];
}
export default useGetInfoCustomer;