import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../screens/Form/Login';
import Register from '../screens/Form/Register';
import Theme from '../theme'
const Stack = createNativeStackNavigator();
function Navigation() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home">
                <Stack.Screen name="Home" component={Login}
                    options={{
                        title: 'Trang đăng nhập',
                        headerStyle: {
                            backgroundColor: Theme.Theme.colors.primary,
                        },
                        headerTintColor: '#fff',
                    }} />
                <Stack.Screen name="Register" component={Register}
                    options={{
                        title: 'Trang đăng kí',
                        headerStyle: {
                            backgroundColor: Theme.Theme.colors.primary,
                        },
                        headerTintColor: '#fff',
                    }} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default Navigation;