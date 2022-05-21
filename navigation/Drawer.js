import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Theme from '../theme';
import { StatusBar } from 'expo-status-bar';
import Login from '../screens/Form/Login';
import Register from '../screens/Form/Register';
import CalenderEmployees from '../screens/Employees/Calendar';
import HomeScreen from '../screens/Home';
import ForgotPassword from '../screens/Form/ForgotPassword';
import ListStoreScreen from '../screens/ListStore/ListStore';
import User from '../screens/User';
import HomeEmployee from '../screens/Home/HomeEmployee';
import ListServiceScreen from '../screens/Service/ListService';
import SheduleScreen from '../screens/Schedule/Schedule';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import History from '../screens/Employees/History';
import useGetInfoCustomer from '../hooks/useGetInfoCustomer';
import {Text} from 'react-native';
import { set } from 'react-native-reanimated';

const Drawer = createDrawerNavigator();

export default function Navigation({ route, navigation }) {
  const [role, setRole] = useState('waiting');
  const [token, setToken] = useState(null);
  useGetInfoCustomer();
  const [refreshToken, setRefreshToken] = useState(null);
  AsyncStorage.getItem('role').then(res => {
    setRole(res);
  }).catch(err => {
    console.log(err);
    setRole(null);
  });
  AsyncStorage.getItem('token').then(res => {
    setToken(res);
  }).catch(err => {
    console.log(err);
    setRole(null);
  });
  AsyncStorage.getItem('refreshToken').then(res => {
    setRefreshToken(res);
  }).catch(err => {
    console.log(err);
    setRole(null);
  });
  console.log('co chayvao day');
  if (role == 'customer' || role == null || role=='admin') {
    return (
      <>
        <StatusBar style="light" />
        <Drawer.Navigator initialRouteName="Home"
          drawerStyle={{
            backgroundColor: '#111',
          }}
          screenOptions={{
            drawerActiveTintColor: Theme.Theme.colors.secondary
          }}
        >
          <Drawer.Screen name="Home" component={HomeScreen.screen}
            options={{
              title: 'Trang chủ',
              headerStyle: {
                backgroundColor: Theme.Theme.colors.primary,
              },
              headerTintColor: '#fff',
              drawerIcon: ({ focused, size }) => (
                <Ionicons name="home" size={30} color={Theme.Theme.colors.secondary} />
              ),
            }} />
          <Drawer.Screen name="ListService" component={ListServiceScreen}
            options={{
              title: 'Danh sách dịch vụ',
              headerStyle: {
                backgroundColor: Theme.Theme.colors.primary,
              },
              headerTintColor: '#fff',
              drawerIcon: ({ focused, size }) => (
                <Ionicons name="list" size={30} color={Theme.Theme.colors.secondary} />
              ),
            }} />
          <Drawer.Screen name="Schedule" component={SheduleScreen}
            options={{
              title: 'Kiểm tra lịch hẹn',
              headerStyle: {
                backgroundColor: Theme.Theme.colors.primary,
              },
              headerTintColor: '#fff',
              drawerIcon: ({ focused, size }) => (
                <Ionicons name="search" size={30} color={Theme.Theme.colors.secondary} />
              ),
            }} />
          <Drawer.Screen name="ListStore" component={ListStoreScreen}
            options={{
              title: 'Danh sách cửa hàng',
              headerStyle: {
                backgroundColor: Theme.Theme.colors.primary,
              },
              headerTintColor: '#fff',
              drawerIcon: ({ focused, size }) => (
                <MaterialIcons name="store" size={30} color={Theme.Theme.colors.secondary} />
              ),
            }} />

          {
            !token ?
              <>
                <Drawer.Screen name="Login" component={Login}
                  options={{
                    title: 'Đăng nhập',
                    headerStyle: {
                      backgroundColor: Theme.Theme.colors.primary,
                    },
                    headerTintColor: '#fff',
                    drawerIcon: ({ focused, size }) => (
                      <Entypo name="login" size={30} color={Theme.Theme.colors.secondary} />
                    ),
                  }} />
                <Drawer.Screen name="Register" component={Register}
                  options={{
                    title: 'Đăng kí',
                    headerStyle: {
                      backgroundColor: Theme.Theme.colors.primary,
                    },
                    headerTintColor: '#fff',
                    drawerIcon: ({ focused, size }) => (
                      <FontAwesome name="registered" size={30} color={Theme.Theme.colors.secondary} />
                    ),
                  }} />
                <Drawer.Screen name="ForgotPassword" component={ForgotPassword}
                  options={{
                    title: 'Quên mật khẩu',
                    headerStyle: {
                      backgroundColor: Theme.Theme.colors.primary,
                    },
                    headerTintColor: '#fff',
                    drawerIcon: ({ focused, size }) => (
                      <AntDesign name="questioncircleo" size={30} color={Theme.Theme.colors.secondary} />
                    ),
                  }} />
              </>
              : null
          }
          {token ?
            <>
              <Drawer.Screen name="User" component={User}
                options={{
                  title: 'Người dùng',
                  headerStyle: {
                    backgroundColor: Theme.Theme.colors.primary,
                  },
                  headerTintColor: '#fff',
                  drawerIcon: ({ focused, size }) => (
                    <Ionicons name="ios-person-circle" size={30} color={Theme.Theme.colors.secondary} />
                  ),
                }} />
            </>
            : null}
        </Drawer.Navigator>
      </>
    );
  }
  else {
    return (
      <>
        <StatusBar style="light" />
        <Drawer.Navigator initialRouteName="Home"
          drawerStyle={{
            backgroundColor: '#111',
          }}
          screenOptions={{
            drawerActiveTintColor: Theme.Theme.colors.secondary
          }}
        >
          <Drawer.Screen name="Home" component={HomeEmployee}
            options={{
              title: 'Trang chủ',
              headerStyle: {
                backgroundColor: Theme.Theme.colors.primary,
              },
              headerTintColor: '#fff',
              drawerIcon: ({ focused, size }) => (
                <Ionicons name="home" size={30} color={Theme.Theme.colors.secondary} />
              ),
            }} />
          {token ?
            <>
              <Drawer.Screen name="User" component={User}
                options={{
                  title: 'Người dùng',
                  headerStyle: {
                    backgroundColor: Theme.Theme.colors.primary,
                  },
                  headerTintColor: '#fff',
                  drawerIcon: ({ focused, size }) => (
                    <Ionicons name="ios-person-circle" size={30} color={Theme.Theme.colors.secondary} />
                  ),
                }} />
              <Drawer.Screen name="CalenderEmployees" component={CalenderEmployees}
                options={{
                  title: 'Lịch làm việc',
                  headerStyle: {
                    backgroundColor: Theme.Theme.colors.primary,
                  },
                  headerTintColor: '#fff',
                  drawerIcon: ({ focused, size }) => (
                    <Ionicons name="calendar-sharp" size={30} color={Theme.Theme.colors.secondary} />
                  ),
                }} />
              <Drawer.Screen name="HistoriesSchedule" component={History}
                options={{
                  title: 'Lịch sử phục vụ',
                  headerStyle: {
                    backgroundColor: Theme.Theme.colors.primary,
                  },
                  headerTintColor: '#fff',
                  drawerIcon: ({ focused, size }) => (
                    <MaterialIcons name="history" size={30} color={Theme.Theme.colors.secondary} />
                  ),
                }} />
            </>
            : null}
        </Drawer.Navigator>
      </>
    );
  }
}