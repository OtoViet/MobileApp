import moment from 'moment';
import 'moment/locale/vi';
import Theme from '../../theme/Theme';
import FormApi from '../../api/formApi';
import { useState, useEffect } from 'react';
import { PricingCard } from '@rneui/themed';
import Loading from '../../components/Loading';
import { Picker } from '@react-native-picker/picker';
import { ScrollView, View, Dimensions, Alert } from 'react-native';
import useGetAllStore from '../../hooks/useGetAllStore';
import { Table, Row } from 'react-native-table-component';
import useGetAllProduct from '../../hooks/useGetAllProduct';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Checkbox, Text, Headline, RadioButton, Button, TextInput } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Booking = ({ route, navigation }) => {
    const { data } = route.params;
    const tableHead = ['Thứ tự', 'Mã dịch vụ', 'Tên dịch vụ', 'Giá tiền'];
    const widthArr = [80, 250, 300, 150];
    const tableData = [];
    const [iconPricingCheckCombo1, setIconPricingCheckCombo1] = useState('check-circle-outline');
    const [iconPricingCheckCombo2, setIconPricingCheckCombo2] = useState('check-circle-outline');
    const [iconPricingCheckCombo3, setIconPricingCheckCombo3] = useState('check-circle-outline');
    const [carSize, setCarSize] = useState(null);
    const [loading, products] = useGetAllProduct();
    const [carePoint, setCarePoint] = useState(null);
    const [loadingStore, stores] = useGetAllStore();
    const [listChecked, setListChecked] = useState([]);
    const [valueDate, setValueDate] = useState(null);
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [displayVocher, setDisplayVocher] = useState('none');
    const [percentSale, setPercentSale] = useState(0);
    const [combo, setCombo] = useState(null);
    const [priceCombo, setPriceCombo] = useState(0);
    const [discount, setDiscount] = useState(null);
    const [textDiscount, setTextDiscount] = useState(null);
    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (date) => {
        console.log("A date has been picked: ", date);
        setValueDate(date);
        hideDatePicker();
    };
    const handleSubmitDiscount = () => {
        FormApi.getDiscountByCode(discount).then(res => {
            setPercentSale(res.percentSale);
            setTextDiscount(`Bạn được giảm ${res.percentSale}% trên tổng hóa đơn`);
        })
            .catch(err => {
                console.log(err);
                setTextDiscount(`Mã giảm giá không hợp lệ`);
            });
    };
    const handleOnClicContinue = () => {
        let dataSend = {};
        dataSend.combo = combo;
        dataSend.carSize = carSize;
        dataSend.carePoint = carePoint;
        dataSend.listServiceChoose = products.filter((item, index) => {
            if (listChecked[index]) return item;
        });
        dataSend.time = new Date().toString();
        dataSend.priceCombo = priceCombo;
        dataSend.percentSale = percentSale;

        if (!carePoint || !carSize || dataSend.listServiceChoose.length <= 0 || !valueDate)
            Alert.alert('Thông báo', 'Bạn cần phải chọn các thông tin bên trên trừ gói combo dịch vụ!');
        else navigation.navigate('ContactInfo', { data: dataSend });
    };
    const handleButtonCombo1Press = () => {
        setCombo('combo1');
        setPriceCombo(totalPriceCombo1);
        setIconPricingCheckCombo1('check-circle');
        setIconPricingCheckCombo2('check-circle-outline');
        setIconPricingCheckCombo3('check-circle-outline');
    };
    const handleButtonCombo2Press = () => {
        setCombo('combo2');
        setPriceCombo(totalPriceCombo2);
        setIconPricingCheckCombo2('check-circle');
        setIconPricingCheckCombo3('check-circle-outline');
        setIconPricingCheckCombo1('check-circle-outline');
    };
    const handleButtonCombo3Press = () => {
        setCombo('combo3');
        setPriceCombo(totalPriceCombo3);
        setIconPricingCheckCombo3('check-circle');
        setIconPricingCheckCombo1('check-circle-outline');
        setIconPricingCheckCombo2('check-circle-outline');
    };
    useEffect(() => {
        if (!loading) setListChecked(products.map(item => item._id == data._id ? true : false));
    }, [loading, products]);

    if (loading || loadingStore) return <Loading.Origin color={Theme.colors.secondary} size={50} />;

    let listProductCombo1 = products.filter(item => item.combo.includes("combo1"));
    let totalPriceCombo1 = 0;
    listProductCombo1.forEach(item => {
        totalPriceCombo1 += item.price;
    });
    totalPriceCombo1 = totalPriceCombo1 * (0.9);
    let listProductCombo2 = products.filter(item => item.combo.includes("combo2"));
    let totalPriceCombo2 = 0;
    listProductCombo2.forEach(item => {
        totalPriceCombo2 += item.price;
    });
    totalPriceCombo2 = totalPriceCombo2 * (0.85);
    let listProductCombo3 = products.filter(item => item.combo.includes("combo3"));
    let totalPriceCombo3 = 0;
    listProductCombo3.forEach(item => {
        totalPriceCombo3 += item.price;
    });
    totalPriceCombo3 = totalPriceCombo3 * (0.8);

    products.forEach((item, index) => {
        tableData.push([
            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                <Text><Checkbox status={listChecked[index] ? 'checked' : 'unchecked'}
                    color={Theme.colors.primary}
                    onPress={() => {
                        setListChecked(listChecked.map((item, i) => i === index ? !item : item));
                    }} /></Text>
                <Text>{index}</Text>
            </View>,
            item._id,
            item.productName,
            item.price
        ]);
    });
    return (
        <ScrollView >
            <Headline style={{ textAlign: 'center', marginBottom: 20 }}>Vui lòng chọn các thông tin bên dưới để tiến hành đặt lịch</Headline>
            <View style={{ marginHorizontal: 20 }}>

                <Headline style={{ textAlign: 'center', marginVertical: 20 }}>Chọn Chi Nhánh</Headline>
                <View
                    style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                        alignSelf: 'stretch',
                        borderWidth: 1,
                        borderRadius: 10
                    }}>
                    <Picker
                        selectedValue={carePoint}
                        prompt="Chọn chi nhánh"
                        style={{ height: 50, width: Dimensions.get('window').width - 100 }}
                        onValueChange={(itemValue, itemIndex) => setCarePoint(itemValue)}
                    >
                        <Picker.Item value='' enabled={false} label='Chọn chi nhánh' />
                        {stores.map((item, index) => <Picker.Item key={index} label={item.name} value={item.numOfStore} />)}
                    </Picker>
                </View>

                <Headline style={{ textAlign: 'center', marginVertical: 20 }}>Chọn Kích cỡ xe</Headline>
                <RadioButton.Group onValueChange={newValue => setCarSize(newValue)} value={carSize}>
                    <View style={{
                        marginBottom: 20, height: 100, flex: 1, flexDirection: 'row',
                        justifyContent: 'center', alignItems: 'center',
                        borderWidth: 1, borderRadius: 4, borderStyle: 'dashed'
                    }}>
                        <RadioButton color={Theme.colors.secondary} value="carSmall" />
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
                        <RadioButton color={Theme.colors.secondary} value="carMedium" />
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
                        <RadioButton color={Theme.colors.secondary} value="carLarge" />
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
                    onButtonPress={handleButtonCombo1Press}
                    pricingStyle={{ fontSize: 30 }}
                    price={parseInt(totalPriceCombo1).toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') + '₫'}
                    info={listProductCombo1.map((item, index) =>
                        item.productName
                    )}
                    button={{ title: ' CHỌN GÓI', icon: iconPricingCheckCombo1 }}
                />
                <PricingCard
                    color={'#45BBFF'}
                    title="GÓI PREMIUM"
                    onButtonPress={handleButtonCombo2Press}
                    pricingStyle={{ fontSize: 30 }}
                    price={parseInt(totalPriceCombo2).toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') + '₫'}
                    info={listProductCombo2.map((item, index) =>
                        item.productName
                    )}
                    button={{ title: ' CHỌN GÓI', icon: iconPricingCheckCombo2 }}
                />
                <PricingCard
                    color={Theme.colors.secondary}
                    title="GÓI SPREMIUM"
                    onButtonPress={handleButtonCombo3Press}
                    pricingStyle={{ fontSize: 30 }}
                    price={parseInt(totalPriceCombo3).toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') + '₫'}
                    info={listProductCombo3.map((item, index) =>
                        item.productName
                    )}
                    button={{ title: ' CHỌN GÓI', icon: iconPricingCheckCombo3 }}
                />
            </View>

            <Headline style={{ textAlign: 'center', marginVertical: 20 }}>Chọn Dịch Vụ</Headline>
            <ScrollView horizontal={true}>
                <View style={{ paddingHorizontal: 20 }}>
                    <Table borderStyle={{ borderWidth: 1, borderColor: '#C1C0B9' }}>
                        <Row data={tableHead} widthArr={widthArr} style={{ height: 50, backgroundColor: Theme.colors.primary }}
                            textStyle={{ textAlign: 'center', color: 'white', fontWeight: '100' }} />
                    </Table>
                    <ScrollView style={{ marginTop: -1 }}>
                        <Table borderStyle={{ borderWidth: 1, borderColor: '#C1C0B9' }}>
                            {
                                tableData.map((rowData, index) => {
                                    let backgroundIndex = index % 2 ? 'white' :'#f3f6f4';
                                    return <Row
                                        key={index}
                                        data={rowData}
                                        widthArr={widthArr}
                                        style={{ height: 40, backgroundColor:backgroundIndex }}
                                        textStyle={{ textAlign: 'center', fontWeight: '100' }}
                                    />;
                                })
                            }
                        </Table>
                    </ScrollView>
                </View>
            </ScrollView>

            <Headline style={{ textAlign: 'center', marginVertical: 20 }}>Chọn Thời Gian</Headline>
            <Button
                style={{ marginHorizontal: 20, marginBottom: 20 }}
                icon="clock" mode="contained" onPress={showDatePicker}>
                Chọn thời gian hẹn
            </Button>
            <DateTimePickerModal
                minimumDate={new Date()}
                maximumDate={new Date(new Date().getFullYear(), 12, 31)}
                isVisible={isDatePickerVisible}
                mode="datetime"
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
            />
            {valueDate ? <Text style={{ textAlign: 'justify', marginVertical: 10, marginHorizontal: 20 }}>
                Thời gian đã chọn: {moment(valueDate).locale('vi').format('LLLL')}</Text> : null}

            <Button icon="sale" mode="text" onPress={() => setDisplayVocher('flex')}>
                Bạn có mã khuyến mãi?
            </Button>
            <TextInput
                style={{ marginVertical: 20, marginHorizontal: 20, display: displayVocher }}
                label="Mã khuyến mãi"
                mode='outlined'
                value={discount}
                forceTextInputFocus={false}
                onEndEditing={handleSubmitDiscount}
                onChangeText={text => setDiscount(text)}
                right={<TextInput.Icon name="send" onPress={handleSubmitDiscount} />}
            />
            {textDiscount ? <Text style={{ textAlign: 'justify', marginHorizontal: 20 }}>
                {textDiscount}
            </Text> : null}
            <Button style={{ marginVertical: 20, marginHorizontal: 20 }}
                color={Theme.colors.secondary}
                mode="contained" onPress={handleOnClicContinue}>
                Tiếp tục
            </Button>
        </ScrollView>
    );
}

export default Booking;