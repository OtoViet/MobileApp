import * as React from 'react';
import { RefreshControl } from 'react-native';
import Theme from '../../../theme/Theme';
import FormApi from '../../../api/formApi';
import Loading from '../../../components/Loading';
import { Title, Button } from 'react-native-paper';
import StyleCommon from '../../../theme/StyleCommon';
import { ScrollView, View, Alert } from 'react-native';
import useGetInfoCustomer from '../../../hooks/useGetInfoCustomer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useIsFocused } from '@react-navigation/native';

export default function InfoAndLogout({ route, navigation }) {
    const isFocused = useIsFocused();
    const [refreshing, setRefreshing] = React.useState(false);
    const [loading, infoCustomer] = useGetInfoCustomer(isFocused, refreshing);
    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
    }, []);
    React.useEffect(() => {
        if (loading == 'error') navigation.navigate('Home');
    }, [loading]);
    React.useEffect(() => {
        if (!loading) {
            setRefreshing(false);
        }
    }, [loading]);
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
                        AsyncStorage.removeItem('role');
                        navigation.navigate('Home');
                    }
                }
            ]
        );
    }
    if (loading) return <Loading.Origin color={Theme.colors.secondary} size={50} />;
    return (
        <ScrollView
            refreshControl={
                <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                />
            }
        >
            <View style={StyleCommon.marginHorizontalDefault}>
                <View style={{
                    flex: 1, justifyContent: 'center', alignItems: 'center',
                    marginVertical: 20
                }}>
                    <MaterialCommunityIcons name="information" size={50} color={Theme.colors.secondary} />
                    <Title style={{ textAlign: 'center', fontSize: 28 }}>
                        Thông tin người dùng
                    </Title>
                </View>
                <Title>
                    Họ Tên: {infoCustomer.fullName}
                </Title>
                <Title>
                    Ngày sinh: {infoCustomer.dateOfBirth ? infoCustomer.dateOfBirth : 'Chưa cập nhật'}
                </Title>
                <Title>
                    Email: {infoCustomer.email}
                </Title>
                <Title>
                    Số điện thoại: {infoCustomer.phoneNumber ? infoCustomer.phoneNumber : 'Chưa cập nhật'}
                </Title>
                {
                    infoCustomer.roles === 'employee' ?
                        <Title>
                            Địa chỉ: {infoCustomer.address ? infoCustomer.address : 'Chưa cập nhật'}
                        </Title> : null
                }
                <Button icon="power" color={Theme.colors.secondary}
                    style={{ marginTop: 20, paddingVertical: 5 }}
                    mode="contained" onPress={handleLogout}>
                    Đăng xuất
                </Button>
            </View>
        </ScrollView>
    );
}