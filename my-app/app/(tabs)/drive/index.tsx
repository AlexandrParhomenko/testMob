import React, {useEffect} from 'react';
import {StyleSheet, Text, TouchableOpacity, View, Image, ScrollView, RefreshControl} from "react-native";
import {Avatar} from "react-native-paper";
import {LinearGradient} from "expo-linear-gradient";
import {useSelector} from "react-redux";
import {StatusBar} from "expo-status-bar";
import NotificationHeader from "../../../components/NotificationHeader/NotificationHeader";
import {selectColor} from "../../store/reducers/themeSlice";
import themeStyles from "../../../styles/styles";
import CarNumber from "../../../components/CarNumber/CarNumber";
import {Link} from "expo-router";
import {selectPickedAccount} from "../../store/reducers/authSlice";
import {useLazyGetContractQuery} from "../../services/contractEndpoints";
import ProfileLoader from "../../../components/CustomLoaders/ProfileLoader";
import {SafeAreaView} from "react-native-safe-area-context";

const Drive = () => {
    let themeColor = useSelector(selectColor)
    const account = useSelector(selectPickedAccount)
    const [getContract, {data: contract, isLoading}] = useLazyGetContractQuery()

    useEffect(() => {
        getContract(account.id_reg)
    }, [])

    const refresh = async () => {
        await getContract(account.id_reg)
    }

    if (!contract) return <ProfileLoader/>

    let vehicleData = contract.data.plan_tr_vehicle.replaceAll(",", "").split(" ")
    let number = vehicleData[vehicleData.length - 2]
    let region = vehicleData[vehicleData.length - 1]

    return (
        <SafeAreaView style={[{flex: 1}, themeColor === 'light' ? themeStyles.backgroundLight : themeStyles.backgroundDark]}>
            <StatusBar style={themeColor === 'light' ? 'dark' : 'light'}/>
            <NotificationHeader/>
            <ScrollView refreshControl={<RefreshControl refreshing={isLoading} onRefresh={refresh}/>} style={{flex: 2}}>
                <Text style={[styles.regularFont, {
                    alignSelf: 'flex-start',
                    paddingLeft: 25
                }, themeColor === 'light' ? themeStyles.textLight : themeStyles.textDark]}>Вождение</Text>
                <View style={styles.mainSection}>
                    <View style={styles.userNameWindow}>
                        <Text
                            style={[styles.generalTitle, themeColor === 'light' ? themeStyles.textLight : themeStyles.textDark]}>{contract.data.plan_master_name}</Text>
                        <View style={{flexDirection: 'row', alignItems: 'center', columnGap: 5}}>
                            <Text
                                style={[{fontSize: 17}, themeColor === 'light' ? themeStyles.textLight : themeStyles.textDark]}>Мастер
                                производственного обучения</Text>
                        </View>
                    </View>
                    {contract.data.a_emp_path === undefined ? <Avatar.Image size={100}
                                                                             source={require('../../../assets/images/instructorPhoto.jpeg')}/> :
                        <Image style={{height: 100, width: 100, borderRadius: 50}}
                               source={{uri: contract.data.a_emp_path}}/>}
                </View>
                <LinearGradient colors={["#e7e7e7", "#b2b2b2", "#a9a9a9"]} style={styles.greyShadowBox}>
                    <Text style={[styles.regularFont, {fontSize: 22, letterSpacing: 1}]}>Остатки учебных часов</Text>
                    <View style={{flexDirection: 'row', columnGap: 10, alignItems: 'center'}}>
                        <View style={{backgroundColor: `${contract.data.type_study_hour_color}`, width: 45, borderRadius: 3, alignItems: 'center'}}>
                            <Text style={{color: 'white'}}>{contract.data.type_study_hour_code}</Text>
                            <Text style={{color: 'white'}}>{contract.data.hours_balance}</Text>
                        </View>
                    </View>
                </LinearGradient>
                <View style={{width: '90%', alignSelf: 'center', rowGap: 10, alignItems: 'center'}}>
                    <View style={styles.carDataWrapper}>
                        <Text
                            style={[styles.generalTitle, themeColor === 'light' ? themeStyles.textLight : themeStyles.textDark]}>{vehicleData[0]} {vehicleData[1]}</Text>
                        <CarNumber number={number} region={region}/>
                    </View>
                    <Text
                        style={[{fontSize: 17}, themeColor === 'light' ? themeStyles.textLight : themeStyles.textDark]}>Учебное
                        транспортное средство</Text>

                    {!contract.data.a_tr_vechicle_path ? <Image style={{height: 150, width: '90%', objectFit: 'cover', alignSelf: "center"}}
                                                                      source={require('../../../assets/images/defaultCar.png')}/> :
                        <Image style={{height: 150, width: '90%', objectFit: 'cover', borderRadius: 4}}
                               source={{uri: contract.data.a_tr_vechicle_path}}/>}
                </View>
                <Link asChild href={'/drive/lessonsHistory'}>
                    <TouchableOpacity>
                        <LinearGradient colors={["#e7e7e7", "#b2b2b2", "#a9a9a9"]} style={styles.driveStoryBox}>
                            <Text style={[styles.regularFont, {fontSize: 22, letterSpacing: 1}]}>История вождений</Text>
                            <Text style={{textAlign: 'center'}}>История проведенных практических занятий</Text>
                            <Text style={{textAlign: 'center'}}>Здесь вы можете оставить отзыв и оценить качество
                                обучения</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </Link>
            </ScrollView>


        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    regularFont: {
        textAlign: 'center',
        fontFamily: 'BebasNeue',
        fontSize: 20
    },
    mainSection: {
        alignItems: 'center',
        justifyContent: "space-between",
        flexDirection: 'row',
        paddingHorizontal: 25,
        paddingTop: 20
    },
    userNameWindow: {
        width: '65%',
        alignItems: 'flex-start'
    },
    greyShadowBox: {
        width: '90%',
        borderRadius: 13,
        backgroundColor: 'lightgrey',
        alignSelf: 'center',
        marginVertical: 20,
        alignItems: 'center',
        rowGap: 10,
        padding: 20
    },
    driveStoryBox: {
        width: '90%',
        borderRadius: 15,
        backgroundColor: 'lightgrey',
        alignSelf: 'center',
        marginVertical: 20,
        alignItems: 'center',
        padding: 20
    },
    generalTitle: {
        fontSize: 28,
        flexWrap: 'wrap',
        fontFamily: 'SpaceMono',
        fontWeight: 'bold',
        letterSpacing: 1
    },
    carDataWrapper: {
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        justifyContent: 'space-between'
    }
});

export default Drive;