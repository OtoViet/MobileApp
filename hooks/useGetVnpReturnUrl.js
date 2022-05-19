import FormApi from '../api/formApi.js';
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

function useGetVnpReturnUrl(params, isFocused, isRefreshed) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const getVnpReturnUrl = () => {
        setLoading(true);
        FormApi.getVnpUrlReturn(params).then((dataRes) => {
            setData(dataRes);
            setLoading(false)
        })
        .catch((error) => {
            FormApi.token({ refreshToken: AsyncStorage.getItem('refreshToken') })
            .then((res) => {
                AsyncStorage.setItem('token', res.accessToken);
                AsyncStorage.setItem('refreshToken', res.refreshToken);
                FormApi.getVnpUrlReturn().then((dataRes) => {
                    setData(dataRes);
                    setLoading(false)
                })
                .catch((error) => {
                    console.log(error);
                    setLoading('error');
                });
            })
            .catch((error) => {
                    setLoading('error');
                    console.log(error);
            });
        });
    };
    useEffect(() => {
        if(isRefreshed) getVnpReturnUrl();
    }, [isRefreshed]);

    useEffect(() => {
        getVnpReturnUrl();
    }, [isFocused]);
    return [loading, data];
}
export default useGetVnpReturnUrl;