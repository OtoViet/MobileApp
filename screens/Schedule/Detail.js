import moment from 'moment';
import 'moment/locale/vi';
import {
    StyleSheet,
    View, Alert
} from 'react-native';
import Theme from '../../theme/Theme';
import Loading from '../../components/Loading';
import Timeline from 'react-native-timeline-flatlist'
import { Button, Headline, Text, Title } from 'react-native-paper';
import useGetOrderById from '../../hooks/useGetOrderById';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import io from 'socket.io-client';

export default function Detail({ route, navigation }) {
    const { data } = route.params;
    const socket = io("http://192.168.1.75:5000", { transports: ['websocket', 'polling', 'flashsocket'] });
    const [loading, order] = useGetOrderById(data);

    const dataTimeline = [
        {
            time: 'Bước 1', title: 'Gửi yêu cầu phục vụ', description: 'Bạn đã gửi yêu cầu và đã(hoặc chưa) thanh toán',
            icon: <MaterialCommunityIcons style={{ backgroundColor: 'white', width: 30, height: 30 }} name="timer" size={30} 
            color={Theme.colors.secondary} />
        },
        {
            time: 'Bước 2', title: 'Cửa hàng', description: 'Xác nhận từ cửa hàng',
            lineColor:  order.isConfirmed ? Theme.colors.secondary : 'grey',
            icon: <MaterialCommunityIcons style={{ backgroundColor: 'white', width: 30, height: 30 }} name="repeat" size={30} 
            color={order.isConfirmed ? Theme.colors.secondary : 'grey'} />
        },
        {
            time: 'Bước 3', title: 'Nhận thông báo', description: 'Cửa hàng đã gửi cho bạn thông báo qua email',
            lineColor:  order.isSendEmail ? Theme.colors.secondary : 'grey' ,
            icon: <MaterialIcons style={{ backgroundColor: 'white', width: 30, height: 30 }} name="campaign" size={30} 
            color={order.isSendEmail ? Theme.colors.secondary : 'grey'} />
        },
        {
            time: 'Bước 4', title: 'Hoàn thành', description: 'Cảm ơn bạn đã sử dụng dịch vụ của chúng tôi!',
            lineColor:  order.isCompleted ? Theme.colors.secondary : 'grey' ,
            icon: <MaterialIcons style={{ backgroundColor: 'white', width: 30, height: 30 }} name="fact-check" size={30} 
            color={order.isCompleted ? Theme.colors.secondary : 'grey'} />
        },
    ];
    const handleAccept = () => {
        socket.on("connect", () => {
            console.log(socket.id);
        });
        if (loading == false && loading != 'error') {
            FormApi.cancelOrder(data)
                .then(res => {
                    Alert.alert('Thông báo', 'Đã hủy lịch hẹn thành công!');
                })
                .catch(err => {
                    if (err.response.status === 403) {
                        let titleNotify = "Có yêu cầu hủy lịch hẹn từ " + order.contactInfo.name;
                        let content = "chờ xác nhận hủy";
                        FormApi.createNotification({
                            title: titleNotify, content: content,
                            from: order.contactInfo.email, type: "orderCancel",
                            createdAt: new Date(), detail: { idOrder: order._id }
                        })
                            .then(res => {
                                Alert.alert('Thông báo','Đã gửi yêu cầu hủy lịch hẹn do cửa hàng đã xác nhận');
                                socket.emit('send', {
                                    title: titleNotify, content: content,
                                    from: order.contactInfo.email, type: "orderCancel",
                                    createdAt: new Date(), detail: { idOrder: order._id },
                                    isRead: false,
                                });
                            })
                            .catch(err => {
                                Alert.alert('Thông báo','Có lỗi xảy ra, vui lòng thử lại sau!!!');
                                console.log(err);
                            });
                    }
                    console.log(err);
                });
        }
    };
    const handlePressCancelOrder = () => {
        Alert.alert(
            "Thông báo",
            "Bạn có chắc muốn hủy lịch hẹn này không?",
            [
                {
                    text: "Hủy bỏ",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                { text: "Xác nhận", onPress: () => handleAccept() }
            ]
        );
    }

    if (loading == 'error') navigation.navigate('Home');
    if (loading === true) return <Loading.Origin color={Theme.colors.secondary} size={50} />;
    return (
        <View style={styles.container}>
            <Headline style={{ textAlign: 'center' }}>Chi tiết lịch hẹn</Headline>
            <Title>Người đặt lịch: {order.contactInfo.name}</Title>
            <Title>Thời gian đặt: {moment(order.createdAt).format('DD/MM/YYYY')}</Title>
            <Title>Dịch vụ đã chọn: {order.listService.map((item,index)=>{
                return <Text key={index}>{item.productName}, </Text>
            })}</Title>
            <Title>Tổng tiền: {Math.round(order.totalPrice).toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') + '₫ '}</Title>
            <Title>Thời gian hẹn: {moment(order.dateAppointment).locale('vi').format('LLLL')}</Title>
            <Headline style={{ textAlign: 'center' }}>Trạng thái lịch hẹn</Headline>
            <Timeline
                style={styles.list}
                data={dataTimeline}
                circleSize={20}
                lineColor={Theme.colors.secondary}
                timeContainerStyle={{ minWidth: 60, minHeight: 120, marginTop: -5 }}
                timeStyle={{
                    textAlign: 'center', backgroundColor: Theme.colors.primary, color: 'white',
                    padding: 5, borderRadius: 6
                }}
                descriptionStyle={{ color: 'gray' }}
                options={{
                    style: { paddingTop: 20 }
                }}
                innerCircle={'icon'}
            />
            <Button
                style={{ marginBottom: 20 }}
                icon="cancel" color={Theme.colors.secondary}
                mode="contained"
                onPress={handlePressCancelOrder}>
                Hủy lịch hẹn
            </Button>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        backgroundColor: 'white'
    },
    list: {
        flex: 1,
        marginTop: 20,
    },
});
