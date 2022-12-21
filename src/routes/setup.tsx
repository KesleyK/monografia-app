import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { useAuthentication } from "../hooks/useAuthentication";
import { AuthStack } from "./stacks/auth";
import { PreHome } from "./stacks/preHome";
import { LoadingIndicator } from "../components";

export function Routes() {
    const { user, handshakeAccomplished } = useAuthentication();

    const navigationContainer = <NavigationContainer>{user ? <PreHome /> : <AuthStack />}</NavigationContainer>;

    return handshakeAccomplished ? navigationContainer : <LoadingIndicator visibleBackdrop />;
}
