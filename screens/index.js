import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import DetaiService from './Service/Detail';
import Booking from './Service/Booking';
import ContactInfo from './Service/ContactInfo';
import Payment from './Service/Payment';
import Schedule from './Schedule/Schedule';
import Navigation from '../navigation/Drawer';
import Theme from '../theme';
import Detail from './Schedule/Detail';
import VnPayReturn from './Service/VnPayResult';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FormApi from '../api/formApi';
import useNotification from '../hooks/useNotification';
import Notification from './Employees/Notification';
import { navigationRef } from "../navigation/RootNavigation";
import useGetInfoCustomer from '../hooks/useGetInfoCustomer';

async function AutoRefreshToken() {
  console.log('goi ham refresh token');
  let refreshToken = await AsyncStorage.getItem('refreshToken');
  if (refreshToken) {
    FormApi.token({ refreshToken: refreshToken })
      .then((res) => {
        AsyncStorage.setItem('token', res.accessToken);
        AsyncStorage.setItem('refreshToken', res.refreshToken);
      })
      .catch((err) => {
        AsyncStorage.removeItem('token');
        AsyncStorage.removeItem('refreshToken');
      });
  }
}

const Stack = createNativeStackNavigator();
export default function Screen() {
  // const ref = useRef();
  // useEffect(() => {
    //   const interval = setInterval(AutoRefreshToken, 1 * 60000)
    //   ref.current = interval
    //   return () => clearInterval(interval)
    // }, []);
    
  useNotification();
  return <NavigationContainer ref={navigationRef}>
    <Stack.Navigator >
      <Stack.Screen name="Drawer" options={{ headerShown: false }}
        component={Navigation} />
      <Stack.Screen name="Details" component={DetaiService}
        options={{
          title: "Chi tiết dịch vụ",
          headerStyle: {
            backgroundColor: Theme.Theme.colors.primary,
          },
          headerTintColor: '#fff',
        }} />
      <Stack.Screen name="Booking" component={Booking}
        options={{
          title: "Đặt lịch",
          headerStyle: {
            backgroundColor: Theme.Theme.colors.primary,
          },
          headerTintColor: '#fff',
        }} />
      <Stack.Screen name="ContactInfo" component={ContactInfo}
        options={{
          title: "Thông tin liên hệ",
          headerStyle: {
            backgroundColor: Theme.Theme.colors.primary,
          },
          headerTintColor: '#fff',
        }} />
      <Stack.Screen name="Checkout" component={Payment}
        options={{
          title: "Thanh toán",
          headerStyle: {
            backgroundColor: Theme.Theme.colors.primary,
          },
          headerTintColor: '#fff',
        }} />
      <Stack.Screen name="Schedule" component={Schedule}
        options={{
          title: "Lịch hẹn",
          headerStyle: {
            backgroundColor: Theme.Theme.colors.primary,
          },
          headerTintColor: '#fff',
        }} />
      <Stack.Screen name="DetailOrder" component={Detail}
        options={{
          title: "Chi tiết lịch hẹn",
          headerStyle: {
            backgroundColor: Theme.Theme.colors.primary,
          },
          headerTintColor: '#fff',
        }} />
      <Stack.Screen name="VnPayReturn" component={VnPayReturn}
        options={{
          title: "Kết quả thanh toán",
          headerStyle: {
            backgroundColor: Theme.Theme.colors.primary,
          },
          headerTintColor: '#fff',
        }} />
      <Stack.Screen name="Notification" component={Notification}
        options={{
          title: "Thông báo",
          headerStyle: {
            backgroundColor: Theme.Theme.colors.primary,
          },
          headerTintColor: '#fff',
        }} />
    </Stack.Navigator>
  </NavigationContainer>;
}