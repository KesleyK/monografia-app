import React, { useState } from "react";
import { View } from "react-native";
import { Anchor, Button, DatePicker, Dropdown, Input, PrimaryTitle, Text, Wrapper } from "../../components";
import { EducationalBackground } from "../../models/enum/EducationalBackground";
import { IUser } from "../../models/IUser";
import { createUser } from "../../services/firebase/auth/createUser";
import styles from "./styles";

export function Register({ navigation }) {
    const [user, setUser] = useState("");
    const [email, setEmail] = useState("");
    const [date, setDate] = useState(new Date());
    const [educationalBackground, setEducationalBackground] = useState(null);
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");

    const onFormSubmit = async () => {
        const formData: IUser = {
            name: user,
            email,
            birthDate: date,
            educationalBackground,
        };

        if (password !== passwordConfirmation) {
            alert("Confirmação de senha divergente!");
            return;
        }

        await createUser(formData, password);
    };

    return (
        <Wrapper>
            <View style={styles.view}>
                <PrimaryTitle style={styles.title}>Registrar conta</PrimaryTitle>

                <Input
                    placeholder="Nome Completo"
                    value={user}
                    onChangeText={setUser}
                />

                <Input
                    placeholder="E-mail"
                    onChangeText={() => setEmail(email.trim())}
                    value={email}
                    keyboardType={"email-address"}
                />

                <DatePicker
                    date={date}
                    placeholder={date?.toDateString() === new Date().toDateString() ? "Data de Nascimento" : date.toLocaleDateString('pt-BR')}
                    onChange={(event, selectedDate) => {
                        setDate(selectedDate);
                    }}
                />

                <Dropdown
                    placeholder={"Formação Acadêmica"}
                    setSelected={setEducationalBackground}
                    values={Object.values(EducationalBackground)}
                />

                <Input
                    placeholder="Senha"
                    onChangeText={setPassword}
                    value={password}
                    secureTextEntry
                />

                <Input
                    placeholder="Confirmar Senha"
                    onChangeText={setPasswordConfirmation}
                    value={passwordConfirmation}
                    secureTextEntry
                />

                <Button title="Cadastrar" fullWidth onPress={onFormSubmit} style={{marginTop: 15}}/>

                <View style={styles.signinText}>
                    <Text>Já possui uma conta? </Text><Anchor onPress={() => navigation.navigate("Login")}>faça login</Anchor>
                </View>
            </View>
        </Wrapper>
    );
}
