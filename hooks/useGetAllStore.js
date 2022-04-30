import FormApi from '../api/formApi.js';
import { useState, useEffect } from 'react';

function useGetAllStore(isFocused, isRefreshed) {
    const [stores, setStore] = useState([]);
    const [loading, setLoading] = useState(true);
    const getListStore = () => {
        setLoading(true);
        FormApi.getAllStore().then((storesRes) => {
            setStore(storesRes);
            setLoading(false)
        })
        .catch((error) => {
            FormApi.token({ refreshToken: localStorage.getItem('refreshToken') })
            .then((res) => {
                localStorage.setItem('token', res.accessToken);
                localStorage.setItem('refreshToken', res.refreshToken);
                FormApi.getAllStore().then((storesRes) => {
                    setStore(storesRes);
                    setLoading(false)
                })
                .catch((error) => {
                    console.log(error);
                });
            })
            .catch((error) => {
                console.log(error);
            });
        });
    };
    useEffect(() => {
        if(isRefreshed) getListStore();
    }, [isRefreshed]);
    useEffect(() => {
        getListStore();
    }, [isFocused]);
    return [loading, stores];
}
export default useGetAllStore;