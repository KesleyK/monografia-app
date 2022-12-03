import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import config from "./config/auth";

const Stack = createStackNavigator();

export function AuthStack() {
    return (
        <Stack.Navigator>
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
