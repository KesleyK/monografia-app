import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { useAuthentication } from "../hooks/useAutehntication";
import { AuthStack } from "./stacks/auth";
import { UserStack } from "./stacks/user";

export function Routes() {
    const { user } = useAuthentication();

    return (
        <NavigationContainer>
            {user ? <UserStack /> : <AuthStack />}
        </NavigationContainer>
    );
}
