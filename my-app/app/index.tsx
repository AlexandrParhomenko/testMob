import Auth from "../components/Auth/Auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, {useEffect, useState} from "react";
import {Redirect} from "expo-router";
import {setColor} from "./store/reducers/themeSlice";
import {useDispatch, useSelector} from "react-redux";
import {selectPickedAccount, setPickedAccount} from "./store/reducers/authSlice";
import {setRole} from "./store/reducers/roleSlice";
import * as Notifications from 'expo-notifications';
import messaging from '@react-native-firebase/messaging';
import {setPush} from "./store/reducers/pushSlice";
import InitialAuthPage from "../components/Auth/InitialAuthPage";

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
    }),
});

export default function TabOneScreen() {
    const [auth, setAuth] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const dispatch = useDispatch()
    const pickedAccount = useSelector(selectPickedAccount)

    // async function requestUserPermission() {
    //     const authStatus = await messaging().requestPermission();
    //     const enabled =
    //         authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    //         authStatus === messaging.AuthorizationStatus.PROVISIONAL;
    //
    //     if (enabled) {
    //         console.log('Authorization status:', authStatus);
    //     }
    // }

    // useEffect(() => {
    //     // @ts-ignore
    //     if (requestUserPermission()) {
    //         messaging().getToken().then((token) => {
    //             dispatch(setPush(token))
    //         })
    //     } else {
    //         // console.log("Permission not granted")
    //     }
    //     messaging().getInitialNotification().then(async (remoteMessage) => {
    //         if (remoteMessage) {
    //             console.log("notitifds dsfakjasa jiasjifs open", remoteMessage.notification)
    //         }
    //     })
    //     messaging().onNotificationOpenedApp((remoteMessage) => {
    //         console.log(remoteMessage.notification)
    //     })
    //     messaging().setBackgroundMessageHandler(async (remoteMessage) => {
    //         console.log("mess handled in the bg", remoteMessage)
    //     })
    //
    //     return messaging().onMessage(async (remoteMessage) => {
    //         console.log("a new cm message arrived", JSON.stringify(remoteMessage))
    //     })
    // }, [])



    useEffect(() => {
        AsyncStorage.getItem('currentUser').then(res => dispatch(setRole(JSON.parse(res!).role_id)))
        AsyncStorage.getItem("autoTurn").then(res => {
            res === null && AsyncStorage.setItem("autoTurn", "true")
        })
    }, [])

    const getData = async () => {
        try {
            const value = await AsyncStorage.getItem('auth');
            const user = await AsyncStorage.getItem('currentUser').then(res => JSON.parse(res || ''));

            if (value === 'true') {
                setAuth(true)
                dispatch(setPickedAccount(user))
                setIsLoading(false)
            } else {
                setAuth(false)
                setIsLoading(false)
            }
        } catch (e) {
        }

        await AsyncStorage.getItem('theme').then((res) => {
            if (res !== null) {
                dispatch(setColor(res))
                setIsLoading(false)
            } else {
                dispatch(setColor('light'))
                setIsLoading(false)
            }
        })
    };

    getData()

    if (isLoading) {
        return null;
    }

    return (
        auth ? <Redirect href="/main"/> : <InitialAuthPage/>
    );
}