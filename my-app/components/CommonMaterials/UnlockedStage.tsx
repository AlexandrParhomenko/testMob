import React, {FC} from 'react';
import {LinearGradient} from "expo-linear-gradient";
import themeStyles from "../../styles/styles";
import {Text, TouchableOpacity} from "react-native";

interface IProps {
    text: string
    onPress: Function
}

const UnlockedStage: FC<IProps> = ({text, onPress}) => {
    return (
        <TouchableOpacity onPress={() => onPress()}>
            <LinearGradient start={[0.9, -0.5]}
                            end={[0.8, 1.5]}
                            colors={['#7a1818', '#771b1b', 'red']}
                            style={themeStyles.videoBtn}>
                <Text
                    style={[themeStyles.regularFont, {width: '100%'}]}>{text}</Text>
            </LinearGradient>
        </TouchableOpacity>
    );
};

export default UnlockedStage;