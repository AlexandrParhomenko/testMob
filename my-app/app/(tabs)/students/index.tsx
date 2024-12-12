import React, {useState} from 'react';
import {RefreshControl, ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {useSelector} from "react-redux";
import {selectColor} from "../../store/reducers/themeSlice";
import {Searchbar} from "react-native-paper";
import {Link} from "expo-router";
import {LinearGradient} from "expo-linear-gradient";
import NotificationHeader from "../../../components/NotificationHeader/NotificationHeader";
import themeStyles from "../../../styles/styles";
import {SafeAreaView} from "react-native-safe-area-context";
import {useGetContractsByMasterIdQuery} from "../../services/contractEndpoints";
import {selectPickedAccount} from "../../store/reducers/authSlice";
import ListPagesLoader from "../../../components/CustomLoaders/ListPagesLoader";
import moment from "moment";

const Index = () => {
    const account = useSelector(selectPickedAccount)
    const {data: students, isLoading, refetch} = useGetContractsByMasterIdQuery(account.id_reg)
    let themeColor = useSelector(selectColor)
    const [value, setValue] = useState<string>('')

    if (!students) return <ListPagesLoader/>

    return (
        <SafeAreaView style={[{flex: 1}, themeColor === 'light' ? themeStyles.backgroundLight : themeStyles.backgroundDark]}>
            <NotificationHeader/>
            <ScrollView refreshControl={<RefreshControl refreshing={isLoading} onRefresh={refetch}/>}>
                <Searchbar
                    placeholder="Поиск"
                    style={[{width: '90%', borderRadius: 5}, themeColor === 'light' ? {alignSelf: 'center'} : {backgroundColor: '#656565'}]}
                    iconColor={themeColor === 'light' ? 'black' : '#bebebe'}
                    onChangeText={(e) => setValue(e)}
                    value={value}
                    placeholderTextColor={themeColor === 'light' ? 'black' : '#bebebe'}
                    theme={{colors: {onSurfaceVariant: themeColor === 'light' ? 'black' : '#bebebe'}}}
                />
                {students.data.length === 0 ? <Text style={[themeStyles.regularFont, {color: themeColor === 'light' ? 'black' : 'white', alignSelf: "center", paddingTop: "10%"}]}>Нет привязанных студентов</Text> : <ScrollView overScrollMode={'never'} style={{rowGap: 5, width: '100%', flex: 2}}>
                    {students.data.map((el, idx) => <Link key={idx} asChild href={`/students/${el.contract_id}`}>
                        <TouchableOpacity style={{width: '90%', alignSelf: 'center'}}>
                            <LinearGradient colors={["#ececec", "#b1eec6", "#92e8ae"]} style={styles.driveStoryBox}>
                                <View style={{width: '50%'}}>
                                    <View style={{alignItems: 'center', columnGap: 5, flexDirection: 'row'}}>
                                        <View style={styles.indicator}></View>
                                        <Text style={{color: '#3d3d3d'}}
                                              numberOfLines={1}>{el.student_name_from_leads}</Text>
                                    </View>
                                    <Text style={{color: '#5d5d5d'}}>{el.tr_group_number}</Text>
                                    <Text style={{color: '#5d5d5d'}}>Обучение до {moment(el.end_date).format("DD.MM.YYYY")}</Text>
                                </View>
                                <View style={{flex: 4, alignItems: 'center'}}>
                                    <Text style={{fontSize: 11, color: '#5d5d5d'}}>Остаток / Всего / Запись</Text>
                                    <Text style={{fontSize: 25}}>46 / 47 / 0</Text>
                                </View>
                            </LinearGradient>
                        </TouchableOpacity>
                    </Link>)}
                </ScrollView>}
            </ScrollView>
        </SafeAreaView>

    );
};

const styles = StyleSheet.create({
    leadBarWrapper: {
        flexDirection: 'row',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: 'black',
        justifyContent: 'center',
        padding: 10,
    },
    indicator: {
        height: 10,
        width: 10,
        backgroundColor: 'green',
        borderRadius: 50,
    },
    container: {
        alignItems: 'center',
        paddingTop: 10,
        rowGap: 20,
        flex: 2,
        width: '100%'
    },
    branchWrapper: {
        color: '#e34d4d'
    },
    driveStoryBox: {
        width: '100%',
        borderRadius: 5,
        backgroundColor: 'lightgrey',
        alignSelf: 'center',
        marginVertical: 5,
        alignItems: 'flex-start',
        padding: 20,
        flexDirection: 'row',
    }
});

export default Index;