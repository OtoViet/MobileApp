import React from 'react';
import { View, Dimensions, Image } from "react-native";
import StyleCommon  from '../../theme/StyleCommon';
export const SLIDER_WIDTH = Dimensions.get('window').width + 80;
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7);
const CarouselCardItem = ({ item, index }) => {
    return (
        <View style={StyleCommon.CarouselImageContainer} key={index}>
            <Image
                source={{uri: item.url}}
                style={StyleCommon.CarouselImage}
            />
        </View>
    )
}

export default CarouselCardItem;