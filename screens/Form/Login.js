import { Title, TextInput, Button, HelperText } from 'react-native-paper';
import * as Yup from 'yup';
import { View, Image, ScrollView, Alert} from 'react-native';
import { useFormik } from 'formik';
import Theme from '../../theme';
import CarImage from '../../assets/car.png';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FormApi from '../../api/formApi';


export default function Login({ navigation }) {
    const loginSchema = Yup.object().shape({
        email: Yup.string()
            .min(3, 'Quá ngắn!')
            .max(50, 'Quá dài!')
            .required('Vui lòng nhập tên của bạn'),
        password: Yup.string().required('Vui lòng nhập mật khẩu')
    });
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: loginSchema,
        onSubmit: (values) => {
            // alert(JSON.stringify(values));
            FormApi.login(values).then(res => {
                // set token
                AsyncStorage.setItem('token', res.accessToken);
                AsyncStorage.setItem('refreshToken', res.refreshToken);
                navigation.navigate('Home');
            }).catch(err => {
                Alert.alert('Thông báo', 'Có lỗi xảy ra khi đăng nhập, sai tên tài khoản hoặc mật khẩu!');
            });
        },
    });
    return (
        <ScrollView>
            <View style={Theme.StyleCommon.Form}>
                <Image
                    source={CarImage}
                    style={Theme.StyleCommon.LogoImage}
                />
                <Title style={{
                    fontStyle: 'italic', textAlign: 'center', paddingTop: 40, paddingBottom: 20,
                    marginBottom: 50
                }}>
                    <Title style={{ fontSize: 50, color: '#e81c2e' }}>Oto<Title style={{ fontSize: 50, color: '#202c45' }}>Viet</Title></Title>
                </Title>
                <Title style={{ textAlign: 'center', fontSize: 28 }}>
                    Đăng nhập
                </Title>
                <TextInput
                    style={Theme.StyleCommon.TextInput}
                    name="email"
                    label="Email"
                    mode="outlined"
                    value={formik.values.email}
                    onBlur={formik.handleBlur('email')}
                    onChangeText={(text) => formik.setFieldValue('email', text)}
                />
                <HelperText type="error" visible={formik.touched.email && Boolean(formik.errors.email)}>
                    {formik.touched.email && formik.errors.email}
                </HelperText>
                <TextInput
                    name="password"
                    label="Mật khẩu"
                    secureTextEntry
                    mode="outlined"
                    value={formik.values.password}
                    onBlur={formik.handleBlur('password')}
                    onChangeText={(text) => formik.setFieldValue('password', text)}
                />
                <HelperText type="error" visible={formik.touched.password && Boolean(formik.errors.password)}>
                    {formik.touched.password && formik.errors.password}
                </HelperText>
                <Button mode="contained"
                    color={Theme.Theme.colors.secondary}
                    style={{ marginBottom: 20 }}
                    dark={true}
                    labelStyle={{ padding: 5 }}
                    onPress={formik.handleSubmit}>
                    Đăng nhập
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