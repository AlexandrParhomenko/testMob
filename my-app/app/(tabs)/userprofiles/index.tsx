import React, {useEffect, useState} from 'react';
import {ActivityIndicator, View, Text, TouchableOpacity, StyleSheet} from "react-native";
import BackLink from "../../../components/BackLink/BackLink";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {AntDesign, Feather} from "@expo/vector-icons";
import DeleteUserDialog from "../../../components/AlertDialog/DeleteUserDialog";
import {Link} from "expo-router";
import {useSetAuthMutation} from "../../services/authEndpoints";
import {Login} from "../../types/types";
import {Alert} from "native-base";
import {useDispatch, useSelector} from "react-redux";
import {selectColor} from "../../store/reducers/themeSlice";
import themeStyles from "../../../styles/styles";
import {selectPickedAccount, setPickedAccount} from "../../store/reducers/authSlice";
import ProfileManagerLoader from "../../../components/CustomLoaders/ProfileManagerLoader";
import {SafeAreaView} from "react-native-safe-area-context";

const UserProfiles = () => {
    let themeColor = useSelector(selectColor)
    const [userData, setUserData] = useState<Login[]>([])
    const [currentUser, setCurrentUser] = useState<Login>({} as Login)
    const [isDelete, setIsDelete] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const pickedAccount = useSelector(selectPickedAccount)
    const [setAuth] = useSetAuthMutation();
    const dispatch = useDispatch()

    useEffect(() => {
        if (!currentUser.email) {
            AsyncStorage.getItem('currentUser').then(res => setCurrentUser(JSON.parse(res || '')));
        }
        // else if (currentUser.email !== pickedAccount.email) {
        //     AsyncStorage.getItem('currentUser').then(res => setCurrentUser(JSON.parse(res || '')));
        // }
    }, [pickedAccount, userData])

    useEffect(() => {
        AsyncStorage.getItem('userAccounts').then(res => setUserData(JSON.parse(res || '')));
    }, [pickedAccount])

    if (!userData || !currentUser || !pickedAccount) {
        return <ProfileManagerLoader/>
    }

    const changeCurrentUser = async (user: Login) => {
        setIsLoading(true)
        const formData = new FormData();
        formData.append("username", user.email);
        formData.append("password", user.password);

        if (user !== currentUser) {
            await setAuth(formData).then(async res => {
                // @ts-ignore
                if (res.error) {
                    return <Alert w="100%" status={'error'}>
                        <Text>Неверный логин или пароль, повторите авторизацию</Text>
                    </Alert>
                } else {
                    try {
                        console.log('Success', 'User signed out');
                    } catch (error: any) {
                        console.log('Error', error.message);
                    }
                    try {
                        console.log('Success', 'User logged in in new acc');
                    } catch (error: any) {
                        console.log('Error', error.message);
                    }
                    // @ts-ignore
                    setCurrentUser(user)
                    dispatch(setPickedAccount(user))
                    AsyncStorage.setItem('currentUser', JSON.stringify(user)).then(() => setIsLoading(false));
                }
            });
        }
    }

    // AsyncStorage.setItem('userAccounts', JSON.stringify([]))
    // AsyncStorage.setItem('currentUser', JSON.stringify({}));
    // AsyncStorage.setItem('auth', 'null');

    return (
        <SafeAreaView style={[{flex: 1}, themeColor === 'light' ? themeStyles.backgroundLight : themeStyles.backgroundDark]}>
            {isLoading && <View style={{position: 'absolute', width: '100%', flex: 1, opacity: 0.8, zIndex: 1}}>
                <ActivityIndicator color={'#e34d4d'} style={{paddingTop: '50%'}} size="large"/>
            </View>}
            <DeleteUserDialog isDelete={isDelete} setIsDelete={setIsDelete} setIsLoading={setIsLoading}
                              pickedAccount={pickedAccount}
                              userData={userData} setUserData={setUserData} setCurrentUser={setCurrentUser}/>
            <BackLink link={'/profile'} label={'Профили'}/>
            <View style={{paddingTop: 20, rowGap: 10}}>
                {userData.map((el, idx: number) =>
                    <View
                        style={[styles.userDataItem, themeColor === 'light' ? themeStyles.backgroundBright : themeStyles.backgroundDarkGrey]}
                        key={idx}>
                        <View style={styles.changeUserBtnWrapper} onTouchEnd={() => {
                            if (el.username !== currentUser.username) {
                                changeCurrentUser(el)
                            }
                        }}>
                            {el.email === currentUser.email ?
                                <Feather name="user-check" size={24} color="#11a808"/> : ''}
                            <Text
                                style={[{fontSize: 20}, themeColor === 'light' ? themeStyles.textLight : themeStyles.textDark]}>{el.username}</Text>
                        </View>
                        <TouchableOpacity style={{zIndex: 1}} onPress={() => {
                            dispatch(setPickedAccount({...el, idx: idx}))
                            setIsDelete(true)
                        }}>
                            <AntDesign name="close" size={35} color="darkgrey"/>
                        </TouchableOpacity>
                    </View>)}
            </View>
            <View style={styles.safeAreaWrapper}>
                <Link href={'/userprofiles/adduser'} asChild>
                    <TouchableOpacity
                        style={styles.addProfileBtn}>
                        <AntDesign name="pluscircleo" size={24} color="#12d94c"/>
                        <Text style={{color: '#12d94c', fontSize: 20}}>Добавить профиль</Text>
                    </TouchableOpacity>
                </Link>
            </View>

        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    userDataItem: {
        paddingRight: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    safeAreaWrapper: {
        position: 'absolute',
        bottom: 30,
        left: 20
    },
    addProfileBtn: {
        flexDirection: 'row',
        columnGap: 10
    },
    changeUserBtnWrapper: {
        width: '85%',
        flexDirection: 'row',
        padding: 20,
        columnGap: 10
    }
});

export default UserProfiles;