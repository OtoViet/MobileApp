import moment from 'moment';
import 'moment/locale/vi';
import { useState, useEffect, useCallback } from 'react';
import Theme from '../../../theme/Theme';
import { Searchbar as SearchBarPaper } from 'react-native-paper';
import Loading from '../../../components/Loading';
import FormApi from '../../../api/formApi';
import { ScrollView, View, Alert, RefreshControl } from 'react-native';
import { Table, Row } from 'react-native-table-component';
import useGetAllOrder from '../../../hooks/useGetAllOrder';
import { Button, Headline } from 'react-native-paper';
import { useIsFocused } from '@react-navigation/native';

const Schedule = ({ route, navigation }) => {
    const isFocused = useIsFocused();
    const [refreshing, setRefreshing] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const onChangeSearch = query => setSearchQuery(query);
    const tableHead = ['Mã lịch hẹn', 'Ngày đặt', 'Thời gian hẹn', 'Chi tiết'];
    const widthArr = [200, 100, 200, 120];
    let tableData = [];
    const [loadingOrder, orders] = useGetAllOrder(isFocused, refreshing);
    const [dataTable1, setDataTable1] = useState(null);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
    }, []);

    useEffect(() => {
        if (!loadingOrder) {
            setRefreshing(false);
        }
    }, [loadingOrder]);
    useEffect(() => {
        orders.forEach((item, index) => {
            tableData.push([
                item._id,
                moment(item.createdAt).format('DD/MM/YYYY'),
                moment(item.dateAppointment).locale('vi').format('LLLL'),
                <Button mode="text" onPress={() => handlePressDetail(item._id)}>
                    Chi tiết
                </Button>
            ]);
        });
        setDataTable1(tableData);

    }, [loadingOrder]);
    const handlePressFind = () => {
        if (searchQuery == '') {
            Alert.alert('Thông báo', 'Bạn chưa nhập mã lịch hẹn');
            tableData = [];
            orders.forEach((item, index) => {
                tableData.push([
                    item._id,
                    moment(item.createdAt).format('DD/MM/YYYY'),
                    moment(item.dateAppointment).locale('vi').format('LLLL'),
                    <Button mode="text" onPress={() => handlePressDetail(item._id)}>
                        Chi tiết
                    </Button>
                ]);
            });
            setDataTable1(tableData);
        }
        else {
            FormApi.findOrderByEmail(searchQuery)
                .then(res => {
                    if (res.length > 0) {
                        tableData = [];
                        res.forEach((item, index) => {
                            tableData.push([
                                item._id,
                                moment(item.createdAt).format('DD/MM/YYYY'),
                                moment(item.dateAppointment).locale('vi').format('LLLL'),
                                <Button mode="text" onPress={() => handlePressDetail(item._id)}>
                                    Chi tiết
                                </Button>
                            ]);
                        });
                        setDataTable1(tableData);
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        }
    };
    const handlePressDetail = (idOrder) => {
        navigation.navigate('DetailOrder', { data: idOrder });
    };
    if (loadingOrder == 'error') {
        navigation.navigate('Home');
    }
    if (loadingOrder) return <Loading.Origin color={Theme.colors.secondary} size={50} />;
    return (
        <ScrollView
            refreshControl={
                <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                />
            }
        >
            <Headline style={{ textAlign: 'center', marginVertical: 20 }}>Danh sách lịch hẹn</Headline>
            <SearchBarPaper
                placeholder="Nhập email đặt lịch"
                style={{ marginHorizontal: 20, marginBottom: 20 }}
                onChangeText={onChangeSearch}
                value={searchQuery}
                onIconPress={handlePressFind}
            />
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

export default Schedule;