import moment from 'moment';
import 'moment/locale/vi';
import { useEffect } from 'react';
import Theme from '../../theme/Theme';
import Loading from '../../components/Loading';
import { View, ScrollView } from 'react-native';
import StyleCommon from '../../theme/StyleCommon';
import {
    Title, Text, Button, Headline
} from 'react-native-paper';
import useGetVnpReturnUrl from '../../hooks/useGetVnpReturnUrl';
import FormApi from '../../api/formApi';

export default function VnPayResult({ route, navigation }) {

    let indexUrl = route.params.data.indexOf("/vnpReturnUrl");
    let paramsVnpUrlReturn = route.params.data.split(route.params.data.substring(0, indexUrl) + "/vnpReturnUrl")[1];
    const [loading, data] = useGetVnpReturnUrl(paramsVnpUrlReturn);
    useEffect(() => {
        FormApi.getVnpIpn(paramsVnpUrlReturn).then(res => {
            if (data.vnp_OrderInfo) {
                if (data.vnp_OrderInfo.length > 0) {
                    if (res.RspCode === "00") {
                        let idOrder = (data.vnp_OrderInfo).split('Thanh+toan+dich+vu+oto+viet+cho+don+hang+')[1];
                        // console.log('id order ne:......',idOrder);
                        FormApi.getOrderById(idOrder).then(res => {
                            if (res.isPaid === false) {
                                FormApi.updatePayStatuslOrder(idOrder).then(res => {
                                    console.log(res);
                                })
                                .catch(err => {
                                    console.log(err);
                                });
                            }
                        })
                        .catch(err => {
                            console.log(err);
                        });
                    }
                }
            }
        })
        .catch(err => {
            console.log(err);
        });

    }, [loading]);

    if (loading) return <Loading.Origin color={Theme.colors.secondary} size={50} />;
    let infoPayment = data.vnp_OrderInfo.split('+').join(' ');
    let statusPayment = "Thất bại";
    switch (data.vnp_ResponseCode) {
        case "00":
            statusPayment = "Thành công";
            break;
        case "07":
            statusPayment = "Thất bại do giao dịch bị nghi ngờ (liên quan tới lừa đảo, giao dịch bất thường).";
            break;
        case "09":
            statusPayment = "Thất bại do thẻ/Tài khoản của khách hàng chưa đăng ký dịch vụ InternetBanking tại ngân hàng.";
            break;
        case "10":
            statusPayment = "Thất bại do khách hàng xác thực thông tin thẻ/tài khoản không đúng quá 3 lần";
            break;
        case "11":
            statusPayment = "Thất bại do đã hết hạn chờ thanh toán.";
            break;
        case "12":
            statusPayment = "Thất bại do thẻ bị khóa";
            break;
        case "13":
            statusPayment = "Thất bại do khách nhập sai mật khẩu xác thực giao dịch (OTP)";
            break;
        case "24":
            statusPayment = "Thất bại do khách hàng hủy giao dịch";
            break;
        case "51":
            statusPayment = "Thất bại do tài khoản của quý khách không đủ số dư để thực hiện giao dịch.";
            break;
        case "65":
            statusPayment = "Thất bại do tài khoản của Quý khách đã vượt quá hạn mức giao dịch trong ngày.";
            break;
        case "75":
            statusPayment = "Thất bại do ngân hàng thanh toán đang bảo trì."
            break;
        case "79":
            statusPayment = "Thất bại do nhập sai mật khẩu thanh toán quá số lần quy định. Xin quý khách vui lòng thực hiện lại giao dịch"
            break;
        default:
            statusPayment = "Thất bại do lỗi hệ thống";
            break;
    }

    return (
        <>
            <ScrollView>
                <View style={{ ...StyleCommon.FlexCenter, marginVertical: 20 }}>
                    <Headline>
                        Thông tin giao dịch
                    </Headline>
                </View>
                <View style={StyleCommon.marginHorizontalDefault}>
                    <Title>
                        Mã cửa hàng(Được cấp bởi VNPAY)
                    </Title>
                    <Text>{data.vnp_TmnCode}</Text>
                    <Title>
                        Mã giao dịch
                    </Title>
                    <Text>
                        {data.vnp_TxnRef}
                    </Text>
                    <Title>
                        Nội dung giao dịch
                    </Title>
                    <Text>{infoPayment}</Text>
                    <Title>
                        Thời gian thanh toán
                    </Title>
                    <Text>{moment(data.vnp_PayDate, "YYYYMMDDHHmmss").format("DD/MM/YYYY HH:mm:ss")}</Text>
                    <Title>
                        Tổng tiền thanh toán
                    </Title>
                    <Text>{Math.round(parseInt(data.vnp_Amount) / 100).toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') + '₫ '}</Text>
                    <Title>Trạng thái giao dịch</Title>
                    <Text>{statusPayment}</Text>
                    <Button icon="home" mode="contained"
                    style={{marginTop:20}}
                    onPress={() => navigation.navigate('Home')}>
                        Trở về trang chủ
                    </Button>
                </View>
            </ScrollView>
        </>
    );
}