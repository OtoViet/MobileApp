import FormApi from '../api/formApi.js';
import { useState, useEffect } from 'react';

function useGetAllScheduleHistory(isFocused, isRefreshed) {
    const [scheduleHistory, setScheduleHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    const getListScheduleHistory = () => {
        setLoading(true);
        FormApi.getAllScheduleHistory().then((scheduleHistoryRes) => {
            setScheduleHistory(scheduleHistoryRes);
            setLoading(false)
        })
        .catch((error) => {
            console.log(error);
        });
    };
    useEffect(() => {
        if(isRefreshed) getListScheduleHistory();
    }, [isRefreshed]);

    useEffect(() => {
        getListScheduleHistory();
    }, [isFocused]);
    
    return [loading, scheduleHistory];
}
export default useGetAllScheduleHistory;