import { useEffect, useState } from 'react';
import {ScrollView} from 'react-native';
import { List, Button } from 'react-native-paper';
import useGetAllOrderForEmployee from '../../hooks/useGetAllOrderForEmployee';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Loading from '../../components/Loading';
import Theme from '../../theme/Theme';
import moment from 'moment';

const History = () => {
    const [loading, listOrder] = useGetAllOrderForEmployee();
    const [listOrderFilter, setListOrderFilter] = useState([]);
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [distinctDate, setDistinctDate] = useState([]);
    const [dateFilter, setDateFilter] = useState();

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (date) => {
        let newListOrder = listOrder.filter(item => {
            return item.isCompleted === true && moment(item.updatedAt).format('DD/MM/YYYY') === moment(date).format('DD/MM/YYYY');
        });
        setListOrderFilter(newListOrder);
        setDistinctDate([moment(date).format('DD/MM/YYYY')]);
        hideDatePicker();
    };

    useEffect(() => {
        let newListOrder = listOrder.filter(item => item.isCompleted === true);
        setListOrderFilter(newListOrder);
        let newSet = new Set();
        listOrder.forEach(item => {
            newSet.add(moment(item.updatedAt).format('DD/MM/YYYY'));
        });
        setDistinctDate(Array.from(newSet));
    }, [listOrder]);

    if (loading) return <Loading.Origin color={Theme.colors.secondary} size={50} />;
    return (
        <ScrollView>
            <Button icon="filter-menu" color={Theme.colors.secondary} mode="contained" onPress={showDatePicker}>
                Chọn ngày
            </Button>
            <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                maximumDate={new Date()}
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
            />
            {
                distinctDate.length > 0 ?
                    distinctDate.map((date, indexDate) => {
                        return <List.Section title={date} key={indexDate}>
                            {
                                listOrderFilter.map((item, index) => {
                                    if (moment(item.updatedAt).format('DD/MM/YYYY') === date) return <List.Accordion key={index}
                                        title={`${moment(item.dateAppointment).format('HH:mm')} ${item.contactInfo.name}`}
                                        left={props => <List.Icon {...props} icon="clipboard-check-outline" />}>
                                        <List.Item style={{paddingLeft: 10}} title={`Tên khách hàng: ${item.contactInfo.name}`} />
                                        <List.Item style={{paddingLeft: 10}} title={`Email: ${item.contactInfo.email}`} />
                                        <List.Item style={{paddingLeft: 10}} title={`Số điện thoại: ${item.contactInfo.phoneNumber}`} />
                                        <List.Item style={{paddingLeft: 10}} title={`Địa chỉ: ${item.contactInfo.address}`} />
                                        <List.Item style={{paddingLeft: 10}} title={`Combo đã chọn: ${item.combo}`} />
                                        <List.Item style={{paddingLeft: 10}} title={`Dịch vụ đã sử dụng:`} />
                                        {
                                            item.listService.map((item, indexItem)=><List.Item style={{paddingLeft: 20}} key={indexItem} title={`Tên dịch vụ: ${item.productName}`} />)
                                        }
                                    </List.Accordion>
                                })
                            }
                        </List.Section>;
                    }) : null
            }
        </ScrollView>
    );
};

export default History;