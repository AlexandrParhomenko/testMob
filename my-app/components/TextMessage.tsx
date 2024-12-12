import React, {FC} from 'react';
import {View, Text} from "react-native";
import moment, {Moment} from "moment";
import themeStyles from "../styles/styles";
import {Feather, Ionicons} from "@expo/vector-icons";
import momenttz from 'moment-timezone';

interface IMessage {
    message: IProps
    type: "self" | "else"
}

interface IProps {
    status: "sent" | "delivered" | "read"
    text: string
    senderName: string
    type: string
    createdAt: Moment
}

const TextMessage: FC<IMessage> = ({type, message, ...props}) => {
    let tz = momenttz.tz.guess()

    return (
        <>
            {message.type !== "system" ? <View {...props} style={[type === "self" ? {backgroundColor: "#ff957d", alignSelf: "flex-end"}
                : {backgroundColor: "#b6b6b6", alignSelf: "flex-start"}, themeStyles.chatBubble]}>
                {message.senderName && type === "else" && <Text style={{color: "white", fontSize: 12}}>{message.senderName}</Text>}
                <Text style={{color: "white", textAlign: "left"}}>{message.text}</Text>
                <View style={{flexDirection: "row", columnGap: 5, alignSelf: "flex-end"}}>
                    <Text style={{color: "white", textAlign: "right", fontSize: 12}}>{moment(message.createdAt).format("DD.MM.YYYY") === moment().format("DD.MM.YYYY") ? moment(message.createdAt).tz(tz).format("HH:mm") : message.createdAt.tz(tz).format("DD.MM.YYYY HH:mm")}</Text>
                    {type === "self" ? message.status === "sent" ? <Feather name="check" size={16} color="white"/>
                        : <Ionicons name="checkmark-done" size={16} color={message.status === "delivered" ? "white" : "green"}/> : ""}
                </View>
            </View> : <View {...props} style={{paddingVertical: 10}}>
                <Text style={{color: "#ababab", textAlign: "left"}}>{message.text}</Text>
                <Text style={{color: "#cccccc"}}>{moment(message.createdAt).format("DD.MM.YYYY HH:mm")}</Text>
            </View>}
        </>

    );
};


export default TextMessage;
