import * as Yup from "yup";

export interface IRegisterFormValues {
    name: string;
    birthDate?: Date;
    educationalBackground: string;
}

export const registerSchema = Yup.object().shape({
    name: Yup.string().min(3, "Digite seu nome completo").required("Obrigatório*"),
    birthDate: Yup.date().required("Obrigatório*"),
    educationalBackground: Yup.string().required("Obrigatório*"),
});

export const registerInitialValues: IRegisterFormValues = {
    name: "",
    birthDate: undefined,
    educationalBackground: ""
};
