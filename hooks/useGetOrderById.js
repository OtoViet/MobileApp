import FormApi from '../api/formApi.js';
import { useState, useEffect } from 'react';
function useGetOrderById(id) {
    const [order, setOrder] = useState([]);
    const [loading, setLoading] = useState(true);
    const getOrder = () => {
        FormApi.getOrderById(id).then((orderRes) => {
            setOrder(orderRes);
            setLoading(false)
        })
        .catch((error) => {
            console.log(error);
            setLoading('error');
        });
    };
    useEffect(() => {
        getOrder();
    }, []);
    return [loading, order];
}
export default useGetOrderById;