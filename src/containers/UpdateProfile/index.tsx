import { Formik } from "formik";
import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { Button, DatePicker, Dropdown, Input, PrimaryTitleGoBack, Wrapper } from "../../components";
import { EducationalBackground } from "../../models/enum/EducationalBackground";
import { IRegisterFormValues, registerInitialValues, registerSchema } from "../../schemas/updateProfile";
import { retrieveUserInfo } from "../../services/firebase/auth/retrieveUserInfo";
import { updateUserProfile } from "../../services/firebase/auth/updateUserProfile";
import { useRequest } from "../../services/firebase/hooks/useRequest";
import styles from "./styles";

export function UpdateProfile({ navigation }) {
    const [user, setUser] = useState(null);
    const [doRequest, responseComponent] = useRequest();

    useEffect(() => {
        retrieveUserInfo().then((userInfo) => {
            setUser(userInfo);
            registerInitialValues.name = userInfo.name;
            registerInitialValues.birthDate = userInfo.birthDate;
            registerInitialValues.educationalBackground = userInfo.educationalBackground;
        });
    }, [retrieveUserInfo]);

    const onFormSubmit = async (formData: IRegisterFormValues) => {
        doRequest({
            handler: async () => {
                user.name = formData.name;
                user.birthDate = formData.birthDate;
                user.educationalBackground = formData.educationalBackground;

                await updateUserProfile(user);
                navigation.goBack();
                alert("Dados alterados com sucesso!");
            }
        });
    }

    return (
        <Wrapper>
            <View style={styles.view}>
                <PrimaryTitleGoBack style={styles.title} onPress={() => navigation.goBack()}>
                    Alterar Dados Pessoais
                </PrimaryTitleGoBack>

                <Formik initialValues={registerInitialValues} validationSchema={registerSchema} onSubmit={onFormSubmit}>
                    {({ handleChange, handleSubmit, setFieldValue, values, errors }) => (
                        <View>
                            <Input
                                placeholder="Nome Completo"
                                value={values.name}
                                onChangeText={handleChange("name")}
                                error={errors.name}
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
                                defaultOption={{ key: values.educationalBackground, value: values.educationalBackground }}
                                error={errors.educationalBackground}
                            />

                            <Button title="Salvar" fullWidth onPress={handleSubmit} style={styles.submit} />
                        </View>
                    )}
                </Formik>
            </View>
        </Wrapper>
    );
}
