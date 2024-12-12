import React, {FC, useState} from 'react';
import {ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {Searchbar} from "react-native-paper";
import {LinearGradient} from "expo-linear-gradient";
import {useSelector} from "react-redux";
import {selectColor} from "../../app/store/reducers/themeSlice";
import {Ionicons} from "@expo/vector-icons";
import SignStudentDialog from "../AlertDialog/SignStudentDialog";
import {useGetContractsQuery} from "../../app/services/contractEndpoints";
import ProfileLoader from "../CustomLoaders/ProfileLoader";
import moment from "moment";
import {Contract, EmptySlot} from "../../app/types/types";

interface IProps {
    setIsSignStudent: Function
    pickedSlot: EmptySlot
}

const SignStudentComponent: FC<IProps> = ({setIsSignStudent, pickedSlot}) => {
    let themeColor = useSelector(selectColor)
    const {data: contracts} = useGetContractsQuery(50)
    const [value, setValue] = useState<string>('')
    const [isConfirmSign, setIsConfirmSign] = useState<boolean>(false)
    const [pickedContract, setPickedContract] = useState<Contract>({} as Contract)

    if (!contracts) {
        return <ProfileLoader/>
    }

    return (
        <View style={[styles.container, themeColor === 'light' ? styles.backgroundLight : styles.backgroundDark]}>
            <SignStudentDialog pickedSlot={pickedSlot} pickedContract={pickedContract} isConfirmSign={isConfirmSign} setIsConfirmSign={setIsConfirmSign}/>
            <TouchableOpacity
                onPress={() => {setIsSignStudent(false)}}
                style={{
                    width: '100%',
                    paddingTop: 40,
                    alignItems: 'center',
                    paddingLeft: 20,
                    columnGap: 5,
                    flexDirection: 'row'
                }}>
                <Ionicons name="arrow-back" size={24} color={themeColor === 'light' ? 'black' : 'white'}/>
                <Text
                    style={[styles.regularFont, themeColor === 'light' ? styles.textLight : styles.textDark]}>Курсанты</Text>
            </TouchableOpacity>
            <Searchbar
                placeholder="Поиск"
                style={[{width: '80%', borderRadius: 5}, themeColor === 'light' ? {alignSelf: 'center'} : {backgroundColor: '#656565'}]}
                iconColor={themeColor === 'light' ? 'black' : '#bebebe'}
                onChangeText={(e) => setValue(e)}
                value={value}
                placeholderTextColor={themeColor === 'light' ? 'black' : '#bebebe'}
                theme={{colors: {onSurfaceVariant: themeColor === 'light' ? 'black' : '#bebebe'}}}
            />
            <ScrollView overScrollMode={'never'} style={{rowGap: 5, width: '100%', flex: 2}}>
                {contracts.data.map((el, idx) => <TouchableOpacity key={idx} onPress={() => {
                    setPickedContract(el)
                    setIsConfirmSign(true)
                }} style={{width: '90%', alignSelf: 'center'}}>
                    <LinearGradient colors={["#f1f1f1", "#c7c7c7", "#bdbdbd"]} style={styles.driveStoryBox}>
                        <View style={{width: '50%'}}>
                            <View style={{alignItems: 'center', columnGap: 5, flexDirection: 'row'}}>
                                <View style={styles.indicator}></View>
                                <Text style={{color: '#3d3d3d'}} numberOfLines={1}>{el.student_name_from_leads}</Text>
                            </View>
                            <Text style={{color: '#5d5d5d'}}>{el.tr_group_number}</Text>
                            <Text style={{color: '#5d5d5d'}}>Обучение до {el.end_date ? moment(el.end_date).format("DD.MM.YYYY") : "-"}</Text>
                        </View>
                        <View style={{flex: 4, alignItems: 'center'}}>
                            <Text style={{fontSize: 11, color: '#5d5d5d'}}>Остаток / Всего / Запись</Text>
                            <Text style={{fontSize: 25}}>46 / 47 / 0</Text>
                        </View>
                    </LinearGradient>
                </TouchableOpacity>)}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    leadBarWrapper: {
        flexDirection: 'row',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: 'black',
        justifyContent: 'center',
        padding: 10,
    },
    backgroundLight: {
        backgroundColor: 'white'
    },
    backgroundDark: {
        backgroundColor: '#1a1a1a'
    },
    indicator: {
        height: 10,
        width: 10,
        backgroundColor: 'green',
        borderRadius: 50,
    },
    container: {
        alignItems: 'center',
        paddingTop: 10,
        rowGap: 20,
        flex: 1,
        width: '100%'
    },
    branchWrapper: {
        color: '#e34d4d'
    },
    driveStoryBox: {
        width: '100%',
        borderRadius: 5,
        backgroundColor: 'lightgrey',
        alignSelf: 'center',
        marginVertical: 5,
        alignItems: 'flex-start',
        padding: 20,
        flexDirection: 'row',
    },
    textLight: {
        color: 'black'
    },
    textDark: {
        color: 'white'
    },
    regularFont: {
        textAlign: 'center',
        fontFamily: 'BebasNeue',
        fontSize: 20
    },
});

export default SignStudentComponent;