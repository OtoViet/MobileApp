import FormApi from '../api/formApi.js';
import { useState, useEffect } from 'react';

function useGetAllOrder() {
    const [Orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const getListOrder = () => {
        FormApi.getAllOrder().then((OrdersRes) => {
            setOrders(OrdersRes);
            setLoading(false)
        })
        .catch((error) => {
            console.log(error);
        });
    };
    useEffect(() => {
        getListOrder();
    }, []);
    return [loading, Orders];
}
export default useGetAllOrder;