import moment from 'moment';
import 'moment/locale/vi';
import * as Yup from 'yup';
import { useState } from 'react';
import { useFormik } from 'formik';
import Theme from '../../theme/Theme';
import Loading from '../../components/Loading';
import { View, ScrollView } from 'react-native';
import StyleCommon from '../../theme/StyleCommon';
import useGetAllStore from '../../hooks/useGetAllStore';
import useGetInfoCustomer from '../../hooks/useGetInfoCustomer';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {
    Title, Text, Button, Headline, Switch,
    TextInput, Paragraph, HelperText
} from 'react-native-paper';

export default function ContactInfo({ route, navigation }) {
    const { data } = route.params;
    const [loading, listStore] = useGetAllStore();
    const [isSwitchOn, setIsSwitchOn] = useState(false);
    const [text, setText] = useState("");
    const [loadingInfoCustomer, infoCustomer] = useGetInfoCustomer();
    const listCarePoint = listStore;
    
    const onToggleSwitch = () => {
        setIsSwitchOn(!isSwitchOn);
        if (!loadingInfoCustomer && isSwitchOn) {
            formik.setFieldValue('name', infoCustomer.fullName);
            formik.setFieldValue('email', infoCustomer.email);
            formik.setFieldValue('phoneNumber', infoCustomer.phoneNumber);
        }
        if (!isSwitchOn) {
            formik.handleReset();
        }
    };
    const ContactSchema = Yup.object().shape({
        name: Yup.string()
            .min(2, 'Tên quá ngắn')
            .max(50, 'Tên quá dài')
            .required('Vui lòng nhập tên của bạn'),
        email: Yup.string().email('Địa chỉ email không hợp lệ').required('Vui lòng nhập email'),
        phoneNumber: Yup.number().typeError('Vui lòng nhập số').required('Vui lòng nhập số điện thoại').min(100000000, 'Số điện thoại không hợp lệ'),
        address: Yup.string().required('Vui lòng nhập địa chỉ'),
    });

    const formik = useFormik({
        initialValues: {
            name: "",
            email: "",
            phoneNumber: "",
            description: '',
            address: '',
        },
        validationSchema: ContactSchema,
        onSubmit: (values) => {
            // alert(JSON.stringify(values, null, 2));
            setDataForm(values);
        },
        onReset: () => {
            setDataForm(null);
        }
    });

    const carSize = {
        carSmall: "Xe nhỏ",
        carMedium: "Xe vừa",
        carLarge: "Xe lớn"
    };
    const combo = {
        combo1: "GÓI LÀM SẠCH CƠ BẢN",
        combo2: "GÓI LÀM SẠCH PREMIUM",
        combo3: "GÓI LÀM SẠCH SUPER PREMIUM",
    };
    let totalPrice = 0;
    data.listServiceChoose.forEach((item) => {
        totalPrice += item.price;
    });
    totalPrice += 100000 * (data.carSize === "carMedium" ? 1 : 2);
    totalPrice += data.priceCombo;

    if (loading || loadingInfoCustomer) return <Loading.Origin color={Theme.colors.secondary} size={50} />;
    return (
        <>
            <ScrollView>
                <View style={StyleCommon.FlexCenter}>
                    <Headline>
                        Thông tin liên hệ
                    </Headline>
                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center' }}>
                        <Text>(Nhập mới)</Text>
                        <Switch value={isSwitchOn}
                            color={Theme.colors.secondary}
                            onValueChange={onToggleSwitch} />
                        <Text>(Mặc định)</Text>
                    </View>
                </View>
                <View style={{ marginHorizontal: 20 }}>
                    <TextInput
                        name="name"
                        label="Họ tên"
                        mode="outlined"
                        value={text}
                        style={StyleCommon.TextInputMarginVertical}
                        onChangeText={text => setText(text)}
                    />
                    <HelperText type="error" visible={formik.touched.name && Boolean(formik.errors.name)}>
                        {formik.touched.name && formik.errors.name}
                    </HelperText>
                    <TextInput
                        label="Địa chỉ email"
                        name="email"
                        mode="outlined"
                        value={text}
                        style={StyleCommon.TextInputMarginVertical}
                        onChangeText={text => setText(text)}
                    />
                    <HelperText type="error" visible={formik.touched.email && Boolean(formik.errors.email)}>
                        {formik.touched.email && formik.errors.email}
                    </HelperText>
                    <TextInput
                        name="phoneNumber"
                        label="Số điện thoại"
                        mode="outlined"
                        value={text}
                        style={StyleCommon.TextInputMarginVertical}
                        onChangeText={text => setText(text)}
                    />
                    <HelperText type="error" visible={formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)}>
                        {formik.touched.phoneNumber && formik.errors.phoneNumber}
                    </HelperText>
                    <TextInput
                        name="address"
                        label="Địa chỉ"
                        mode="outlined"
                        value={text}
                        style={StyleCommon.TextInputMarginVertical}
                        multiline={true}
                        numberOfLines={4}
                        onChangeText={text => setText(text)}
                    />
                    <HelperText type="error" visible={formik.touched.address && Boolean(formik.errors.address)}>
                        {formik.touched.address && formik.errors.address}
                    </HelperText>
                    <TextInput
                        label="Yêu cầu phục vụ"
                        mode="outlined"
                        value={text}
                        style={StyleCommon.TextInputMarginVertical}
                        multiline={true}
                        numberOfLines={4}
                        onChangeText={text => setText(text)}
                    />
                    <Button mode="contained"
                        style={{ marginVertical: 20 }}
                        color={Theme.colors.secondary}>
                        Xác nhận
                    </Button>
                </View>
                <View style={{ ...StyleCommon.FlexCenter, marginVertical: 20 }}>
                    <Headline>
                        Kiểm tra lại thông tin
                    </Headline>
                </View>
                <View style={StyleCommon.marginHorizontalDefault}>
                    <Title>
                        Cửa hàng phục vụ
                    </Title>
                    <Text>{listCarePoint[parseInt(data.carePoint) - 1].name}</Text>
                    <Title>
                        Kích cỡ xe
                    </Title>
                    <Text>
                        {carSize[data.carSize]} {data.carSize !== "carSmall" ? "(Phụ thu thêm " +
                            (100000 * (data.carSize === "carMedium" ? 1 : 2))
                                .toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') + '₫' + ")" : null}
                    </Text>
                    {data.combo === "" ? null : <>
                        <Title>Gói combo tùy chọn</Title>
                        <Text>{combo[data.combo]} ({data.priceCombo.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') + '₫'})</Text>
                    </>}

                    <Title>
                        Dịch vụ đã chọn
                    </Title>
                    {data.listServiceChoose.map((item, index) => {
                        return <Paragraph key={index} style={{
                            padding: 8,
                            fontSize: 16,
                        }}><FontAwesome5 name="dot-circle" size={14} color={Theme.colors.primary} /> {item.productName} (Giá dịch vụ: {item.price.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') + '₫'})
                        </Paragraph>
                    })
                    }
                    <Title>
                        Tổng tiền: <Text style={{ color: Theme.colors.secondary }}>{Math.round(totalPrice * ((100 - data.percentSale) / 100)).toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') + '₫'}</Text>
                    </Title>
                    <Title>
                        Thời gian hẹn: <Text style={{ color: Theme.colors.secondary }}>{moment(new Date(data.time)).locale('vi').format('LLLL')}</Text>
                    </Title>
                    <View style={{ ...StyleCommon.FlexCenter, marginVertical: 20 }}>
                        <Headline>
                            Thông tin người đặt
                        </Headline>
                    </View>
                    <Title>
                        Tên người đặt:
                    </Title>
                    <Title>
                        Email:
                    </Title>
                    <Title>
                        Số điện thoại:
                    </Title>
                    <Title>
                        Địa chỉ:
                    </Title>
                    <Title>
                        Yêu cầu:
                    </Title>
                    <Button mode="contained"
                        icon="card-bulleted"
                        style={{ marginVertical: 20 }}
                        color={Theme.colors.secondary}>
                        Chuyển sang thanh toán
                    </Button>
                </View>
            </ScrollView>
        </>
    );
}