import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { Button, DatePicker, Dropdown, Input, PrimaryTitle, Wrapper } from "../../components";
import { EducationalBackground } from "../../models/enum/EducationalBackground";
import { retrieveUserInfo } from "../../services/firebase/auth/retrieveUserInfo";
import { updateUserProfile } from "../../services/firebase/auth/updateUserProfile";
import styles from "./styles";

export function UpdateProfile({ navigation }) {
    const [name, setName] = useState("");
    const [date, setDate] = useState(new Date());
    const [educationalBackground, setEducationalBackground] = useState(null);
    const [user, setUser] = useState(null);

    useEffect(() => {
        retrieveUserInfo().then((userInfo) => {
            setUser(userInfo);
            setName(userInfo.name);
            setDate(userInfo.birthDate);
            setEducationalBackground(userInfo.educationalBackground);
        });
    }, [retrieveUserInfo]);

    const onFormSubmit = async () => {
        user.name = name;
        user.birthDate = date;
        user.educationalBackground = educationalBackground;

        try {
            await updateUserProfile(user);
        } catch (err) {
            alert("Erro ao alterar dados!");
            return;
        }

        navigation.goBack();
        alert("Dados alterados com sucesso!");
    };

    return (
        <Wrapper>
            <View style={styles.view}>
                <PrimaryTitle style={styles.title}>Alterar Senha</PrimaryTitle>

                <Input placeholder="Nome Completo" value={name} onChangeText={setName} />

                <DatePicker
                    date={date}
                    placeholder={
                        date?.toDateString() === new Date().toDateString()
                            ? "Data de Nascimento"
                            : date.toLocaleDateString("pt-BR")
                    }
                    onChange={(event, selectedDate) => {
                        setDate(selectedDate);
                    }}
                />

                <Dropdown
                    placeholder={"Formação Acadêmica"}
                    setSelected={setEducationalBackground}
                    values={Object.values(EducationalBackground)}
                />

                <Button title="Salvar" fullWidth onPress={onFormSubmit} style={{ marginTop: 15 }} />
            </View>
        </Wrapper>
    );
}
