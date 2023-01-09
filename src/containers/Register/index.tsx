import { Formik } from "formik";
import React, { useState } from "react";
import { Linking, View } from "react-native";
import {
    Anchor,
    Button,
    DatePicker,
    Dropdown,
    Input, PrimaryTitle,
    Text,
    Wrapper
} from "../../components";
import { CheckBox } from "../../components/CheckBox";
import { EducationalBackground } from "../../models/enum/EducationalBackground";
import { IUser } from "../../models/IUser";
import { IRegisterFormValues, registerInitialValues, registerSchema } from "../../schemas/register";
import { createUser } from "../../services/firebase/auth/createUser";
import { useRequest } from "../../services/firebase/hooks/useRequest";
import styles from "./styles";

export function Register({ navigation }) {
    const [doRequest, responseComponent] = useRequest();
    const [policyAccepted, acceptPolicy] = useState(false);

    const onFormSubmit = async (formData: IRegisterFormValues) => {
        const user = { ...formData };
        delete user.password;
        delete user.passwordConfirmation;
        doRequest({ handler: async () => await createUser(user as IUser, formData.password) });
    }

    const getPoliciesLink = () => {
        return (
            <Anchor
                onPress={async () => {
                    await Linking.openURL("https://pedenite.github.io/monografia-pages/");
                }}
            >
                Políticas de Privacidade
            </Anchor>
        );
    }

    return (
        <Wrapper>
            <View style={styles.view}>
                <PrimaryTitle style={styles.title}>Registrar conta</PrimaryTitle>

                <Formik initialValues={registerInitialValues} validationSchema={registerSchema} onSubmit={onFormSubmit}>
                    {({ handleChange, handleSubmit, setFieldValue, values, errors }) => (
                        <View>
                            <Input
                                placeholder="Nome Completo"
                                value={values.name}
                                onChangeText={handleChange("name")}
                                error={errors.name}
                            />

                            <Input
                                placeholder="E-mail"
                                onChangeText={handleChange("email")}
                                value={values.email}
                                keyboardType={"email-address"}
                                error={errors.email}
                            />

                            <DatePicker
                                date={values.birthDate}
                                placeholder={values.birthDate?.toLocaleDateString("pt-BR") ?? "Data de Nascimento"}
                                onChange={(_, selectedDate) => setFieldValue("birthDate", selectedDate)}
                                error={errors.birthDate}
                                maximumDate={new Date()}
                            />

                            <Dropdown
                                placeholder={"Formação Acadêmica"}
                                setSelected={handleChange("educationalBackground")}
                                values={Object.values(EducationalBackground)}
                                error={errors.educationalBackground}
                            />

                            <Input
                                placeholder="Senha"
                                onChangeText={handleChange("password")}
                                value={values.password}
                                secureTextEntry
                                error={errors.password}
                            />

                            <Input
                                placeholder="Confirmar Senha"
                                onChangeText={handleChange("passwordConfirmation")}
                                value={values.passwordConfirmation}
                                secureTextEntry
                                error={errors.passwordConfirmation}
                            />

                            <CheckBox
                                value={policyAccepted}
                                onValueChange={acceptPolicy}
                            >
                                Confirmo que li e aceito as {getPoliciesLink()} do aplicativo.
                            </CheckBox>

                            <Button
                                title="Cadastrar"
                                fullWidth
                                onPress={handleSubmit}
                                style={{ marginTop: 15 }}
                                disabled={!policyAccepted}
                            />
                        </View>
                    )}
                </Formik>

                <View style={styles.signinText}>
                    <Text>Já possui uma conta? </Text>
                    <Anchor onPress={() => navigation.navigate("Login")}>faça login</Anchor>
                </View>
            </View>

            {responseComponent}
        </Wrapper>
    );
}
