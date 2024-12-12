import React, {useState} from 'react';
import {View} from "react-native";
import {Calendar, LocaleConfig} from "react-native-calendars";
import {locales} from "../../constants";
import {useSelector} from "react-redux";
import {selectColor} from "../../app/store/reducers/themeSlice";

const TheorySchedule = () => {
    const [selected, setSelected] = useState('');
    let themeColor = useSelector(selectColor)
    LocaleConfig.locales['ru'] = locales
    LocaleConfig.defaultLocale = 'ru';

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
                setSelected(day.dateString);
            }}
            markedDates={{
                [selected]: {selected: true, disableTouchEvent: true, selectedColor: 'orange'},
                '2023-12-03': {marked: true, dotColor: '#68ce01'},
                '2023-12-10': {marked: true, dotColor: '#68ce01'},
                '2023-12-17': {marked: true, dotColor: '#68ce01'},
                '2023-12-24': {marked: true, dotColor: '#68ce01'},
                '2023-12-05': {marked: true, dotColor: '#68ce01'},
                '2023-12-12': {marked: true, dotColor: '#68ce01'},
                '2023-12-19': {marked: true, dotColor: '#68ce01'},
                '2023-12-26': {marked: true, dotColor: '#68ce01'},
            }}
        />
    );
};

export default TheorySchedule;