import axios from 'axios';
import queryString from 'query-string'
import AsyncStorage from '@react-native-async-storage/async-storage';

const axiosClient = axios.create({
    baseURL: 'http://192.168.1.75:5000/api',
    headers: {
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "*"
    },
    paramsSerializer: params => queryString.stringify(params),
});
axiosClient.interceptors.request.use(async (config) => {
    try{
        const token = await AsyncStorage.getItem('token')
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    }
    catch{
        return config;
    }
});

axiosClient.interceptors.response.use(async (response) => {
    if(response && response.data) return response.data;
    return response;
},(error) => {
    throw error;
});
export default axiosClient;


