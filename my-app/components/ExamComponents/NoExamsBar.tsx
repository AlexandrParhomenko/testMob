import React, {FC} from 'react';
import {Text, View} from "react-native";
import themeStyles from "../../styles/styles";

interface IBar {
    themeColor: string
}

const NoExamsBar: FC<IBar> = ({themeColor}) => {
    return (
        <View style={{alignItems: 'center', paddingTop: '30%'}}>
            <Text style={[themeStyles.regularFont, {color: themeColor === 'light' ? 'black' : 'white'}]}>Нет
                доступных экзаменов</Text>
        </View>
    );
};

export default NoExamsBar;