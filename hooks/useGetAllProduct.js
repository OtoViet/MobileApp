import FormApi from '../api/formApi.js';
import { useState, useEffect } from 'react';

function useGetAllProduct() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const getListProduct = () => {
        FormApi.getAllProduct().then((productsRes) => {
            setProducts(productsRes);
            setLoading(false)
        })
        .catch((error) => {
            console.log(error);
        });
    };
    useEffect(() => {
        getListProduct();
    }, []);
    return [loading, products];
}
export default useGetAllProduct;