import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Login, Register } from "../../../containers";

const Stack = createStackNavigator();

export function AuthStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                options={{ headerShown: false }}
                name="Login"
                component={Login}
            />
            <Stack.Screen
                options={{
                    headerShown: true,
                    headerTransparent: true,
                    headerTintColor: "#fff",
                    title: ""
                }}
                name="Register"
                component={Register}
            />
        </Stack.Navigator>
    );
}
