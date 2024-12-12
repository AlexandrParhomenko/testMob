import React from 'react';
import {MaterialIcons} from "@expo/vector-icons";
import {Text, View} from "react-native";
import themeStyles from "../../styles/styles";

const ServerQueryFailAlert = () => {
    return (
        <View style={{
            alignItems: 'center',
            columnGap: 10,
            position: 'absolute',
            top: '10%',
            zIndex: 10,
            backgroundColor: '#ff8f8f',
            width: '100%',
            padding: 10,
            flexDirection: 'row'
        }}>
            <MaterialIcons name="error-outline" size={24} color="red" />
            <Text style={themeStyles.regularFont}>
                Нет связи с сервером. Повторите запрос позднее
            </Text>
        </View>
    );
};

export default ServerQueryFailAlert;