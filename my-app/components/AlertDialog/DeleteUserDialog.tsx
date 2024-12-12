import React, {FC} from 'react';
import {Alert, AlertDialog} from "native-base";
import {Text, TouchableOpacity, View} from "react-native";
import {useRouter} from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useSetAuthMutation} from "../../app/services/authEndpoints";
import {selectPickedAccount, setPickedAccount} from "../../app/store/reducers/authSlice";
import {useDispatch, useSelector} from "react-redux";
import {setRole} from "../../app/store/reducers/roleSlice";

interface IProps {
    isDelete: boolean,
    setIsDelete: Function,
    pickedAccount: any,
    userData: any[],
    setUserData: Function,
    setIsLoading: Function,
    setCurrentUser: Function
}

const DeleteUserDialog: FC<IProps> = ({
                                          isDelete,
                                          setIsDelete,
                                          userData,
                                          setUserData,
                                          setIsLoading,
                                          setCurrentUser
                                      }) => {
    const cancelRef = React.useRef(null);
    const router = useRouter();
    const [setAuth] = useSetAuthMutation();
    const pickedAccount = useSelector(selectPickedAccount)
    const dispatch = useDispatch()

    const changeCurrentUser = async (user: any) => {
        setIsLoading(true)
        const formData = new FormData();
        formData.append("username", user.email);
        formData.append("password", user.password);

        await setAuth(formData).then(res => {
            // @ts-ignore
            if (res.error) {
                return <Alert w="100%" status={'error'}>
                    <Text>Неверный логин или пароль, повторите авторизацию</Text>
                </Alert>
            } else {
                setCurrentUser(user)
                // @ts-ignore
                dispatch(setRole(res.data.data.role_id))
                AsyncStorage.setItem('currentUser', JSON.stringify(user)).then(() => setIsLoading(false));
            }
        });
    }

    const handleUserDelete = async () => {
        if (pickedAccount.idx !== 0) {
            const userList = [...userData]
            userList.splice(pickedAccount.idx, 1)
            setUserData(userList)
            await changeCurrentUser(userList[0])
            await AsyncStorage.setItem('userAccounts', JSON.stringify(userList))
        } else if (userData.length === 1) {
            await AsyncStorage.setItem('userAccounts', JSON.stringify([]))
            await AsyncStorage.setItem('auth', 'null');
            dispatch(setPickedAccount({}))
            router.replace('/userprofiles/adduser')
        } else if (pickedAccount.idx === 0) {
            const userList = [...userData]
            userList.splice(0, 1)
            setUserData(userList)
            await AsyncStorage.setItem('userAccounts', JSON.stringify(userList))
            await changeCurrentUser(userList[0])
        }
    }

    return (
        <AlertDialog leastDestructiveRef={cancelRef} isOpen={isDelete} onClose={() => setIsDelete(false)}>
            <AlertDialog.Content>
                <AlertDialog.CloseButton/>
                <AlertDialog.Header _text={{fontSize: 22}}>Внимание</AlertDialog.Header>
                <AlertDialog.Body style={{alignItems: 'center', rowGap: 20}}>
                    <Text style={{padding: 10, fontSize: 20}}>Удалить профиль?</Text>
                    <View style={{columnGap: 10, alignItems: 'center', flexDirection: 'row'}}>
                        <TouchableOpacity style={{borderRadius: 4, borderWidth: 1, borderColor: '#e34d4d'}}
                                          onPress={() => {
                                              handleUserDelete()
                                              setIsDelete(false)
                                          }}>
                            <Text style={{color: '#e34d4d', fontSize: 16, padding: 5}}
                                  ref={cancelRef}>
                                Удалить
                            </Text>
                        </TouchableOpacity>
                        <Text style={{color: '#3a3a3a', fontSize: 16}} onPress={() => setIsDelete(false)}>
                            Отмена
                        </Text>
                    </View>
                </AlertDialog.Body>
            </AlertDialog.Content>
        </AlertDialog>
    );
};

export default DeleteUserDialog;