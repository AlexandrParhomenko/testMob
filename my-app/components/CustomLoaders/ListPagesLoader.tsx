import React from 'react';
import {Center, HStack, Skeleton, VStack} from "native-base";
import {Dimensions} from "react-native";

const ListPagesLoader = () => {
    const windowWidth = Dimensions.get('window').width;

    return (
        <Center w="100%">
            <VStack w="100%" maxW={windowWidth} space={6} rounded="md" alignItems="center" _dark={{
                borderColor: "coolGray.500"
            }} _light={{
                borderColor: "coolGray.200"
            }}>
                <Skeleton startColor={'coolGray.300'} h="20" />
                <Skeleton startColor={'coolGray.300'} mb="3" w="80%" rounded="50" />
                <Skeleton startColor={'coolGray.300'} mb="3" w="90%" rounded="50" />
                <Skeleton startColor={'coolGray.300'} mb="3" w="90%" rounded="50" />
                <Skeleton startColor={'coolGray.300'} mb="3" w="90%" rounded="50" />
                <Skeleton.Text startColor={'coolGray.300'} lines={3} alignItems="center" px="12" />
            </VStack>
        </Center>
    );
};

export default ListPagesLoader;