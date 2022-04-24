import { View, ScrollView, Alert } from 'react-native';
import {
    Headline, Paragraph, Text, TextInput, Title,
    Button, Avatar, Caption, HelperText
} from 'react-native-paper';
import Theme from '../../../theme/Theme';
import StyleCommon from '../../../theme/StyleCommon';
import { AirbnbRating } from 'react-native-ratings';
import { useState, useEffect } from 'react';
import Carousel from '../../../components/Carousel/CarouselCardsImage';
import useGetProductById from '../../../hooks/useGetProductById';
import Loading from '../../../components/Loading';
import AntDesign from 'react-native-vector-icons/AntDesign';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import FormApi from '../../../api/formApi';

export default function Comments({ route, navigation }) {
    const { data } = route.params;
    const rowPerPage = 3;
    const [pages, setPages] = useState(1);
    const [rating, setRating] = useState(0);
    const [dataRating, setDataRating] = useState([]);
    const [display, setDisplay] = useState("none");
    let [loading, product] = useGetProductById(data._id);

    const ratingSchema = Yup.object().shape({
        content: Yup.string().required('Vui lòng nhập nội dung bình luận'),
        star: Yup.number().required('Vui lòng chọn số sao đánh giá'),
    });

    const formik = useFormik({
        initialValues: {
            content: '',
            star: 5,
        },
        validationSchema: ratingSchema,
        onSubmit: (values) => {
            FormApi.rating(data._id, values).then(res => {
                console.log(res);
                setDataRating(res.rating);
                Alert.alert("Thông báo","Bạn đã đánh giá thành công");
            }).catch(err => {
                Alert.alert("Thông báo","Bạn đã đánh giá thất bại do bạn đã đánh giá trước đó hoặc chưa sử dụng dịch vụ hoặc do chưa đăng nhập!");
            });

        },
    });
    const handlePreviousPage = () => {
        setPages(pages > 1 ? pages - 1 : 0);
    }
    const handleFirstPage = () => {
        setPages(1);
    }
    const handleLastPage = () => {
        setPages(Math.ceil(dataRating.length / rowPerPage));
    }
    const handleNextPage = () => {
        setPages(pages < Math.ceil(dataRating.length / rowPerPage) ? pages + 1 : Math.ceil(dataRating.length / rowPerPage));
    }
    const handleClickCancel = () => {
        formik.resetForm();
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
                    <Headline style={{ textAlign: 'center', marginBottom: 20 }}>Bình luận và đánh giá</Headline>
                    <AirbnbRating
                        defaultRating={5}
                        showRating={false}
                        onFinishRating={(value) => formik.setFieldValue('star', value)}
                    />
                    <HelperText 
                    style={{ marginHorizontal: 20, marginBottom: 20 }}
                    type="error" visible={formik.touched.star && Boolean(formik.errors.star)}>
                        {formik.touched.star && formik.errors.star}
                    </HelperText>
                    <TextInput
                        style={{ marginHorizontal: 20, marginTop: 20 }}
                        label="Nội dung bình luận"
                        name="content"
                        mode="outlined"
                        numberOfLines={4}
                        multiline={true}
                        value={formik.values.content}
                        onBlur={formik.handleBlur('content')}
                        onChangeText={(text) => formik.setFieldValue('content', text)}
                    />
                    <HelperText 
                    style={{ marginHorizontal: 20, marginBottom: 20 }}
                    type="error" visible={formik.touched.content && Boolean(formik.errors.content)}>
                        {formik.touched.content && formik.errors.content}
                    </HelperText>
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
                            onPress={formik.handleSubmit}>
                            Bình luận
                        </Button>
                    </View>
                </View>
                <Headline style={{ textAlign: 'center' }}>Có {dataRating ? dataRating.length : 0} bình luận</Headline>
                {dataRating.slice(pages * rowPerPage - rowPerPage, pages * rowPerPage).map((itemData, index) => {
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
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                    <AntDesign
                        style={{ borderWidth: 2, borderRadius: 5, paddingLeft: 4, paddingTop: 4, marginHorizontal: 5 }}
                        name="doubleleft"
                        size={20}
                        color={Theme.colors.secondary}
                        onPress={handleFirstPage}
                    />
                    <AntDesign
                        style={{ borderWidth: 2, borderRadius: 5, paddingLeft: 4, paddingTop: 4, marginHorizontal: 5 }}
                        name="left"
                        size={20}
                        color={Theme.colors.secondary}
                        onPress={handlePreviousPage}
                    />
                    <Title>{pages}</Title>
                    <AntDesign
                        style={{ borderWidth: 2, borderRadius: 5, paddingLeft: 4, paddingTop: 4, marginHorizontal: 5 }}
                        name="right"
                        size={20}
                        color={Theme.colors.secondary}
                        onPress={handleNextPage}
                    />
                    <AntDesign
                        style={{ borderWidth: 2, borderRadius: 5, paddingLeft: 4, paddingTop: 4, marginHorizontal: 5 }}
                        name="doubleright"
                        size={20}
                        color={Theme.colors.secondary}
                        onPress={handleLastPage}
                    />
                </View>
                <Text style={{ textAlign: 'center' }}>Trang {pages} trong tổng {Math.ceil(dataRating.length / rowPerPage)} trang </Text>
            </ScrollView>
        </>
    );
}