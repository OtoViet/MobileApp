import * as Yup from 'yup';
import Theme from '../../../theme';
import { useFormik } from 'formik';
import { Alert } from 'react-native';
import FormApi from '../../../api/formApi';
import { View, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Title, TextInput, Button, HelperText } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function ChangePassword({ navigation }) {
    const changePasswordSchema = Yup.object().shape({
        currentPassword: Yup.string().required('Vui lòng nhập mật khẩu hiện tại'),
        password: Yup.string().required('Vui lòng nhập mật khẩu').min(6, 'Mật khẩu phải có ít nhất 6 ký tự'),
        rePassword: Yup.string().required('Vui lòng nhập lại mật khẩu').oneOf([Yup.ref('password')], 'Mật khẩu không trùng khớp')
    });
    const formik = useFormik({
        initialValues: {
            password: '',
            rePassword: '',
            currentPassword: ''
        },
        validationSchema: changePasswordSchema,
        onSubmit: (values) => {
            FormApi.changePassword(values).then(res => {
                if (res) {
                    Alert.alert('Thông báo', 'Đổi mật khẩu thành công. Đăng nhập lại để tiếp tục!');
                    AsyncStorage.removeItem('token');   
                    AsyncStorage.removeItem('refreshToken');
                    AsyncStorage.removeItem('role');
                    navigation.navigate('Home');
                }
            }).catch(err => {
                Alert.alert('Thông báo', 'Có lỗi xảy ra khi thay đổi mật khẩu, vui lòng thử lại sau!');
            });
        },
    });
    return (
        <ScrollView>
            <View style={Theme.StyleCommon.Form}>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginVertical:20 }}>
                    <MaterialCommunityIcons name="account-key" size={50} color={Theme.Theme.colors.secondary} />
                    <Title style={{ textAlign: 'center', fontSize: 28 }}>
                        Thay đổi mật khẩu
                    </Title>
                </View>
                <TextInput
                    name="currentPassword"
                    label="Mật khẩu hiện tại"
                    secureTextEntry
                    mode="outlined"
                    value={formik.values.currentPassword}
                    onBlur={formik.handleBlur('currentPassword')}
                    onChangeText={(text) => formik.setFieldValue('currentPassword', text)}
                />
                <HelperText type="error" visible={formik.touched.currentPassword && Boolean(formik.errors.currentPassword)}>
                    {formik.touched.currentPassword && formik.errors.currentPassword}
                </HelperText>
                <TextInput
                    name="password"
                    label="Mật khẩu mới"
                    secureTextEntry
                    mode="outlined"
                    value={formik.values.password}
                    onBlur={formik.handleBlur('password')}
                    onChangeText={(text) => formik.setFieldValue('password', text)}
                />
                <HelperText type="error" visible={formik.touched.password && Boolean(formik.errors.password)}>
                    {formik.touched.password && formik.errors.password}
                </HelperText>
                <TextInput
                    name="rePassword"
                    label="Nhập lại mật khẩu mới"
                    secureTextEntry
                    mode="outlined"
                    value={formik.values.rePassword}
                    onBlur={formik.handleBlur('rePassword')}
                    onChangeText={(text) => formik.setFieldValue('rePassword', text)}
                />
                <HelperText type="error" visible={formik.touched.rePassword && Boolean(formik.errors.rePassword)}>
                    {formik.touched.rePassword && formik.errors.rePassword}
                </HelperText>
                <Button mode="contained"
                    style={{ marginBottom: 20 }}
                    color={Theme.Theme.colors.secondary}
                    dark={true}
                    labelStyle={{ padding: 5 }}
                    onPress={formik.handleSubmit}>
                    Đổi mật khẩu
                </Button>
            </View>
        </ScrollView>
    )
}