import React, {FC} from 'react';
import {Select} from "native-base";
import {StyleSheet, Text, View} from "react-native";
import {
    GetPracticeByIdResponse,
    HoursTypesResponse,
    TrainingPlacesResponse,
    TrainingVehiclesResponse
} from "../../app/types/types";
import {useSelector} from "react-redux";
import {selectColor} from "../../app/store/reducers/themeSlice";
import themeStyles from "../../styles/styles";

interface IProps {
    student: any
    hours: HoursTypesResponse
    vehicles: TrainingVehiclesResponse
    grounds: TrainingPlacesResponse
    ground: string
    setGround: Function
    transport: string
    setTransport: Function
    driveType: string
    setDriveType: Function
}

const InstructorSelect: FC<IProps> = ({
                                          hours,
                                          student,
                                          vehicles,
                                          grounds,
                                          ground,
                                          setGround,
                                          transport,
                                          setTransport,
                                          driveType,
                                          setDriveType
                                      }) => {
    let themeColor = useSelector(selectColor)

    return (
        <>
            <Select
                defaultValue={student.data.type_study_hour_name || ""}
                width={'90%'}
                fontSize={20}
                _actionSheetContent={themeColor === 'light' ? themeStyles.backgroundLight : themeStyles.selectDark}
                _item={themeColor === 'light' ? themeStyles.backgroundLight : themeStyles.selectDark}
                color={themeColor === 'light' ? 'black' : 'white'}
                onValueChange={(itemValue: string) => setDriveType(itemValue)}>
                {hours.data.map(el =>
                    <Select.Item key={el.type_study_hour_name}
                                 value={el.type_study_hour_name}
                                 label={el.type_study_hour_name}
                                 color={themeColor === 'light' ? 'black' : 'white'}
                                 _text={themeColor === 'light' ? themeStyles.textLight : themeStyles.textDark}
                                 leftIcon={<View
                                     style={[styles.selectIcon, {backgroundColor: el.color}]}>
                                     <Text style={{
                                         color: 'white',
                                         marginTop: 2,
                                         fontSize: 18
                                     }}>{el.type_study_hour_code[0]}</Text>
                                 </View>}/>)}
            </Select>
            <Select
                placeholder={'Без учебного ТС'}
                defaultValue={student.data.tr_vehicle_id && student.data.tr_vehicle_id.toString() || ""}
                width={'90%'}
                fontSize={20}
                color={themeColor === 'light' ? 'black' : 'white'}
                _actionSheetContent={themeColor === 'light' ? themeStyles.backgroundLight : themeStyles.selectDark}
                _item={themeColor === 'light' ? themeStyles.backgroundLight : themeStyles.selectDark}
                // onValueChange={(itemValue: string) => itemValue !== 'null' ? setTransport(itemValue) : setTransport('')}
            >
                <Select.Item label="Все учебные ТС"
                             _text={themeColor === 'light' ? themeStyles.textLight : themeStyles.textDark}
                             value={'null'}/>
                {vehicles.data.map(el =>
                    <Select.Item key={el.reg_number}
                                 _text={themeColor === 'light' ? themeStyles.textLight : themeStyles.textDark}
                                 label={`${el.tr_vehicle_brand} ${el.tr_vehicle_model}`}
                                 value={el.tr_vehicle_id.toString()}/>)}
            </Select>
            <Select
                placeholder={'Площадка не выбрана'}
                defaultValue={student.data.tr_place_id && student.data.tr_place_id.toString() || ""}
                _text={{color: ground === 'Выбирается курсантом' ? '#e34d4d' : 'black'}}
                color={ground === 'Выбирается курсантом' ? '#e34d4d' : themeColor === 'light' ? 'black' : 'white'}
                _item={{
                    startIcon: <View style={{height: 25, width: 25, backgroundColor: 'transparent'}}></View>,
                    backgroundColor: themeColor === 'light' ? 'white' : '#363636'
                }}
                _actionSheetContent={themeColor === 'light' ? themeStyles.backgroundLight : themeStyles.selectDark}
                width={'90%'}
                fontSize={20}
                // onValueChange={(itemValue: string) => itemValue !== 'null' ? setGround(itemValue) : setGround('')}
            >
                <Select.Item _text={{fontStyle: 'italic', color: themeColor === 'light' ? 'black' : 'white'}} label="Площадка не выбрана" value='null'/>
                <Select.Item label="Выбирается курсантом"
                             value='Выбирается курсантом'
                             _text={themeColor === 'light' ? themeStyles.textLight : themeStyles.textDark}
                             leftIcon={<View style={{
                                 backgroundColor: '#e34d4d',
                                 height: 25,
                                 width: 25,
                                 borderRadius: 3,
                                 position: 'relative'
                             }}></View>}/>
                {grounds.data.map(el => <Select.Item key={el.tr_place_name}
                                                     _text={themeColor === 'light' ? themeStyles.textLight : themeStyles.textDark}
                                                     label={el.tr_place_name}
                                                     value={el.tr_place_id.toString()}/>)}
            </Select>
        </>
    );
};

const styles = StyleSheet.create({
    selectIcon: {
        paddingBottom: 5,
        borderRadius: 4,
        height: 30,
        width: 30,
        alignItems: 'center'
    },
});

export default InstructorSelect;