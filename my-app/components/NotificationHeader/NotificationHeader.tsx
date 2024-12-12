import React from 'react';
import {StyleSheet, TouchableOpacity, View, SafeAreaView} from "react-native";
import {Link} from "expo-router";
import {AntDesign} from "@expo/vector-icons";
import {useSelector} from "react-redux";
import {selectColor} from "../../app/store/reducers/themeSlice";

const NotificationHeader = () => {
    let themeColor = useSelector(selectColor)

    return (
        <SafeAreaView style={{zIndex: 10}}>
            <View style={[styles.headerBox, {marginTop: 10, paddingBottom: 7}]}>
                <Link href={'/profile'} asChild>
                    <TouchableOpacity style={{borderRadius: 50, borderWidth: 1.5, padding: 2, borderColor: themeColor === 'light' ? 'black' : 'lightgrey'}}>
                            <AntDesign name="user" size={23} color={themeColor === 'light' ? 'black' : 'lightgrey'} />
                    </TouchableOpacity>
                </Link>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    amount: {
        color: 'white',
    },
    headerBox: {
        paddingBottom: 5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 25
    },
    noticeAmount: {
        position: 'absolute',
        top: 17,
        right: -7,
        backgroundColor: 'red',
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
        width: 20,
        height: 20
    },
})

export default NotificationHeader;