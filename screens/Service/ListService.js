import { useState, useCallback, useEffect } from 'react';
import { View, FlatList, StyleSheet, RefreshControl } from 'react-native';
import { Card, Title, Paragraph, Button } from 'react-native-paper';
import StyleCommon from '../../theme/StyleCommon';
import Theme from '../../theme/Theme';
import useGetAllProduct from '../../hooks/useGetAllProduct';
import Loading from '../../components/Loading';
import { useIsFocused } from '@react-navigation/native';


const handlePressDetail = (navigation, itemData) => {
    navigation.navigate('Details', {
        data: itemData
    });
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    item: {
        padding: 20,
    },
    title: {
        fontSize: 32,
    },
});
const Item = ({ itemData, navigation }) => (
    <View style={styles.item}>
        <Card>
            <Card.Cover source={{ uri: itemData.images[0].url }} />
            <Card.Content>
                <Title>{itemData.productName}</Title>
                <Paragraph>
                    {itemData.description.length > 100 ?
                        itemData.description.substring(0, 90) + "..." : itemData.description}
                </Paragraph>
            </Card.Content>
            <Card.Actions>
                <Button style={StyleCommon.ButtonCenter}
                    onPress={() => handlePressDetail(navigation, itemData)}
                    labelStyle={{ color: Theme.colors.secondary }}>Xem thêm</Button>
            </Card.Actions>
        </Card>
    </View>
);

export default function ListServiceScreen({ navigation }) {
    const isFocused = useIsFocused();
    const [refreshing, setRefreshing] = useState(false);
    const [loading, products] = useGetAllProduct(isFocused, refreshing);
    const onRefresh = useCallback(() => {
        setRefreshing(true);
    }, []);

    useEffect(() => {
        if(!loading) {
            setRefreshing(false);
        }
    }, [loading]);

    const renderItem = ({ item }) => (
        <Item itemData={item} navigation={navigation} />
    );
    if (loading) return <Loading.Origin color={Theme.colors.secondary} size={50} />;
    return (
        <View>
            <FlatList
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }
                data={products}
                renderItem={renderItem}
                keyExtractor={item => item._id}
            />
        </View>
    );
}