import React from 'react';
import {Image, ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {useSelector} from "react-redux";
import {selectColor} from "../../store/reducers/themeSlice";
import {Link} from "expo-router";
import {Ionicons} from "@expo/vector-icons";
import CarNumber from "../../../components/CarNumber/CarNumber";
import themeStyles from "../../../styles/styles";
import {SafeAreaView} from "react-native-safe-area-context";
import BackLink from "../../../components/BackLink/BackLink";

const Index = () => {
    let themeColor = useSelector(selectColor)

    return (
        <SafeAreaView
            style={[styles.container, themeColor === 'light' ? themeStyles.backgroundLight : themeStyles.backgroundDark]}>
            <BackLink link={"/theory"} label={"Транспортные средства"}/>
            <ScrollView overScrollMode={'never'} style={{rowGap: 10, width: '100%', flex: 2}}>
                <Link asChild href={`/transport/1`}>
                    <TouchableOpacity style={{width: '95%', alignSelf: 'center', overflow: 'hidden'}}>
                        <View style={{backgroundColor: '#99bd9b', borderRadius: 6, flexDirection: 'row', padding: 10, columnGap: 10}}>
                            <Image style={styles.image} source={require('../../../assets/images/teslacar.jpg')}/>
                            <View style={{justifyContent: 'space-evenly'}}>
                                <Text style={{fontSize: 20}}>Tesla Model X</Text>
                                <CarNumber number='АС992Б' region={"55"}/>
                            </View>
                        </View>
                    </TouchableOpacity>
                </Link>
            </ScrollView>
        </SafeAreaView>


    );
};

const styles = StyleSheet.create({
    leadBarWrapper: {
        flexDirection: 'row',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: 'black',
        justifyContent: 'center',
        padding: 10,
    },
    indicator: {
        height: 10,
        width: 10,
        backgroundColor: 'green',
        borderRadius: 50,
    },
    container: {
        alignItems: 'flex-start',
        paddingTop: 10,
        rowGap: 20,
        flex: 1,
        width: '100%'
    },
    branchWrapper: {
        color: '#e34d4d'
    },
    driveStoryBox: {
        width: '100%',
        borderRadius: 5,
        backgroundColor: 'lightgrey',
        alignSelf: 'center',
        marginVertical: 5,
        alignItems: 'flex-start',
        padding: 20,
        flexDirection: 'row',
    },
    image: {
        width: 90,
        height: 90,
        objectFit: 'contain',
        borderRadius: 50
    }
});

export default Index;