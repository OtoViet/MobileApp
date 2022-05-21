import FormApi from '../api/formApi.js';
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
function useGetInfoCustomer(isFocused, isRefreshed) {
    const [info, setInfo] = useState({});
    const [loading, setLoading] = useState(true);
    const getInfoCustomer = () => {
        setLoading(true);
        FormApi.getInfoCustomer().then((infoRes) => {
            setInfo(infoRes);
            setLoading(false);
            AsyncStorage.setItem('role', infoRes.roles);
        })
        .catch((error) => {
            AsyncStorage.removeItem('token');
            AsyncStorage.removeItem('refreshToken');
            AsyncStorage.removeItem('role');
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