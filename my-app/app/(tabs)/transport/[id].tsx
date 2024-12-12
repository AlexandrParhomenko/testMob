import React from 'react';
import {View, Text, StyleSheet} from "react-native";
import {Link, useLocalSearchParams} from "expo-router";
import {Ionicons} from "@expo/vector-icons";
import {Divider} from "react-native-paper";
import {useSelector} from "react-redux";
import {selectColor} from "../../store/reducers/themeSlice";
import CarNumber from "../../../components/CarNumber/CarNumber";
import themeStyles from "../../../styles/styles";
import BackLink from "../../../components/BackLink/BackLink";
import {SafeAreaView} from "react-native-safe-area-context";

const leadPage = () => {
    const {id} = useLocalSearchParams()
    let themeColor = useSelector(selectColor)

    return (
        <SafeAreaView
            style={[themeColor === 'light' ? themeStyles.backgroundLight : themeStyles.backgroundDark, {flex: 1}]}>
            <BackLink link={'/transport'} label={'Карточка ТС'}/>
            <View>
                <View style={styles.transportDataSection}>
                    <View style={{backgroundColor: '#5e5e5e', height: 100, width: 100, borderRadius: 50}}></View>
                    <View style={{rowGap: 10}}>
                        <Text style={[styles.profileField, themeColor === 'light' ? themeStyles.textLight : themeStyles.textDark]}>Tesla Model X</Text>
                        <CarNumber number='КС122Р' region={"55"}/>
                        <View style={{flexDirection: 'row', columnGap: 10}}>
                            <View>
                                <Text style={styles.profileTitle}>Год выпуска</Text>
                                <Text style={[styles.profileField, themeColor === 'light' ? themeStyles.textLight : themeStyles.textDark]}>2020</Text>
                            </View>
                            <View>
                                <Text style={styles.profileTitle}>Тип КПП</Text>
                                <Text style={[styles.profileField, themeColor === 'light' ? themeStyles.textLight : themeStyles.textDark]}>АКПП</Text>
                            </View>
                            <View>
                                <Text style={styles.profileTitle}>Категория</Text>
                                <Text style={[styles.profileField, themeColor === 'light' ? themeStyles.textLight : themeStyles.textDark]}>В</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
            <Divider/>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    tableFont: {
        textAlign: 'center',
        fontFamily: 'BebasNeue',
        fontSize: 18
    },
    profileTitle: {
        fontSize: 14,
        color: '#9a9a9a'
    },
    profileField: {
        fontSize: 18,
    },
    transportCard: {
        paddingTop: 30,
        alignItems: 'center',
        paddingLeft: 20,
        columnGap: 5,
        flexDirection: 'row'
    },
    transportDataSection: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        paddingVertical: 10
    }
});

export default leadPage;