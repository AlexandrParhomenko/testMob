import React, {FC} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import {AntDesign} from "@expo/vector-icons";

interface IParticipant {
    admin: boolean
    employee: boolean
    canBeDeleted: boolean
    onDelete?: Function
    name: string
}

const Participant: FC<IParticipant> = ({admin, employee, canBeDeleted, name, onDelete, ...props}) => {
    return (
        <View
            style={{flexDirection: "row", padding: 15, columnGap: 10}} {...props}>
            <View style={styles.userIconWrapper}>
                <FontAwesome name="user" size={24} color="#f1f1f1"/>
            </View>
            <View style={{rowGap: 5, flex: 1}}>
                <View style={styles.deleteUserIconWrapper}>
                    <Text numberOfLines={1} style={{fontSize: 16}}>{name}</Text>
                    {canBeDeleted &&
                    // {(chat.admin === account.id_reg && account.id_reg !== parseInt(el.id.split("_")[1])) &&
                    //     <TouchableOpacity onPress={() => deleteUserFromGroup(el, "admin")}>
                        <TouchableOpacity onPress={() => onDelete && onDelete()}>
                            <AntDesign name="deleteuser" size={30} color="#ead891"/>
                        </TouchableOpacity>}
                </View>
                <View style={{flexDirection: "row", columnGap: 10}}>
                    {admin && <View style={[styles.participantBatch, styles.peach]}><Text style={{color: "white"}}>Админ</Text></View>}
                    {/*{chat.admin === parseInt(el.id.split('_')[1]) && <View style={[styles.participantBatch, styles.peach]}><Text style={{color: "white"}}>Админ</Text></View>}*/}
                    {/*{el.id[0] === "e" && <View style={[styles.participantBatch, styles.orange]}><Text style={{color: "white"}}>Сотрудник</Text></View>}*/}
                    {employee && <View style={[styles.participantBatch, styles.orange]}><Text style={{color: "white"}}>Сотрудник</Text></View>}
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    userIconWrapper: {
        backgroundColor: "rgb(201,209,217)",
        borderRadius: 50,
        height: 50,
        width: 50,
        alignItems: "center",
        justifyContent: "center"
    },
    peach: {
        backgroundColor: "#ff957d"
    },
    orange: {
        backgroundColor: "#ffc913"
    },
    participantBatch: {
        borderRadius: 5,
        backgroundColor: "#ff957d",
        alignItems: "center",
        justifyContent: "center",
        padding: 5
    },
    deleteUserIconWrapper: {
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "space-between",
        flex: 2
    },
});

export default Participant;