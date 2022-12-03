import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import config from "./config/user";

const Stack = createStackNavigator();

export function UserStack() {
    return (
        <Stack.Navigator screenOptions={config.navigator.screenOptions}>
            {config.screens.map((screen) => (
                <Stack.Screen
                    key={screen.name}
                    options={screen.options}
                    name={screen.name}
                    component={screen.component}
                />
            ))}
        </Stack.Navigator>
    );
}
