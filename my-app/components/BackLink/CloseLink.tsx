import React, {FC} from 'react';
import {Text, TouchableOpacity} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import themeStyles from "../../styles/styles";
import {useSelector} from "react-redux";
import {selectColor} from "../../app/store/reducers/themeSlice";

interface IProps {
    label: string
    onClose: Function
    onTouch?: Function
}

const CloseLink: FC<IProps> = ({onClose, onTouch, label, ...props}) => {
    let themeColor = useSelector(selectColor)

    return (
        <TouchableOpacity
            {...props}
            onPress={() => onClose()}
            style={{
                alignItems: 'center',
                paddingLeft: 20,
                columnGap: 5,
                flexDirection: 'row',
                alignSelf: 'flex-start',
                paddingTop: 10,
                paddingBottom: 10,
                width: '100%'
            }}>
            <Ionicons name="arrow-back" size={24} color={themeColor === 'light' ? 'black' : 'white'}/>
            <Text
                style={[themeStyles.regularFont, themeColor === 'light' ? themeStyles.textLight : themeStyles.textDark]}>{label}</Text>
        </TouchableOpacity>
    );
};

export default CloseLink;