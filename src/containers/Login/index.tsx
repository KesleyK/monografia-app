import React, { useState } from "react";
import { Switch, View } from "react-native";
import { Button, Input, PrimaryTitle, Text, Wrapper, Anchor } from "../../components";
import { signinUser } from "../../services/firebase/auth/signinUser";
import styles from "./styles";

/*
    TODO:
        1 - KeyboardAvoidingView is breaking the layout. We have to fix it before using
        2 - On a small device, "userHelpersBox" won't match the layout. We have to fix it
*/

export function Login({ navigation }) {
    const [user, setUser] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(false);

    const onFormSubmitted = async () => {
        try {
            await signinUser(user, password);
        } catch (err) {
            alert("Credenciais inválidas");
        }
    };

    const onForgotPasswordClicked = () => console.log("esqueceu a senha");
    const onGoToSignupPageClicked = () =>  navigation.navigate("Register");

    return (
        <Wrapper>
            <View style={styles.container}>
                <PrimaryTitle style={styles.title}>Login</PrimaryTitle>

                <Input
                    placeholder="Usuário"
                    value={user}
                    onChangeText={setUser}
                    keyboardType="email-address"
                />
                <Input
                    placeholder="Senha"
                    onChangeText={setPassword}
                    value={password}
                    secureTextEntry={true}
                />
                <Button title="Login" fullWidth onPress={onFormSubmitted} />

                <View style={styles.userHelpersBox}>
                    <View style={styles.userHelpersRememberMeBox}>
                        <Text style={styles.userHelpersRememberMeText}>
                            Lembrar de Mim?
                        </Text>
                        <Switch onValueChange={setRememberMe} value={rememberMe} />
                    </View>

                    <View>
                        <Anchor onPress={onForgotPasswordClicked}>
                            Esqueceu a senha?
                        </Anchor>
                    </View>
                </View>

                <View style={styles.signupBox}>
                    <Text style={styles.signupText}>
                        <Text>Não possui uma conta?  </Text>
                        <Anchor onPress={onGoToSignupPageClicked}>
                            registre-se aqui
                        </Anchor>
                    </Text>
                </View>
            </View>
        </Wrapper>
    );
}
