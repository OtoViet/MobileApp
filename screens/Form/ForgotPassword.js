import { Title, TextInput, Button, HelperText } from 'react-native-paper';
import * as Yup from 'yup';
import { View, Image, ScrollView, Alert } from 'react-native';
import { useFormik } from 'formik';
import Theme from '../../theme';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FormApi from '../../api/formApi';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function ForgotPassword({ navigation }) {
    const forgotPasswordSchema = Yup.object().shape({
        email: Yup.string()
            .min(3, 'Quá ngắn!')
            .max(50, 'Quá dài!')
            .required('Vui lòng nhập địa chỉ email')
    });
    const formik = useFormik({
        initialValues: {
            email: '',
        },
        validationSchema: forgotPasswordSchema,
        onSubmit: (values) => {
            alert(JSON.stringify(values));
        },
    });
    return (
        <ScrollView>
            <View style={Theme.StyleCommon.Form}>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <MaterialCommunityIcons name="email" size={50} color={Theme.Theme.colors.secondary} />
                    <Title style={{ textAlign: 'center', fontSize: 28 }}>
                        Quên mật khẩu
                    </Title>
                </View>
                <TextInput
                    style={Theme.StyleCommon.TextInput}
                    name="email"
                    label="Email"
                    keyboardType="email-address"
                    mode="outlined"
                    value={formik.values.email}
                    onBlur={formik.handleBlur('email')}
                    onChangeText={(text) => formik.setFieldValue('email', text)}
                />
                <HelperText type="error" visible={formik.touched.email && Boolean(formik.errors.email)}>
                    {formik.touched.email && formik.errors.email}
                </HelperText>
                <Button mode="contained"
                    color={Theme.Theme.colors.secondary}
                    style={{ marginBottom: 20 }}
                    dark={true}
                    labelStyle={{ padding: 5 }}
                    onPress={formik.handleSubmit}>
                    Quên mật khẩu
                </Button>
                <Button mode="text"
                    color={Theme.Theme.colors.primary}
                    onPress={() => navigation.navigate('Register')}>
                    Chưa có tài khoản? Đăng kí
                </Button>
            </View>
        </ScrollView>
    )
}