import React, {FC} from 'react';
import {Image, Text, TouchableOpacity, View} from "react-native";
import themeStyles from "../styles/styles";
import {useSelector} from "react-redux";
import {selectColor} from "../app/store/reducers/themeSlice";
import {Link} from "expo-router";
import moment, {Moment} from "moment";
import {Entypo, Ionicons} from "@expo/vector-icons";

interface ChatBarProps {
    userName: string
    lastMessage: string
    createdAt: Moment
    unreadMessages: number
    chatId: string
    isGroup: boolean
    notifications: boolean
    onPress: Function
}

const ChatBar: FC<ChatBarProps> = ({userName, lastMessage, createdAt, notifications, unreadMessages, chatId, isGroup, onPress, ...props}) => {
    let themeColor = useSelector(selectColor)
    const countTimeDifference = (time: Moment) => {
        let duration = moment.duration(moment().diff(time));
        let minutes = Math.trunc(duration.asMinutes());
        let hours = Math.trunc(duration.asHours());
        let days = Math.trunc(duration.asDays());
        let weeks = Math.trunc(duration.asWeeks());
        let months = Math.trunc(duration.asMonths());
        let years = Math.trunc(duration.asYears());
        return years > 0 ? `${years}г` : months > 0 ? `${months}мес` : weeks > 0 ? `${weeks}нед` : days > 0 ? `${days}д` : hours > 0 ? `${hours}ч` : minutes > 0 ? `${minutes}м` : "<1м"
    }

    return (
            <TouchableOpacity onPress={() => onPress()} {...props} style={{
                padding: 15,
                alignItems: 'center',
                flexDirection: 'row',
                width: '100%',
                justifyContent: 'space-between'
            }}>
                <Image style={{height: 50, width: 50, borderRadius: 50}}
                       source={require('../assets/images/appLogo.png')}/>
                <View style={{flex: 1, rowGap: 5, paddingLeft: 10}}>
                    <View style={{flexDirection: "row", alignItems: "center", columnGap: 5}}>
                        <Text numberOfLines={1} style={[themeColor === 'light' ? themeStyles.textLight : themeStyles.textDark, {
                            fontSize: 15,
                            fontWeight: "bold"
                        }]}>{userName}</Text>
                        {!notifications && <Ionicons name="volume-mute" size={14} color="darkgrey"/>}
                    </View>
                    <View style={{flexDirection: "row", justifyContent: "space-between", paddingRight: 5}}>
                        <Text style={{color: "#707070", flex: 2}} numberOfLines={1}>{lastMessage}</Text>
                        <Entypo style={{paddingTop: 5}} name="dot-single" size={10} color="darkgrey"/>
                        <Text style={{color: 'darkgrey'}}>{countTimeDifference(createdAt)}</Text>
                    </View>
                </View>
                {unreadMessages !== 0 && <View style={{
                    borderRadius: 50,
                    backgroundColor: '#ff957d',
                    width: 20,
                    height: 20,
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <Text style={{color: 'white'}}>{unreadMessages}</Text>
                </View>}
            </TouchableOpacity>
    );
};

export default ChatBar;