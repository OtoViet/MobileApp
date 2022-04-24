import { useState, useCallback } from 'react';
import Theme from '../../theme/Theme';
import { View, Alert } from 'react-native';
import { WebView } from 'react-native-webview';
import { Headline, Title, Text, Caption, Button } from 'react-native-paper';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FormApi from '../../api/formApi';
import io from 'socket.io-client';


const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
}

function AfterPaymentScreen({ route, navigation }) {
    const { data } = route.params;
    const socket = io("http://192.168.1.75:5000", { transports: ['websocket', 'polling', 'flashsocket'] });
    const handleClick = () => {
        socket.on("connect", () => {
            console.log(socket.id);
        });
        data.listServiceChoose = data.listServiceChoose.map((item, index) => {
            return { ...item, idProduct: item._id, id: index }
        });
        console.log(data);
        FormApi.createOrder(data)
            .then(resOrder => {
                let titleNotify = "Có đơn hàng mới từ " + data.name;
                let content = "chờ xác nhận";
                FormApi.createNotification({
                    title: titleNotify, content: content,
                    from: data.email, type: "order",
                    createdAt: resOrder.createdAt, detail: { idOrder: resOrder._id }
                })
                    .then(res => {
                        socket.emit('send', {
                            title: titleNotify, content: content,
                            from: data.email, type: "order",
                            createdAt: res.createdAt, detail: { idOrder: resOrder._id },
                            isRead: false
                        });
                        Alert.alert('Thông báo', 'Đã gửi yêu cầu chăm sóc xe thành công!');
                    })
                    .catch(err => {
                        console.log(err);
                    });
            })
            .catch(err => {
                console.log(err);
            });
    }
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Caption style={{ fontSize: 18, textAlign: 'center', marginBottom: 20 }}>
                Vui lòng đến đúng giờ để tránh bất tiện, chúng tôi sẽ gửi cho bạn email nhắc nhở trước 1 ngày để bạn thu xếp thời gian
            </Caption>
            <Button icon="calendar-check" color={Theme.colors.secondary} mode="contained"
                onPress={handleClick}>
                Xác nhận đặt lịch hẹn
            </Button>
        </View>
    );
}
function VNPayScreen({ route, navigation }) {
    let { data } = route.params;
    const [openWebview, setOpenWebview] = useState(false);
    const [url, setUrl] = useState('');
    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        wait(2000).then(() => setRefreshing(false));
    }, []);
    const onNavigationStateChange = (webViewState) => {
        console.log(webViewState.url);
        if(webViewState.url.includes('localhost')) {
            setOpenWebview(false);
            Alert.alert('Thông báo', 'Đã thanh toán thành công!');
            navigation.navigate('Home');
        }
    };
    const handlePress = async () => {
        console.log('data in vnpay screen');
        console.log(data);
        fetch('http://192.168.1.75:5000/api/order/create_payment_url', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                orderType: 'vehicle',
                orderDescription: 'Thanh toán dịch vụ xe',
                bankCode: '',
                amount: data.totalPrice,
                language: 'vn'
            })
        })
            .then(response => response.json())
            .then(responseJson => {
                if (responseJson.vnpUrl) {
                    setUrl(responseJson.vnpUrl);
                    setOpenWebview(true);
                }
            })
            .catch(error => {
                console.error(error);
            });
    };
    if (openWebview) return <WebView
        onNavigationStateChange={onNavigationStateChange}
        javaScriptEnabled
        domStorageEnabled
        source={{ uri: url }} />;
    return (

        <View 
        style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginHorizontal: 20 }}>
            <Title style={{ textAlign: 'center', marginBottom: 20 }}>Thanh toán trực tuyến dễ dàng với VNPAY</Title>
            <Button icon="wallet" color={Theme.colors.secondary} mode="contained"
                onPress={handlePress}>
                Thanh toán với VNPay
            </Button>
            <Caption style={{ fontSize: 18, textAlign: 'center', marginTop: 20 }}>Nhanh chóng, an toàn và tiện lợi hơn</Caption>
        </View>
    )
}

function BankingScreen() {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginHorizontal: 20 }}>
            <Headline>Thông tin người nhận</Headline>
            <Title>Tên Ngân Hàng</Title>
            <Text style={{ fontSize: 18, marginBottom: 20 }}>Sacombank</Text>
            <Title>Chi nhánh</Title>
            <Text style={{ fontSize: 18, marginBottom: 20 }}>PGD Ninh Kiều (Cần Thơ)</Text>
            <Title>Tên Người Thụ Hưởng</Title>
            <Text style={{ fontSize: 18, marginBottom: 20 }}>CTY TNHH 1TV OTOVIET</Text>
            <Title>Số Tài Khoản</Title>
            <Text style={{ fontSize: 18, marginBottom: 20 }}>070435430207</Text>
            <Caption style={{ fontSize: 18, textAlign: 'center' }}>Chúng tôi sẽ xác nhận với bạn sau khi bạn chuyển khoản thành công!</Caption>
        </View>
    )
}

const Tab = createMaterialTopTabNavigator();

export default function App({ route, navigation }) {
    const { data } = route.params;
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarLabelStyle: { fontSize: 12, color: 'white' },
                tabBarStyle: { backgroundColor: 'black' },
                tabBarItemStyle: { color: 'white' },
                tabBarIndicatorStyle: { backgroundColor: Theme.colors.secondary, height: 4 },
                tabBarIcon: ({ focused }) => {
                    if (route.name === 'AfterPayment') {
                        return (
                            <MaterialCommunityIcons
                                name={
                                    focused
                                        ? 'credit-card'
                                        : 'credit-card-outline'
                                }
                                size={26}
                                color={Theme.colors.secondary}
                            />
                        );
                    } else if (route.name === 'VNPAY') {
                        return (
                            <MaterialCommunityIcons
                                name={focused ? 'wallet' : 'wallet-outline'}
                                size={26}
                                color={Theme.colors.secondary}
                            />
                        );
                    }
                    else {
                        return (
                            <MaterialCommunityIcons
                                name={focused ? 'bank' : 'bank-outline'}
                                size={26}
                                color={Theme.colors.secondary}
                            />
                        );
                    }
                },
                tabBarInactiveTintColor: Theme.colors.primary,
                tabBarActiveTintColor: Theme.colors.secondary,
            })}
        >
            <Tab.Screen name="AfterPayment" component={AfterPaymentScreen}
                initialParams={{ data: data }}
                options={{ title: 'Thanh toán sau' }} />
            <Tab.Screen name="VNPAY" component={VNPayScreen}
                initialParams={{ data: data }}
                options={{ title: 'Ví điện tử VNPay' }}
            />
            <Tab.Screen name="Banking" component={BankingScreen}
                options={{ title: 'Chuyển khoản trực tiếp' }}
            />
        </Tab.Navigator>
    );
}