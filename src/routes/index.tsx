import React from "react";
import { useAuthentication } from "../hooks";
import { AuthStack, UserStack } from "./stacks";

export function Routes() {
    const { user } = useAuthentication();

    return user ? <UserStack /> : <AuthStack />;
}
