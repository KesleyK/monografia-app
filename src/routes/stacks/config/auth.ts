import { Login, Register } from "../../../containers";

export default {
    screens: [
        {
            name: "Login",
            component: Login,
            options: { headerShown: false }
        },
        {
            name: "Register",
            component: Register,
            options: {
                headerShown: true,
                headerTransparent: true,
                headerTintColor: "#fff",
                title: ""
            }
        }
    ]
};
