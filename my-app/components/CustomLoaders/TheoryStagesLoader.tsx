import React from 'react';
import {Center, HStack, Skeleton, VStack} from "native-base";
import {Dimensions} from "react-native";

const TheoryStagesLoader = () => {
    const windowWidth = Dimensions.get('window').width;
    return (
        <Center w="100%" h="100%">
            <VStack w="100%" h="100%" maxW={windowWidth} space={6} rounded="md" alignItems="center" _dark={{
                borderColor: "coolGray.500"
            }} _light={{
                borderColor: "coolGray.200"
            }}>
                <Skeleton startColor={'coolGray.300'} mb="3" w="80%" h={100} rounded="10" />
                <Skeleton startColor={'coolGray.300'} mb="3" w="80%" h={100} rounded="10" />
                <Skeleton startColor={'coolGray.300'} mb="3" w="80%" h={100} rounded="10" />
                <Skeleton startColor={'coolGray.300'} mb="3" w="80%" h={100} rounded="10" />
                <Skeleton startColor={'coolGray.300'} mb="3" w="80%" h={100} rounded="10" />
                <Skeleton startColor={'coolGray.300'} mb="3" w="80%" h={100} rounded="10" />
                <Skeleton startColor={'coolGray.300'} mb="3" w="80%" h={100} rounded="10" />
                <Skeleton startColor={'coolGray.300'} mb="3" w="80%" h={100} rounded="10" />
            </VStack>
        </Center>
    );
};

export default TheoryStagesLoader;