import React, {FC} from 'react';
import {LinearGradient} from "expo-linear-gradient";
import themeStyles from "../../styles/styles";
import {Text} from "react-native";
import {AntDesign} from "@expo/vector-icons";

interface IProps {
    text: string
}

const LockedStage: FC<IProps> = ({text}) => {

    return (
        <LinearGradient start={[0.9, -0.5]}
                        end={[0.8, 1.5]}
                        colors={['#c9c9c9', '#727272', '#464646']}
                        style={themeStyles.videoBtn}>
            <Text style={[themeStyles.regularFont, {width: '80%'}]}>{text}</Text>
            <AntDesign style={{paddingRight: 10}} name="lock" size={40} color="white"/>
        </LinearGradient>
    );
};

export default LockedStage;