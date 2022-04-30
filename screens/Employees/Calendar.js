import isEmpty from 'lodash/isEmpty';
import React, { useCallback, useState } from 'react';
import { Alert, View, Text, TouchableOpacity, Button } from 'react-native';
import { ExpandableCalendar, AgendaList, CalendarProvider } from 'react-native-calendars';
import StyleCommon from '../../theme/StyleCommon';
import './configLocaleVi';

const today = new Date().toISOString().split('T')[0];
const fastDate = getPastDate(3);
const futureDates = getFutureDates(9);
const dates = [fastDate, today].concat(futureDates);

function getFutureDates(numberOfDays) {
    const array = [];
    for (let index = 1; index <= numberOfDays; index++) {
        const date = new Date(Date.now() + 864e5 * index); // 864e5 == 86400000 == 24*60*60*1000
        const dateString = date.toISOString().split('T')[0];
        array.push(dateString);
    }
    return array;
}

function getPastDate(numberOfDays) {
    return new Date(Date.now() - 864e5 * numberOfDays).toISOString().split('T')[0];
}

const ITEMS = [
    {
        id: 1,
        title: dates[0],
        data: [{ hour: '12am', duration: '1h', title: 'First Yoga' }]
    },
    {
        id: 2,
        title: dates[1],
        data: [
            { hour: '4pm', duration: '1h', title: 'Pilates ABC' },
            { hour: '5pm', duration: '1h', title: 'Vinyasa Yoga' }
        ]
    },
    {
        id: 3,
        title: dates[2],
        data: [
            { hour: '1pm', duration: '1h', title: 'Ashtanga Yoga' },
            { hour: '2pm', duration: '1h', title: 'Deep Stretches' },
            { hour: '3pm', duration: '1h', title: 'Private Yoga' }
        ]
    },
    {
        id: 4,
        title: dates[3],
        data: [{ hour: '12am', duration: '1h', title: 'Ashtanga Yoga' }]
    },
    {
        id: 5,
        title: dates[4],
        data: [{}]
    },
    {
        id: 6,
        title: dates[5],
        data: [
            { hour: '9pm', duration: '1h', title: 'Middle Yoga' },
            { hour: '10pm', duration: '1h', title: 'Ashtanga' },
            { hour: '11pm', duration: '1h', title: 'TRX' },
            { hour: '12pm', duration: '1h', title: 'Running Group' }
        ]
    },
    {
        id: 7,
        title: dates[6],
        data: [
            { hour: '12am', duration: '1h', title: 'Ashtanga Yoga' }
        ]
    },
    {
        id: 8,
        title: dates[7],
        data: [{}]
    },
    {
        id: 9,
        title: dates[8],
        data: [
            { hour: '9pm', duration: '1h', title: 'Pilates Reformer' },
            { hour: '10pm', duration: '1h', title: 'Ashtanga' },
            { hour: '11pm', duration: '1h', title: 'TRX' },
            { hour: '12pm', duration: '1h', title: 'Running Group' }
        ]
    },
    {
        id: 10,
        title: dates[9],
        data: [
            { hour: '1pm', duration: '1h', title: 'Ashtanga Yoga' },
            { hour: '2pm', duration: '1h', title: 'Deep Stretches' },
            { hour: '3pm', duration: '1h', title: 'Private Yoga' }
        ]
    },
    {
        id: 11,
        title: dates[10],
        data: [
            { hour: '12am', duration: '1h', title: 'Last Yoga' }
        ]
    }
];

function getMarkedDates(items) {
    const marked = {};
    items.forEach(item => {
        // NOTE: only mark dates with data
        if (item.data && item.data.length > 0 && !isEmpty(item.data[0])) {
            marked[item.title] = { marked: true };
        } else {
            marked[item.title] = { disabled: true };
        }
    });
    return marked;
}

const AgendaItem = React.memo(function AgendaItem(props) {
    const { item } = props;

    const buttonPressed = useCallback(() => {
        Alert.alert('Tiêu đề', 'Show me more');
    }, []);

    const itemPressed = useCallback(() => {
        Alert.alert(item.title);
    }, []);

    if (isEmpty(item)) {
        return (
            <View style={StyleCommon.emptyItem}>
                <Text style={StyleCommon.emptyItemText}>Không có lịch làm việc</Text>
            </View>
        );
    }

    return (
        <TouchableOpacity onPress={itemPressed} style={StyleCommon.item} /*testID={testIDs.agenda.ITEM}*/>
            <View>
                <Text style={StyleCommon.itemHourText}>{item.hour}</Text>
                <Text style={StyleCommon.itemDurationText}>{item.duration}</Text>
            </View>
            <Text style={StyleCommon.itemTitleText}>{item.title}</Text>
            <View style={StyleCommon.itemButtonContainer}>
                <Button color={'red'} title={'Chi tiết'} onPress={buttonPressed} />
            </View>
        </TouchableOpacity>
    );
});

let marked = getMarkedDates(ITEMS);
console.log('change marked day');
export default function ExpandableCalendarScreen() {
    const renderItem = useCallback(({ item, index }) => {
        console.log('loading');
        return <AgendaItem key={index} item={item} />;
    },[]);

    return (
        <CalendarProvider
            date={ITEMS[1].title}
            showTodayButton={false}
            disabledOpacity={0.6}
        >
            <ExpandableCalendar
                firstDay={1}
                disablePan={true}
                hideKnob={true}
                disableWeekScroll={true}
                markedDates={marked}
                disableAllTouchEventsForInactiveDays={true}
                disableAllTouchEventsForDisabledDays={true}
                disableArrowLeft={true}
                disableArrowRight={true}
                hideArrows={true}
                enableSwipeMonths={false}
                disableMonthChange={true}
                showSixWeeks={false}
                displayLoadingIndicator={true}
            />
            <AgendaList
                sections={ITEMS}
                initialNumToRender={11}
                dayFormat="dddd dd-MM-yyyy"
                renderItem={renderItem}
                avoidDateUpdates={true}
                scrollToNextEvent={false} // prevent re-render when scroll
                viewOffset={11}
            />
        </CalendarProvider>
    );
}