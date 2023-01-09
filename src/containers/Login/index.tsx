import React, { useState } from "react";
import { Switch, View } from "react-native";
import { Button, Input, PrimaryTitle, Text, Wrapper, Anchor } from "../../components";
import { useRequest } from "../../services/firebase/hooks/useRequest";
import { signinUser } from "../../services/firebase/auth/signinUser";
import { ILoginFormValues, loginInitialValues, loginSchema } from "../../schemas/login";
import { Formik } from "formik";
import styles from "./styles";

export function Login({ navigation }) {
    const [rememberMe, setRememberMe] = useState(false);
    const [doRequest, responseComponent] = useRequest();

    const onForgotPasswordClicked = () => console.log("esqueceu a senha");
    const onGoToSignupPageClicked = () => navigation.navigate("Register");
    const onFormSubmit = ({ email, password }: ILoginFormValues) => {
        doRequest({ handler: async () => await signinUser(email, password) });
    };

    return (
        <Wrapper>
            <View style={styles.container}>
                <PrimaryTitle style={styles.title}>Login</PrimaryTitle>

                <Formik
                    initialValues={loginInitialValues}
                    validationSchema={loginSchema}
                    onSubmit={onFormSubmit}
                    validateOnChange={false}
                >
                    {({ handleChange, handleSubmit, values, errors }) => (
                        <View>
                            <Input
                                placeholder="E-mail"
                                value={values.email}
                                keyboardType="email-address"
                                onChangeText={handleChange("email")}
                                error={errors.email}
                            />
                            <Input
                                placeholder="Senha"
                                onChangeText={handleChange("password")}
                                value={values.password}
                                secureTextEntry
                                error={errors.password}
                            />
                            <Button title="Login" fullWidth onPress={handleSubmit} style={styles.loginButton} />
                        </View>
                    )}
                </Formik>

                <View style={styles.userHelpersBox}>
                    <View style={styles.userHelpersRememberMeBox}>
                        <Text style={styles.userHelpersRememberMeText}>Lembrar de Mim?</Text>
                        <Switch onValueChange={setRememberMe} value={rememberMe} />
                    </View>

                    <View>
                        <Anchor onPress={onForgotPasswordClicked}>Esqueceu a senha?</Anchor>
                    </View>
                </View>

                <View style={styles.signupBox}>
                    <Text style={styles.signupText}>
                        <Text>Não possui uma conta? </Text>
                        <Anchor onPress={onGoToSignupPageClicked}>registre-se aqui</Anchor>
                    </Text>
                </View>
            </View>

            {responseComponent}
        </Wrapper>
    );
}
