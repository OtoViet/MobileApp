import FormApi from '../api/formApi.js';
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

function useGetAllOrderForEmployee(isFocused, isRefreshed) {
    const [Orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const getListOrder = () => {
        setLoading(true);
        FormApi.getAllOrderForEmployee().then((OrdersRes) => {
            setOrders(OrdersRes);
            setLoading(false);
        })
        .catch((error) => {
            AsyncStorage.removeItem('token');
            AsyncStorage.removeItem('refreshToken');
            AsyncStorage.removeItem('role');
            setLoading('error');
        });
    };
    useEffect(() => {
        if(isRefreshed) getListOrder();
    }, [isRefreshed]);

    useEffect(() => {
        getListOrder();
    }, [isFocused]);
    
    return [loading, Orders];
}
export default useGetAllOrderForEmployee;