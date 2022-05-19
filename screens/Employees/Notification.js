import React from 'react';
import { Text, View, ScrollView } from 'react-native';
import { Headline, Title } from 'react-native-paper';
import useGetOrderById from '../../hooks/useGetOrderById';
import Loading from '../../components/Loading';
import Theme from '../../theme/Theme';
import moment from 'moment';

export default function Notification({ route, navigation }) {
    let data = route.params.data;
    const [loading, order] = useGetOrderById(data.notification.request.content.data.idOrder);
    console.log(data.notification.request.content);
    if (loading) return <Loading.Origin color={Theme.colors.secondary} size={50} />;
    return (
        <ScrollView>
            <View
                style={{
                    flex: 1,
                    justifyContent: 'space-around',
                    marginHorizontal: 20,
                }}>
                <View>
                    <Headline style={{ textAlign: 'center', color: Theme.colors.secondary }}> {data && data.notification.request.content.body}</Headline>
                    <Title>Thông tin chi tiết</Title>
                    <Text style={{fontSize:18, textAlign: 'justify'}}>Mã lịch hẹn: {order._id}</Text>
                    <Title>Thông tin khách hàng</Title>
                    <Text style={{fontSize:18, textAlign: 'justify'}}>Họ tên: {order.contactInfo.name}</Text>
                    <Text style={{fontSize:18, textAlign: 'justify'}}>Số điện thoại: {order.contactInfo.phoneNumber}</Text>
                    <Text style={{fontSize:18, textAlign: 'justify'}}>Địa chỉ: {order.contactInfo.address}</Text>
                    <Text style={{fontSize:18, textAlign: 'justify'}}>Email: {order.contactInfo.email}</Text>
                    <Title>Thời gian</Title>
                    <Text style={{fontSize:18, textAlign: 'justify'}}>Thời gian đặt: {moment(order.createdAt).format('LLLL')}</Text>
                    <Text style={{fontSize:18, textAlign: 'justify'}}>Thời gian hẹn: {moment(order.dateAppointment).format('LLLL')}</Text>
                    <Title>Dịch vụ đã chọn</Title>
                    {
                        order.listService.map((item, index) => {
                            return <Text style={{fontSize:16}} key={index}>{item.productName}</Text>
                        })
                    }
                    <Title>Yêu cầu thêm</Title>
                    <Text style={{fontSize:18, textAlign: 'justify'}}>{order.contactInfo.description}</Text>
                </View>
            </View>
        </ScrollView>
    );
}