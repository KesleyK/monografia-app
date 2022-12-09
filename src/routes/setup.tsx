import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { useAuthentication } from "../hooks/useAuthentication";
import { AuthStack } from "./stacks/auth";
import { PreHome } from "./stacks/preHome";

export function Routes() {
    const { user } = useAuthentication();

    return (
        <NavigationContainer>
            {user ? <PreHome /> : <AuthStack />}
        </NavigationContainer>
    );
}
