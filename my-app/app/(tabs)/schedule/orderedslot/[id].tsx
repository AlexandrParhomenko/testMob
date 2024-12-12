import React, {useState} from 'react';
import {ActivityIndicator, Linking, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {Link, useLocalSearchParams} from "expo-router";
import {AntDesign, FontAwesome5} from "@expo/vector-icons";
import {useSelector} from "react-redux";
import {selectColor} from "../../../store/reducers/themeSlice";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import BackLink from "../../../../components/BackLink/BackLink";
import themeStyles from "../../../../styles/styles";
import {Divider} from "react-native-paper";
import CarNumber from "../../../../components/CarNumber/CarNumber";
import GradientButton from "../../../../components/GradientButton/GradientButton";
import CancelStudentSignDialog from "../../../../components/AlertDialog/CancelStudentSignDialog";
import {useGetPracticeScheduleByIdQuery} from "../../../services/scheduleEndpoints";
import moment from "moment";
import {getAbbreName} from "../../../../constants/functions";
import {months, weekDays} from "../../../constants";
import Reviews from "../../../../components/Reviews";
import {stars} from "../../../../constants";
import {SafeAreaView} from "react-native-safe-area-context";

const OrderedSlot = () => {
    let themeColor = useSelector(selectColor)
    const {id} = useLocalSearchParams()
    let slotId = String(id).split('_')[0]
    const [isCancel, setIsCancel] = useState<boolean>(false)
    const [showReviews, setShowReviews] = useState<boolean>(false)
    const {data: pickedSlot} = useGetPracticeScheduleByIdQuery(parseInt(slotId))

    if (!pickedSlot) return <ActivityIndicator color={'#e34d4d'} style={{paddingTop: '50%'}} size="large"/>

    let vehicleData = pickedSlot.data.training_vehicle.split(" ")
    let number = vehicleData[vehicleData.length - 1].match(/\D\d\d\d\D\D/) || ""
    let region = vehicleData[vehicleData.length - 1].match(/\d{2,}/g) || ""
    let startDate = moment(pickedSlot.data.plan_start_date)

    return (
        <SafeAreaView style={[{
            height: '100%',
            flex: 1
        }, themeColor === 'light' ? themeStyles.backgroundLight : themeStyles.backgroundDark]}>
            <BackLink link={'/schedule'} label={'Мое занятие'}/>
            {showReviews && <Reviews showReviews={showReviews} setShowReviews={setShowReviews} slot={pickedSlot}/>}
            <CancelStudentSignDialog slot={pickedSlot} isCancel={isCancel} setIsCancel={setIsCancel}/>
            <View style={{paddingLeft: 25, rowGap: 10, paddingVertical: 20, alignItems: 'flex-start'}}>
                <Text
                    style={[styles.tableFont, themeColor === 'light' ? themeStyles.textLight : themeStyles.textDark]}>{startDate.format("DD ")}
                    {months[parseInt(startDate.format("MM")) - 1]}, {weekDays[startDate.day() - 1]}, <Text
                        style={[styles.tableFont, {color: '#1a800c'}]}>{startDate.format("HH:mm")}</Text></Text>
                <Text style={[styles.tableFont, {color: '#1a800c'}]}>{pickedSlot.data.type_study_hour_name}</Text>
                {moment(pickedSlot.data.plan_end_date) > moment() ? <Text style={[styles.tableFont, {color: '#1a800c'}]}>Вы записаны на это занятие</Text> :
                    <Text style={[styles.tableFont, {
                    color: '#c0c0c0',
                }]}>Занятие проведено</Text>}
            </View>
            {pickedSlot.data.student_feedback !== "" ? <View style={{flexDirection: 'row', columnGap: 10, alignItems: "center", paddingLeft: 25, paddingBottom: 10}}>
                <Text style={[styles.tableFont, themeColor === 'light' ? themeStyles.textLight : themeStyles.textDark]}>Моя оценка занятия</Text>
                {stars.map(el => el <= parseInt(pickedSlot.data.student_feedback.split("//")[1]) ?
                    <AntDesign key={el} name="star" size={34}
                               color="#FDCC0D"/>
                    :
                    <AntDesign key={el} name="staro" size={34}
                               color="#FDCC0D"/>)}
            </View> : <TouchableOpacity onPress={() => setShowReviews(true)}
                               style={{width: '60%', alignSelf: 'center', paddingBottom: 10}}>
                <GradientButton text={'Оценить занятие'} colors={['#7a1818', '#771b1b', 'red']}
                                icon={<AntDesign name="star" size={24} color="#e7c20a"/>}/>
            </TouchableOpacity>}
            <Divider/>
            <View style={{paddingVertical: 10, paddingHorizontal: 10, flexDirection: 'row'}}>
                <View style={{height: 150, width: 120, alignItems: 'center', justifyContent: 'center'}}>
                    <Text style={themeColor === 'light' ? themeStyles.textLight : themeStyles.textDark}>нет фото</Text>
                </View>
                <View style={{alignItems: 'flex-start', rowGap: 5}}>
                    <Text style={{color: 'darkgrey'}}>Инструктор</Text>
                    <Text
                        style={[themeStyles.regularFont, themeColor === 'light' ? themeStyles.textLight : themeStyles.textDark]}>{getAbbreName(pickedSlot.data.plan_master_name)}</Text>
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
                    <Text
                        style={[themeStyles.regularFont, themeColor === 'light' ? themeStyles.textLight : themeStyles.textDark]}>{`${vehicleData[0]} ${vehicleData[1]}`}</Text>
                    <CarNumber number={number[0]} region={region[region.length - 1]}/>
                </View>
                <View style={{height: 150, width: 120, alignItems: 'center', justifyContent: 'center'}}>
                    <Text style={themeColor === 'light' ? themeStyles.textLight : themeStyles.textDark}>нет фото</Text>
                </View>
            </View>
            <Divider/>
            <TouchableOpacity onPress={() => setIsCancel(true)}
                              style={{width: '50%', alignSelf: 'center', paddingTop: 10}}>
                <GradientButton colors={['#7a1818', '#771b1b', 'red']} text={'Отменить запись'}/>
            </TouchableOpacity>
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
        backgroundColor: '#c92e2e',
        alignSelf: 'center',
        borderRadius: 5,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        width: '60%',
        marginTop: 20
    },
    marksBtnWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#e34d4d',
        borderRadius: 4,
        padding: 10,
        justifyContent: 'space-between',
        alignSelf: 'center',
        columnGap: 10
    },
    enterButton: {
        width: '90%',
        alignSelf: 'center',
        borderRadius: 40,
        backgroundColor: '#e30000',
        padding: 10,
        alignItems: 'center',
    },
});

export default OrderedSlot;