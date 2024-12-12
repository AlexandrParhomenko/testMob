import React, {FC} from 'react';
import {Text, View} from "react-native";

interface IProps {
    number: string,
    region: string
}

const CarNumber: FC<IProps> = ({number, region}) => {
    return (
        <View style={{
            borderWidth: 1,
            borderColor: 'black',
            height: 40,
            borderRadius: 3,
            backgroundColor: 'white',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexDirection: 'row',
            columnGap: 5,
            width: 150
        }}>
            <Text style={{fontSize: 23, paddingLeft: 5}}>{number}</Text>
            <View style={{
                borderLeftWidth: 1,
                borderColor: 'black',
                width: 55,
                height: 40,
                borderRadius: 3,
                borderTopLeftRadius: 0,
                borderBottomLeftRadius: 0,
                alignItems: 'center',
            }}>
                <Text>{region}</Text>
                <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center', columnGap: 2}}>
                    <Text>RUS</Text>
                    <View style={{height: 11, width: 16, borderWidth: 1, borderColor: 'black', borderRadius: 1, overflow: 'hidden'}}>
                        <View style={{backgroundColor: 'white', width: 18, height: 3}}></View>
                        <View style={{backgroundColor: '#0000ff', width: 18, height: 3}}></View>
                        <View style={{backgroundColor: '#ff0000', width: 18, height: 3}}></View>
                    </View>
                </View>
            </View>
        </View>
    );
};

export default CarNumber;