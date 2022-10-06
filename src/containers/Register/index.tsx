import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import React, { useState } from "react";
import { Switch, View } from "react-native";
import { Button, Input, PrimaryTitle, Text, Wrapper, KeyboardAvoidingView, Anchor, DatePicker } from "../../components";
import styles from "./styles";

export function Register({ navigation }) {
    const [user, setUser] = useState("");
    const [email, setEmail] = useState("");
    const [date, setDate] = useState(new Date());
    const [formacaoAcademica, setFormacaoAcademica] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");

    const onFormSubmit = () => {
        const formData = {
            user,
            email,
            date,
            formacaoAcademica,
            password,
            passwordConfirmation
        };

        console.log(formData);
    };

    return (
        <Wrapper>
            <KeyboardAvoidingView>
                <View style={styles.view}>
                    <PrimaryTitle>Registrar conta</PrimaryTitle>

                    <Input
                        placeholder="Usuário"
                        value={user}
                        onChangeText={setUser}
                    />

                    <Input
                        placeholder="E-mail"
                        onChangeText={setEmail}
                        value={email}
                    />

                    <DatePicker
                        date={date}
                        placeholder={date?.toDateString() === new Date().toDateString() ? "Data de Nascimento" : date.toLocaleDateString('pt-BR')}
                        onChange={(event, selectedDate) => {
                            setDate(selectedDate);
                        }}
                    />

                    <Input
                        placeholder="Formação Acadêmica"
                        onChangeText={setFormacaoAcademica}
                        value={formacaoAcademica}
                    />

                    <Input
                        placeholder="Senha"
                        onChangeText={setPassword}
                        value={password}
                    />

                    <Input
                        placeholder="Confirmar Senha"
                        onChangeText={setPasswordConfirmation}
                        value={passwordConfirmation}
                    />

                    <Button title="Login" onPress={onFormSubmit} />

                    <View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
                        <Text>Já possui uma conta?</Text><Anchor onPress={() => navigation.navigate("Login")}>faça login</Anchor>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </Wrapper>
    );
}
