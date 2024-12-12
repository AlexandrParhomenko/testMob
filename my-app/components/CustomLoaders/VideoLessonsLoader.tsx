import React from 'react';
import {Center, HStack, Skeleton, VStack} from "native-base";
import {Dimensions} from "react-native";

const VideoLessonsLoader = () => {
    const windowWidth = Dimensions.get('window').width;

    return (
        <Center w="100%">
            <VStack w="100%"  h="100%" maxW={windowWidth} space={6} rounded="md" alignItems="center" _dark={{
                borderColor: "coolGray.500"
            }} _light={{
                borderColor: "coolGray.200"
            }}>

                <Skeleton startColor={'coolGray.300'} h="20" />
                <HStack space='10'>
                    <Skeleton size="120" rounded="full" />
                    <HStack space="2" alignItems="center">
                        <Skeleton size="50" rounded="full" />
                        <Skeleton size="50" rounded="full" />
                        <Skeleton size="50" rounded="full" />
                    </HStack>

                </HStack>
                <Skeleton startColor={'coolGray.300'} mb="3" w="90%" rounded="50" />
                <Skeleton startColor={'coolGray.300'} mb="3" w="90%" rounded="50" />
                <Skeleton startColor={'coolGray.300'} mb="3" w="90%" rounded="50" />
                <Skeleton startColor={'coolGray.300'} mb="3" w="90%" rounded="50" />
                <Skeleton.Text startColor={'coolGray.300'} lines={3} alignItems="center" px="12" />
            </VStack>
        </Center>
    );
};

export default VideoLessonsLoader;