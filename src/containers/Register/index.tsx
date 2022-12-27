import React from "react";
import { View } from "react-native";
import { Formik } from "formik";
import {
    Anchor,
    Button,
    DatePicker,
    Dropdown,
    Input,
    LoadingIndicator,
    PrimaryTitle,
    Text,
    Wrapper
} from "../../components";
import { EducationalBackground } from "../../models/enum/EducationalBackground";
import { IUser } from "../../models/IUser";
import { createUser } from "../../services/firebase/auth/createUser";
import { useRequest } from "../../services/firebase/hooks/useRequest";
import { IRegisterFormValues, registerSchema, registerInitialValues } from "../../schemas/register";
import styles from "./styles";

export function Register({ navigation }) {
    const [doRequest, responseComponent] = useRequest();

    const onFormSubmit = async (formData: IRegisterFormValues) =>
        doRequest({ handler: async () => await createUser(formData as IUser, formData.password) });

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

                            <Button title="Cadastrar" fullWidth onPress={handleSubmit} style={{ marginTop: 15 }} />
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
