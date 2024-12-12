import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from "react-native";
import {AntDesign} from "@expo/vector-icons";
import DeleteDialog from "../AlertDialog/DeleteDialog";
import RescheduleDialog from "../AlertDialog/RescheduleDialog";
import PushDialog from "../AlertDialog/PushDialog";

const EmptySlotSelect = () => {
    const [open, setOpen] = useState<boolean>(false)
    const [isDelete, setIsDelete] = useState<boolean>(false)
    const [isReschedule, setIsReschedule] = useState<boolean>(false)
    const [isPush, setIsPush] = useState<boolean>(false)

    return (
        <>
            <DeleteDialog isDelete={isDelete} setIsDelete={setIsDelete}/>
            <RescheduleDialog isReschedule={isReschedule} setIsReschedule={setIsReschedule}/>
            <PushDialog isPush={isPush} setIsPush={setIsPush}/>
            <View onTouchEnd={() => setOpen(!open)} style={styles.selectContainer}>
                {open ? <View style={styles.selectSection}>
                    <Text onPress={() => setIsDelete(true)} style={styles.selectFont}>Удалить слот</Text>
                    <Text onPress={() => setIsReschedule(true)} style={styles.selectFont}>Перенести занятие</Text>
                    <View style={styles.selectArrowSection}>
                        <Text onPress={() => setIsPush(true)} style={styles.selectFont}>Уведомить курсантов</Text>
                        <AntDesign name="down" size={24} color="lightgrey"/>
                    </View>
                </View> : <TouchableOpacity style={styles.selectArrowSection}>
                    <Text style={styles.selectFont}>Действия</Text>
                    <AntDesign name="up" size={24} color="lightgrey"/>
                </TouchableOpacity>}
            </View>
        </>

    );
};

const styles = StyleSheet.create({
    selectContainer: {
        width: '90%',
        backgroundColor: '#252525',
        borderRadius: 5,
        rowGap: 20,
        flexDirection: 'column',
        paddingHorizontal: 20,
        paddingVertical: 15,
        position: 'absolute',
        bottom: -60
    },
    selectArrowSection: {
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row'
    },
    selectSection: {
        flexDirection: 'column',
        rowGap: 20
    },
    selectFont: {
        color: 'white',
        fontSize: 20
    },
    regularFont: {
        textAlign: 'center',
        fontFamily: 'BebasNeue',
        fontSize: 20
    },
    backgroundLight: {
        backgroundColor: 'white'
    },
    backgroundDark: {
        backgroundColor: '#1a1a1a'
    },
    textLight: {
        color: 'black'
    },
    textDark: {
        color: 'white'
    },
});

export default EmptySlotSelect;