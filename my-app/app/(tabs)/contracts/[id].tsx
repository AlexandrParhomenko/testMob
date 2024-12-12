import React from 'react';
import {View, Text, StyleSheet, ActivityIndicator} from "react-native";
import {Link, useLocalSearchParams} from "expo-router";
import {useGetContractQuery} from "../../services/contractEndpoints";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import moment from "moment/moment";
import {useSelector} from "react-redux";
import {selectColor} from "../../store/reducers/themeSlice";
import BackLink from "../../../components/BackLink/BackLink";
import themeStyles from "../../../styles/styles";
import {SafeAreaView} from "react-native-safe-area-context";

const contractPage = () => {
    const {id} = useLocalSearchParams()
    let contractId = String(id).split('_')[0]
    let themeColor = useSelector(selectColor)
    const {data} = useGetContractQuery(parseInt(contractId));

    if (!data) {
        return <ActivityIndicator color={'#e34d4d'} style={{paddingTop: '50%'}} size="large"/>
    }

    return (
        <SafeAreaView style={[themeColor === 'light' ? themeStyles.backgroundLight : themeStyles.backgroundDark, {flex: 1}]}>
            <BackLink link={'/contracts'} label={'Назад'}/>
            <View style={{alignItems: 'flex-start', flexDirection: 'row', justifyContent: 'space-between'}}>
                <View style={{alignItems: 'flex-start', paddingLeft: 30, rowGap: 10, paddingTop: 20, flex: 2}}>
                    <Text
                        style={[styles.tableFont, {marginLeft: -10}, themeColor === 'light' ? themeStyles.textLight : themeStyles.textDark]}>Данные
                        договора:</Text>
                    <Text
                        style={[styles.tableFont, themeColor === 'light' ? themeStyles.textLight : themeStyles.textDark]}>ФИО: {data.data.student_name_from_leads}</Text>
                    <Text style={[styles.tableFont, themeColor === 'light' ? themeStyles.textLight : themeStyles.textDark]}>Номер
                        договора: {data.data.contract_number}</Text>
                    <Text style={[styles.tableFont, themeColor === 'light' ? themeStyles.textLight : themeStyles.textDark]}>Дата
                        начала
                        договора: {moment(data.data.start_date).format('DD.MM.YYYY')}</Text>
                    <Text style={[styles.tableFont, themeColor === 'light' ? themeStyles.textLight : themeStyles.textDark]}>Дата
                        окончания
                        договора: {data.data.end_date !== "None" ? moment(data.data.end_date).format('DD.MM.YYYY') : 'Нет'}</Text>
                    <Text style={[styles.tableFont, themeColor === 'light' ? themeStyles.textLight : themeStyles.textDark]}>Учебный
                        класс: {data.data.branch_name}</Text>
                    <Text style={[styles.tableFont, themeColor === 'light' ? themeStyles.textLight : themeStyles.textDark]}>Дата
                        рождения: {moment(data.data.date_of_birth).format('DD.MM.YYYY')}</Text>
                    <Text
                        style={[styles.tableFont, themeColor === 'light' ? themeStyles.textLight : themeStyles.textDark]}>Возраст: {data.data.age}</Text>
                    <Text
                        style={[styles.tableFont, themeColor === 'light' ? themeStyles.textLight : themeStyles.textDark]}>Гражданство: {data.data.citizenship}</Text>
                    <Text style={[styles.tableFont, themeColor === 'light' ? themeStyles.textLight : themeStyles.textDark]}>Регион
                        рождения: {data.data.region_of_birth}</Text>
                    <Text style={[styles.tableFont, themeColor === 'light' ? themeStyles.textLight : themeStyles.textDark]}>Место
                        рождения: {data.data.place_of_birth}</Text>
                    <Text style={[styles.tableFont, themeColor === 'light' ? themeStyles.textLight : themeStyles.textDark]}>Регион
                        рождения: {data.data.reg_address_region}</Text>
                    <Text style={[styles.tableFont, themeColor === 'light' ? themeStyles.textLight : themeStyles.textDark]}>Дата
                        регистрации: {data.data.reg_date !== 'None' ? moment(data.data.reg_date).format('DD.MM.YYYY') : 'Нет'}</Text>
                    <Text
                        style={[styles.tableFont, themeColor === 'light' ? themeStyles.textLight : themeStyles.textDark]}>ИНН: {data.data.inn || '-'}</Text>
                    <Text
                        style={[styles.tableFont, themeColor === 'light' ? themeStyles.textLight : themeStyles.textDark]}>СНИЛС: {data.data.snils || '-'}</Text>
                </View>
                <Link href={`/leads/${data.data.lead_id}`}>
                    <View style={{alignItems: 'center', width: 100, flex: 3}}>
                        <MaterialCommunityIcons name="human-greeting-variant" size={24}
                                                color={themeColor === 'light' ? 'black' : 'white'}/>
                        <Text
                            style={[{textAlign: 'center'}, themeColor === 'light' ? themeStyles.textLight : themeStyles.textDark]}>На
                            страницу лида</Text>
                    </View>
                </Link>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
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
});

export default contractPage;