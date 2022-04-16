import * as React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Theme from '../theme';
import { StatusBar } from 'expo-status-bar';
import Login from '../screens/Form/Login';
import Register from '../screens/Form/Register';
import HomeScreen from '../screens/Home';
import ListStoreScreen from '../screens/ListStore/ListStore';
import ListServiceScreen from '../screens/Service/ListService';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
const Drawer = createDrawerNavigator();

export default function Navigation({ route, navigation }) {
  return (
    <>
      <StatusBar style="light" />
      <Drawer.Navigator initialRouteName="Home"
        drawerStyle={{
          backgroundColor: '#111',
        }}>
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
        <Drawer.Screen name="Login" component={Login}
          options={{
            title: 'Trang đăng nhập',
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
            title: 'Trang đăng kí',
            headerStyle: {
              backgroundColor: Theme.Theme.colors.primary,
            },
            headerTintColor: '#fff',
            drawerIcon: ({ focused, size }) => (
              <FontAwesome name="registered" size={30} color={Theme.Theme.colors.secondary} />
            ),
          }} />
      </Drawer.Navigator>
    </>
  );
}