import React, { useState } from "react";
import { Switch, View } from "react-native";
import { Button, Input, PrimaryTitle, Text, Wrapper, KeyboardAvoidingView, Anchor } from "../../components";
import styles from "./styles";

export function Login() {
    const [user, setUser] = useState("");
    const [password, setPassword] = useState("");
    const [isActive, setIsActive] = useState(false);

    const onFormSubmit = () => {
        const formData = {
            user,
            password,
        };

        console.log(formData);
    };

    return (
        <Wrapper>
            <KeyboardAvoidingView>
                <View style={styles.view}>
                    <PrimaryTitle>Login</PrimaryTitle>

                    <Input
                        placeholder="Usuário"
                        value={user}
                        onChangeText={setUser}
                    />

                    <Input
                        placeholder="Senha"
                        onChangeText={setPassword}
                        value={password}
                    />

                    <Button title="Login" onPress={onFormSubmit} />

                    <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 50 }}>
                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                            <Text>Lembrar de Mim?</Text>
                            <Switch
                                onValueChange={setIsActive}
                                value={isActive}
                            />
                        </View>
                        <Anchor onPress={() => console.log("esqueceu a senha")}>Esqueceu a senha?</Anchor>
                    </View>

                    <View style={{flexDirection:"row", justifyContent: "space-evenly"}}>
                        <Text>Não possui uma conta?</Text><Anchor onPress={() => console.log("registrar")}>registre-se aqui</Anchor>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </Wrapper>
    );
}
