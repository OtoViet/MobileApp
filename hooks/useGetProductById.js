import FormApi from '../api/formApi.js';
import { useState, useEffect } from 'react';
function useGetProductById(id, isFocused, isRefreshed) {
    const [product, setProduct] = useState([]);
    const [loading, setLoading] = useState(true);
    const getProduct = () => {
        setLoading(true);
        FormApi.getProductById(id).then((productRes) => {
            setProduct(productRes);
            setLoading(false)
        })
        .catch((error) => {
            console.log(error);
        });
    };
    useEffect(() => {
        if(isRefreshed) getProduct();
    }, [isRefreshed]);

    useEffect(() => {
        getProduct();
    }, [isFocused]);
    
    return [loading, product];
}
export default useGetProductById;