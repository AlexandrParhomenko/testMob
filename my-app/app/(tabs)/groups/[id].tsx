import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from "react-native";
import {Link, useLocalSearchParams} from "expo-router";
import {useGetContractsByGroupNameQuery} from "../../services/contractEndpoints";
import moment from "moment/moment";
import {LinearGradient} from "expo-linear-gradient";
import {useSelector} from "react-redux";
import {selectColor} from "../../store/reducers/themeSlice";
import BackLink from "../../../components/BackLink/BackLink";
import themeStyles from "../../../styles/styles";
import ListPagesLoader from "../../../components/CustomLoaders/ListPagesLoader";
import {SafeAreaView} from "react-native-safe-area-context";


const contractPage = () => {
    const {id} = useLocalSearchParams()
    const groupId = String(id).split('_')[0]
    const groupName = String(id).split('_')[1]
    const {data} = useGetContractsByGroupNameQuery(parseInt(groupId as string));
    let themeColor = useSelector(selectColor)

    if (!data) {
        return  <ListPagesLoader/>
    }

    const formatName = (name: string) => {
        let split = name.split(' ')
        return `${split[0]} ${split[1][0]}. ${split[2][0]}.`
    }

    return (
        <SafeAreaView style={[themeColor === 'light' ? themeStyles.backgroundLight : themeStyles.backgroundDark, {flex: 1}]}>
            <BackLink link={'/groups'} label={'Назад'}/>
            <View style={{paddingTop: 20, alignItems: 'center'}}>
                <Text
                    style={[themeStyles.regularFont, themeColor === 'light' ? themeStyles.textLight : themeStyles.textDark]}>Группа {groupName}</Text>
                {data.data.length === 0 ? <Text style={[themeStyles.regularFont, {
                    alignSelf: 'center',
                    paddingTop: '30%'
                }, themeColor === 'light' ? themeStyles.textLight : themeStyles.textDark]}>Курсантов
                    нет</Text> : data.data.map(el => <Link asChild key={el.contract_number}
                                                           href={`/contracts/${el.contract_id}_${el.lead_id}`}>
                    <TouchableOpacity style={{width: '90%', alignSelf: 'center'}}>
                        <LinearGradient colors={["#e7e7e7", "#b2b2b2", "#a9a9a9"]} style={styles.driveStoryBox}>
                            <Text>{formatName(el.student_name_from_leads)}</Text>
                            <View style={{
                                width: 100,
                                alignItems: 'center',
                                backgroundColor: el.branch_color,
                                paddingVertical: 3,
                                paddingHorizontal: 5,
                                borderRadius: 3
                            }}>
                                <Text numberOfLines={1} style={{color: 'white'}}>{el.branch_name}</Text>
                            </View>
                            <Text numberOfLines={1}
                                  style={{flex: 1}}>{moment(el.start_date).format('DD.MM.YYYY')}</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </Link>)}
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
    driveStoryBox: {
        width: '100%',
        borderRadius: 15,
        backgroundColor: 'lightgrey',
        alignSelf: 'center',
        marginVertical: 5,
        alignItems: 'center',
        paddingVertical: 20,
        paddingHorizontal: 10,
        flexDirection: 'row',
        columnGap: 10
    }


});

export default contractPage;