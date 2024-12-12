import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, ScrollView, ActivityIndicator, RefreshControl} from "react-native";
import DriveSchedule from "../../../components/DriveSchedule/DriveSchedule";
import {Link} from "expo-router";
import {useSelector} from "react-redux";
import {selectColor} from "../../store/reducers/themeSlice";
import NotificationHeader from "../../../components/NotificationHeader/NotificationHeader";
import themeStyles from "../../../styles/styles";
import {useLazyGetPracticeScheduleSlotsQuery} from "../../services/authEndpoints";
import moment from "moment";
import {getAbbreName} from "../../../constants/functions";
import {selectPickedAccount} from "../../store/reducers/authSlice";
import {useGetContractQuery} from "../../services/contractEndpoints";
import {SafeAreaView} from "react-native-safe-area-context";

const Index = () => {
    const [scheduleType, setScheduleType] = useState<string>('drive')
    const [expanded, setExpanded] = React.useState(true);
    const [startDate, setStartDate] = useState<string>(moment().startOf('month').format("YYYY-MM-DD"));
    const [endDate, setEndDate] = useState<string>(moment().endOf('month').format("YYYY-MM-DD"));
    const [pickedDay, setPickedDay] = useState("");
    let themeColor = useSelector(selectColor)
    const [getSlots, {data: slots, isFetching, isLoading, isSuccess}] = useLazyGetPracticeScheduleSlotsQuery()
    const account = useSelector(selectPickedAccount)
    const {data: contract} = useGetContractQuery(account.id_reg)
    const handlePress = () => setExpanded(!expanded);
    const queryData = {
        start_date: startDate,
        end_date: endDate,
        master_id: contract && contract.data.plan_master_id
    };

    const refresh = async () => {
        await getSlots(queryData)
    }

    useEffect(() => {
        if (queryData.master_id) {
            getSlots(queryData)
        }
    }, [startDate])

    if (!slots || !contract) return <ActivityIndicator color={'#e34d4d'} style={{paddingTop: '50%'}} size="large"/>

    const renderPickedDaySlots = (day: string) => {
        return [...slots.data.empty.filter(el => moment(el.start_date).format("YYYY-MM-DD") === day),
            ...slots.data.full.filter(el => moment(el.plan_start_date).format("YYYY-MM-DD") === day)]
    }

    return (
        <SafeAreaView style={[{
            backgroundColor: 'white',
            rowGap: 20,
            flex: 1
        }, themeColor === 'light' ? themeStyles.backgroundLight : themeStyles.backgroundDark]}>
            <NotificationHeader/>
            {(!slots || isFetching || !isSuccess) && <><ActivityIndicator color={'#e34d4d'} style={{
                marginTop: "30%",
                position: "absolute",
                alignSelf: "center"
            }} size="large"/><View style={{
                position: "absolute",
                backgroundColor: "lightgrey",
                width: "100%",
                height: "100%",
                opacity: 0.2
            }}></View></>}
            <ScrollView refreshControl={<RefreshControl refreshing={isLoading} onRefresh={refresh}/>} style={{flex: 2}}>
                <Text style={[themeStyles.regularFont, {
                    alignSelf: 'flex-start',
                    paddingLeft: 20
                }, themeColor === 'light' ? themeStyles.textLight : themeStyles.textDark]}>Моё расписание</Text>
                {/*<View style={{flexDirection: 'row', justifyContent: 'space-evenly', paddingTop: 20}}>*/}
                {/*    <TouchableOpacity onPress={() => setScheduleType('drive')} style={{borderBottomWidth: scheduleType === 'drive' ? 1 : 0, borderColor: '#b05050'}}>*/}
                {/*        <Text style={[themeStyles.regularFont, themeColor === 'light' ? themeStyles.textLight : themeStyles.textDark]}>Вождение</Text>*/}
                {/*    </TouchableOpacity>*/}
                {/*<TouchableOpacity style={{borderBottomWidth: scheduleType === 'theory' ? 1 : 0, borderColor: '#b05050'}} onPress={() => setScheduleType('theory')}>*/}
                {/*    <Text style={[themeStyles.regularFont, themeColor === 'light' ? themeStyles.textLight : themeStyles.textDark]}>Теория</Text>*/}
                {/*</TouchableOpacity>*/}
                {/*</View>*/}
                {/*{scheduleType === 'drive' ? <DriveSchedule/> : <TheorySchedule/>}*/}
                <DriveSchedule isFetching={isFetching} isSuccess={isSuccess} endDate={endDate} startDate={startDate}
                               slots={slots} pickedDay={pickedDay} setPickedDay={setPickedDay}
                               setStartDate={setStartDate} setEndDate={setEndDate}/>
                {/*<List.Accordion*/}
                {/*    title={<Text style={{color: themeColor === 'light' ? 'black' : 'white'}}>Практические вождение</Text>}*/}
                {/*    left={props => <Entypo {...props} name="list" size={24} color={themeColor === 'light' ? 'black' : 'white'} />}*/}
                {/*    expanded={expanded}*/}
                {/*    theme={{colors: {background: '', primary: '#212121FF'}}}*/}
                {/*    titleStyle={{color: 'black'}}*/}
                {/*    style={{height: 60, gap: 0}}*/}
                {/*    onPress={handlePress}>*/}
                <View style={{alignItems: 'center'}}>
                    <Text style={[themeStyles.regularFont, {color: themeColor === 'light' ? 'black' : 'white'}]}>Доступные
                        занятия</Text>
                    <View style={styles.eventWrapper}>
                        {renderPickedDaySlots(pickedDay).map((el, idx) => {
                            if ("start_date" in el) {
                                return <Link href={`/schedule/emptyslot/${el.dr_session_id}`} key={idx}
                                             asChild><TouchableOpacity><View
                                    style={styles.eventBox}>
                                    <Text style={{color: '#1aa80a', paddingHorizontal: 5}}><Text
                                        style={{
                                            fontWeight: 'bold',
                                            color: '#3e9d32',
                                            fontSize: 17
                                        }}>{moment(el.start_date).format("HH:mm")}</Text> - {moment(el.end_date).format("HH:mm")}
                                    </Text>
                                    <Text style={{
                                        color: '#1aa80a',
                                        paddingLeft: 5
                                    }}>{getAbbreName(el.plan_master_name) || ""}</Text>
                                    <Text style={{color: '#1aa80a', paddingLeft: 5}}>Свободно</Text>
                                </View></TouchableOpacity></Link>
                            } else {
                                return <Link href={`/schedule/orderedslot/${el.dr_class_id}`} key={idx}
                                             asChild><TouchableOpacity
                                    style={{backgroundColor: '#1aa80a', borderRadius: 5, padding: 5}}><View>
                                    <Text style={{color: 'white', paddingHorizontal: 5}}><Text
                                        style={{
                                            fontWeight: 'bold',
                                            color: 'white',
                                            fontSize: 17
                                        }}>{moment(el.plan_start_date).format("HH:mm")}</Text> - {moment(el.plan_end_date).format("HH:mm")}
                                    </Text>
                                    <Text style={{
                                        color: 'white',
                                        paddingLeft: 5
                                    }}>{getAbbreName(el.plan_master_name)}</Text>
                                    <Text style={{color: 'white', paddingLeft: 5}}>Мое занятие</Text>
                                </View></TouchableOpacity></Link>
                            }
                        })}
                        {/*<Link href={'/schedule/emptyslot/1'} asChild><TouchableOpacity><View style={styles.eventBox}>*/}
                        {/*        <Text style={{color: '#1aa80a', paddingHorizontal: 5}}><Text*/}
                        {/*            style={{fontWeight: 'bold', color: '#3e9d32', fontSize: 17}}>12:30</Text> - 14:00</Text>*/}
                        {/*        <Text style={{color: '#1aa80a', paddingLeft: 5}}>Вехт Е.К.</Text>*/}
                        {/*        <Text style={{color: '#1aa80a', paddingLeft: 5}}>Свободно</Text>*/}
                        {/*    </View></TouchableOpacity></Link>*/}
                        {/*<Link href={'/schedule/orderedslot/1'} asChild><TouchableOpacity style={{backgroundColor: '#1aa80a', borderRadius: 5, padding: 5}}><View>*/}
                        {/*        <Text style={{color: 'white', paddingHorizontal: 5}}><Text*/}
                        {/*            style={{fontWeight: 'bold', color: 'white', fontSize: 17}}>12:30</Text> - 14:00</Text>*/}
                        {/*        <Text style={{color: 'white', paddingLeft: 5}}>Вехт Е.К.</Text>*/}
                        {/*        <Text style={{color: 'white', paddingLeft: 5}}>Мое занятие</Text>*/}
                        {/*    </View></TouchableOpacity></Link>*/}
                    </View>
                </View>

                {/*</List.Accordion>*/}
            </ScrollView>
        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    eventBox: {
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#1aa80a',
        padding: 5
    },
    eventWrapper: {
        height: '100%',
        alignItems: 'flex-start',
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: '100%',
        gap: 10,
        padding: 15
    }
});

export default Index;