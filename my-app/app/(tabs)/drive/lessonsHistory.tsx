import React, {useEffect} from 'react';
import {ActivityIndicator, RefreshControl, ScrollView, Text, View} from "react-native";
import {useSelector} from "react-redux";
import {selectColor} from "../../store/reducers/themeSlice";
import themeStyles from "../../../styles/styles";
import {StatusBar} from "expo-status-bar";
import BackLink from "../../../components/BackLink/BackLink";
import {
    useLazyGetPracticeScheduleJournalQuery
} from "../../services/scheduleEndpoints";
import {DataTable} from "react-native-paper";
import moment from "moment";
import {selectPickedAccount} from "../../store/reducers/authSlice";
import {SafeAreaView} from "react-native-safe-area-context";

const LessonsHistory = () => {
    let themeColor = useSelector(selectColor)
    const account = useSelector(selectPickedAccount)
    const [getHistory, {data: history, isLoading}] = useLazyGetPracticeScheduleJournalQuery()

    useEffect(() => {
        getHistory(account.id_reg)
    }, [])

    const refresh = async () => {
        await getHistory(account.id_reg)
    }

    if (!history) return <ActivityIndicator color={'#e34d4d'} style={{paddingTop: '50%'}} size="large"/>

    const handleTime = (str: string) => {
        let date = str.split(" - ")
        let firstPeriod = date[0].split(":")
        let secondPeriod = date[1].split(":")
        return `${firstPeriod[0]}:${firstPeriod[1]} - ${secondPeriod[0]}:${secondPeriod[1]}`
    }

    return (
        <SafeAreaView style={[{flex: 1}, themeColor === 'light' ? themeStyles.backgroundLight : themeStyles.backgroundDark]}>
            <StatusBar style={themeColor === 'light' ? 'dark' : 'light'}/>
            <BackLink link={'/drive'} label={'Назад'}/>
            <ScrollView refreshControl={<RefreshControl refreshing={isLoading} onRefresh={refresh}/>} style={{flex: 2}}>
                <DataTable>
                    <DataTable.Header>
                        <DataTable.Title style={{flex: 5}}><Text
                            style={themeColor === 'light' ? themeStyles.textLight : themeStyles.textDark}>Дата/Время</Text></DataTable.Title>
                        <DataTable.Title style={{flex: 3}}><Text
                            style={themeColor === 'light' ? themeStyles.textLight : themeStyles.textDark}>Часы</Text></DataTable.Title>
                        <DataTable.Title style={{flex: 5}}><Text
                            style={themeColor === 'light' ? themeStyles.textLight : themeStyles.textDark}>Тип
                            занятия</Text></DataTable.Title>
                    </DataTable.Header>
                    {history.data.map((el, key) => (
                        <View key={key}>
                            <DataTable.Row rippleColor={'white'} style={{borderBottomWidth: 1, borderColor: "#e5e5e5"}} key={el.lead_id}>
                                <DataTable.Cell style={{flex: 5}}>
                                    <View>
                                        <Text style={[themeColor === 'light' ? themeStyles.textLight : themeStyles.textDark, {textAlign: "center"}]}>{moment(el.plan_start_date).format("DD.MM.YYYY")}</Text>
                                        <Text style={[themeColor === 'light' ? themeStyles.textLight : themeStyles.textDark, {textAlign: "center"}]}>{handleTime(el.fact_driving_time)}</Text>
                                    </View>
                                </DataTable.Cell>
                                <DataTable.Cell style={{flex: 3}}><Text
                                    style={themeColor === 'light' ? themeStyles.textLight : themeStyles.textDark}>{`-${el.plan_driving_hours}`}</Text></DataTable.Cell>
                                <DataTable.Cell style={{flex: 5}}><Text
                                    style={{color: el.type_study_hour_color}}>{el.type_study_hour_name}</Text></DataTable.Cell>
                            </DataTable.Row>
                        </View>

                    ))}
                </DataTable>
                {history.data.map((el, key) => <View key={key}></View>)}
            </ScrollView>
        </SafeAreaView>
    );
};

export default LessonsHistory;