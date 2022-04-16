import * as React from 'react';
import MapView, { Marker, Callout } from 'react-native-maps';
import { Headline, Text, Title } from 'react-native-paper';
import { StyleSheet, View, Dimensions, ScrollView } from 'react-native';
import useGetAllStore from '../../hooks/useGetAllStore';
import Loading from '../../components/Loading';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Theme from '../../theme/Theme';

export default function ListStore() {
    const [loading, stores] = useGetAllStore();
    if (loading) return <Loading.Origin color={Theme.colors.secondary} size={50} />;
    return (
        <ScrollView>
            <Headline style={{ textAlign: 'center', marginVertical: 20}}>
                Địa Chỉ Cửa Hàng OtoViet
            </Headline>
            {
                stores.map((item, index) => {
                    return <View style={{ paddingHorizontal: 20 }} key={index}>
                        <Title style={{ paddingVertical: 20 }}>
                            <FontAwesome5 name="map-marker-alt" size={30} color={Theme.colors.secondary} /> {item.name}
                        </Title>
                        <View >
                            <Title >Địa chỉ: <Text style={{ fontSize: 16 }}>{item.address}</Text></Title>
                        </View>
                        <View >
                            <Title >Email: <Text style={{ fontSize: 16 }}>{item.email}</Text></Title>
                        </View>
                        <Title>Liên hệ: <Text style={{ fontSize: 16 }}>{item.phoneNumber}</Text></Title>
                    </View>
                })
            }
            <View style={styles.container}>
                <Headline style={{ textAlign: 'center', marginBottom:20, marginTop:40 }}>
                    Danh Sách Và Địa Chỉ Chi Tiết
                </Headline>
                <MapView style={styles.map}
                    initialRegion={{
                        latitude: 9.9205967,
                        longitude: 105.9287515,
                        latitudeDelta: 0.8,
                        longitudeDelta: 0.9,
                    }} >
                    {
                        stores.map((item, index) => {
                            return <Marker
                                key={index}
                                coordinate={{ latitude: item.latitude, longitude: item.longitude }}
                                title={item.name}
                                description={'Cửa hàng ô tô việt số ' + item.numOfStore} />
                        })
                    }
                    <Callout tooltip={true} />
                </MapView>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 20
    },
    map: {
        height: Dimensions.get('window').height - 150,
    },
});