import {Stack} from "expo-router";
import React from "react";

export default function TabLayout() {

    return (
        <Stack
            screenOptions={{
                headerShown: false,
            }}>
            <Stack.Screen
                name="[id]"
                options={{
                    title: '',
                }}
            />
            <Stack.Screen
                name="reviews"
                options={{
                    title: '',
                }}
            />
        </Stack>
    );
}