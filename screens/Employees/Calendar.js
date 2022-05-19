import moment from 'moment';
import 'moment/locale/vi';
import { useState, useEffect } from 'react';
import { Caption, Title, Button } from 'react-native-paper';
import { View, Text, FlatList, Dimensions, Alert } from 'react-native';
import CalendarStrip from 'react-native-calendar-strip';
import useGetAllOrderForEmployee from '../../hooks/useGetAllOrderForEmployee';
import Loading from '../../components/Loading';
import Theme from '../../theme/Theme';
import { useIsFocused } from '@react-navigation/native';

let markedDates = [];

const handlePress = (data) => {
    Alert.alert('Chi tiết',
        `Khách hàng: ${data.item.contactInfo.name}\nĐịa chỉ: ${data.item.contactInfo.address}\nSố điện thoại: ${data.item.contactInfo.phoneNumber}\nThời gian hẹn: ${moment(data.item.dateAppointment).format('LLLL')}\nDịch vụ đã chọn: ${data.item.listService.map(item => item.productName).join(', ')}\nCombo đã chọn: ${data.item.combo}`);
};
const Item = ({ data }) => (
    <View style={{
        backgroundColor: 'white',
        padding: 20,
        marginVertical: 4,
    }}>
        <Caption style={{ fontWeight: 'bold' }}>{moment(new Date(data.item.dateAppointment)).format("dddd, DD MMMM YYYY").replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase())}</Caption>
        <Text>Thời gian hẹn: {moment(data.item.dateAppointment).format('HH:mm')}</Text>
        <Title style={{ fontSize: 18 }}>KH. {data.item.contactInfo.name}</Title>
        <Button color="red" mode="contained"
            onPress={() => handlePress(data)}>
            Chi tiết
        </Button>
    </View>
);

export default function EmployeeCalendar() {
    const isFocused = useIsFocused();
    const [loading, ordersGet] = useGetAllOrderForEmployee(isFocused, );
    const [orders, setOrders] = useState([]);
    const [selectedDate, setSelectedDate] = useState(new Date());

    useEffect(() => {
        markedDates = [];
        ordersGet.forEach(order => {
            let dots = [];
            let momentDate = moment(order.dateAppointment);
            dots.push({
                color: '#00bfff',
                selectedColor: 'yellow',
            });
            markedDates.push({
                date: momentDate,
                dots
            });
        });
        if (!loading) setOrders(ordersGet.filter(order => moment().isSame(moment(order.dateAppointment), 'day')));
    }, [ordersGet]);
    const renderItem = (props) => (
        <Item data={props} />
    );
    // const datesBlacklistFunc = date => {
    //     return date.isoWeekday() === 7; // disable Saturdays
    // }
    const onDateSelected = selectedDate => {
        let ordersFilter = ordersGet.filter(order => selectedDate.isSame(moment(order.dateAppointment), 'day'));
        setOrders(ordersFilter);
        setSelectedDate(selectedDate);
    }
    if (loading) return <Loading.Origin color={Theme.colors.secondary} size={50} />;

    return (
        <View
        >
            <CalendarStrip
                scrollable={false}
                calendarAnimation={{ type: 'parallel', duration: 300 }}
                daySelectionAnimation={{
                    type: 'border', borderWidth: 2,
                    duration: 200, borderHighlightColor: 'orange'
                }}
                style={{ height: 120, paddingTop: 10, paddingBottom: 10 }}
                calendarHeaderStyle={{ color: 'black', textTransform: 'uppercase' }}
                calendarColor={'white'}
                dateNumberStyle={{ color: 'black' }}
                dateNameStyle={{ color: 'black' }}
                iconContainer={{ flex: 0.1 }}
                highlightDateNameStyle={{ color: 'yellow' }}
                highlightDateNumberStyle={{ color: 'yellow' }}
                highlightDateContainerStyle={{ backgroundColor: '#00bfff' }}
                markedDates={markedDates}
                // datesBlacklist={datesBlacklistFunc}
                selectedDate={selectedDate}
                onDateSelected={onDateSelected}
            />
            <FlatList
                data={orders}
                renderItem={renderItem}
                keyExtractor={item => item._id}
                style={{ height: Dimensions.get('window').height - 200 }}
            />
        </View>
    );
}