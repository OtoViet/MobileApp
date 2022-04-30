import * as React from 'react';
import { Headline, Title, Button } from 'react-native-paper';
import { ScrollView, View, Alert } from 'react-native';
import Loading from '../../../components/Loading';
import Theme from '../../../theme/Theme';
import useGetInfoCustomer from '../../../hooks/useGetInfoCustomer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import StyleCommon from '../../../theme/StyleCommon';
import FormApi from '../../../api/formApi';

export default function InfoAndLogout({ route, navigation}) {
    const [loading, infoCustomer] = useGetInfoCustomer();
    const handleLogout = () => {
        Alert.alert(
            "Thông báo",
            "Bạn có chắc muốn đăng xuất?",
            [
                {
                    text: "Hủy bỏ",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                {
                    text: "Xác nhận", onPress: () => {

                        FormApi.logout();
                        AsyncStorage.removeItem('token');
                        AsyncStorage.removeItem('refreshToken');
                        navigation.navigate('Home');
                    }
                }
            ]
        );
    }

    if (loading) return <Loading.Origin color={Theme.colors.secondary} size={50} />;
    return (
        <ScrollView>
            <View style={StyleCommon.marginHorizontalDefault}>
                <Headline style={{ textAlign: 'center', marginVertical: 20 }}>
                    Thông tin người dùng
                </Headline>
                <Title>
                    Họ Tên: {infoCustomer.fullName}
                </Title>
                <Title>
                    Ngày sinh: {infoCustomer.dateOfBirth}
                </Title>
                <Title>
                    Email: {infoCustomer.email}
                </Title>
                <Title>
                    Số điện thoại: {infoCustomer.phoneNumber}
                </Title>
                <Button icon="power" color={Theme.colors.secondary}
                    style={{ marginTop: 20, paddingVertical: 5 }}
                    mode="contained" onPress={handleLogout}>
                    Đăng xuất
                </Button>
            </View>
        </ScrollView>
    );
}