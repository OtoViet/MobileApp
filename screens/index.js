import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import DetaiService from './Service/Detail';
import Booking from './Service/Booking';
import ContactInfo from './Service/ContactInfo';
import Payment from './Service/Payment';
import Schedule from './Schedule/Schedule';
import Navigation from '../navigation/Drawer';
import Theme from '../theme';
import Detail from './Schedule/Detail';
const Stack = createNativeStackNavigator();

export default function Screen() {
  return <NavigationContainer>
    <Stack.Navigator >
      <Stack.Screen name="Drawer" options={{ headerShown: false }} component={Navigation} />
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
    </Stack.Navigator>
  </NavigationContainer>;
}