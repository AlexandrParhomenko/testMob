import React from 'react';
import {Center, Skeleton, VStack} from "native-base";
import {Dimensions} from "react-native";

const ProfileManagerLoader = () => {
    const windowWidth = Dimensions.get('window').width;

    return (
        <Center w="100%">
            <VStack w="100%" maxW={windowWidth} space={6} style={{alignItems: 'center'}} rounded="md" _dark={{
                borderColor: "coolGray.200"
            }} _light={{
                borderColor: "coolGray.200"
            }}>
                <Skeleton startColor={'coolGray.300'} h="20" w={'100%'}/>
                <VStack style={{width: '90%', alignItems: 'flex-start', paddingTop: 15, rowGap: 10}}>
                    <Skeleton startColor={'coolGray.300'} mb="3" w="90%" rounded="50" />
                    <Skeleton startColor={'coolGray.300'} mb="3" w="60%" rounded="50" />
                    <Skeleton startColor={'coolGray.300'} mb="3" w="90%" rounded="50" />
                    <Skeleton startColor={'coolGray.300'} mb="3" w="70%" rounded="50" />
                    <Skeleton startColor={'coolGray.300'} mb="3" w="90%" rounded="50" />
                    <Skeleton startColor={'coolGray.300'} mb="3" w="80%" rounded="50" />
                </VStack>
            </VStack>
        </Center>
    );
};

export default ProfileManagerLoader;