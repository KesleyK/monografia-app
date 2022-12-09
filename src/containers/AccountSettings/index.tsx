import React from "react";
import { Wrapper, Text, Button } from "../../components";
import { signoutUser } from "../../services/firebase/auth/signoutUser";

export function AccountSettings() {
    return (
        <Wrapper>
            <Text>Account Settings</Text>
            <Button title="Sign out ->" onPress={signoutUser} />
        </Wrapper>
    );
}
