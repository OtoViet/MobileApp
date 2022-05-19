import { useEffect, useRef } from 'react';
import * as Notifications from 'expo-notifications';
import navigation from '../navigation/RootNavigation';

const useNotifications = () => {
    const notiResponseListener = useRef();
    useEffect(() => {
        notiResponseListener.current = Notifications.addNotificationResponseReceivedListener(res => {
            navigation.navigate('Notification',{data:res});
        });

        return () => {
            Notifications.removeNotificationSubscription(notiResponseListener.current);
        }
    }, []);
};

export default useNotifications;