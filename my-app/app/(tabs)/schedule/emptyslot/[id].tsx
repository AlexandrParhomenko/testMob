import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Linking, ActivityIndicator} from "react-native";
import {Link, router, useLocalSearchParams} from "expo-router";
import {FontAwesome5} from "@expo/vector-icons";
import {Divider} from "react-native-paper";
import {useSelector} from "react-redux";
import {selectColor} from "../../../store/reducers/themeSlice";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import CarNumber from "../../../../components/CarNumber/CarNumber";
import BackLink from "../../../../components/BackLink/BackLink";
import themeStyles from "../../../../styles/styles";
import moment from "moment/moment";
import {
    useGetEmptyPracticeScheduleByIdQuery, useSetPracticeScheduleMutation,
} from "../../../services/scheduleEndpoints";
import {months, weekDays} from "../../../constants";
import {getAbbreName} from "../../../../constants/functions";
import {PracticePostType} from "../../../types/types";
import {selectPickedAccount} from "../../../store/reducers/authSlice";
import {useGetContractQuery} from "../../../services/contractEndpoints";
import {SafeAreaView} from "react-native-safe-area-context";

const getLessonSignPage = () => {
    let themeColor = useSelector(selectColor)
    const {id} = useLocalSearchParams()
    let slotId = String(id)
    const account = useSelector(selectPickedAccount)
    const [signSlot] = useSetPracticeScheduleMutation()
    const {data: pickedSlot} = useGetEmptyPracticeScheduleByIdQuery(parseInt(slotId))
    const {data: contract} = useGetContractQuery(account.id_reg)

    if (!pickedSlot || !contract) return <ActivityIndicator color={'#e34d4d'} style={{paddingTop: '50%'}} size="large"/>

    let vehicleData = pickedSlot.data.training_vehicle.split(" ")
    let number = vehicleData[vehicleData.length - 2]
    let region = vehicleData[vehicleData.length - 1]
    let startDate = moment(pickedSlot.data.start_date)

    const signStudentToSlot = async () => {
        const body: PracticePostType = {
            id: 0,
            post: {
                dr_class_create_date: moment().format('YYYY-MM-DD HH:mm'),
                plan_start_date: moment(pickedSlot.data.start_date).format('YYYY-MM-DD HH:mm'),
                fact_start_date: moment(pickedSlot.data.start_date).format('YYYY-MM-DD HH:mm'),
                plan_end_date: moment(pickedSlot.data.end_date).format('YYYY-MM-DD HH:mm'),
                fact_end_date: moment(pickedSlot.data.end_date).format('YYYY-MM-DD HH:mm'),
                student_feedback: "",
                note_for_student: pickedSlot.data.notes,
                note_for_adm: "",
                fk_emp_id: pickedSlot.data.fk_slot_create_emp_id,
                fk_plan_master_id: pickedSlot.data.plan_master_id,
                fk_fact_master_id: pickedSlot.data.plan_master_id,
                fk_branch_id: pickedSlot.data.fk_branch_id || pickedSlot.data.branch_id,
                fk_dr_school_id: pickedSlot.data.fk_dr_school_id || pickedSlot.data.dr_school_id,
                fk_dr_session_id: pickedSlot.data.dr_session_id,
                fk_contract_id: account.id_reg,
            }
        };
        if (contract.data.hours_balance > pickedSlot.data.amount) {
            await signSlot(body)
            router.replace('/schedule');
        } else router.replace('/drive');
    }

    return (
        <SafeAreaView style={[themeColor === 'light' ? themeStyles.backgroundLight : themeStyles.backgroundDark, {flex: 1}]}>
            <BackLink link={'/schedule'} label={'Свободный слот'}/>
            <View style={{paddingLeft: 25, rowGap: 10, paddingVertical: 20, alignItems: 'flex-start'}}>
                <Text style={[styles.tableFont, themeColor === 'light' ? themeStyles.textLight : themeStyles.textDark]}>{startDate.format("DD ")}
                    {months[parseInt(startDate.format("MM")) - 1]}, {weekDays[startDate.day() - 1]}, <Text style={[styles.tableFont, {color: '#1a800c'}]}>{startDate.format("HH:mm")}</Text></Text>
                <Text style={[styles.tableFont, {color: '#1a800c'}]}>{pickedSlot.data.type_study_hour_name}</Text>
                <TouchableOpacity onPress={signStudentToSlot} style={styles.signBtn}>
                    <Text style={[styles.tableFont, {
                        color: 'white',
                    }]}>Записаться</Text>
                </TouchableOpacity>
            </View>
            <Divider/>
            <View style={{paddingVertical: 10, paddingHorizontal: 10, flexDirection: 'row'}}>
                <View style={{height: 150, width: 120, alignItems: 'center', justifyContent: 'center'}}>
                    <Text style={themeColor === 'light' ? themeStyles.textLight : themeStyles.textDark}>нет фото</Text>
                </View>
                <View style={{alignItems: 'flex-start', rowGap: 5}}>
                    <Text style={{color: 'darkgrey'}}>Инструктор</Text>
                    <Text style={[themeStyles.regularFont, themeColor === 'light' ? themeStyles.textLight : themeStyles.textDark]}>{getAbbreName(pickedSlot.data.plan_master_name)}</Text>
                    <View style={{flexDirection: 'row', columnGap: 20, alignItems: 'center', paddingTop: 20}}>
                        <TouchableOpacity><FontAwesome onPress={() => Linking.openURL(`tel:88003332173`)}
                                                       name="phone-square" size={41} color="green"/></TouchableOpacity>
                        <Link asChild href={'https://wa.me/123124'}><TouchableOpacity><FontAwesome5
                            name="whatsapp-square" size={40}
                            color="green"/></TouchableOpacity></Link>
                    </View>
                </View>
            </View>
            <Divider/>
            <View style={{paddingVertical: 10, paddingHorizontal: 30, flexDirection: 'row'}}>
                <View style={{alignItems: 'flex-start', rowGap: 5, width: '50%'}}>
                    <Text style={{color: 'darkgrey'}}>Учебное ТС</Text>
                    <Text style={[themeStyles.regularFont, themeColor === 'light' ? themeStyles.textLight : themeStyles.textDark]}>{`${vehicleData[0]} ${vehicleData[1]}`}</Text>
                    <CarNumber number={number} region={region[region.length - 1]}/>
                </View>
                <View style={{height: 150, width: 120, alignItems: 'center', justifyContent: 'center'}}>
                    <Text style={themeColor === 'light' ? themeStyles.textLight : themeStyles.textDark}>нет фото</Text>
                </View>
            </View>
            <Divider/>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    tableFont: {
        textAlign: 'center',
        fontFamily: 'BebasNeue',
        fontSize: 18
    },
    signBtn: {
        backgroundColor: '#1a800c',
        alignSelf: 'center',
        borderRadius: 5,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        width: '60%',
        marginTop: 20
    }
});

export default getLessonSignPage;