import FormApi from '../api/formApi.js';
import { useState, useEffect } from 'react';
function useGetOrderById(id, isFocused, isRefreshed) {
    const [order, setOrder] = useState([]);
    const [loading, setLoading] = useState(true);
    const getOrder = () => {
        setLoading(true);
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
        if(isRefreshed) getOrder();
    }, [isRefreshed]);

    useEffect(() => {
        getOrder();
    }, [isFocused]);
    return [loading, order];
}
export default useGetOrderById;