import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { Anchor, Button, Card, PrimaryTitle, UserCardComplete, Wrapper } from "../../components";
import { retrieveUserInfo } from "../../services/firebase/auth/retrieveUserInfo";
import { signoutUser } from "../../services/firebase/auth/signoutUser";
import styles from "./styles";

export function AccountSettings() {
    const [user, setUser] = useState(null);
    
    useEffect(() => {
        retrieveUserInfo().then((userInfo) => {
            setUser(userInfo);
        });
    }, [retrieveUserInfo]);

    return (
        <Wrapper>
            <View style={styles.container}>
                <PrimaryTitle style={{ marginBottom: "10%" }}>Configurações</PrimaryTitle>

                <Card>
                    <UserCardComplete user={user}/>

                    <Button style={styles.cardButton} title="Editar Dados Pessoais" onPress={() => console.log("update user")} />
                    <Button style={styles.cardButton} title="Alterar Senha" onPress={() => console.log("update password")} />

                    <Anchor style={styles.logout} onPress={signoutUser}>Logout</Anchor>
                </Card>
            </View>
        </Wrapper>
    );
}
