import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {AntDesign} from "@expo/vector-icons";
import themeStyles from "../../../styles/styles";
import {useGetTrainingMethodLibItemsQuery, useLazyGetTrainingMethodLibItemsQuery} from "../../services/examEndpoints";
import {TrainingStageItemMaterial} from "../../types/types";
import ListPagesLoader from "../../../components/CustomLoaders/ListPagesLoader";
import VideoPlayer from "../../../components/VideoPlayer/VideoPlayer";
import {LinearGradient} from "expo-linear-gradient";
import BackLink from "../../../components/BackLink/BackLink";
import {useLazyGetContractQuery} from "../../services/contractEndpoints";
import {useSelector} from "react-redux";
import {selectPickedAccount} from "../../store/reducers/authSlice";
import {SafeAreaView} from "react-native-safe-area-context";

const Index = () => {
    const account = useSelector(selectPickedAccount)
    const [getItems, {data: items}] = useLazyGetTrainingMethodLibItemsQuery()
    const [pickedVideo, setPickedVideo] = useState<TrainingStageItemMaterial>({} as TrainingStageItemMaterial)
    const [isVideoPlayerOpen, setIsVideoPlayerOpen] = useState<boolean>(false)
    const [getContract, {data: contract}] = useLazyGetContractQuery()

    useEffect(() => {
        getContract(account.id_reg).then(res => {
            if (res.data) {
                getItems(res.data.data.tr_method_id)
            }
        })
    }, [account])

    if (!items || !contract) return <ListPagesLoader/>

    return (
        <SafeAreaView style={{
            position: "absolute",
            height: "100%",
            width: "100%",
            zIndex: 10,
            backgroundColor: "white",
            flex: 1
        }}>
            <BackLink label={"Общие материалы"} link={"/theory"} />
            {isVideoPlayerOpen && <VideoPlayer name={pickedVideo.lib_item_name} videoUrl={pickedVideo.lib_item_url} onClose={() => setIsVideoPlayerOpen(false)}/>}
            <ScrollView contentContainerStyle={{rowGap: 10, alignItems: "center"}} style={{flex: 1}}>
                {items.data.map((el, idx) => <TouchableOpacity key={idx} onPress={() => {
                    setPickedVideo(el)
                    setIsVideoPlayerOpen(true)
                }}><LinearGradient start={[0.9, -0.5]}
                                   end={[0.8, 1.5]}
                                   colors={['#7a1818', '#771b1b', 'red']}
                                   style={themeStyles.videoBtn}>
                    <Text style={[themeStyles.regularFont, {width: '80%'}]}>{el.lib_item_name}</Text>
                    <AntDesign style={{paddingRight: 10}} name="playcircleo"
                               size={40} color="white"/>
                </LinearGradient></TouchableOpacity>)}
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