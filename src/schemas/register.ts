import * as Yup from "yup";

export interface IRegisterFormValues {
    name: string;
    email: string;
    birthDate?: Date;
    educationalBackground: string;
    password: string;
    passwordConfirmation: string;
    points: number;
}

export const registerSchema = Yup.object().shape({
    name: Yup.string().min(3, "Digite seu nome completo").required("Obrigatório*"),
    email: Yup.string().email("Email inválido").required("Obrigatório*"),
    birthDate: Yup.date().required("Obrigatório*"),
    educationalBackground: Yup.string().required("Obrigatório*"),
    password: Yup.string().min(6, "Senha muito curta").required("Obrigatório*"),
    passwordConfirmation: Yup.string()
        .oneOf([Yup.ref("password")], "Senhas precisam coincidir")
        .required("Obrigatório*")
});

export const registerInitialValues: IRegisterFormValues = {
    name: "",
    email: "",
    birthDate: undefined,
    educationalBackground: "",
    password: "",
    passwordConfirmation: "",
    points: 0
};
