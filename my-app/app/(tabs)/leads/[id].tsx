import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Linking, ActivityIndicator} from "react-native";
import {Link, useLocalSearchParams} from "expo-router";
import {AntDesign} from "@expo/vector-icons";
import {useGetUserQuery} from "../../services/userEndpoints";
import {useGetContractsByLeadIdQuery} from "../../services/contractEndpoints";
import {DataTable} from "react-native-paper";
import moment from "moment";
import {useSelector} from "react-redux";
import {selectColor} from "../../store/reducers/themeSlice";
import themeStyles from "../../../styles/styles";
import BackLink from "../../../components/BackLink/BackLink";
import {SafeAreaView} from "react-native-safe-area-context";

const leadPage = () => {
    const {id} = useLocalSearchParams()
    const {data} = useGetUserQuery(parseInt(id as string));
    const {data: contracts} = useGetContractsByLeadIdQuery(parseInt(id as string));
    let themeColor = useSelector(selectColor)

    if (!data) {
        return <ActivityIndicator color={'#e34d4d'} style={{paddingTop: '50%'}} size="large"/>
    }

    return (
        <SafeAreaView style={[themeColor === 'light' ? themeStyles.backgroundLight : themeStyles.backgroundDark, {flex: 1}]}>
            <BackLink link={'/leads'} label={'Назад'}/>
            <Text style={[themeStyles.regularFont, {
                paddingLeft: 20,
                alignSelf: 'flex-start',
                paddingTop: 20
            }, themeColor === 'light' ? themeStyles.textLight : themeStyles.textDark]}>Данные лида:</Text>
            <View style={{paddingLeft: 25, rowGap: 10, paddingVertical: 20, alignItems: 'flex-start'}}>
                <Text
                    style={[styles.tableFont, themeColor === 'light' ? themeStyles.textLight : themeStyles.textDark]}>ФИО: {data.data.sur_name} {data.data.name} {data.data.middle_name}</Text>
                <View style={{flexDirection: 'row', alignItems: 'center', columnGap: 5}}>
                    <Text style={[styles.tableFont, themeColor === 'light' ? themeStyles.textLight : themeStyles.textDark]}>Основной
                        телефон: {data.data.phone1}</Text>
                    <TouchableOpacity onPress={() => Linking.openURL(`tel:${data.data.phone1}`)}><AntDesign name="phone"
                                                                                                            size={26}
                                                                                                            color={themeColor === 'light' ? 'black' : 'lightgrey'}/></TouchableOpacity>
                </View>
                <View style={{flexDirection: 'row', alignItems: 'center', columnGap: 5}}>
                    <Text style={[styles.tableFont, themeColor === 'light' ? themeStyles.textLight : themeStyles.textDark]}>Дополнительный
                        телефон: {data.data.phone2}</Text>
                    <TouchableOpacity onPress={() => Linking.openURL(`tel:${data.data.phone2}`)}><AntDesign name="phone"
                                                                                                            size={26}
                                                                                                            color={themeColor === 'light' ? 'black' : 'lightgrey'}/></TouchableOpacity>
                </View>
                <Text style={[styles.tableFont, themeColor === 'light' ? themeStyles.textLight : themeStyles.textDark]}>Страница в
                    соцсети: {data.data.soc_networks}</Text>
                <Text
                    style={[styles.tableFont, themeColor === 'light' ? themeStyles.textLight : themeStyles.textDark]}>E-mail: {data.data.email_address}</Text>
                <Text style={[styles.tableFont, themeColor === 'light' ? themeStyles.textLight : themeStyles.textDark]}>Канал
                    привлечения клиента: {data.data.channel_name}</Text>
                <Text style={[styles.tableFont, themeColor === 'light' ? themeStyles.textLight : themeStyles.textDark]}>Желаемая
                    дата
                    начала: {moment(data.data.preferred_date).format('DD.MM.YYYY')}</Text>
                <Text
                    style={[styles.tableFont, themeColor === 'light' ? themeStyles.textLight : themeStyles.textDark]}>АКПП: {data.data.preferred_akpp ? 'Да' : 'Нет'}</Text>
            </View>
            <Text style={[themeStyles.regularFont, {
                paddingLeft: 20,
                alignSelf: 'flex-start'
            }, themeColor === 'light' ? themeStyles.textLight : themeStyles.textDark]}>Договоры лида:</Text>
            <DataTable>
                <DataTable.Header>
                    <DataTable.Title style={{flex: 2}}><Text style={themeColor === 'light' ? themeStyles.textLight : themeStyles.textDark}>Группа</Text></DataTable.Title>
                    <DataTable.Title style={{flex: 3}}><Text style={themeColor === 'light' ? themeStyles.textLight : themeStyles.textDark}>Филиал</Text></DataTable.Title>
                    <DataTable.Title style={{flex: 5}}><Text style={themeColor === 'light' ? themeStyles.textLight : themeStyles.textDark}>ФИО курсанта</Text></DataTable.Title>
                </DataTable.Header>
                {contracts && contracts.data.map((item) => (
                    <Link asChild href={`/contracts/${item.contract_id}`}>
                        <DataTable.Row rippleColor={'white'} key={item.lead_id}>
                            <DataTable.Cell style={{flex: 2}}><Text
                                style={themeColor === 'light' ? themeStyles.textLight : themeStyles.textDark}>{item.tr_group_number}</Text></DataTable.Cell>
                            <DataTable.Cell style={{flex: 3}}><Text
                                style={themeColor === 'light' ? themeStyles.textLight : themeStyles.textDark}>{item.branch_name}</Text></DataTable.Cell>
                            <DataTable.Cell style={{flex: 5}}><Text
                                style={themeColor === 'light' ? themeStyles.textLight : themeStyles.textDark}>{item.student_name_from_leads}</Text></DataTable.Cell>
                        </DataTable.Row>
                    </Link>

                ))}
            </DataTable>

        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    tableFont: {
        textAlign: 'center',
        fontFamily: 'BebasNeue',
        fontSize: 18
    },

});

export default leadPage;