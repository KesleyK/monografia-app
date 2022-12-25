import React, { useEffect, useState } from "react";
import { Linking, View } from "react-native";
import { Anchor, Button, Card, PrimaryTitleGoBack, UserCardComplete, Wrapper } from "../../components";
import { retrieveUserInfo } from "../../services/firebase/auth/retrieveUserInfo";
import { signoutUser } from "../../services/firebase/auth/signoutUser";
import styles from "./styles";

export function AccountSettings({ navigation }) {
    const [user, setUser] = useState(null);

    useEffect(() => {
        retrieveUserInfo().then((userInfo) => {
            setUser(userInfo);
        });
    }, [retrieveUserInfo]);

    return (
        <Wrapper>
            <View style={styles.container}>
                <PrimaryTitleGoBack style={{ marginBottom: "10%" }} onPress={() => navigation.goBack()}>
                    Configurações
                </PrimaryTitleGoBack>

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

                    <View style={styles.bottomLinksContainer}>
                        <Anchor
                            style={styles.bottomLink}
                            onPress={async () => await Linking.openURL("https://www.example.org")}
                        >
                            Ajuda
                        </Anchor>
                        <Anchor
                            style={styles.bottomLink}
                            onPress={async () => await Linking.openURL("https://www.example.org")}
                        >
                            FAQ
                        </Anchor>
                        <Anchor
                            style={styles.bottomLink}
                            onPress={async () => await Linking.openURL("https://www.example.org")}
                        >
                            Política e Privacidade
                        </Anchor>
                    </View>
                </Card>
            </View>
        </Wrapper>
    );
}
