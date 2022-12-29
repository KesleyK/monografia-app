import { useIsFocused } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { Anchor, Button, Card, PrimaryTitle, UserCardComplete, Wrapper } from "../../components";
import { retrieveUserInfo } from "../../services/firebase/auth/retrieveUserInfo";
import { signoutUser } from "../../services/firebase/auth/signoutUser";
import styles from "./styles";

export function AccountSettings({ navigation }) {
    const [user, setUser] = useState(null);
    const isFocused = useIsFocused();

    useEffect(() => {
        isFocused && retrieveUserInfo().then((userInfo) => {
            setUser(userInfo);
        });
    }, [isFocused, retrieveUserInfo]);

    return (
        <Wrapper>
            <View style={styles.container}>
                <PrimaryTitle style={{ marginBottom: "10%" }}>Configurações</PrimaryTitle>

                <Card>
                    <UserCardComplete user={user} />

                    <Button
                        style={styles.cardButton}
                        title="Editar Dados Pessoais"
                        onPress={() => navigation.navigate("UpdateProfile")}
                    />
                    <Button
                        style={styles.cardButton}
                        title="Alterar Senha"
                        onPress={() => navigation.navigate("ChangePassword")}
                    />

                    <Anchor style={styles.logout} onPress={signoutUser}>
                        Logout
                    </Anchor>
                </Card>
            </View>
        </Wrapper>
    );
}
