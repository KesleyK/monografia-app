import { useIsFocused } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Linking, View } from "react-native";
import { Anchor, Button, Card, LoadingIndicator, PrimaryTitle, UserCardComplete, Wrapper } from "../../components";
import { retrieveUserInfo } from "../../services/firebase/auth/retrieveUserInfo";
import { signoutUser } from "../../services/firebase/auth/signoutUser";
import styles from "./styles";

export function AccountSettings({ route, navigation }) {
    // const { team } = route.params; // TODO
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
                    {!user ? <LoadingIndicator /> :
                        <UserCardComplete user={user} />
                    }

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
                            onPress={async () => await Linking.openURL("https://pedenite.github.io/monografia-pages/ajuda.html")}
                        >
                            Ajuda
                        </Anchor>
                        <Anchor
                            style={styles.bottomLink}
                            onPress={async () => await Linking.openURL("https://pedenite.github.io/monografia-pages/faqs.html")}
                        >
                            FAQ
                        </Anchor>
                        <Anchor
                            style={styles.bottomLink}
                            onPress={async () => await Linking.openURL("https://pedenite.github.io/monografia-pages/")}
                        >
                            Política de Privacidade
                        </Anchor>
                    </View>
                </Card>
            </View>
        </Wrapper>
    );
}
