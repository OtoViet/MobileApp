import axiosClient from './axiosClient';
const formApi={
    signUp:function(body){
        const url ='/auth/signUp';
        return axiosClient.post(url,body);
    },
    existAccount:function(body){
        const url ='/auth/checkExistAccount';
        return axiosClient.post(url,body);
    },
    checkPassword: function(body){
        const url ='/auth/checkPassword';
        return axiosClient.post(url,body);
    },
    login:function(body){
        const url ='/auth/login';
        return axiosClient.post(url,body);
    },
    loginGoogle:function(body){
        const url ='/auth/loginGoogle';
        return axiosClient.post(url,body);
    },
    api:function(params){
        const url ='/api';
        return axiosClient.get(url,{
            body:params,
            baseURL: 'http://localhost:4000'
        });
    },
    token: function(body){
        const url ='/auth/token';
        return axiosClient.post(url,body);
    },
    logout: function(){
        const url ='/auth/logout';
        return axiosClient.delete(url);
    },
    forgotPassword: function(body){
        const url ='/auth/forgotPassword';
        return axiosClient.patch(url,body);
    },
    checkTokenResetPassword: function(body){
        const url ='/auth/checkTokenResetPassword';
        return axiosClient.post(url,body);
    },
    resetPassword: function(body){
        const url ='/auth/resetPassword';
        return axiosClient.post(url,body);
    },
    changePassword: function(body){
        const url ='/auth/changePassword';
        return axiosClient.patch(url,body);
    },
    getAllProduct: function(){
        const url ='/customer/getAllProduct';
        return axiosClient.get(url);
    },
    getProductById: function(id){
        const url ='/customer/getProductById/'+id;
        return axiosClient.get(url);
    },
    rating: function(id,body){
        const url ='/customer/rating/'+id;
        return axiosClient.patch(url,body);
    },
    getInfoCustomer: function(body){
        const url ='/customer/getInfoCustomer';
        return axiosClient.get(url,body);
    },
    updateInfoCustomer: function(body){
        const url ='/customer/updateInfoCustomer';
        return axiosClient.patch(url,body);
    },
    getAllScheduleHistory: function(){
        const url ='/order/getAllScheduleHistory';
        return axiosClient.get(url);
    },
    createOrder: function(body){
        const url ='/order/createOrder';
        return axiosClient.post(url,body);
    },
    getAllOrder: function(){
        const url ='/order/getAllOrder';
        return axiosClient.get(url);
    },
    findOrderByEmail: function(email){
        const url ='/order/findOrderByEmail/'+email;
        return axiosClient.get(url);
    },
    getOrderById: function(id){
        const url ='/order/getOrderById/'+id;
        return axiosClient.get(url);
    },
    cancelOrder: function(id){
        const url ='/order/cancelOrder/'+id;
        return axiosClient.patch(url);
    },
    getAllStore: function(){
        const url ='/admin/getAllStore';
        return axiosClient.get(url);
    },
    getAllEmployee: function(){
        const url ='/admin/getAllEmployee';
        return axiosClient.get(url);
    },
    getVnpUrlReturn: function(params){
        const url = '/order/vnpay_return'+params;
        return axiosClient.get(url);
    },
    getVnpIpn: function(params){
        const url = '/order/vnpay_ipn'+params;
        return axiosClient.get(url);
    },
    getDiscountByCode: function(code){
        const url ='/order/getDiscountByCode/'+code;
        return axiosClient.get(url);
    },
    createNotification: function(body){
        const url ='/admin/createNotification';
        return axiosClient.post(url,body);
    },
}
export default formApi;