import React, {useState} from 'react';
import {ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {Link, useLocalSearchParams} from "expo-router";
import {AntDesign} from "@expo/vector-icons";
import {useSelector} from "react-redux";
import {selectColor} from "../../../store/reducers/themeSlice";
import OrderedSlotSelect from "../../../../components/CustomSelect/OrderedSlotSelect";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
    useGetHoursTypesQuery,
    useGetTrainingPlacesQuery,
    useGetTrainingVehiclesQuery
} from "../../../services/modalDataEndpoints";
import InstructorSelect from "../../../../components/CustomSelect/InstructorSelect";
import BackLink from "../../../../components/BackLink/BackLink";
import themeStyles from "../../../../styles/styles";
import {TextInput} from "react-native-paper";
import GradientButton from "../../../../components/GradientButton/GradientButton";
import ProfileLoader from "../../../../components/CustomLoaders/ProfileLoader";
import {useGetPracticeScheduleByIdQuery} from "../../../services/scheduleEndpoints";
import moment from "moment";
import {months, weekDays} from "../../../constants";
import {SafeAreaView} from "react-native-safe-area-context";

const OrderedSlot = () => {
    let themeColor = useSelector(selectColor)
    const {id} = useLocalSearchParams()
    let slotId = String(id).split('_')[0]
    const [driveType, setDriveType] = useState<string>('');
    const [transport, setTransport] = useState<string>('');
    const [ground, setGround] = useState<string>('');
    const {data: hours} = useGetHoursTypesQuery();
    const {data: vehicles} = useGetTrainingVehiclesQuery();
    const {data: grounds} = useGetTrainingPlacesQuery();
    const {data: slot} = useGetPracticeScheduleByIdQuery(parseInt(slotId))

    if (!hours || !vehicles || !grounds || !slot) {
        return <ProfileLoader/>
    }

    let startDate = moment(slot.data.plan_start_date)

    return (
        <SafeAreaView style={[{
            height: '100%',
            flex: 1
        }, themeColor === 'light' ? themeStyles.backgroundLight : themeStyles.backgroundDark]}>
            <BackLink link={'/instructorschedule'} label={'Слот занят'}/>
            <ScrollView style={{flex: 2}}>
                <View style={{rowGap: 15, alignItems: 'center'}}>
                    <View style={{alignItems: 'center'}}>
                        <Text style={[{
                            fontWeight: 'bold',
                            fontSize: 22
                        }, themeColor === 'light' ? themeStyles.textLight : themeStyles.textDark]}>{startDate.format("HH:mm")} - {moment(slot.data.plan_end_date).format("HH:mm")}</Text>
                        <Text
                            style={[{fontSize: 16}, themeColor === 'light' ? themeStyles.textLight : themeStyles.textLightGrey]}>{startDate.format("DD ")}
                            {months[startDate.get('month')]}, {weekDays[startDate.get("day") - 1]}</Text>
                    </View>
                    <Link asChild href={'/students/123_1'}>
                        <TouchableOpacity style={styles.userWrapper}>
                            <View
                                style={{backgroundColor: '#5e5e5e', height: 100, width: 100, borderRadius: 50}}></View>
                            <View style={{rowGap: 10}}>
                                <Text numberOfLines={1}
                                      style={[styles.profileField, themeColor === 'light' ? themeStyles.textLight : themeStyles.textDark]}>{slot.data.student_name}</Text>
                                <View style={{flexDirection: 'column', columnGap: 10}}>
                                    <View>
                                        <Text
                                            style={themeColor === 'light' ? themeStyles.textLight : themeStyles.textLightGrey}>Группа</Text>
                                        <Text
                                            style={[styles.profileField, themeColor === 'light' ? themeStyles.textLight : themeStyles.textDark]}>{slot.data.tr_group_number || "Не указана"}</Text>
                                    </View>
                                </View>
                                <View style={{flexDirection: 'row', alignItems: 'center', columnGap: 5}}>
                                    <FontAwesome name="drivers-license-o" size={24} color="#e34d4d"/>
                                    <Text
                                        style={[{fontSize: 16}, themeColor === 'light' ? themeStyles.textLight : themeStyles.textDark]}>{slot.data.fact_master_name}</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    </Link>
                    <InstructorSelect student={slot} hours={hours} grounds={grounds} ground={ground} setGround={setGround}
                                      driveType={driveType} setDriveType={setDriveType} setTransport={setTransport}
                                      transport={transport} vehicles={vehicles}/>
                    <TextInput mode="outlined"
                               placeholder={"Примечание для курсантов"}
                               placeholderTextColor={'lightgrey'}
                               value={slot.data.note_for_student}
                               activeOutlineColor={themeColor === 'light' ? 'black' : 'white'}
                               activeUnderlineColor={themeColor === 'light' ? 'black' : 'white'}
                               textColor={themeColor === 'light' ? 'black' : 'white'}
                               style={[{width: '90%'}, themeColor === 'light' ? themeStyles.textInputLight : themeStyles.textInputDark]}/>
                    <Link asChild href={'/instructorschedule/orderedslot/reviews/1'}>
                        <TouchableOpacity style={{width: '100%', alignSelf: 'center', marginBottom: 90}}>
                            <GradientButton text={'Оценить занятие'} colors={['#7a1818', '#771b1b', 'red']}
                                            icon={<AntDesign name="star" size={24} color="#e7c20a"/>}/>
                        </TouchableOpacity>
                    </Link>
                    <OrderedSlotSelect/>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    signButton: {
        borderStyle: 'dashed',
        borderWidth: 1,
        borderRadius: 4,
        width: '90%',
        padding: 25,
        alignItems: 'center'
    },
    selectIcon: {
        paddingBottom: 5,
        borderRadius: 4,
        height: 30,
        width: 30,
        alignItems: 'center'
    },
    profileField: {
        fontSize: 20,
    },
    userWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        columnGap: 15,
        width: '90%'
    },
    marksBtnWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#e34d4d',
        borderRadius: 4,
        width: '90%',
        padding: 10,
        justifyContent: 'space-between',
        marginBottom: 90
    }
});

export default OrderedSlot;