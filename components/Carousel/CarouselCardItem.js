import React from 'react';
import { View, Text, Dimensions, Image } from "react-native";
import StyleCommon  from '../../theme/StyleCommon';
export const SLIDER_WIDTH = Dimensions.get('window').width + 80;
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7);
const CarouselCardItem = ({ item, index }) => {
    return (
        <View style={StyleCommon.CarouselContainer} key={index}>
            <Image
                source={item.imgSrc}
                style={StyleCommon.CarouselImage}
            />
            <Text style={StyleCommon.CarouselHeader}>{item.title}</Text>
            <Text style={StyleCommon.CarouselBody}>{item.body}</Text>
        </View>
    )
}

export default CarouselCardItem;