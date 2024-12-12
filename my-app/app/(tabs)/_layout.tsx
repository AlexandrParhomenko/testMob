import FontAwesome from '@expo/vector-icons/FontAwesome';
import {Tabs, usePathname} from 'expo-router';
import {useColorScheme, View, ImageBackground, StyleSheet} from 'react-native';
import Colors from '../../constants/Colors';
import {AntDesign, FontAwesome5, Ionicons, MaterialCommunityIcons, MaterialIcons} from "@expo/vector-icons";
import React from "react";
import {useSelector} from "react-redux";
import {selectPickedAccount} from "../store/reducers/authSlice";
import {selectColor} from "../store/reducers/themeSlice";

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */


export default function TabLayout() {
    const colorScheme = useColorScheme();
    const themeColor = useSelector(selectColor)
    const pickedAccount = useSelector(selectPickedAccount)
    const role = pickedAccount.role_id
    const router = usePathname()

    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
                headerShown: false,
                tabBarStyle: {backgroundColor: themeColor === "light" ? '#1f1f1f' : "#383838", display: router.includes('/theory/schoolLib') ? 'none' : 'flex'},
            }}>
            <Tabs.Screen
                name="instructorschedule"
                redirect={role !== 1}
                options={{
                    tabBarActiveTintColor: '#ff0000',
                    tabBarInactiveTintColor: 'white',
                    title: 'Расписание',
                    href: role === 1 ? 'instructorschedule' : null,
                    tabBarIcon: ({color}) => <MaterialCommunityIcons name="calendar-edit" size={30} color={color}/>,
                }}
            />
            <Tabs.Screen
                name="drive"
                redirect={role !== 2}
                options={{
                    tabBarActiveTintColor: '#ff0000',
                    tabBarInactiveTintColor: 'white',
                    title: 'Вождение',
                    href: role === 2 ? 'drive' : null,
                    tabBarIcon: ({color}) => <FontAwesome5 name="car" size={30} color={color}/>,
                }}
            />
            <Tabs.Screen
                name="leads"
                redirect={role !== 3}
                options={{
                    tabBarActiveTintColor: '#ff0000',
                    tabBarInactiveTintColor: 'white',
                    title: 'Лиды',
                    href: role === 3 ? 'leads' : null,
                    tabBarIcon: ({color}) => <FontAwesome name="handshake-o" size={30} color={color}/>,
                }}
            />
            <Tabs.Screen
                name="stats"
                options={{
                    tabBarActiveTintColor: '#ff0000',
                    tabBarInactiveTintColor: 'white',
                    title: 'Статистика',
                    href: role === 4 ? 'stats' : null,
                    tabBarIcon: ({color}) => <Ionicons name="stats-chart-outline" size={30} color={color}/>,
                }}
            />
            <Tabs.Screen
                name="payment"
                options={{
                    tabBarActiveTintColor: '#ff0000',
                    tabBarInactiveTintColor: 'white',
                    title: 'Оплата',
                    href: role === 2 ? 'payment' : null,
                    tabBarIcon: ({color}) => <Ionicons name="wallet-outline" size={30} color={color}/>,
                }}
            />
            <Tabs.Screen
                name="contracts"
                options={{
                    tabBarActiveTintColor: '#ff0000',
                    tabBarInactiveTintColor: 'white',
                    title: 'Договоры',
                    href: role === 3 ? 'contracts' : null,
                    tabBarIcon: ({color}) => <AntDesign name="filetext1" size={30} color={color}/>,
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    href: null,
                    tabBarActiveTintColor: '#ff0000',
                    tabBarInactiveTintColor: 'white',
                    title: '',
                    tabBarIcon: ({color}) => <AntDesign name="home" size={30} color={color}/>,
                }}
            />
            <Tabs.Screen
                name="main"
                options={{
                    tabBarActiveTintColor: '#ff0000',
                    tabBarInactiveTintColor: 'white',
                    title: '',
                    href: role === 2 ? 'main' : null,
                    tabBarIcon: ({color}) => <View style={[styles.mainLogoWrapper, {backgroundColor: themeColor === "light" ? "#1f1f1f" : "#383838"}]}><ImageBackground
                        resizeMode='contain'
                        tintColor={color}
                        source={require('../../assets/images/whiteLogoV.png')}
                        style={{height: 45, width: 45}}/></View>,
                }}
            />
            <Tabs.Screen
                name="groups"
                options={{
                    tabBarActiveTintColor: '#ff0000',
                    tabBarInactiveTintColor: 'white',
                    title: 'Группы',
                    href: role === 3 ? 'groups' : null,
                    tabBarIcon: ({color}) => <MaterialIcons name="groups" size={35} color={color}/>,
                }}
            />
            <Tabs.Screen
                name="schedule"
                options={{
                    tabBarActiveTintColor: '#ff0000',
                    tabBarInactiveTintColor: 'white',
                    title: 'Расписание',
                    href: role === 2 ? 'schedule' : null,
                    tabBarIcon: ({color}) => <AntDesign name="calendar" size={30} color={color}/>,
                }}
            />

            <Tabs.Screen
                name="students"
                options={{
                    tabBarActiveTintColor: '#ff0000',
                    tabBarInactiveTintColor: 'white',
                    title: 'Курсанты',
                    href: role === 1 ? 'students' : null,
                    tabBarIcon: ({color}) => <AntDesign name="contacts" size={30} color={color}/>,
                }}
            />
            <Tabs.Screen
                name="theory"
                options={{
                    tabBarActiveTintColor: '#ff0000',
                    tabBarInactiveTintColor: 'white',
                    title: 'Библиотека',
                    href: role !== 4 ? 'theory' : null,
                    tabBarIcon: ({color}) => <AntDesign name="book" size={30} color={color}/>,
                }}
            />
            <Tabs.Screen
                name="transport"
                options={{
                    tabBarActiveTintColor: '#ff0000',
                    tabBarInactiveTintColor: 'white',
                    title: '',
                    href: null,
                    tabBarIcon: ({color}) => <AntDesign name="book" size={30} color={color}/>,
                }}
            />
            <Tabs.Screen
                name="commonmaterials"
                options={{
                    tabBarActiveTintColor: '#ff0000',
                    tabBarInactiveTintColor: 'white',
                    title: '',
                    href: null,
                    tabBarIcon: ({color}) => <AntDesign name="book" size={30} color={color}/>,
                }}
            />
            <Tabs.Screen
                name="userprofiles"
                options={{
                    href: null,
                    tabBarActiveTintColor: '#ff0000',
                    tabBarInactiveTintColor: 'white',
                    title: '',
                    tabBarStyle: {display: 'none'},
                    tabBarIcon: ({color}) => <AntDesign name="home" size={30} color={color}/>,
                }}
            />
        </Tabs>

    );
}

const styles = StyleSheet.create({
    shadow: {
        padding: 10,
    },
    mainLogoWrapper: {
        position: 'relative',
        borderRadius: 25,
        paddingBottom: 10,
        height: 70,
        width: 100,
        alignItems: 'center',
        justifyContent: 'center'
    },
    logoMargin: {
        marginBottom: -20
    }
});


