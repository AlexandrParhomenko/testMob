import React, {FC, useState} from 'react';
import {TrainingStage, TrainingStageItemMaterial} from "../../app/types/types";
import CloseLink from "../BackLink/CloseLink";
import VideoPlayer from "../VideoPlayer/VideoPlayer";
import {Text, TouchableOpacity, View} from "react-native";
import {LinearGradient} from "expo-linear-gradient";
import themeStyles from "../../styles/styles";
import {AntDesign} from "@expo/vector-icons";
import {useGetTrainingStageLibItemsQuery} from "../../app/services/examEndpoints";
import TheoryStagesLoader from "../CustomLoaders/TheoryStagesLoader";
import {SafeAreaView} from "react-native-safe-area-context";

interface IModalProps {
    onClose: Function
    stage: TrainingStage
}

const StepMaterials: FC<IModalProps> = ({onClose, stage}) => {
    const [isVideoPlayerOpen, setIsVideoPlayerOpen] = useState<boolean>(false)
    const [pickedVideo, setPickedVideo] = useState<TrainingStageItemMaterial>({} as TrainingStageItemMaterial)
    const {data: items} = useGetTrainingStageLibItemsQuery(stage.tr_stage_id)


    return (
        <SafeAreaView style={{
            position: "absolute",
            height: "100%",
            width: "100%",
            zIndex: 10,
            backgroundColor: "white",
            flex: 1
        }}>
            <CloseLink label={stage.tr_stage_name} onClose={() => onClose()}/>
            {isVideoPlayerOpen && <VideoPlayer name={pickedVideo.lib_item_name} videoUrl={pickedVideo.lib_item_url} onClose={() => setIsVideoPlayerOpen(false)}/>}
            {!items ? <TheoryStagesLoader/> : <View style={{alignItems: "center", rowGap: 10}}>
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
            </View>}
        </SafeAreaView>
    );
};

export default StepMaterials;