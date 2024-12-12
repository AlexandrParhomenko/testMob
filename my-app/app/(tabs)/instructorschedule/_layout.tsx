import {Stack} from "expo-router";
import React from "react";

export default function TabLayout() {

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
            <Stack.Screen
                name="emptyslot"
                options={{
                    title: '',
                }}
            />
            <Stack.Screen
                name="orderedslot"
                options={{
                    title: '',
                }}
            />
        </Stack>
    );
}