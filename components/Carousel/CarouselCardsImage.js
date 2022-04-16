import React from 'react';
import { View } from "react-native";
import Carousel from 'react-native-snap-carousel';
import CarouselCardItem, { SLIDER_WIDTH, ITEM_WIDTH } from './CarouselCardItemImage';

const CarouselCards = (props) => {
    const isCarousel = React.useRef(null);
    return (
        <View>
            <Carousel
                layout="default"
                loop={true}
                autoplay={true}
                autoplayDelay={2000}
                autoplayInterval={3000}
                ref={isCarousel}
                data={props.images}
                renderItem={CarouselCardItem}
                sliderWidth={SLIDER_WIDTH}
                itemWidth={ITEM_WIDTH}
                inactiveSlideShift={0}
                useScrollView={true}
            />
            
        </View>
    )
}


export default CarouselCards;