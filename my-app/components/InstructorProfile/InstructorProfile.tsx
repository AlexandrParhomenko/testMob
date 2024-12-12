import React, {useEffect, useState} from 'react';
import themeStyles from "../../styles/styles";
import {StatusBar} from "expo-status-bar";
import NotificationHeader from "../NotificationHeader/NotificationHeader";
import {RefreshControl, ScrollView, Switch, Text, TouchableOpacity, View, Image} from "react-native";
import {AntDesign} from "@expo/vector-icons";
import {Link} from "expo-router";
import GradientButton from "../GradientButton/GradientButton";
import {useDispatch, useSelector} from "react-redux";
import {selectColor, setColor} from "../../app/store/reducers/themeSlice";
import * as ScreenOrientation from "expo-screen-orientation";
import AsyncStorage from "@react-native-async-storage/async-storage";
import profileStyles from "../../styles/profileStyles";
import {selectPickedAccount} from "../../app/store/reducers/authSlice";
import {useLazyGetEmployeeQuery} from "../../app/services/employeeEndpoints";
import ProfileLoader from "../CustomLoaders/ProfileLoader";
import {useGetCounterAgentQuery} from "../../app/services/modalDataEndpoints";
import {Avatar} from "react-native-paper";
import {SafeAreaView} from "react-native-safe-area-context";

const InstructorProfile = () => {
    AsyncStorage.getItem("autoTurn").then(res => setIsScreenTurnOn(res || "true"))
    const [isScreenTurnOn, setIsScreenTurnOn] = useState<string>("true");
    let themeColor = useSelector(selectColor)
    const [isDarkTheme, setIsDarkTheme] = useState(themeColor === 'dark');
    const [isAltPlayer, setIsAltPlayer] = useState(false);
    const account = useSelector(selectPickedAccount)
    const [getEmployee, {data: employee, isLoading}] = useLazyGetEmployeeQuery()
    const {data: school} = useGetCounterAgentQuery(account.dr_school_id || 20)
    const dispatch = useDispatch()
    const onScreenTurnSwitch = async () => {
        await AsyncStorage.setItem("autoTurn", isScreenTurnOn === "false" ? "true" : "false")
        setIsScreenTurnOn(isScreenTurnOn === "false" ? "true" : "false")
    };
    const onAltPlayerSwitch = () => setIsAltPlayer(!isAltPlayer);

    useEffect(() => {
        getEmployee(account.id_reg)
    }, [account])

    useEffect(() => {
        !isScreenTurnOn ? ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP) :
            ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.DEFAULT)
    }, [isScreenTurnOn])

    const storeData = async (value: string) => {
        dispatch(setColor(value))
        await AsyncStorage.setItem('theme', value);
    };

    const refresh = async () => {
        await getEmployee(account.id_reg)
    }

    if (!employee || !school || isLoading) return <ProfileLoader/>

    return (
        <SafeAreaView
            style={[profileStyles.container, themeColor === 'light' ? themeStyles.backgroundLight : themeStyles.backgroundDark]}>
            <StatusBar style={themeColor === 'light' ? 'dark' : 'light'}/>
            <NotificationHeader/>
            <ScrollView refreshControl={<RefreshControl refreshing={isLoading} onRefresh={refresh}/>} overScrollMode={'never'} style={{height: '80%'}}>
                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                    <Text style={[profileStyles.regularFont, {
                        alignSelf: 'flex-start',
                        paddingLeft: 25
                    }, themeColor === 'light' ? themeStyles.textLight : themeStyles.textDark]}>Профиль</Text>
                </View>
                <View style={profileStyles.mainSection}>
                    <View style={profileStyles.userNameWindow}>
                        <Text
                            style={[profileStyles.userName, themeColor === 'light' ? themeStyles.textLight : themeStyles.textDark]}>{employee && employee.data.emp_sur_name} {employee && employee.data.emp_name} {employee && employee.data.emp_middle_name}</Text>
                        <View style={{flexDirection: 'row', alignItems: 'center', columnGap: 5}}>
                            <Text
                                style={[{fontSize: 17}, themeColor === 'light' ? themeStyles.textLight : themeStyles.textDark]}>{school && school.data.dr_school_sname}</Text>
                        </View>
                    </View>
                    {!employee.data.avatar_path ? <Avatar.Image size={100}
                                                                        source={require('../../assets/images/male_boy_person_people_avatar_icon_159358.png')}/> :
                        <Image style={{height: 100, width: 100, borderRadius: 50}}
                               source={{uri: employee.data.avatar_path}}/>}
                </View>
                <Text
                    style={[{fontSize: 17, paddingLeft: 20}, themeColor === 'light' ? themeStyles.textLight : themeStyles.textDark]}>{school && school.data.address}</Text>
                <View style={{rowGap: 20, paddingTop: 30}}>
                    <Link asChild href={'/userprofiles'}>
                        <TouchableOpacity style={{width: '100%', alignSelf: 'center'}}>
                            <GradientButton colors={['#7a1818', '#771b1b', 'red']} text={'Управление профилями'}
                                            icon={<AntDesign name="adduser" size={24} color="white"/>}/>
                        </TouchableOpacity>
                    </Link>
                    {/*<TouchableOpacity style={{width: '100%', alignSelf: 'center'}}>*/}
                    {/*    <GradientButton colors={['#7a1818', '#771b1b', 'red']} text={'Данные для госуслуг'}/>*/}
                    {/*</TouchableOpacity>*/}
                    {/*<TouchableOpacity style={{width: '100%', alignSelf: 'center'}}>*/}
                    {/*    <GradientButton colors={['#7a1818', '#771b1b', 'red']} text={'Сведения об образовательной организации'}/>*/}
                    {/*</TouchableOpacity>*/}
                </View>
                <View style={{paddingTop: 20, rowGap: 20}}>
                    <View style={profileStyles.settingsWrapper}>
                        <Text
                            style={[profileStyles.regularFont, themeColor === 'light' ? themeStyles.textLight : themeStyles.textDark]}>Автоповорот
                            экрана</Text>
                        <Switch thumbColor={'white'} trackColor={{false: '#767577', true: 'red'}} value={isScreenTurnOn === "true"}
                                onValueChange={onScreenTurnSwitch}/>
                    </View>
                    <View style={profileStyles.settingsWrapper}>
                        <Text
                            style={[profileStyles.regularFont, themeColor === 'light' ? themeStyles.textLight : themeStyles.textDark]}>Темная
                            тема оформления</Text>
                        <Switch thumbColor={'white'} trackColor={{false: '#767577', true: 'red'}} value={isDarkTheme}
                                onValueChange={(value) => {
                                    // onThemeSwitch()
                                    setIsDarkTheme(value)
                                    storeData(value ? 'dark' : 'light')
                                }}/>
                    </View>
                    {/*<View style={profileStyles.settingsWrapper}>*/}
                    {/*    <Text*/}
                    {/*        style={[profileStyles.regularFont, themeColor === 'light' ? themeStyles.textLight : themeStyles.textDark]}>Альтернативный*/}
                    {/*        видеоплеер</Text>*/}
                    {/*    <Switch thumbColor={'white'} trackColor={{false: '#767577', true: 'red'}} value={isAltPlayer}*/}
                    {/*            onValueChange={onAltPlayerSwitch}/>*/}
                    {/*</View>*/}
                </View>
                <Text style={[profileStyles.regularFont, profileStyles.appVersionFont]}>Версия приложения 2.2.10</Text>
            </ScrollView>


        </SafeAreaView>
    );
};

export default InstructorProfile;