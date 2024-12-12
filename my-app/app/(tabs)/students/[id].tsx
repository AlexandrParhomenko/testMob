import React, {useState} from 'react';
import {View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, StatusBar} from "react-native";
import {useLocalSearchParams} from "expo-router";
import {Divider} from "react-native-paper";
import {useSelector} from "react-redux";
import {selectColor} from "../../store/reducers/themeSlice";
import {TextInput} from 'react-native-paper';
import BackLink from "../../../components/BackLink/BackLink";
import themeStyles from "../../../styles/styles";
import {useGetControlPointsQuery} from "../../services/modalDataEndpoints";
import ListPagesLoader from "../../../components/CustomLoaders/ListPagesLoader";
import {ControlPoints} from "../../types/types";
import {AntDesign, Ionicons} from "@expo/vector-icons";
import GradientButton from "../../../components/GradientButton/GradientButton";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import moment from "moment/moment";
import {TextArea} from "native-base";
import CloseLink from "../../../components/BackLink/CloseLink";


const leadPage = () => {
    const {id} = useLocalSearchParams()
    let themeColor = useSelector(selectColor)
    const [pickedControlPoint, setPickedControlPoint] = useState<ControlPoints>({} as ControlPoints)
    const [showAttempts, setShowAttempts] = useState<boolean>(false)
    const [createAttempt, setCreateAttempt] = useState<boolean>(false)
    const [isShow, setIsShow] = useState<boolean>(false);
    const [selectedTime, setSelectedTime] = useState<string>(moment().format('DD.MM.YYYY'));
    const [inputValue, setInputValue] = useState<string>('')
    const [activeBtn, setActiveBtn] = useState<number>(0)
    let history = id?.toString().split('_')[1]
    const {data: controlPoints} = useGetControlPointsQuery();
    if (!controlPoints) return <ListPagesLoader/>

    return (
        <SafeAreaView
            style={[themeColor === 'light' ? themeStyles.backgroundLight : themeStyles.backgroundDark, {flex: 1}]}>
            {showAttempts && <View style={[styles.showAttemptsWrapper, themeColor === 'light' ? themeStyles.backgroundLight : themeStyles.backgroundDark]}>
                <CloseLink onClose={setShowAttempts} label={'Попытки сдачи'}/>
                <View style={styles.controlPointBar}>
                    <View style={styles.codeBox}>
                        <Text style={styles.codeBoxFont}>{pickedControlPoint.control_point_code}</Text>
                    </View>
                    <Text style={{fontSize: 18, color: 'white'}}
                          numberOfLines={1}>{pickedControlPoint.control_point_name}</Text>
                </View>
                <View style={styles.attemptBarWrapper}>
                    <View style={{flexDirection: 'row', columnGap: 10, alignItems: 'center'}}>
                        <Text style={[themeStyles.regularFont, {color: themeColor === 'light' ? 'black' : 'white'}]}>#1</Text>
                        <Text style={[themeStyles.regularFont, {color: themeColor === 'light' ? 'black' : 'white'}]}>24.12.2023</Text>
                    </View>
                    <View style={{backgroundColor: 'green', borderRadius: 5, padding: 5}}>
                        <Text style={{color: 'white', fontSize: 18}}>Открыто</Text>
                    </View>
                </View>
                <TouchableOpacity onPress={() => setCreateAttempt(true)} style={{width: '60%', alignSelf: 'center'}}>
                    <GradientButton text={'Внести попытку'} colors={['#7a1818', '#771b1b', 'red']}
                                    icon={<AntDesign name="plussquareo" size={24} color="white"/>}/>
                </TouchableOpacity>
            </View>}
            {createAttempt && <View style={[styles.showAttemptsWrapper, themeColor === 'light' ? themeStyles.backgroundLight : themeStyles.backgroundDark]}>
                <SafeAreaView>
                    <TouchableOpacity
                        onPress={() => {
                            setCreateAttempt(false)
                            setActiveBtn(0)
                        }}
                        style={[styles.dialogWindowBackArrowWrapper, {paddingTop: 10,}]}>
                        <Ionicons name="arrow-back" size={24} color={themeColor === 'light' ? 'black' : 'lightgrey'}/>
                        <Text
                            style={[themeStyles.regularFont, themeColor === 'light' ? themeStyles.textLight : themeStyles.textDark]}>Новая
                            попытка сдачи</Text>
                    </TouchableOpacity>
                </SafeAreaView>
                <View style={styles.controlPointBar}>
                    <View style={styles.codeBox}>
                        <Text style={styles.codeBoxFont}>{pickedControlPoint.control_point_code}</Text>
                    </View>
                    <Text style={{fontSize: 18, color: 'white'}}
                          numberOfLines={1}>{pickedControlPoint.control_point_name}</Text>
                </View>
                <View style={{padding: 10}}>
                    <Text style={{color: '#777777', fontSize: 18}}>Дата попытки</Text>
                    <View onTouchEnd={() => setIsShow(true)} style={{rowGap: 10}}>
                        <View style={styles.attemptTimeWrapper}>
                            <TouchableOpacity>
                                <AntDesign name="clockcircleo" size={30} color="#0fc92f"/>
                            </TouchableOpacity>
                            <Text
                                style={[{fontSize: 30}, themeColor === 'light' ? themeStyles.textLight : themeStyles.textDark]}>{selectedTime}</Text>
                        </View>
                    </View>
                    <Text style={{color: '#777777', fontSize: 18}}>Результат</Text>
                    <View style={[styles.statusPickerWrapper, {paddingBottom: 20}]}>
                        <TouchableOpacity onPress={() => setActiveBtn(1)} style={activeBtn === 1 ? styles.activeSuccess : styles.statusPicker}>
                            <Text style={[styles.attemptBtnFont, {color: activeBtn === 1 ? 'white': themeColor === 'light' ? 'black' : 'white'}]}>Сдал</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => setActiveBtn(2)} style={activeBtn === 2 ? styles.activeFail : styles.statusPicker}>
                            <Text style={[styles.attemptBtnFont, {color: activeBtn === 2 ? 'white': themeColor === 'light' ? 'black' : 'white'}]}>Не сдал</Text>
                        </TouchableOpacity>
                    </View>
                    <TextArea
                        autoCompleteType={true}
                        backgroundColor={'white'}
                        borderColor={'black'}
                        focusOutlineColor={'black'}
                        placeholder={"Примечание для автошколы"}
                        width={'100%'}
                        tvParallaxProperties
                        onTextInput={() => console.log(123)}
                        placeholderTextColor={themeColor === 'light' ? '#777777' : 'white'}
                        style={[themeColor === 'light' ? themeStyles.textInputLight : themeStyles.textInputDark, {color: themeColor === 'light' ? 'black' : 'white'}]}/>
                    <TouchableOpacity style={{paddingTop: 20}}>
                        <GradientButton colors={['#7a1818', '#771b1b', 'red']} text={'Сохранить'}/>
                    </TouchableOpacity>
                    {isShow && <RNDateTimePicker onChange={(event) => {
                        setIsShow(false)
                        if (event.type !== 'dismissed') setSelectedTime(moment(event.nativeEvent.timestamp).format('DD.MM.YYYY'))
                    }} style={{flex: 1}} value={new Date()} mode={'date'}
                                                 is24Hour locale='ru-RU'/>}
                </View>
            </View>}
            <BackLink link={history === '1' ? 'instructorschedule/orderedslot' : 'students'} label={'Курсант'}/>
            <ScrollView>
                <View>
                    <View style={styles.mainDataWrapper}>
                        <View style={styles.userNameWrapper}>
                            <View style={styles.avatar}></View>
                            <View style={{flexDirection: 'column'}}>
                                <Text style={[{
                                    width: 150,
                                    fontSize: 22
                                }, themeColor === 'light' ? themeStyles.textLight : themeStyles.textDark]}>Фолькин
                                    Виктор Иванович</Text>
                            </View>
                        </View>
                        <View style={{rowGap: 10, flexWrap: 'wrap'}}>
                            <View style={{flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between'}}>
                                <View>
                                    <Text style={styles.profileTitle}>Дата рождения</Text>
                                    <Text
                                        style={[styles.profileField, themeColor === 'light' ? themeStyles.textLight : themeStyles.textDark]}>01.01.2000</Text>
                                </View>
                                <View>
                                    <Text style={styles.profileTitle}>Пол</Text>
                                    <Text
                                        style={[styles.profileField, themeColor === 'light' ? themeStyles.textLight : themeStyles.textDark]}>муж.</Text>
                                </View>
                                <View style={{alignItems: 'center'}}>
                                    <Text style={styles.profileTitle}>Доступ в ЛК</Text>
                                    <View style={styles.indicator}></View>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
                <Divider/>
                <View style={{padding: 10, rowGap: 15, alignItems: 'center'}}>
                    <View style={styles.profileBox}>
                        <View>
                            <Text style={styles.profileTitle}>Учебный класс</Text>
                            <Text
                                style={[styles.profileField, themeColor === 'light' ? themeStyles.textLight : themeStyles.textDark]}>Гагарина</Text>
                        </View>
                        <View>
                            <Text style={styles.profileTitle}>Учебная группа</Text>
                            <Text
                                style={[styles.profileField, themeColor === 'light' ? themeStyles.textLight : themeStyles.textDark]}>Тест</Text>
                        </View>
                        <View>
                            <Text style={styles.profileTitle}>Тип АКПП</Text>
                            <Text
                                style={[styles.profileField, themeColor === 'light' ? themeStyles.textLight : themeStyles.textDark]}>АКПП</Text>
                        </View>
                        <View>
                            <Text style={styles.profileTitle}>Основной инструктор</Text>
                            <Text
                                style={[styles.profileField, themeColor === 'light' ? themeStyles.textLight : themeStyles.textDark]}>Гагарин
                                А.А.</Text>
                        </View>
                        <View>
                            <Text style={styles.profileTitle}>Основная услуга</Text>
                            <Text
                                style={[styles.profileField, themeColor === 'light' ? themeStyles.textLight : themeStyles.textDark]}>Кат.
                                Б</Text>
                        </View>
                        <View>
                            <Text style={styles.profileTitle}>Макс. в неделю</Text>
                            <Text
                                style={[styles.profileField, themeColor === 'light' ? themeStyles.textLight : themeStyles.textDark]}>По
                                умолч.</Text>
                        </View>

                        <View style={{width: 120, alignItems: 'center'}}>
                            <Text style={styles.profileTitle}>Дата окончания занятий группы</Text>
                            <Text
                                style={[styles.profileField, themeColor === 'light' ? themeStyles.textLight : themeStyles.textDark]}>31.08.23</Text>
                        </View>
                        <View style={{width: 150}}>
                            <Text style={styles.profileTitle}>Дата основного экзамена</Text>
                            <Text
                                style={[styles.profileField, themeColor === 'light' ? themeStyles.textLight : themeStyles.textDark]}>не
                                назначена</Text>
                        </View>
                        <View style={{width: 150, alignItems: 'center'}}>
                            <Text style={styles.profileTitle}>Дата экзамена в инспекции</Text>
                            <Text
                                style={[styles.profileField, themeColor === 'light' ? themeStyles.textLight : themeStyles.textDark]}>нет</Text>
                        </View>
                    </View>
                    <TextInput mode="outlined"
                               placeholder={"Заметки по вождению"}
                               placeholderTextColor={'lightgrey'}
                               activeOutlineColor={themeColor === 'light' ? 'black' : 'white'}
                               activeUnderlineColor={themeColor === 'light' ? 'black' : 'white'}
                               textColor={themeColor === 'light' ? 'black' : 'white'}
                               style={[{width: '90%'}, themeColor === 'light' ? themeStyles.textInputLight : themeStyles.textInputDark]}/>
                </View>
                <View style={{padding: 10, rowGap: 10}}>
                    <Text style={{color: '#a6a6a6'}}>Контрольные точки обучения</Text>
                    <View style={{flexDirection: 'row', flexWrap: 'wrap', gap: 10}}>
                        {controlPoints.data.map(el => <TouchableOpacity onPress={() => {
                            setPickedControlPoint(el)
                            setShowAttempts(true)
                        }} style={styles.controlPointBox} key={el.control_point_id}>
                            <Text style={{
                                color: 'white',
                                fontSize: 22,
                                textAlign: 'center'
                            }}>{el.control_point_code}</Text>
                        </TouchableOpacity>)}
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    tableFont: {
        textAlign: 'center',
        fontFamily: 'BebasNeue',
        fontSize: 18
    },
    profileTitle: {
        fontSize: 14,
        color: '#9a9a9a',
        textAlign: 'center'
    },
    profileField: {
        fontSize: 20,
    },
    profileBox: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        rowGap: 10
    },
    mainDataWrapper: {
        flexDirection: 'column',
        justifyContent: 'center',
        paddingVertical: 10,
        width: '95%',
        alignSelf: 'center',
    },
    userNameWrapper: {
        flexDirection: 'row',
        columnGap: 20,
        padding: 10,
        alignItems: 'center'
    },
    avatar: {
        backgroundColor: '#5e5e5e',
        height: 100,
        width: 100,
        borderRadius: 50,
        alignSelf: 'center'
    },
    indicator: {
        height: 10,
        width: 10,
        borderRadius: 50,
        backgroundColor: 'green',
        marginTop: 8
    },
    controlPointBox: {
        borderRadius: 5,
        backgroundColor: '#a6a6a6',
        width: 60,
        padding: 8,
    },
    dialogWindowBackArrowWrapper: {
        alignItems: 'center',
        paddingLeft: 20,
        columnGap: 5,
        flexDirection: 'row',
        alignSelf: 'flex-start',
        width: '100%'
    },
    showAttemptsWrapper: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        zIndex: 10,
        backgroundColor: 'white',
        rowGap: 10
    },
    controlPointBar: {
        padding: 10,
        backgroundColor: '#343434',
        flexDirection: 'row',
        alignItems: 'center',
        columnGap: 15
    },
    codeBox: {
        borderRadius: 5,
        backgroundColor: 'white',
        padding: 5,
        width: 50
    },
    codeBoxFont: {
        color: '#777777',
        fontSize: 18,
        textAlign: 'center'
    },
    attemptBarWrapper: {
        padding: 5,
        flexDirection: 'row',
        paddingBottom: 10,
        columnGap: 10,
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        borderBottomWidth: 1,
        borderColor: '#777777'
    },
    attemptStatusBarWrapper: {
        backgroundColor: '#16d000',
        borderRadius: 5,
        padding: 5
    },
    attemptTimeWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        columnGap: 10,
        paddingTop: 15
    },
    statusPickerWrapper: {
        flexDirection: 'row',
        marginTop: 10,
        justifyContent: 'space-between',
        columnGap: 10,
        paddingRight: 10
    },
    statusPicker: {
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#777777',
        paddingVertical: 10,
        maxWidth: '50%',
        width: '100%'
    },
    activeSuccess: {
        borderRadius: 5,
        paddingVertical: 10,
        maxWidth: '50%',
        backgroundColor: 'green',
        width: '100%'
    },
    activeFail: {
        borderRadius: 5,
        paddingVertical: 10,
        maxWidth: '50%',
        backgroundColor: 'red',
        width: '100%'
    },
    attemptBtnFont: {
        fontSize: 24,
        textAlign: 'center'
    }
});

export default leadPage;