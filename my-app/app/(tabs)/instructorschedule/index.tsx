import React, {useState} from 'react';
import {StyleSheet, View} from "react-native";
import NotificationHeader from "../../../components/NotificationHeader/NotificationHeader";
import Schedule from "../../../components/Calendar/Calendar";
import {Calendar, LocaleConfig} from "react-native-calendars";
import {locales} from "../../../constants";
import moment from "moment";
import {useSelector} from "react-redux";
import {selectColor} from "../../store/reducers/themeSlice";
import themeStyles from "../../../styles/styles";
import {StatusBar} from "expo-status-bar";
import {SafeAreaView} from "react-native-safe-area-context";

const Index = () => {
    const [visible, setVisible] = useState<boolean>(false)
    const [today, setToday] = useState<string>(moment().format('YYYY-MM-DD'))
    let themeColor = useSelector(selectColor)
    LocaleConfig.locales['ru'] = locales
    LocaleConfig.defaultLocale = 'ru';

    return (
        <SafeAreaView style={[{flex: 1}, themeColor === 'light' ? themeStyles.backgroundLight : themeStyles.backgroundDark]}>
            <StatusBar style={themeColor === 'light' ? 'dark' : 'light'}/>
            {visible && <View onTouchEnd={() => setVisible(false)} style={styles.shadow}></View>}
            {visible && <View style={styles.calendarContainer}><Calendar
                onDayPress={(date) => {
                    setToday(date.dateString)
                    setVisible(false)
                }}
                style={{borderRadius: 10, width: 300, margin: 20}} hideExtraDays/></View>}
            <NotificationHeader/>
            <Schedule today={today} setToday={setToday} setIsVisible={setVisible}/>
        </SafeAreaView>

    );
};

const styles = StyleSheet.create({
    regularFont: {
        textAlign: 'center',
        fontFamily: 'BebasNeue',
        fontSize: 20
    },
    calendarContainer: {
        alignSelf: 'center',
        position: 'absolute',
        zIndex: 10,
        top: '20%'
    },
    shadow: {
        zIndex: 1,
        backgroundColor: 'lightgrey',
        opacity: .5,
        height: "100%",
        width: '100%',
        position: 'absolute'
    }
});

export default Index;