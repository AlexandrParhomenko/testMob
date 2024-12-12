import React, {FC, ReactNode} from 'react';
import {StyleSheet, Text, View} from "react-native";
import themeStyles from "../../styles/styles";
import {LinearGradient} from "expo-linear-gradient";

interface IProps {
    text: string
    icon?: ReactNode
    colors: string[]
}

const GradientButton: FC<IProps> = ({text, icon, colors, ...props}) => {
    return (
        <LinearGradient start={[0.9, -0.5]}
                        end={[0.8, 1.5]}
                        style={styles.enterButton}
                        colors={colors}
        >
            <View {...props} style={{flexDirection: 'row', columnGap: 10, alignItems: 'center'}}>
                <Text style={themeStyles.regularFont}>{text}</Text>
                {icon}
            </View>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    enterButton: {
        width: '90%',
        alignSelf: 'center',
        borderRadius: 40,
        backgroundColor: '#e30000',
        padding: 10,
        alignItems: 'center',
    },
});

export default GradientButton;