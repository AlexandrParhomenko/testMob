import React, {useEffect, useState} from 'react';
import {BackHandler, Image, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context'
import ServerQueryFailAlert from "../AlertWindows/ServerQueryFailAlert";
import {HelperText} from "react-native-paper";
import {LinearGradient} from "expo-linear-gradient";
import themeStyles from "../../styles/styles";
import styles from '../../styles/authStyles'
import mainStyles from '../../styles/styles'
import {Login} from "../../app/types/types";
import {useSetAuthMutation} from "../../app/services/authEndpoints";
import {Link, useNavigation} from "expo-router";
import {useDispatch, useSelector} from "react-redux";
import {selectPickedAccount, setPickedAccount} from "../../app/store/reducers/authSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {setRole} from "../../app/store/reducers/roleSlice";
import GradientButton from "../GradientButton/GradientButton";
import {selectColor} from "../../app/store/reducers/themeSlice";
import {AntDesign, FontAwesome6, Ionicons, MaterialIcons} from "@expo/vector-icons";
import Pdd from "../Pdd/Pdd";
import TicketsWindow from "../TicketsWindow/TicketsWindow";
import AdsPage from "../AdsPage/AdsPage";
import ThemesWindow from "../ThemesWindow/ThemesWindow";
import ExpoStatusBar from "../ExpoStatusBar/ExpoStatusBar";


const InitialAuthPage = () => {
    const [login, setLogin] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [userData, setUserData] = useState<Login[]>([]);
    const [isError, setIsError] = useState<boolean>(false);
    const [serverError, setServerError] = useState<boolean>(false);
    const [isLogin, setIsLogin] = useState<boolean>(false);
    const [isTickets, setIsTickets] = useState<boolean>(false);
    const [isRules, setIsRules] = useState<boolean>(false);
    const [isAds, setIsAds] = useState<boolean>(true);
    const [showTickets, setShowTickets] = useState<boolean>(false);
    const [showThemes, setShowThemes] = useState<boolean>(false);
    const [setAuth] = useSetAuthMutation();
    const navigate = useNavigation();
    const dispatch = useDispatch()
    const userName = useSelector(selectPickedAccount)
    let themeColor = useSelector(selectColor)


    useEffect(() => {
        AsyncStorage.getItem('userAccounts').then(res => setUserData(JSON.parse(res || '')))
    }, [userName])

    useEffect(() => {
        const backAction = () => {
            BackHandler.exitApp()
            return true;
        };

        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            backAction,
        );

        return () => backHandler.remove();
    }, []);

    const storeData = async (value: Login) => {
        try {
            console.log('Success', 'User authed successfully');
        } catch (error: any) {
            console.log('Error', error.message);
        }
        dispatch(setRole(value.role_id))
        dispatch(setPickedAccount(value))
        const usersArr = [...userData]
        const newArr = userData.map(el => el.username)
        if (newArr.indexOf(value.username) !== -1) {
            usersArr.map(async function (item, idx) {
                if (item.username === value.username) {
                    usersArr[idx] = {...value, password: password}
                    await AsyncStorage.setItem('userAccounts', JSON.stringify(usersArr))
                }
            })
        } else await AsyncStorage.setItem('userAccounts', JSON.stringify([{...value, password: password}, ...userData]))
        await AsyncStorage.setItem('currentUser', JSON.stringify({...value, password: password}));
        await AsyncStorage.setItem('auth', 'true');
    };

    const onAuth = async () => {
        const formData = new FormData();
        formData.append("username", login);
        formData.append("password", password);

        setAuth(formData).then(res => {
            // @ts-ignore
            if (res.error) {
                // @ts-ignore
                if (res.error.status !== '404') {
                    setServerError(true)
                }
                setIsError(true)
            } else {
                // @ts-ignore
                storeData(res.data.data)
                // @ts-ignore
                navigate.navigate('(tabs)', {
                    screen: 'profile',
                })
            }
        });
    }

    return (
        <SafeAreaView style={mainStyles.safeAreaContainer}>
            {isLogin ? <View style={styles.container}>
                <View onTouchEnd={() => setIsLogin(false)}>
                    <TouchableOpacity
                        style={{
                            alignItems: 'center',
                            paddingLeft: 20,
                            columnGap: 5,
                            flexDirection: 'row',
                            alignSelf: 'flex-start',
                            paddingTop: 10,
                            paddingBottom: 10,
                            width: '100%'
                        }}>
                        <Ionicons name="arrow-back" size={24} color={'lightgrey'}/>
                        <Text
                            style={[themeStyles.regularFont, themeStyles.textDark]}>Назад</Text>
                    </TouchableOpacity>
                </View>
                {serverError && <ServerQueryFailAlert/>}
                <View style={styles.backgroundTextBox}>
                    <Text style={[styles.bigFont, styles.backgroundTextBoxEffect]}>Vektor</Text>
                </View>
                <View style={styles.img}>
                    <View style={styles.authWrapper}>
                        <TextInput onTouchEnd={() => {
                            setServerError(false)
                            setIsError(false)
                        }} onChangeText={(e) => setLogin(e)}
                                   placeholder='Логин' style={styles.inputBar}/>
                        <View style={styles.validWrapper}>
                            <TextInput onTouchEnd={() => {
                                setServerError(false)
                                setIsError(false)
                            }} onChangeText={(e) => setPassword(e)}
                                       secureTextEntry={true} placeholder='Пароль' style={styles.inputBar}/>
                            {isError ? <HelperText type="error" visible={isError}>
                                Неверное имя пользователя и/или пароль
                            </HelperText> : ''}
                        </View>
                        <View style={styles.checkBoxWindowWrapper}>
                            <TouchableOpacity onPress={() => onAuth()} style={{width: '50%', alignItems: 'center'}}>
                                <LinearGradient start={[0.9, -0.5]}
                                                end={[0.8, 0.8]}
                                                colors={['#5d1414', '#771b1b', 'red']}
                                                style={styles.enterButton}>
                                    <Text style={themeStyles.regularFont}>Вход
                                    </Text>
                                </LinearGradient>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View> : <View style={[{
                flex: 1,
            }, themeColor === 'light' ? themeStyles.backgroundLight : themeStyles.backgroundDark]}>
                    <View style={{paddingBottom: 7, marginTop: 10}}>
                        <TouchableOpacity onPress={() => setIsLogin(true)} style={authStyles.enterBtn}>
                            <MaterialIcons name="login" size={24} color="#414141"/>
                            <Text style={[themeStyles.regularFont, {color: 'black', textAlign: "center"}]}>Войти</Text>
                        </TouchableOpacity>
                    </View>
                {isRules && <Pdd page={"auth"}/>}
                {isAds && <AdsPage page={"auth"}/>}
                {isTickets && !showTickets && !showThemes && <View style={[{
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "center"
                }, themeColor === 'light' ? themeStyles.backgroundLight : themeStyles.backgroundDark]}>
                    <View style={{width: '100%', alignSelf: 'center', rowGap: 20, alignItems: 'center'}}>
                        <Text style={[themeStyles.regularFont, {color: '#949494'}]}>Тренировка по билетам</Text>
                        <TouchableOpacity onPress={() => setShowTickets(true)} style={{width: '60%'}}>
                            <GradientButton colors={['#7a1818', '#771b1b', 'red']} text={'Билеты'}/>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => setShowThemes(true)} style={{width: '60%'}}>
                            <GradientButton colors={['#7a1818', '#771b1b', 'red']} text={'Темы'}/>
                        </TouchableOpacity>
                    </View>
                </View>}
                {showTickets && <TicketsWindow onClose={() => setShowTickets(false)}/>}
                {showThemes && <ThemesWindow onClose={() => setShowThemes(false)}/>}
                <View style={authStyles.navBar}>
                    <TouchableOpacity onPress={() => {
                        setIsTickets(false)
                        setIsAds(false)
                        setShowTickets(false)
                        setShowThemes(false)
                        setIsRules(true)
                    }} style={{alignItems: "center"}}>
                        <AntDesign name="book" size={24} color={isRules ? "#fd1919" : "#414141"}/>
                        <Text style={{color: isRules ? "#fd1919" : "#414141"}}>Правила</Text>
                    </TouchableOpacity>
                    <View style={authStyles.mainNav} onTouchEnd={() => {
                        setIsRules(false)
                        setShowTickets(false)
                        setShowThemes(false)
                        setIsTickets(false)
                        setIsAds(true)
                    }}>
                        <Image style={{height: 50, width: 50, marginBottom: -20}}
                               tintColor={isAds ? "#fd1919" : undefined} resizeMode={'contain'}
                               source={require('../../assets/images/vectorLogo.png')}/>
                    </View>
                    <TouchableOpacity onPress={() => {
                        setIsAds(false)
                        setIsRules(false)
                        setShowTickets(false)
                        setShowThemes(false)
                        setIsTickets(true)
                    }} style={{alignItems: "center"}}>
                        <FontAwesome6 name="road" size={24} color={isTickets ? "#fd1919" : "#414141"}/>
                        <Text style={{color: isTickets ? "#fd1919" : "#414141"}}>Билеты</Text>
                    </TouchableOpacity>
                </View>
            </View>}
        </SafeAreaView>
    );
};

const authStyles = StyleSheet.create({
    enterBtn: {
        borderRadius: 10,
        padding: 5,
        borderWidth: 1,
        borderColor: "lightgrey",
        width: 90,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        columnGap: 5,
        marginLeft: 10
    },
    navBar: {
        padding: 10,
        backgroundColor: "#efefef",
        width: "100%",
        position: "relative",
        bottom: 0,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
    },
    mainNav: {
        alignItems: "center",
        borderRadius: 25,
        position: "relative",
        top: -30,
        backgroundColor: "#efefef",
        height: 50,
        justifyContent: "center",
        width: 100,
        alignSelf: "center"
    }
});

export default InitialAuthPage;