import Theme from '../../theme/Theme';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CheckSchedule from './Tab/CheckSchedule';
import CheckScheduleComplete from './Tab/CheckScheduleComplete';

const Tab = createMaterialTopTabNavigator();

export default function App({ route, navigation }) {
    // const { data } = route.params;
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarLabelStyle: { fontSize: 12, color: 'white' },
                tabBarStyle: { backgroundColor: 'black' },
                tabBarItemStyle: { color: 'white' },
                tabBarIndicatorStyle: { backgroundColor: Theme.colors.secondary, height: 4 },
                tabBarIcon: ({ focused }) => {
                    if (route.name === 'CheckSchedule') {
                        return (
                            <Ionicons
                                name={
                                    focused
                                        ? 'list-circle'
                                        : 'list-circle-outline'
                                }
                                size={25}
                                color={Theme.colors.secondary}
                            />
                        );
                    }
                    else {
                        return (
                            <Ionicons
                                name={focused ? 'archive' : 'archive-outline'}
                                size={25}
                                color={Theme.colors.secondary}
                            />
                        );
                    }
                },
                tabBarInactiveTintColor: Theme.colors.primary,
                tabBarActiveTintColor: Theme.colors.secondary,
            })}
        >
            <Tab.Screen name="CheckSchedule" component={CheckSchedule}
                initialParams={{ data: data }}
                options={{ title: 'Danh sách lịch hẹn' }} />
            <Tab.Screen name="CheckScheduleComplete" component={CheckScheduleComplete}
                initialParams={{ data: data }}
                options={{ title: 'Lịch sử' }}
            />
        </Tab.Navigator>
    );
}
