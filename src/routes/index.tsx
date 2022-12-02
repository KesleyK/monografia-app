import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { useAuthentication } from "../hooks";
import { AuthStack, UserStack } from "./stacks";

export function Routes() {
    const { user } = useAuthentication();

    return (
        <NavigationContainer>
            {user ? <UserStack /> : <AuthStack />}
        </NavigationContainer>
    );
}
