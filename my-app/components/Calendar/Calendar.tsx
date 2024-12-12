import React, {useEffect} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, ScrollView, ActivityIndicator, RefreshControl} from 'react-native';
import moment from "moment";
import {AntDesign, Entypo} from "@expo/vector-icons";
import {Divider} from "react-native-paper";
import {Link} from "expo-router";
import {useSelector} from "react-redux";
import {selectColor} from "../../app/store/reducers/themeSlice";
import themeStyles from "../../styles/styles";
import {useLazyGetPracticeScheduleSlotsQuery} from "../../app/services/authEndpoints";
import {Spinner} from "native-base";
import {selectPickedAccount} from "../../app/store/reducers/authSlice";

interface IProps {
    setIsVisible: Function,
    today: string,
    setToday: Function
}

const Schedule: React.FC<IProps> = ({setIsVisible, today, setToday}) => {
    const week = [
        'Пн',
        'Вт',
        'Ср',
        'Чт',
        'Пт',
        'Сб',
        'Вс',
    ]
    const currentDay = moment()
    const weekStart = moment(today).weekday(1).format('YYYY-MM-DD')
    const weekEnd = moment(today).weekday(7).format('YYYY-MM-DD')
    let themeColor = useSelector(selectColor)
    let account = useSelector(selectPickedAccount)
    const [getSlots, {data: slots, isFetching, isLoading, isSuccess}] = useLazyGetPracticeScheduleSlotsQuery();

    const data1 = {
        start_date: weekStart,
        end_date: weekEnd,
        master_id: account.id_reg
    };

    const refresh = async () => {
        await getSlots(data1);
    }

    useEffect(() => {
        getSlots(data1);
    }, [weekStart, account]);

    return (
        <View
            style={[styles.calendarContainer, themeColor === 'light' ? themeStyles.backgroundLight : themeStyles.backgroundDark]}>
            <View style={{flexDirection: 'row', alignItems: 'center', width: '90%', justifyContent: 'space-between'}}>
                <TouchableOpacity onPress={() => {
                    setToday(moment(today).add(-7, 'd').format('YYYY-MM-DD'))
                }}><Entypo name="chevron-thin-left" size={28} color='#c92e2e'/></TouchableOpacity>
                <TouchableOpacity onPress={() => setIsVisible(true)}>
                    <Text
                        style={[{fontSize: 20}, themeColor === 'light' ? themeStyles.textGrey : themeStyles.textDark]}>{moment(weekStart).format("DD.MM")} - {moment(weekEnd).format("DD.MM.YYYY")}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {
                    setToday(moment(today).add(7, 'd').format('YYYY-MM-DD'))
                }}><Entypo name="chevron-thin-right" size={28} color='#c92e2e'/></TouchableOpacity>
            </View>
            {isFetching || !isSuccess ?
                <ActivityIndicator color={'#e34d4d'} style={{paddingTop: '50%'}} size="large"/> :
                <ScrollView refreshControl={<RefreshControl refreshing={isLoading} onRefresh={refresh}/>}
                            overScrollMode={'never'} style={{flex: 2}}>
                    {week.map((el, idx) =>
                        <View style={{rowGap: 10}} key={idx}>
                            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                <View style={{
                                    alignItems: 'center',
                                    margin: 15,
                                    width: 60,
                                    backgroundColor: moment(today).weekday(idx + 1).format('YYYY-MM-DD') === currentDay.format('YYYY-MM-DD') ? 'yellow' : themeColor === 'light' ? 'white' : '#1a1a1a'
                                }}>
                                    <Text
                                        style={[styles.regularFont, {color: idx > 4 ? 'red' : themeColor === 'light' ? '#414141' : '#b7b7b7'}]}>{el}</Text>
                                    <Text
                                        style={{color: idx > 4 ? 'red' : themeColor === 'light' ? '#4d4d4d' : '#b7b7b7'}}>{moment(today).weekday(idx + 1).format('DD.MM')}</Text>
                                </View>
                                <View style={styles.scheduleSlotWrapper}>
                                    {slots && slots.data.full.map((el, id) => moment(el.plan_start_date).format('YYYY-MM-DD') === moment(weekStart).weekday(idx + 1).format('YYYY-MM-DD') &&
                                        <Link key={id} asChild
                                              href={`/instructorschedule/orderedslot/${el.dr_class_id}`}>
                                            <TouchableOpacity
                                                style={{backgroundColor: 'green', borderRadius: 2, padding: 8}}>
                                                <Text style={{
                                                    color: 'white',
                                                    fontSize: 18
                                                }}>{moment(el.plan_start_date).format("HH:mm")}</Text>
                                            </TouchableOpacity>
                                        </Link>)}
                                    {slots && slots.data.empty.map((el, id) => moment(el.start_date).format('YYYY-MM-DD') === moment(weekStart).weekday(idx + 1).format('YYYY-MM-DD') &&
                                        <Link key={id} asChild
                                              href={`/instructorschedule/emptyslot/${el.dr_session_id}`}>
                                            <TouchableOpacity
                                                style={{
                                                    borderColor: 'green',
                                                    borderWidth: 1,
                                                    borderRadius: 2,
                                                    padding: 8
                                                }}>
                                                <Text style={{
                                                    color: 'green',
                                                    fontSize: 18
                                                }}>{moment(el.start_date).format("HH:mm")}</Text>
                                            </TouchableOpacity>
                                        </Link>)}

                                    <Link
                                        href={`/instructorschedule/${moment(today).weekday(idx + 1).format('YYYY-MM-DD')}`}
                                        asChild>
                                        <TouchableOpacity><AntDesign name="pluscircleo" size={30}
                                                                     color="#2cb009"/></TouchableOpacity>
                                    </Link>
                                </View>
                            </View>
                            <Divider/>
                        </View>)}

                </ScrollView>}
            <TouchableOpacity
                style={styles.todayBtnWrapper}
                onPress={() => setToday(moment().format('YYYY-MM-DD'))}>
                <Text style={{color: '#ffffff', fontSize: 20}}>Сегодня</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    regularFont: {
        fontFamily: 'BebasNeue',
        fontSize: 30
    },
    tableFont: {
        textAlign: 'center',
        fontFamily: 'BebasNeue',
        fontSize: 20
    },
    profileImg: {
        height: 80,
        width: 80,
        borderRadius: 40,
    },
    scheduleSlotWrapper: {
        flexDirection: 'row',
        gap: 15,
        alignItems: 'center',
        flexWrap: 'wrap',
        width: '80%'
    },
    calendarContainer: {
        flex: 1,
        alignItems: 'center',
        paddingTop: 10,
        flexDirection: 'column',
        backgroundColor: 'white'
    },
    todayBtnWrapper: {
        backgroundColor: '#f6c305',
        padding: 8,
        borderRadius: 4,
        alignItems: 'center',
        position: 'absolute',
        right: 20,
        bottom: 30
    }
});

export default Schedule;