import React, {useEffect, useState} from 'react';
import {Image, Linking, RefreshControl, ScrollView, Switch, Text, TouchableOpacity, View} from "react-native";
import {Avatar} from 'react-native-paper';
import {AntDesign, MaterialIcons} from '@expo/vector-icons';
import NotificationHeader from "../NotificationHeader/NotificationHeader";
import * as ScreenOrientation from "expo-screen-orientation";
import {useDispatch, useSelector} from "react-redux";
import {selectColor, setColor} from "../../app/store/reducers/themeSlice";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Link} from "expo-router";
import themeStyles from "../../styles/styles";
import {StatusBar} from "expo-status-bar";
import GradientButton from "../GradientButton/GradientButton";
import profileStyles from "../../styles/profileStyles";
import {selectPickedAccount} from "../../app/store/reducers/authSlice";
import {useLazyGetContractQuery} from "../../app/services/contractEndpoints";
import ProfileLoader from "../CustomLoaders/ProfileLoader";
import {SafeAreaView} from "react-native-safe-area-context";


const Profile = () => {
    AsyncStorage.getItem("autoTurn").then(res => setIsScreenTurnOn(res || "true"))
    const [isScreenTurnOn, setIsScreenTurnOn] = useState<string>("true");
    let themeColor = useSelector(selectColor)
    const [isDarkTheme, setIsDarkTheme] = useState(themeColor === 'dark');
    const [isAltPlayer, setIsAltPlayer] = useState(false);
    const account = useSelector(selectPickedAccount)
    const [getContract, {data: contract, isLoading}] = useLazyGetContractQuery()
    const dispatch = useDispatch()

    const onScreenTurnSwitch = async () => {
        await AsyncStorage.setItem("autoTurn", isScreenTurnOn === "false" ? "true" : "false")
        setIsScreenTurnOn(isScreenTurnOn === "false" ? "true" : "false")
    };
    const onAltPlayerSwitch = () => setIsAltPlayer(!isAltPlayer);

    useEffect(() => {
        getContract(account.id_reg)
    }, [account])

    const refresh = async () => {
        await getContract(account.id_reg)
    }

    useEffect(() => {
        isScreenTurnOn === "false" ? ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP) :
            ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.DEFAULT)
    }, [isScreenTurnOn])

    const storeData = async (value: string) => {
        dispatch(setColor(value))
        await AsyncStorage.setItem('theme', value);
    };

    if (!contract || isLoading) return <ProfileLoader/>

    return (
        <SafeAreaView
            style={[profileStyles.container, themeColor === 'light' ? themeStyles.backgroundLight : themeStyles.backgroundDark]}>
            <StatusBar style={themeColor === 'light' ? 'dark' : 'light'}/>
            <NotificationHeader/>
            <ScrollView
                refreshControl={<RefreshControl refreshing={isLoading} onRefresh={refresh}/>}
                overScrollMode={'never'} style={{height: '80%'}}>
                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                    <Text style={[profileStyles.regularFont, {
                        alignSelf: 'flex-start',
                        paddingLeft: 25
                    }, themeColor === 'light' ? themeStyles.textLight : themeStyles.textDark]}>Профиль</Text>
                </View>
                <View style={profileStyles.mainSection}>
                    <View style={profileStyles.userNameWindow}>
                        <Text
                            style={[profileStyles.userName, themeColor === 'light' ? themeStyles.textLight : themeStyles.textDark]}>{contract.data.student_name_from_leads}</Text>
                        <View style={{flexDirection: 'row', alignItems: 'center', columnGap: 5}}>
                            <Text
                                style={[{fontSize: 17}, themeColor === 'light' ? themeStyles.textLight : themeStyles.textDark]}>Учебная
                                группа: {contract.data.tr_group_number}</Text>
                            <AntDesign name="infocirlceo" size={18} color="#7c7c7c"/>
                        </View>
                    </View>
                    {!contract.data.a_lead_path ? <Avatar.Image size={100} source={require('../../assets/images/male_boy_person_people_avatar_icon_159358.png')}/> :
                        <Image style={{height: 100, width: 100, borderRadius: 50}}
                               source={{uri: contract.data.a_lead_path}}/>}
                </View>
                <View style={{rowGap: 20, paddingTop: 30}}>
                    <Link asChild href={'/userprofiles'}>
                        <TouchableOpacity style={{width: '100%', alignSelf: 'center'}}>
                            <GradientButton text={'Управление профилями'} colors={['#7a1818', '#771b1b', 'red']}
                                            icon={<AntDesign name="adduser" size={24} color="white"/>}/>
                        </TouchableOpacity>
                    </Link>
                    {/*<TouchableOpacity style={{width: '100%', alignSelf: 'center'}}>*/}
                    {/*    <GradientButton colors={['#7a1818', '#771b1b', 'red']} text={'Данные для госуслуг'}/>*/}
                    {/*</TouchableOpacity>*/}
                    {/*<TouchableOpacity style={{width: '100%', alignSelf: 'center'}}>*/}
                    {/*    <GradientButton colors={['#7a1818', '#771b1b', 'red']} text={'Данные об обучении'}/>*/}
                    {/*</TouchableOpacity>*/}
                    {/*<TouchableOpacity style={{width: '100%', alignSelf: 'center'}}>*/}
                    {/*    <GradientButton colors={['#7a1818', '#771b1b', 'red']}*/}
                    {/*                    text={'Сведения об образовательной организации'}/>*/}
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

                <View style={profileStyles.scheduleContainer}>
                    <View style={profileStyles.paymentsSection}>
                        <Text
                            style={[profileStyles.regularFont, themeColor === 'light' ? themeStyles.textLight : themeStyles.textDark]}>Расписание
                            занятий (теория)</Text>
                        <Text
                            style={[profileStyles.regularFont, themeColor === 'light' ? themeStyles.textLight : themeStyles.textDark]}><Text
                            style={{color: 'red'}}>пн</Text> и <Text
                            style={{color: 'red'}}>ср</Text> с 18:30 до 20:00</Text>
                    </View>
                    <View style={profileStyles.mainBarWrapper}>
                        <TouchableOpacity onPress={() => Linking.openURL(`tel:88003332173`)}
                                          style={profileStyles.connectWrapper}>
                            <MaterialIcons name="phone-in-talk" size={28}
                                           color='#8c8c8c'/>
                            <Text style={[profileStyles.regularFont, {fontSize: 16, color: '#777777'}]}>Связаться с
                                менеджером</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <Text style={[profileStyles.regularFont, profileStyles.appVersionFont]}>Версия приложения 2.2.10</Text>
            </ScrollView>
        </SafeAreaView>
    );
};

export default Profile;