import React from 'react';
import { View, Text, Dimensions } from "react-native";
import {Caption} from 'react-native-paper';
import { Avatar } from 'react-native-paper';
export const SLIDER_WIDTH = Dimensions.get('window').width + 80;
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7);
const CarouselCardItem = ({ item, index }) => {
    return (
        <View key={index}>
        <View style={{flex:1, flexDirection: 'row'}}>
            <Avatar.Image size={50} source={item.imgSrc} />
            <View>
                <Text style={{fontSize:20, marginLeft:10, color:'#E81C2E'}}>{item.title}</Text>
                <Caption style={{marginLeft:10}}>
                    Thành viên
                </Caption>
            </View>
        </View>
            <Text style={{textAlign:'justify'}}>{item.body}</Text>
        </View>
    )
}

export default CarouselCardItem;