import * as Yup from "yup";

export interface IRegisterFormValues {
    oldPassword: string;
    password: string;
    passwordConfirmation: string;
}

export const registerSchema = Yup.object().shape({
    oldPassword: Yup.string().required("Obrigatório"),
    password: Yup.string()
        .min(6, "Senha muito curta")
        .notOneOf([Yup.ref("oldPassword")], "Nova senha não pode ser igual à anterior")
        .required("Obrigatório*"),
    passwordConfirmation: Yup.string()
        .oneOf([Yup.ref("password")], "Senhas precisam coincidir")
        .required("Obrigatório*")
});

export const registerInitialValues: IRegisterFormValues = {
    oldPassword: "",
    password: "",
    passwordConfirmation: ""
};
