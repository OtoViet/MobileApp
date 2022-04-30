import { Title, TextInput, Button, HelperText } from 'react-native-paper';
import * as Yup from 'yup';
import { useEffect, useState } from 'react';
import { View, ScrollView, Alert, TouchableOpacity } from 'react-native';
import { useFormik } from 'formik';
import Theme from '../../../theme';
import moment from 'moment';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Ionicons from 'react-native-vector-icons/Ionicons';
import FormApi from '../../../api/formApi';
import useGetInfoCustomer from '../../../hooks/useGetInfoCustomer';
import Loading from '../../../components/Loading';

export default function ChangeInfo({ navigation }) {
    const [loading, infoCustomer] = useGetInfoCustomer();
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [valueDateShow, setValueDateShow] = useState(null);
    const [valueDate, setValueDate] = useState(new Date('2000-08-18T21:11:54'));

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };
    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };
    const handleConfirm = (date) => {
        console.log("A date has been picked: ", date);
        setValueDate(date);
        formik.setFieldValue('dateOfBirth', date);
        setValueDateShow(moment(date).format('DD/MM/YYYY'));
        hideDatePicker();
    };
    useEffect(() => {
        if(!loading){
            console.log(infoCustomer.dateOfBirth);
            formik.setFieldValue('firstName', infoCustomer.firstName);
            formik.setFieldValue('lastName', infoCustomer.lastName);
            formik.setFieldValue('phoneNumber', infoCustomer.phoneNumber);
            formik.setFieldValue('dateOfBirth', moment(infoCustomer.dateOfBirth, "DD/MM/YYYY").toDate());
            setValueDateShow(infoCustomer.dateOfBirth);
            setValueDate(moment(infoCustomer.dateOfBirth, "DD/MM/YYYY").toDate());
        }
        if(loading==='error') navigation.navigate('Home');
    }, [loading])
    const infoSchema = Yup.object().shape({
        firstName: Yup.string().required('Vui lòng nhập tên của bạn'),
        lastName: Yup.string().required('Vui lòng nhập họ của bạn'),
        phoneNumber: Yup.number().typeError('Vui lòng nhập số').required('Vui lòng nhập số điện thoại').min(100000000, 'Số điện thoại không hợp lệ'),
        dateOfBirth: Yup.date().typeError('Vui lòng chọn ngày sinh').max(new Date(), "Ngày sinh không hợp lệ"),
    });
    const formik = useFormik({
        initialValues: {
            firstName: infoCustomer.firstName,
            lastName: infoCustomer.lastName,
            phoneNumber: infoCustomer.phoneNumber,
            dateOfBirth: infoCustomer.dateOfBirth
        },
        validationSchema: infoSchema,
        onSubmit: (values) => {
            // alert(JSON.stringify(values));
            const updateFormData = values;
            FormApi.updateInfoCustomer(updateFormData).then(res => {
                Alert.alert('Thông báo', 'Cập nhật thông tin thành công!');
            }).catch(err => {
                console.log(err);
                Alert.alert('Thông báo', 'Cập nhật thông tin thất bại!');
            });
        },
    });
    if (loading) return <Loading.Origin color={Theme.Theme.colors.secondary} size={50} />;
    return (
        <ScrollView>
            <View style={Theme.StyleCommon.Form}>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Ionicons name="information-circle" size={50} color={Theme.Theme.colors.secondary} />
                    <Title style={{ textAlign: 'center', fontSize: 28 }}>
                        Thông tin tài khoản
                    </Title>
                </View>
                <TextInput
                    style={Theme.StyleCommon.TextInput}
                    name="lastName"
                    label="Họ"
                    mode="outlined"
                    value={formik.values.lastName}
                    onBlur={formik.handleBlur('lastName')}
                    onChangeText={(text) => formik.setFieldValue('lastName', text)}
                />
                <HelperText type="error" visible={formik.touched.lastName && Boolean(formik.errors.lastName)}>
                    {formik.touched.lastName && formik.errors.lastName}
                </HelperText>
                <TextInput
                    style={Theme.StyleCommon.TextInput}
                    name="firstName"
                    label="Tên"
                    mode="outlined"
                    value={formik.values.firstName}
                    onBlur={formik.handleBlur('firstName')}
                    onChangeText={(text) => formik.setFieldValue('firstName', text)}
                />
                <HelperText type="error" visible={formik.touched.firstName && Boolean(formik.errors.firstName)}>
                    {formik.touched.firstName && formik.errors.firstName}
                </HelperText>
                <TouchableOpacity
                    activeOpaticy={1}
                    onPress={showDatePicker}>
                    <TextInput
                        label="Ngày sinh"
                        name="dateOfBirth"
                        value={valueDateShow}
                        mode="outlined"
                        editable={false} // optional
                        onChangeText={text => {
                            formik.setFieldValue('dateOfBirth', text);
                            setValueDateShow(text);
                        }}
                    />
                </TouchableOpacity>
                <HelperText type="error" visible={formik.touched.dateOfBirth && Boolean(formik.errors.dateOfBirth)}>
                    {formik.touched.dateOfBirth && formik.errors.dateOfBirth}
                </HelperText>
                <DateTimePickerModal
                    date={moment(infoCustomer.dateOfBirth, "DD/MM/YYYY").toDate()}
                    maximumDate={new Date()}
                    isVisible={isDatePickerVisible}
                    mode="date"
                    onConfirm={handleConfirm}
                    onCancel={hideDatePicker}
                />
                <TextInput
                    style={Theme.StyleCommon.TextInput}
                    name="phoneNumber"
                    label="Số điện thoại"
                    mode="outlined"
                    value={formik.values.phoneNumber}
                    onBlur={formik.handleBlur('phoneNumber')}
                    onChangeText={(text) => formik.setFieldValue('phoneNumber', text)}
                />
                <HelperText type="error" visible={formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)}>
                    {formik.touched.phoneNumber && formik.errors.phoneNumber}
                </HelperText>
                <Button mode="contained"
                    color={Theme.Theme.colors.secondary}
                    icon="content-save"
                    style={{ marginBottom: 20 }}
                    dark={true}
                    labelStyle={{ padding: 5 }}
                    onPress={formik.handleSubmit}>
                    Cập nhật thông tin
                </Button>
            </View>
        </ScrollView>
    )
}