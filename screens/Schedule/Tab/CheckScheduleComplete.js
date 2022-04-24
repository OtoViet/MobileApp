import moment from 'moment';
import 'moment/locale/vi';
import { useState, useEffect } from 'react';
import Theme from '../../../theme/Theme';
import Loading from '../../../components/Loading';
import FormApi from '../../../api/formApi';
import { ScrollView, View, Alert } from 'react-native';
import { Table, Row } from 'react-native-table-component';
import useGetAllScheduleHistory from '../../../hooks/useGetAllScheduleHistory';
import { Button, Headline } from 'react-native-paper';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

const Tab = createMaterialTopTabNavigator();

const Booking = ({ route, navigation }) => {
    const tableHead = ['Mã lịch hẹn', 'Ngày đặt', 'Thời gian hẹn', 'Trạng thái', 'Chi tiết'];
    const widthArr = [200, 100, 200, 120, 120];
    let tableData = [];
    const [loadingOrder, orders] = useGetAllScheduleHistory();
    const [dataTable1, setDataTable1] = useState(null);

    useEffect(() => {
        orders.forEach((item, index) => {
            tableData.push([
                item._id,
                moment(item.createdAt).format('DD/MM/YYYY'),
                moment(item.dateAppointment).locale('vi').format('LLLL'),
                item.isCompleted ? 'Hoàn thành': 'Đã hủy',
                <Button mode="text" onPress={() => handlePressDetail(item._id)}>
                    Chi tiết
                </Button>
            ]);
        });
        setDataTable1(tableData);

    }, [loadingOrder]);
    const handlePressDetail = (idOrder) => {
        navigation.navigate('DetailOrder', { data: idOrder });
    };
    if (loadingOrder == 'error') {
        navigation.navigate('Home');
    }
    if (loadingOrder) return <Loading.Origin color={Theme.colors.secondary} size={50} />;
    return (
        <ScrollView >
            <Headline style={{ textAlign: 'center', marginVertical: 20 }}>Lịch sử lịch hẹn</Headline>
            <ScrollView horizontal={true}>
                <View style={{ paddingHorizontal: 20 }}>
                    <Table borderStyle={{ borderWidth: 1, borderColor: '#C1C0B9' }}>
                        <Row data={tableHead} widthArr={widthArr}
                            style={{ height: 50, backgroundColor: Theme.colors.primary }}
                            textStyle={{ textAlign: 'center', color: 'white', fontWeight: '100' }} />
                    </Table>
                    <ScrollView style={{ marginTop: -1 }}>
                        <Table borderStyle={{ borderWidth: 1, borderColor: '#C1C0B9' }}>
                            {
                                dataTable1.map((rowData, index) => {
                                    let backgroundIndex = index % 2 ? 'white' : '#f3f6f4';
                                    return <Row
                                        key={index}
                                        data={rowData}
                                        widthArr={widthArr}
                                        style={{ height: 60, backgroundColor: backgroundIndex }}
                                        textStyle={{ textAlign: 'center', fontWeight: '100' }}
                                    />;
                                })
                            }
                        </Table>
                    </ScrollView>
                </View>
            </ScrollView>
        </ScrollView>
    );
}

export default Booking;