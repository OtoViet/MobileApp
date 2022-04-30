import FormApi from '../api/formApi.js';
import { useState, useEffect } from 'react';

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
            FormApi.token({ refreshToken: localStorage.getItem('refreshToken') })
            .then((res) => {
                localStorage.setItem('token', res.accessToken);
                localStorage.setItem('refreshToken', res.refreshToken);
                FormApi.getVnpUrlReturn().then((dataRes) => {
                    setData(dataRes);
                    setLoading(false)
                })
                .catch((error) => {
                    console.log(error);
                    window.location.href = '/';
                });
            })
            .catch((error) => {
                console.log(error);
                window.location.href = '/';
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