import React, {useEffect, useState} from 'react';
import {
    StyleSheet, TouchableOpacity,
    View, Text, ScrollView, ActivityIndicator, BackHandler
} from "react-native";
import {useSelector} from "react-redux";
import {selectColor} from "../../../store/reducers/themeSlice";
import themeStyles from "../../../../styles/styles";
import BackLink from "../../../../components/BackLink/BackLink";
import {LinearGradient} from "expo-linear-gradient";
import {router, useNavigation} from "expo-router";
import {AnimatedCircularProgress} from 'react-native-circular-progress';
import AsyncStorage from "@react-native-async-storage/async-storage";
import {TrainingStage, VideoStorageItem} from "../../../types/types";
import {useGetUserProgressQuery, useLazyGetTrainingStagesQuery} from "../../../services/examEndpoints";
import {selectPickedAccount} from "../../../store/reducers/authSlice";
import {useLazyGetContractQuery} from "../../../services/contractEndpoints";
import TheoryStagesLoader from "../../../../components/CustomLoaders/TheoryStagesLoader";
import StepMaterials from "../../../../components/CommonMaterials/StepMaterials";
import UnlockedStage from "../../../../components/CommonMaterials/UnlockedStage";
import LockedStage from "../../../../components/CommonMaterials/LockedStage";
import {SafeAreaView} from "react-native-safe-area-context";

const Index = () => {
    const themeColor = useSelector(selectColor)
    const account = useSelector(selectPickedAccount)
    const [percentFill, setPercentFill] = useState<number>(0)
    const [minutes, setMinutes] = useState<number>(0)
    const [videos, setVideos] = useState<VideoStorageItem[]>([{isWatched: false, watchedInSeconds: 0}])
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [openStep, setOpenStep] = useState<boolean>(false)
    const [pickedStage, setPickedStage] = useState<TrainingStage>({} as TrainingStage)
    const [getStages, {data: stages}] = useLazyGetTrainingStagesQuery()
    const [getContract, {data: contract}] = useLazyGetContractQuery()
    const {data: progress} = useGetUserProgressQuery(account.id_reg)

    // const getPercentage = () => {
    //     let reduce = videos.reduce((el, acc, id) => el + (acc.isWatched ? videoData[id].duration : acc.watchedInSeconds), 0)
    //     setPercentFill(Math.trunc(reduce / 60 / 38 * 100))
    //     setMinutes(Math.trunc(reduce / 60))
    // }

    // AsyncStorage.setItem('watchedVideos', JSON.stringify([{"isWatched": false, "watchedInSeconds": 915}]))

    useEffect(() => {
        getContract(account.id_reg).then(res => {
            if (res.data) {
                getStages(res.data.data.tr_method_id)
            }
        })
    }, [account])

    const getStorageData = async () => {
        await AsyncStorage.getItem('watchedVideos').then(res => typeof res === "string"
            ? setVideos(JSON.parse(res))
            : AsyncStorage.setItem('watchedVideos', JSON.stringify([{
                watchedInSeconds: 0,
                isWatched: false
            }])))
        let secSum = videos.reduce((acc, el) => acc + el.watchedInSeconds, 0)
        setPercentFill(Math.trunc(secSum / (38 * 60) * 100))
    }

    useEffect(() => {
        // getStorageData().then(() => setIsLoading(false)).then(() => getPercentage())
        getStorageData().then(() => setIsLoading(false))
    }, [isLoading])

    useEffect(() => {
            const backAction = () => {
                if (openStep) {
                    setOpenStep(false)
                } else router.replace('/theory')
                return true
            }
            const backHandler = BackHandler.addEventListener(
                'hardwareBackPress',
                backAction,
            );
            return () => backHandler.remove();
        }, []
    )

    if (isLoading || !contract || !progress) return <ActivityIndicator color={'#e34d4d'} style={{paddingTop: '50%'}} size="large"/>

    return (
        <SafeAreaView
            style={[styles.container, themeColor === 'light' ? themeStyles.backgroundLight : themeStyles.backgroundDark]}>
            <BackLink link={'/theory'} label={'Материалы'}/>
            {openStep && <StepMaterials stage={pickedStage}
                onClose={() => setOpenStep(false)}/>}
            {!contract.data.tr_method_id ? <View style={{alignSelf: "center", height: "100%", paddingTop: "20%"}}><Text
                style={[themeStyles.regularFont, {color: themeColor === 'light' ? 'black' : 'white'}]}>Методика не
                задана</Text></View> : <>
                <View style={styles.progressContainer}>
                    <View style={{alignItems: 'center', rowGap: 10, width: "100%"}}>
                        <Text
                            style={[themeStyles.regularFont, {color: themeColor === 'light' ? 'black' : 'white'}]}>Прогресс</Text>
                        <AnimatedCircularProgress
                            size={120}
                            width={10}
                            style={{borderRadius: 50}}
                            fill={percentFill}
                            tintColor="#e10000"
                            lineCap='round'
                            backgroundColor="#b6b6b6">
                            {() => (<>
                                <Text
                                    style={[themeStyles.regularFont, {
                                        color: themeColor === 'light' ? 'black' : 'white',
                                        fontSize: 28
                                    }]}>
                                    {percentFill}%
                                </Text>
                                <Text
                                    style={[themeStyles.regularFont, {
                                        color: themeColor === 'light' ? 'black' : 'white',
                                        fontSize: 24
                                    }]}>
                                    {minutes} / 38м
                                </Text>
                            </>)}
                        </AnimatedCircularProgress>
                    </View>
                </View>
                <Text
                    style={[themeStyles.regularFont, {
                        color: themeColor === 'light' ? 'black' : 'white',
                        alignSelf: "center"
                    }]}>Этапы</Text>
                <ScrollView showsHorizontalScrollIndicator={false} overScrollMode={'never'} style={{flex: 2}}>
                    <View style={{flexDirection: 'column', rowGap: 10, alignItems: 'center', paddingVertical: 10}}>
                        {!stages ? <TheoryStagesLoader/> : stages.data.map((el, idx) =>
                            // idx + 1 <= videos.length || idx <= videos.length && videos[idx - 1].isWatched ?
                            //     <UnlockedStage onPress={() => {
                            //         setPickedStage(el)
                            //         setOpenStep(true)
                            //     }} key={idx} text={`${idx + 1}. ${el.tr_stage_name}`}/> :
                            //     <LockedStage key={idx} text={`${idx + 1}. ${el.tr_stage_name}`}/>)}
                            <UnlockedStage onPress={() => {
                                        setPickedStage(el)
                                        setOpenStep(true)
                                    }} key={idx} text={`${idx + 1}. ${el.tr_stage_name}`}/>
                        )}
                    </View>
                </ScrollView>
            </>}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    categoryBtn: {
        flexDirection: 'row',
        borderRadius: 50,
        paddingHorizontal: 20,
        alignItems: 'center',
        height: 50,
        justifyContent: 'center'
    },
    progressContainer: {
        paddingHorizontal: 20,
        justifyContent: 'space-between',
        flexDirection: 'row',
        paddingBottom: 20
    }

});

export default Index;