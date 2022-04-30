import FormApi from '../api/formApi.js';
import { useState, useEffect } from 'react';

function useGetAllProduct(isFocused, isRefreshed) {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const getListProduct = () => {
        setLoading(true);
        FormApi.getAllProduct().then((productsRes) => {
            setProducts(productsRes);
            setLoading(false);
        })
        .catch((error) => {
            console.log(error);
        });
    };
    useEffect(() => {
        if(isRefreshed) getListProduct();
    }, [isRefreshed]);

    useEffect(() => {
        getListProduct();
    }, [isFocused]);
    return [loading, products];
}
export default useGetAllProduct;