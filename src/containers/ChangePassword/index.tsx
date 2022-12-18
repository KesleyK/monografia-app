import React, { useState } from "react";
import { View } from "react-native";
import { Button, Input, PrimaryTitle, Wrapper } from "../../components";
import { reauthenticate, resetPassword } from "../../services/firebase/auth/resetPassword";
import styles from "./styles";

export function ChangePassword({ navigation }) {
    const [currentPassword, setCurrentPassword] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");

    const onFormSubmit = async () => {
        if (password !== passwordConfirmation) {
            alert("Confirmação de senha divergente!");
            setPassword("");
            setPasswordConfirmation("");
            return;
        }
        
        try {
            await reauthenticate(currentPassword);
        } catch (err) {
            alert("Senha incorreta!")
            return;
        }
        
        if (password === currentPassword) {
            alert("Nova senha igual a atual!")
            setPassword("");
            setPasswordConfirmation("");
            return;
        }

        try {
            await resetPassword(password);
        } catch (err) {
            alert(err);
            return;
        }

        navigation.goBack();
        alert("Senha alterada com sucesso!");
    };

    return (
        <Wrapper>
            <View style={styles.view}>
                <PrimaryTitle style={styles.title}>Alterar Senha</PrimaryTitle>

                <Input
                    placeholder="Senha Antiga"
                    value={currentPassword}
                    onChangeText={setCurrentPassword}
                    secureTextEntry
                />

                <Input
                    placeholder="Nova Senha"
                    onChangeText={setPassword}
                    value={password}
                    secureTextEntry
                />

                <Input
                    placeholder="Confirmar Nova Senha"
                    onChangeText={setPasswordConfirmation}
                    value={passwordConfirmation}
                    secureTextEntry
                />

                <Button title="Salvar" fullWidth onPress={onFormSubmit} style={{marginTop: 15}}/>
            </View>
        </Wrapper>
    );
}
