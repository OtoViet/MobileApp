import FormApi from '../api/formApi.js';
import { useState, useEffect } from 'react';

function useGetAllScheduleHistory() {
    const [scheduleHistory, setScheduleHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    const getListScheduleHistory = () => {
        FormApi.getAllScheduleHistory().then((scheduleHistoryRes) => {
            setScheduleHistory(scheduleHistoryRes);
            setLoading(false)
        })
        .catch((error) => {
            console.log(error);
        });
    };
    useEffect(() => {
        getListScheduleHistory();
    }, []);
    return [loading, scheduleHistory];
}
export default useGetAllScheduleHistory;