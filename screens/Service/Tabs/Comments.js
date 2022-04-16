import { View, ScrollView } from 'react-native';
import { Headline, Paragraph, TextInput, Title, Button, Avatar, Caption } from 'react-native-paper';
import Theme from '../../../theme/Theme';
import StyleCommon from '../../../theme/StyleCommon';
import { AirbnbRating } from 'react-native-ratings';
import { useState, useEffect } from 'react';
import Carousel from '../../../components/Carousel/CarouselCardsImage';
import useGetProductById from '../../../hooks/useGetProductById';
import Loading from '../../../components/Loading';

export default function Comments({ route, navigation }) {
    const { data } = route.params;
    const [rating, setRating] = useState(0);
    const [dataRating, setDataRating] = useState([]);
    const [text, setText] = useState("");
    const [display, setDisplay] = useState("none");
    let [loading, product] = useGetProductById(data._id);

    const handleClickCancel = () => {
        setDisplay("none");
    };
    const handleClickShow = () => {
        setDisplay("flex");
    };
    useEffect(() => {
        let total = 0;
        if (data.rating) {
            if (data.rating.length > 0) {
                data.rating.forEach(element => {
                    total += element.rating;
                });
                setRating(total / data.rating.length);
            }
        }
        setDataRating(data.rating);
    }, []);
    if (loading) return <Loading.Origin color={Theme.colors.secondary} size={50} />;
    return (
        <>
            <ScrollView>
                <View style={StyleCommon.FlexCenter}>
                    <Carousel images={data.images} />
                </View>
                <Headline style={{ fontWeight: 'bold', textAlign: 'center', fontSize: 30, marginVertical: 20 }}>
                    {data.productName}
                </Headline>
                <View style={{
                    borderWidth: 3, borderRadius: 1,
                    borderColor: Theme.colors.primary, borderStyle: 'dotted',
                    marginHorizontal: 20
                }}>
                    <View style={StyleCommon.FlexCenter}>
                        <Headline>Đánh giá dịch vụ</Headline>
                        <Headline>{Math.round(rating * 10) / 10}/5</Headline>
                    </View>
                    <AirbnbRating
                        defaultRating={Math.ceil(rating)}
                        showRating={false}
                        isDisabled={true}
                    />
                    <View style={StyleCommon.FlexCenter}>
                        <Title style={{ marginBottom: 20 }}>(Có {dataRating.length} đánh giá)</Title>
                    </View>
                </View>


                <View style={{
                    borderWidth: 3, borderRadius: 1,
                    borderColor: Theme.colors.primary, borderStyle: 'dotted',
                    marginHorizontal: 20,
                    marginVertical: 20,
                }}>
                    <View style={StyleCommon.FlexCenter}>
                        <Headline>Mức độ hài lòng</Headline>
                        <Title style={{ fontSize: 40, paddingVertical: 20 }}>{parseInt((rating / 5) * 100)}%</Title>
                    </View>
                </View>
                <View style={{
                    borderWidth: 3, borderRadius: 1,
                    borderColor: Theme.colors.primary, borderStyle: 'dotted',
                    marginHorizontal: 20,
                    marginBottom: 20,
                }}>
                    <View style={StyleCommon.FlexCenter}>
                        <Headline style={{ textAlign: 'center' }}>Hãy để lại góp ý của bạn cho chúng tôi</Headline>
                        <Button icon="pen"
                            mode="contained"
                            style={{ marginBottom: 20 }}
                            color={Theme.colors.secondary}
                            onPress={handleClickShow}>
                            Viết đánh giá
                        </Button>
                    </View>
                </View>

                <View style={{ display: display }}>
                    <Headline style={{ textAlign: 'center' }}>Bình luận và đánh giá</Headline>
                    <TextInput
                        style={{ marginHorizontal: 20, marginVertical: 20 }}
                        label="Nội dung bình luận"
                        value={text}
                        mode="outlined"
                        numberOfLines={4}
                        multiline={true}
                        onChangeText={text => setText(text)}
                    />
                    <View style={{
                        flex: 1, flexDirection: 'row',
                        justifyContent: 'space-around', alignItems: 'center'
                    }}>
                        <Button icon="cancel"
                            mode="contained"
                            style={{ marginBottom: 20 }}
                            color={Theme.colors.primary}
                            onPress={handleClickCancel}>
                            Hủy bỏ
                        </Button>
                        <Button icon="pen"
                            mode="contained"
                            style={{ marginBottom: 20 }}
                            color={Theme.colors.secondary}
                            onPress={() => console.log('Pressed')}>
                            Bình luận
                        </Button>
                    </View>
                </View>
                <Headline style={{ textAlign: 'center' }}>Có {dataRating ? dataRating.length : 0} bình luận</Headline>
                {product.rating.map((itemData, index) => {
                    return (
                        <View key={index} style={{
                            marginHorizontal: 20, borderBottomWidth: 1,
                            marginBottom: 10, borderStyle: 'solid', borderColor: 'grey'
                        }}>
                            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                                <Avatar.Text size={24} label={product.infoUserComment[index].fullName[0].toUpperCase()} />
                                <Caption>{product.infoUserComment[index].fullName}</Caption>
                            </View>
                            <AirbnbRating
                                ratingContainerStyle={{
                                    flex: 1, flexDirection: 'row',
                                    justifyContent: 'flex-start'
                                }}
                                defaultRating={Math.ceil(itemData.rating)}
                                size={14}
                                showRating={false}
                                isDisabled={true}
                            />
                            <Paragraph style={{ textAlign: 'justify' }}>{itemData.comment}</Paragraph>
                        </View>
                    )
                })}
            </ScrollView>
        </>
    );
}