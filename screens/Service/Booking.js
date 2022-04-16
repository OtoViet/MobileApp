import * as React from 'react';
import { ScrollView, View } from 'react-native';
import { Checkbox, Text, Headline, RadioButton } from 'react-native-paper';
import Theme from '../../theme/Theme';
import useGetAllProduct from '../../hooks/useGetAllProduct';
import Loading from '../../components/Loading';
import { Table, Row } from 'react-native-table-component';
import DropDownPicker from 'react-native-dropdown-picker';
import { PricingCard } from '@rneui/themed';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import useGetAllStore from '../../hooks/useGetAllStore';
const Booking = ({ route, navigation }) => {
    const { data } = route.params;
    const tableHead = ['Thứ tự', 'Mã dịch vụ', 'Tên dịch vụ', 'Giá tiền'];
    const widthArr = [80, 250, 300, 150];
    const tableData = [];
    const [open, setOpen] = React.useState(false);
    const [value, setValue] = React.useState(null);
    const [valueRadio, setValueRadio] = React.useState('first');
    const [loading, products] = useGetAllProduct();
    const [loadingStore, stores] = useGetAllStore();
    const [itemsSelect, setItemsSelect] = React.useState([]);
    const [listChecked, setListChecked] = React.useState([]);

    React.useEffect(() => {
        if (!loading) setListChecked(products.map(item => item._id == data._id ? true : false));
    }, [loading, products]);

    React.useEffect(() => {
        if (!loadingStore) setItemsSelect(stores.map(item => { return { label: item.name, value: item.numOfStore } }));
    }, [loadingStore, loadingStore]);

    if (loading || loadingStore) return <Loading.Origin color={Theme.colors.secondary} size={50} />;
    products.forEach((item, index) => {
        tableData.push([
            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                <Text><Checkbox status={listChecked[index] ? 'checked' : 'unchecked'}
                    color={Theme.colors.primary}
                    onPress={() => {
                        setListChecked(listChecked.map((item, i) => i === index ? !item : item));
                        alert(index);
                    }} /></Text>
                <Text>{index}</Text>
            </View>,
            item._id,
            item.productName,
            item.price
        ]);
    });
    return (
        <>
            <Headline style={{ textAlign: 'center', marginBottom:20 }}>Vui lòng chọn các thông tin bên dưới để tiến hành đặt lịch</Headline>
            <ScrollView>
                <View style={{ marginHorizontal: 20 }}>
                    <Headline style={{ textAlign: 'center', marginVertical: 20 }}>Chọn Chi Nhánh</Headline>
                    <DropDownPicker
                        open={open}
                        value={value}
                        items={itemsSelect}
                        setOpen={setOpen}
                        setValue={setValue}
                        setItems={setItemsSelect}
                        placeholder='Chọn Chi Nhánh'
                        onChangeValue={(value) => {
                            console.log(value);
                        }}
                    />
                    <Headline style={{ textAlign: 'center', marginVertical: 20 }}>Chọn Kích cỡ xe</Headline>
                    <RadioButton.Group onValueChange={newValue => setValueRadio(newValue)} value={valueRadio}>
                        <View style={{
                            marginBottom: 20, height: 100, flex: 1, flexDirection: 'row',
                            justifyContent: 'center', alignItems: 'center',
                            borderWidth: 1, borderRadius: 4, borderStyle: 'dashed'
                        }}>
                            <RadioButton color={Theme.colors.secondary} value="first" />
                            <View>
                                <Text style={{ textAlign: 'center' }}>Xe nhỏ</Text>
                                <MaterialCommunityIcons name="car" size={30} color={Theme.colors.primary} />
                            </View>
                        </View>
                        <View style={{
                            marginBottom: 20, height: 100, flexDirection: 'row',
                            justifyContent: 'center', alignItems: 'center',
                            borderWidth: 1, borderRadius: 4, borderStyle: 'dashed'
                        }}>
                            <RadioButton color={Theme.colors.secondary} value="second" />
                            <View>
                                <Text>Xe vừa</Text>
                                <MaterialCommunityIcons name="car" size={40} color={Theme.colors.primary} />
                            </View>
                        </View>
                        <View style={{
                            marginBottom: 20, height: 100, flexDirection: 'row',
                            justifyContent: 'center', alignItems: 'center',
                            borderWidth: 1, borderRadius: 4, borderStyle: 'dashed'
                        }}>
                            <RadioButton color={Theme.colors.secondary} value="third" />
                            <View>
                                <Text>Xe lớn</Text>
                                <MaterialCommunityIcons name="car" size={50} color={Theme.colors.primary} />
                            </View>
                        </View>
                    </RadioButton.Group>
                    <Headline style={{ textAlign: 'center', marginVertical: 20 }}>Chọn Gói Phù Hợp Với Bạn</Headline>
                    <PricingCard
                        color={Theme.colors.primary}
                        title="GÓI CƠ BẢN"
                        price="$0"
                        info={['1 User', 'Basic Support', 'All Core Features']}
                        button={{ title: ' CHỌN GÓI', icon: 'check' }}
                    />
                    <PricingCard
                        color={'#45BBFF'}
                        title="GÓI PREMIUM"
                        price="$19"
                        info={['10 Users', 'Basic Support', 'All Core Features']}
                        button={{ title: ' CHỌN GÓI', icon: 'check' }}
                    />
                    <PricingCard
                        color={Theme.colors.secondary}
                        title="GÓI SPREMIUM"
                        price="$49"
                        info={['100 Users', 'One on One Support', 'All Core Features']}
                        button={{ title: ' CHỌN GÓI', icon: 'check' }}
                    />
                </View>
                <ScrollView horizontal={true}>
                    <View style={{ flex: 1, padding: 16, paddingTop: 30, height: 300 }}>
                        <Table borderStyle={{ borderWidth: 1, borderColor: '#C1C0B9' }}>
                            <Row data={tableHead} widthArr={widthArr} style={{ height: 50, backgroundColor: Theme.colors.primary }}
                                textStyle={{ textAlign: 'center', color: 'white', fontWeight: '100' }} />
                        </Table>
                        <ScrollView style={{ marginTop: -1 }}>
                            <Table borderStyle={{ borderWidth: 1, borderColor: '#C1C0B9' }}>
                                {
                                    tableData.map((rowData, index) => (
                                        <Row
                                            key={index}
                                            data={rowData}
                                            widthArr={widthArr}
                                            style={[{ height: 40, backgroundColor: 'white' }, index % 2 && { backgroundColor: '#f3f6f4' }]}
                                            textStyle={{ textAlign: 'center', fontWeight: '100' }}
                                        />
                                    ))
                                }
                            </Table>
                        </ScrollView>
                    </View>
                </ScrollView>
            </ScrollView>

        </>
    );
}

export default Booking;