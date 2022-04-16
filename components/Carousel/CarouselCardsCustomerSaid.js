import React from 'react';
import { View } from "react-native";
import Carousel from 'react-native-snap-carousel';
import CarouselCardItem, { SLIDER_WIDTH, ITEM_WIDTH } from './CarouselCardItemCustomerSaid';
import data from './dataCustomerSaid.js';

const CarouselCards = () => {
    const isCarousel = React.useRef(null);
    // const [index, setIndex] = React.useState(0);
    return (
        <View>
            <Carousel
                layout="default"
                loop={true}
                autoplay={true}
                autoplayDelay={2000}
                autoplayInterval={3000}
                ref={isCarousel}
                data={data}
                renderItem={CarouselCardItem}
                sliderWidth={SLIDER_WIDTH}
                itemWidth={ITEM_WIDTH}
                // onSnapToItem={(index) => setIndex(index)}
                inactiveSlideShift={0}
                useScrollView={true}
            />
            
        </View>
    )
}


export default CarouselCards;