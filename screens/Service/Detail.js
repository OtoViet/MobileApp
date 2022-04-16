import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Theme from '../../theme/Theme';
import InfoTab from './Tabs/Info';
import Comments from './Tabs/Comments';
const Tab = createBottomTabNavigator();

export default function Detail({ route, navigation }) {
    const { data } = route.params;
    return (
        <>
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused }) => {
                        if (route.name === 'Comments') {
                            return (
                                <MaterialCommunityIcons
                                    name={
                                        focused
                                            ? 'comment'
                                            : 'comment-outline'
                                    }
                                    size={30}
                                    color={Theme.colors.secondary}
                                />
                            );
                        } else if (route.name === 'Info') {
                            return (
                                <MaterialCommunityIcons
                                    name={focused ? 'information' : 'information-outline'}
                                    size={30}
                                    color={Theme.colors.secondary}
                                />
                            );
                        }
                    },
                    tabBarInactiveTintColor: Theme.colors.primary,
                    tabBarActiveTintColor: Theme.colors.secondary,
                })}
            >
                <Tab.Screen name="Info" component={InfoTab}
                    initialParams={{ data: data }}
                    options={{ title: "Thông tin chi tiết", headerShown: false }} />
                <Tab.Screen
                    name="Comments"
                    initialParams={{ data: data }}
                    component={Comments}
                    listeners={{
                        tabPress: (e) => {
                            // Prevent default action
                            e.preventDefault();
                            navigation.navigate('Comments', { data: data });
                        },
                    }}
                    options={{
                        tabBarBadge: data.rating.length,
                        headerShown: false,
                        tabBarBadgeStyle: { backgroundColor: Theme.colors.primary }
                        , title: "Bình luận"
                    }}
                />
            </Tab.Navigator>
        </>
    );
}