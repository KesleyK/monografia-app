import React, { useState } from "react";
import { View } from "react-native";
import { Anchor, Button, DatePicker, Input, PrimaryTitle, Text, Wrapper } from "../../components";
import { EducationalBackground } from "../../models/enum/EducationalBackground";
import { IUser } from "../../models/IUser";
import { createUser } from "../../services/firebase/auth/createUser";
import styles from "./styles";

export function Register({ navigation }) {
    const [user, setUser] = useState("");
    const [email, setEmail] = useState("");
    const [date, setDate] = useState(new Date());
    const [educationalBackground, setEducationalBackground] = useState(EducationalBackground.HIGH_COMPLETE);
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");

    const onFormSubmit = () => {
        const formData: IUser = {
            name: user,
            email,
            birthDate: date,
            educationalBackground,
        };

        createUser(formData, password);
    };

    return (
        <Wrapper>
            <View style={styles.view}>
                <PrimaryTitle style={styles.title}>Registrar conta</PrimaryTitle>

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
                    onChangeText={setEducationalBackground}
                    value={educationalBackground}
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

                <Button title="Login" fullWidth onPress={onFormSubmit} />

                <View style={styles.signinText}>
                    <Text>Já possui uma conta? </Text><Anchor onPress={() => navigation.navigate("Login")}>faça login</Anchor>
                </View>
            </View>
        </Wrapper>
    );
}
