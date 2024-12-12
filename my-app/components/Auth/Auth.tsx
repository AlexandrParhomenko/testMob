import {StyleSheet, View, TextInput, Text, TouchableOpacity, BackHandler} from "react-native";
import React, {useEffect, useState} from "react";
import {useNavigation} from "expo-router";
import {HelperText} from "react-native-paper";
import {LinearGradient} from "expo-linear-gradient";
import {useSetAuthMutation} from "../../app/services/authEndpoints";
import {Login} from "../../app/types/types";
import {useDispatch, useSelector} from "react-redux";
import {selectPickedAccount, setPickedAccount} from "../../app/store/reducers/authSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import themeStyles from "../../styles/styles";
import {StatusBar} from "expo-status-bar";
import ServerQueryFailAlert from "../AlertWindows/ServerQueryFailAlert";
import {setRole} from "../../app/store/reducers/roleSlice";
import styles from '../../styles/authStyles'

const Auth = () => {
    const [login, setLogin] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [userData, setUserData] = useState<Login[]>([]);
    const [isError, setIsError] = useState<boolean>(false);
    const [serverError, setServerError] = useState<boolean>(false);
    const [setAuth] = useSetAuthMutation();
    const navigate = useNavigation();
    const dispatch = useDispatch()
    const userName = useSelector(selectPickedAccount)

    useEffect(() => {
        AsyncStorage.getItem('userAccounts').then(res => setUserData(JSON.parse(res || '')))
    }, [userName])

    useEffect(() => {
        const backAction = () => {
            if (!userName.email) {
                BackHandler.exitApp()
                return true;
            }
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
        <View style={styles.container}>
            <StatusBar style={'light'}/>
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
        </View>
    );
};

export default Auth;