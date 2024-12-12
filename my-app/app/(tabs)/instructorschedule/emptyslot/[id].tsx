import React, {useState} from 'react';
import {ActivityIndicator, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {useLocalSearchParams} from "expo-router";
import {useSelector} from "react-redux";
import {selectColor} from "../../../store/reducers/themeSlice";
import EmptySlotSelect from "../../../../components/CustomSelect/EmptySlotSelect";
import SignStudentComponent from "../../../../components/SignStudentComponent/SignStudentComponent";
import {
    useGetHoursTypesQuery,
    useGetTrainingPlacesQuery,
    useGetTrainingVehiclesQuery
} from "../../../services/modalDataEndpoints";
import InstructorSelect from "../../../../components/CustomSelect/InstructorSelect";
import BackLink from "../../../../components/BackLink/BackLink";
import themeStyles from "../../../../styles/styles";
import {TextInput} from "react-native-paper";
import {
    useGetEmptyPracticeScheduleByIdQuery,
} from "../../../services/scheduleEndpoints";
import moment from "moment";
import {months, weekDays} from "../../../constants";
import {SafeAreaView} from "react-native-safe-area-context";

const EmptySlot = () => {
    let themeColor = useSelector(selectColor)
    const {id} = useLocalSearchParams()
    let slotId = String(id).split('_')[0]
    const [driveType, setDriveType] = useState<string>('');
    const [transport, setTransport] = useState<string>('');
    const [ground, setGround] = useState<string>('');
    const [isSignStudent, setIsSignStudent] = useState<boolean>(false);
    const {data: hours} = useGetHoursTypesQuery();
    const {data: vehicles} = useGetTrainingVehiclesQuery();
    const {data: grounds} = useGetTrainingPlacesQuery();
    const {data: slot} = useGetEmptyPracticeScheduleByIdQuery(parseInt(slotId))

    if (!hours || !vehicles || !grounds || !slot) {
        return <ActivityIndicator color={'#e34d4d'} style={{paddingTop: '50%'}} size="large"/>
    }

    let startDate = moment(slot.data.start_date)
    let endDate = moment(slot.data.end_date)

    return (
        <SafeAreaView style={{flex: 1}}>
            {!isSignStudent ? <View style={[{
                flex: 1,
                width: '100%'
            }, themeColor === 'light' ? themeStyles.backgroundLight : themeStyles.backgroundDark]}>
                <BackLink link={'/instructorschedule'} label={'Слот свободен'}/>
                <View style={{alignItems: 'center', rowGap: 15, paddingTop: 15}}>
                    <View style={{alignItems: 'center'}}>
                        <Text style={[{
                            fontWeight: 'bold',
                            fontSize: 22
                        }, themeColor === 'light' ? themeStyles.textLight : themeStyles.textDark]}>{startDate.format("HH:mm")} - {endDate.format("HH:mm")}</Text>
                        <Text
                            style={[{fontSize: 16}, themeColor === 'light' ? themeStyles.textLight : themeStyles.textLightGrey]}>{startDate.format("DD ")}
                            {months[startDate.get('month')]}, {weekDays[startDate.get("day") - 1]}</Text>
                    </View>
                    <TouchableOpacity
                        style={[styles.signButton, themeColor === 'light' ? themeStyles.borderLight : themeStyles.borderDark]}
                        onPress={() => setIsSignStudent(true)}>
                        <Text
                            style={[{fontSize: 20}, themeColor === 'light' ? themeStyles.textLight : themeStyles.textDark]}>Записать
                            курсанта</Text>
                    </TouchableOpacity>
                    <TextInput mode="outlined"
                               defaultValue={slot.data.notes}
                               placeholder={"Примечание для курсантов"}
                               placeholderTextColor={'lightgrey'}
                               activeOutlineColor={themeColor === 'light' ? 'black' : 'white'}
                               activeUnderlineColor={themeColor === 'light' ? 'black' : 'white'}
                               textColor={themeColor === 'light' ? 'black' : 'white'}
                               style={[{width: '90%'}, themeColor === 'light' ? themeStyles.textInputLight : themeStyles.textInputDark]}/>
                    <InstructorSelect student={slot} hours={hours} grounds={grounds} ground={ground} setGround={setGround}
                                      driveType={driveType} setDriveType={setDriveType} setTransport={setTransport}
                                      transport={transport} vehicles={vehicles}/>
                    <EmptySlotSelect/>
                </View>
            </View> : <SignStudentComponent pickedSlot={slot.data} setIsSignStudent={setIsSignStudent}/>}
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
        backgroundColor: 'blue',
        alignItems: 'center'
    }
});

export default EmptySlot;