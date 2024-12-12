import {useColorScheme} from "react-native";
import {Stack} from "expo-router";
import React from "react";

export default function TabLayout() {
    const colorScheme = useColorScheme();

    return (
        <Stack
            screenOptions={{
                headerShown: false,
            }}>
            <Stack.Screen name={'index'}/>

            <Stack.Screen
                name="[id]"
                options={{
                    title: '',
                }}
            />
        </Stack>
    );
}