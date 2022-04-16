import { View, ScrollView } from 'react-native';
import { Headline, Button, Text } from 'react-native-paper';
import StyleCommon from '../../../theme/StyleCommon';
import Theme from '../../../theme/Theme';
import Carousel from '../../../components/Carousel/CarouselCardsImage';
export default function Info({ route, navigation }) {
    const { data } = route.params;
    return (
        <ScrollView>
            <View style={StyleCommon.FlexCenter}>
                <Carousel images={data.images} />
            </View>
            <Headline style={{ fontWeight: 'bold', textAlign: 'center', fontSize: 30, marginVertical: 20 }}>
                {data.productName}
            </Headline>
            <Button icon="briefcase-plus-outline"
                color={Theme.colors.secondary} mode="contained"
                style={{ marginHorizontal: 20, marginBottom: 10 }}
                onPress={() => navigation.navigate('Booking', { data: data })}
                >
                Đặt lịch ngay
            </Button>
            <View style={StyleCommon.FlexCenter}>
                <Headline>Mô tả thông dịch vụ</Headline>
            </View>
            <View style={{
                flex: 1, justifyContent: 'center', alignItems: 'center',
                textAlign: 'justify', marginHorizontal: 20
            }}>
                <Text>{data.description}</Text>
            </View>
        </ScrollView>
    );
}