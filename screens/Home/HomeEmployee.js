import { View, ScrollView } from 'react-native';
import { Title } from 'react-native-paper';
import StyleCommon from '../../theme/StyleCommon';
import Theme from '../../theme/Theme';
import useGetInfoCustomer from '../../hooks/useGetInfoCustomer';
import Loading from '../../components/Loading';
import Card from '../../components/Card';
import moment from 'moment';

export default function HomeEmployeeScreen({ route, navigation }) {
    const [loadingInfo, infoCustomer] = useGetInfoCustomer();
    if(route.params) console.log('role trong home nhan vien', route.params.data);
    if (loadingInfo) return <Loading.Origin color={Theme.colors.secondary} size={50} />;
    return (
        <ScrollView>
            <View style={{marginTop:20}}>
                <Card.Origin srcImage={{ uri: infoCustomer.image }} title={infoCustomer.fullName} />
            </View>
            <View style={StyleCommon.FlexCenter}>
                <View style={{ marginHorizontal: 20 }}>
                    <Title style={{ textAlign: 'justify' }}>Hôm nay ngày: <Title style={{color: Theme.colors.secondary}}>{moment(new Date()).format('DD/MM/YYYY')}</Title ></Title>
                    <Title style={{ textAlign: 'justify' }}>Chúc bạn làm việc thuận lợi!</Title>
                    <Title style={{ textAlign: 'justify' }}>Ngày vào làm: <Title style={{color: Theme.colors.secondary}}>{moment(infoCustomer.createdAt).format('DD/MM/YYYY')}</Title></Title>
                    <Title style={{ textAlign: 'justify' }}>Đã làm việc được:  <Title style={{color: Theme.colors.secondary}}>{moment(infoCustomer.createdAt).fromNow(true)}</Title></Title>
                </View>
            </View>
        </ScrollView>
    );
}