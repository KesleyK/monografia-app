import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Home, PreHome } from "../../../containers";

const Stack = createStackNavigator();

export function UserStack() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false
            }}
        >
            <Stack.Screen name="PreHome" component={PreHome} />
            <Stack.Screen name="Home" component={Home} />
        </Stack.Navigator>
    );
}
