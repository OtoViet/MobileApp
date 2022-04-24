import FormApi from '../api/formApi.js';
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

function useGetAllOrder() {
    const [Orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const getListOrder = () => {
        FormApi.getAllOrder().then((OrdersRes) => {
            setOrders(OrdersRes);
            setLoading(false);
        })
        .catch((error) => {
            AsyncStorage.removeItem('token');
            AsyncStorage.removeItem('refreshToken');
            setLoading('error');
        });
    };
    useEffect(() => {
        getListOrder();
    }, []);
    return [loading, Orders];
}
export default useGetAllOrder;