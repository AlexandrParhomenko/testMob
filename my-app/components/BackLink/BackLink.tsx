import React, {FC} from 'react';
import {Text, TouchableOpacity} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import {Link} from "expo-router";
import {useSelector} from "react-redux";
import {selectColor} from "../../app/store/reducers/themeSlice";
import themeStyles from "../../styles/styles";

interface IProps {
    link: string
    label: string
    onTouch?: Function
}

const BackLink: FC<IProps> = ({link, label, onTouch}) => {
    let themeColor = useSelector(selectColor)

    return (
        <Link href={`${link}`} asChild>
            <TouchableOpacity
                onPress={() => onTouch ? onTouch() : {}}
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
                <Ionicons name="arrow-back" size={24} color={themeColor === 'light' ? 'black' : 'lightgrey'}/>
                <Text
                    style={[themeStyles.regularFont, themeColor === 'light' ? themeStyles.textLight : themeStyles.textDark]}>{label}</Text>
            </TouchableOpacity>
        </Link>
    );
};

export default BackLink;