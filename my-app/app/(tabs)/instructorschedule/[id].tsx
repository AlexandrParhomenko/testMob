import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View, Switch, ActivityIndicator, ScrollView} from "react-native";
import {AntDesign, MaterialIcons} from "@expo/vector-icons";
import {router, useLocalSearchParams} from "expo-router";
import {useSelector} from "react-redux";
import {selectColor} from "../../store/reducers/themeSlice";
import {TextInput} from "react-native-paper";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import moment from "moment";
import {
    useGetBranchesQuery,
    useGetHoursTypesQuery,
    useGetTrainingPlacesQuery,
    useGetTrainingVehiclesQuery
} from "../../services/modalDataEndpoints";
import BackLink from "../../../components/BackLink/BackLink";
import themeStyles from "../../../styles/styles";
import {Select} from "native-base";
import {useSetEmptyPracticeScheduleMutation} from "../../services/scheduleEndpoints";
import {EmptySlotPost} from "../../types/types";
import {selectPickedAccount} from "../../store/reducers/authSlice";
import {SafeAreaView} from "react-native-safe-area-context";


const CreateLesson = () => {
    let themeColor = useSelector(selectColor)
    const {id} = useLocalSearchParams()
    let slotDay = String(id).split('_')[0]
    const [selectedTime, setSelectedTime] = useState<string>('12:30');
    const [driveType, setDriveType] = useState<string>('1');
    const [branch, setBranch] = useState<string>('1');
    const [studentNote, setStudentNote] = useState<string>('');
    const [instructorNote, setInstructorNote] = useState<string>('');
    const [transport, setTransport] = useState<string>('');
    const [ground, setGround] = useState<string | undefined>(undefined);
    const [isShow, setIsShow] = useState<boolean>(false);
    const [isNotify, setIsNotify] = useState<boolean>(false);
    const [hours, setHours] = useState<number>(2);
    const [slots, setSlots] = useState<number>(1);
    const {data: hoursTypes} = useGetHoursTypesQuery();
    const {data: vehicles} = useGetTrainingVehiclesQuery();
    const {data: branches} = useGetBranchesQuery();
    const {data: grounds} = useGetTrainingPlacesQuery();
    const [setEmptySlot] = useSetEmptyPracticeScheduleMutation()
    const acc = useSelector(selectPickedAccount)

    if (!hoursTypes || !vehicles || !grounds || !branches) {
        return <ActivityIndicator color={'#e34d4d'} style={{paddingTop: '50%'}} size="large"/>
    }

    const createLesson = async () => {
        const body: EmptySlotPost = {
            id: 1,
            post: {
                create_date: moment().format('YYYY-MM-DD HH:mm'),
                start_date: moment(`${slotDay} ${selectedTime}`).format('YYYY-MM-DD HH:mm'),
                end_date: moment(`${slotDay} ${selectedTime}`).add(hours, 'hours').format('YYYY-MM-DD HH:mm'),
                amount: hours,
                amount_places: slots,
                notes: studentNote,
                note_for_master: instructorNote,
                fk_slot_create_emp_id: acc.id_reg,
                fk_type_study_hour_id: parseInt(driveType),
                fk_tr_vehicle_id: transport !== "" ? parseInt(transport) : vehicles.data[0].tr_vehicle_id,
                fk_plan_master_id: acc.id_reg,
                fk_branch_id: parseInt(branch),
                fk_dr_school_id: acc.dr_school_id,
                fk_tr_place_id: ground === undefined ? ground : parseInt(ground),
                status: "1"
            }
        };
        await setEmptySlot(body)
        router.replace('/instructorschedule');
    }

    return (
        <SafeAreaView style={[{flex: 1}, themeColor === 'light' ? themeStyles.backgroundLight : themeStyles.backgroundDark]}>
            <BackLink link={'/instructorschedule'} label={'Открыть слот'}/>
            <View style={{paddingTop: 15}}>
                <ScrollView contentContainerStyle={{alignItems: 'center', rowGap: 10}}>
                    <View style={{flexDirection: 'row', width: '90%', justifyContent: 'space-around'}}>
                        {isShow && <RNDateTimePicker onChange={(event) => {
                            setIsShow(false)
                            if (event.type !== 'dismissed') setSelectedTime(moment(event.nativeEvent.timestamp).format('HH:mm'))
                        }} style={{flex: 1}} value={new Date()} mode={'time'}
                                                     is24Hour locale='ru-RU'/>}
                        <View onTouchEnd={() => setIsShow(true)} style={{alignItems: 'center', rowGap: 10}}>
                            <Text style={{color: '#7c7c7c'}}>Время начала</Text>
                            <View style={{flexDirection: 'row', alignItems: 'center', columnGap: 10, paddingTop: 15}}>
                                <TouchableOpacity>
                                    <AntDesign name="clockcircleo" size={30} color="#0fc92f"/>
                                </TouchableOpacity>
                                <Text
                                    style={[{fontSize: 30}, themeColor === 'light' ? themeStyles.textLight : themeStyles.textDark]}>{selectedTime}</Text>
                            </View>
                        </View>
                        <View style={{alignItems: 'center', rowGap: 10}}>
                            <Text style={{color: '#7c7c7c'}}>Учебных часов</Text>
                            <View style={{flexDirection: 'row', alignItems: 'center', columnGap: 5}}>
                                <Text
                                    style={[{fontSize: 30}, themeColor === 'light' ? themeStyles.textLight : themeStyles.textDark]}>{hours}</Text>
                                <View>
                                    <TouchableOpacity disabled={hours === 1} onPress={() => setHours(hours - 1)}>
                                        <MaterialIcons name="arrow-drop-up" size={35}
                                                       color={hours === 1 ? '#444444' : themeColor === 'light' ? 'black' : 'white'}/>
                                    </TouchableOpacity>
                                    <TouchableOpacity disabled={hours === 4} onPress={() => setHours(hours + 1)}>
                                        <MaterialIcons name="arrow-drop-down" size={35}
                                                       color={hours === 4 ? '#444444' : themeColor === 'light' ? 'black' : 'white'}/>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                        <View style={{alignItems: 'center', rowGap: 10, justifyContent: 'space-between'}}>
                            <Text style={{color: '#7c7c7c'}}>Мест</Text>
                            <View style={{flexDirection: 'row', alignItems: 'center', columnGap: 5}}>
                                <Text style={[{
                                    fontSize: 30,
                                    width: 35,
                                    textAlign: 'right'
                                }, themeColor === 'light' ? themeStyles.textLight : themeStyles.textDark]}>{slots}</Text>
                                <View>
                                    <TouchableOpacity disabled={slots === 1} onPress={() => setSlots(slots - 1)}>
                                        <MaterialIcons name="arrow-drop-up" size={35}
                                                       color={slots === 1 ? '#444444' : themeColor === 'light' ? 'black' : 'white'}/>
                                    </TouchableOpacity>
                                    <TouchableOpacity disabled={slots === 10} onPress={() => setSlots(slots + 1)}>
                                        <MaterialIcons name="arrow-drop-down" size={35}
                                                       color={slots === 10 ? '#444444' : themeColor === 'light' ? 'black' : 'white'}/>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </View>
                    <TextInput mode="outlined"
                               onChangeText={(text) => setStudentNote(text)}
                               placeholder={"Примечание для курсантов"}
                               placeholderTextColor={'lightgrey'}
                               activeOutlineColor={themeColor === 'light' ? 'black' : 'white'}
                               activeUnderlineColor={themeColor === 'light' ? 'black' : 'white'}
                               textColor={themeColor === 'light' ? 'black' : 'white'}
                               style={[{width: '90%'}, themeColor === 'light' ? themeStyles.textInputLight : themeStyles.textInputDark]}/>
                    <TextInput mode="outlined"
                               onChangeText={(text) => setInstructorNote(text)}
                               placeholder={"Примечание для инструктора"}
                               placeholderTextColor={'lightgrey'}
                               activeOutlineColor={themeColor === 'light' ? 'black' : 'white'}
                               activeUnderlineColor={themeColor === 'light' ? 'black' : 'white'}
                               textColor={themeColor === 'light' ? 'black' : 'white'}
                               style={[{width: '90%'}, themeColor === 'light' ? themeStyles.textInputLight : themeStyles.textInputDark]}/>
                    <Select
                        width={'90%'}
                        fontSize={20}
                        defaultValue={driveType}
                        _actionSheetContent={themeColor === 'light' ? themeStyles.backgroundLight : themeStyles.selectDark}
                        _item={themeColor === 'light' ? themeStyles.backgroundLight : themeStyles.selectDark}
                        color={themeColor === 'light' ? 'black' : 'white'}
                        onValueChange={(itemValue: string) => setDriveType(itemValue)}>
                        {hoursTypes.data.map(el =>
                            <Select.Item key={el.type_study_hour_name}
                                         value={el.type_study_hour_id.toString()}
                                         label={el.type_study_hour_name}
                                         color={themeColor === 'light' ? 'black' : 'white'}
                                         _text={themeColor === 'light' ? themeStyles.textLight : themeStyles.textDark}
                                         leftIcon={<View
                                             style={[styles.selectIcon, {backgroundColor: el.color}]}>
                                             <Text style={{
                                                 color: 'white',
                                                 marginTop: 2,
                                                 fontSize: 18
                                             }}>{el.type_study_hour_code[0]}</Text>
                                         </View>}/>)}
                    </Select>
                    <Select
                        width={'90%'}
                        fontSize={20}
                        defaultValue={branch}
                        _actionSheetContent={themeColor === 'light' ? themeStyles.backgroundLight : themeStyles.selectDark}
                        _item={themeColor === 'light' ? themeStyles.backgroundLight : themeStyles.selectDark}
                        color={themeColor === 'light' ? 'black' : 'white'}
                        onValueChange={(itemValue: string) => setBranch(itemValue)}>
                        {branches.data.map(el =>
                            <Select.Item key={el.branch_name}
                                         value={el.branch_id.toString()}
                                         label={el.branch_name}
                                         color={themeColor === 'light' ? 'black' : 'white'}
                                         _text={themeColor === 'light' ? themeStyles.textLight : themeStyles.textDark}
                                         />)}
                    </Select>
                    <Select
                        placeholder={'Без учебного ТС'}
                        width={'90%'}
                        fontSize={20}
                        color={themeColor === 'light' ? 'black' : 'white'}
                        _actionSheetContent={themeColor === 'light' ? themeStyles.backgroundLight : themeStyles.selectDark}
                        _item={themeColor === 'light' ? themeStyles.backgroundLight : themeStyles.selectDark}
                        onValueChange={(itemValue: string) => itemValue !== 'null' ? setTransport(itemValue) : setTransport('')}
                    >
                        <Select.Item label="Все учебные ТС"
                                     _text={themeColor === 'light' ? themeStyles.textLight : themeStyles.textDark}
                                     value={'null'}/>
                        {vehicles.data.map(el =>
                            <Select.Item key={el.reg_number}
                                         _text={themeColor === 'light' ? themeStyles.textLight : themeStyles.textDark}
                                         label={`${el.tr_vehicle_brand} ${el.tr_vehicle_model}`}
                                         value={el.tr_vehicle_id.toString()}/>)}
                    </Select>
                    <Select
                        placeholder={'Площадка не выбрана'}
                        _text={{color: ground === 'Выбирается курсантом' ? '#e34d4d' : 'black'}}
                        color={ground === 'Выбирается курсантом' ? '#e34d4d' : themeColor === 'light' ? 'black' : 'white'}
                        _item={{
                            startIcon: <View style={{height: 25, width: 25, backgroundColor: 'transparent'}}></View>,
                            backgroundColor: themeColor === 'light' ? 'white' : '#363636'
                        }}
                        _actionSheetContent={themeColor === 'light' ? themeStyles.backgroundLight : themeStyles.selectDark}
                        width={'90%'}
                        fontSize={20}
                        onValueChange={(itemValue: string) => itemValue !== 'null' ? setGround(itemValue) : setGround('')}
                    >
                        {/*<Select.Item _text={{fontStyle: 'italic', color: themeColor === 'light' ? 'black' : 'white'}}*/}
                        {/*             label="Площадка не выбрана" value='null'/>*/}
                        {/*<Select.Item label="Выбирается курсантом"*/}
                        {/*             value='Выбирается курсантом'*/}
                        {/*             _text={themeColor === 'light' ? themeStyles.textLight : themeStyles.textDark}*/}
                        {/*             leftIcon={<View style={{*/}
                        {/*                 backgroundColor: '#e34d4d',*/}
                        {/*                 height: 25,*/}
                        {/*                 width: 25,*/}
                        {/*                 borderRadius: 3,*/}
                        {/*                 position: 'relative'*/}
                        {/*             }}></View>}/>*/}
                        {grounds.data.map(el => <Select.Item key={el.tr_place_name}
                                                             _text={themeColor === 'light' ? themeStyles.textLight : themeStyles.textDark}
                                                             label={el.tr_place_name}
                                                             value={el.tr_place_id.toString()}/>)}
                    </Select>
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        width: '90%'
                    }}>
                        <Text
                            style={[{fontSize: 16}, themeColor === 'light' ? themeStyles.textLight : themeStyles.textLightGrey]}>Уведомить
                            моих курсантов</Text>
                        <Switch value={isNotify} thumbColor={'orange'} trackColor={{false: '#767577', true: 'white'}}
                                onTouchEnd={() => setIsNotify(!isNotify)}/>
                    </View>
                    <Text style={{width: '90%', fontSize: 12, color: '#696969'}}>Отправить push-уведомление о свободном
                        времени
                        все мкурсантам, которые закреплены за вами. Не использвйте эту опцию часто во избежание эффекта
                        спам-рассылки</Text>
                    <TouchableOpacity onPress={() => createLesson()}
                        style={{
                            borderRadius: 6,
                            backgroundColor: 'green',
                            paddingVertical: 10,
                            paddingHorizontal: 20,
                            alignItems: 'center'
                        }}>
                        <Text style={[{color: 'white'}, themeStyles.regularFont]}>Запланировать</Text>
                    </TouchableOpacity>
                </ScrollView>
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
    },
    selectIcon: {
        paddingBottom: 5,
        borderRadius: 4,
        height: 30,
        width: 30,
        alignItems: 'center'
    },
});

export default CreateLesson;