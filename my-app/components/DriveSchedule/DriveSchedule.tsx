import React, {FC} from 'react';
import {Calendar, LocaleConfig} from "react-native-calendars";
import {StyleSheet, View, Text} from "react-native";
import {useSelector} from "react-redux";
import {selectColor} from "../../app/store/reducers/themeSlice";
import {locales} from "../../constants";
import moment from "moment";
import {GetPracticeScheduleSlotsSearchQueryResponse} from "../../app/types/types";
import {Spinner} from "native-base";

interface DriveScheduleProps {
    setStartDate: Function
    startDate: string
    endDate: string
    setPickedDay: Function
    pickedDay: string
    setEndDate: Function
    slots: GetPracticeScheduleSlotsSearchQueryResponse
    isFetching: boolean
    isSuccess: boolean
}

const DriveSchedule: FC<DriveScheduleProps> = ({
                                                   setEndDate,
                                                   setStartDate,
                                                   setPickedDay,
                                                   pickedDay,
                                                   slots,
                                                   endDate,
                                                   startDate,
                                                   isFetching,
                                                   isSuccess
                                               }) => {
    let themeColor = useSelector(selectColor)
    LocaleConfig.locales['ru'] = locales;
    LocaleConfig.defaultLocale = 'ru';
    const reserved = {key: 'vacation', color: 'red', selectedDotColor: '#1fd91a'};
    const empty = {key: 'massage', color: 'blue', selectedDotColor: 'white'};
    const lesson = {key: 'workout', color: 'orange'};
    let parsedSlots: any = {}

    slots.data.empty.map((el, idx) => {
        let start = moment(el.start_date).format("YYYY-MM-DD")
        parsedSlots[start] = {
            key: idx,
            dots: [empty],
            selected: true,
            selectedColor: '#ffe800'
        };
    })

    slots.data.full.map((el, idx) => {
        let time = moment(el.plan_start_date).format("YYYY-MM-DD")
        if (parsedSlots[time] && parsedSlots[time].dots[parsedSlots[time].dots.length - 1].key !== "vacation") {
            parsedSlots[moment(el.plan_start_date).format("YYYY-MM-DD")] = {
                dots: [...parsedSlots[moment(el.plan_start_date).format("YYYY-MM-DD")].dots, reserved],
                key: idx + slots.data.empty.length,
                selected: true,
                selectedColor: '#ffe800'
            }
        } else if (!parsedSlots[time]) {
            parsedSlots[moment(el.plan_start_date).format("YYYY-MM-DD")] = {
                key: idx + slots.data.empty.length,
                dots: [reserved],
                selected: true,
                selectedColor: '#ffe800'
            };
        }
    })

    return (
        <Calendar
            theme={{
                todayTextColor: '#e34d4d',
                todayButtonTextColor: '#e34d4d',
                agendaTodayColor: '#e34d4d',
                arrowColor: '#e34d4d',
                calendarBackground: '',
                dayTextColor: themeColor === 'light' ? 'black' : '#b2b2b2',
                monthTextColor: themeColor === 'light' ? 'black' : '#b2b2b2',
            }}
            onDayPress={day => {
                setPickedDay(day.dateString);
            }}
            renderHeader={() => {
                return <Text>{`${locales.monthNames[parseInt(moment(startDate).add(-1, "month").format("MM"))]} ${moment(startDate).format("YYYY")}`}</Text>
            }}
            onMonthChange={(month => {
                setStartDate(moment(month).startOf('month').add(-1, "month").format("YYYY-MM-DD"))
                setEndDate(moment(month).endOf('month').add(-1, "month").format("YYYY-MM-DD"))
            })}
            disableMonthChange={true}
            onPressArrowLeft={() => {
                setStartDate(moment(startDate).add(-1, "month").startOf('month').format("YYYY-MM-DD"))
                setEndDate(moment(endDate).add(-1, "month").endOf('month').format("YYYY-MM-DD"))
            }}
            onPressArrowRight={() => {
                setStartDate(moment(startDate).add(1, "month").startOf('month').format("YYYY-MM-DD"))
                setEndDate(moment(endDate).add(1, "month").endOf('month').format("YYYY-MM-DD"))
            }}
            markingType={'multi-dot'}
            markedDates={parsedSlots}
            // markedDates={{
            //     [pickedDay]: {selected: true, disableTouchEvent: true, selectedColor: 'orange'},
            //     '2024-06-18': {dots: [reserved, empty, lesson], selected: true, selectedColor: '#ffe800'},
            //     // '2024-06-17': {marked: true, dotColor: '#68ce01'},
            //     '2012-03-02': {marked: true},
            //     '2012-03-03': {selected: true, marked: true, selectedColor: 'blue'}
            // }}
        />
    );
};

const styles = StyleSheet.create({
    regularFont: {
        textAlign: 'center',
        fontFamily: 'BebasNeue',
        fontSize: 20
    },
    backgroundLight: {
        backgroundColor: 'white'
    },
    backgroundDark: {
        backgroundColor: '#1a1a1a'
    },
    textLight: {
        color: 'black'
    },
    textDark: {
        color: 'white'
    },
});

export default DriveSchedule;