import {Stack} from "expo-router";
import React from "react";

export default function TabLayout() {

    return (
        <Stack
            screenOptions={{
                headerShown: false,
            }}>
            <Stack.Screen name={'index'}/>
            <Stack.Screen name={'theoryMenu'}/>
            <Stack.Screen name={'pdd'}/>
            <Stack.Screen name={'exams'}/>
            <Stack.Screen name={'schoolLib'}/>
        </Stack>
    );
}