import { Formik } from "formik";
import React from "react";
import { View } from "react-native";
import { Button, Input, PrimaryTitleGoBack, Wrapper } from "../../components";
import { IRegisterFormValues, registerInitialValues, registerSchema } from "../../schemas/changePassword";
import { reauthenticate, resetPassword } from "../../services/firebase/auth/resetPassword";
import { useRequest } from "../../services/firebase/hooks/useRequest";
import styles from "./styles";

export function ChangePassword({ navigation }) {
    const [doRequest, responseComponent] = useRequest();

    const onFormSubmit = async (formData: IRegisterFormValues) => {
        doRequest({
            handler: async () => {
                await reauthenticate(formData.oldPassword);
                await resetPassword(formData.password);
                navigation.goBack();
                alert("Senha alterada com sucesso!");
            }
        });
    }

    return (
        <Wrapper>
            <View style={styles.view}>
                <PrimaryTitleGoBack style={styles.title} onPress={() => navigation.goBack()}>Alterar Senha</PrimaryTitleGoBack>

                <Formik initialValues={registerInitialValues} validationSchema={registerSchema} onSubmit={onFormSubmit}>
                    {({ handleChange, handleSubmit, setFieldValue, values, errors }) => (
                        <View>
                            <Input
                                placeholder="Senha Antiga"
                                value={values.oldPassword}
                                onChangeText={handleChange("oldPassword")}
                                secureTextEntry
                                error={errors.oldPassword}
                            />

                            <Input
                                placeholder="Nova Senha"
                                value={values.password}
                                onChangeText={handleChange("password")}
                                secureTextEntry
                                error={errors.password}
                            />

                            <Input
                                placeholder="Confirmar Nova Senha"
                                value={values.passwordConfirmation}
                                onChangeText={handleChange("passwordConfirmation")}
                                secureTextEntry
                                error={errors.passwordConfirmation}
                            />

                            <Button
                                title="Salvar"
                                fullWidth
                                onPress={handleSubmit}
                                style={styles.submit}
                            />
                        </View>
                    )}
                </Formik>
            </View>

            {responseComponent}
        </Wrapper>
    );
}
