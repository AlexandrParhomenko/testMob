import React, {FC} from 'react';
import {Text, TouchableOpacity, View} from "react-native";
import {AlertDialog} from "native-base";
import {Link, useRouter} from "expo-router";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import moment from "moment/moment";

interface IProps {
    isReschedule: boolean,
    setIsReschedule: Function
}

const RescheduleDialog: FC<IProps> = ({isReschedule, setIsReschedule}) => {
    const router = useRouter();

    return (
        <>{isReschedule && <RNDateTimePicker negativeButton={{textColor: '#3a3a3a'}} positiveButton={{label: 'Перенести', textColor: 'green'}} onChange={(event) => {
            setIsReschedule(false)

            if (event.type !== 'dismissed') router.replace('/instructorschedule')
        }} style={{flex: 1}} value={new Date()} mode={'time'}
                             is24Hour locale='ru-RU'/>}</>
    );
};

export default RescheduleDialog;