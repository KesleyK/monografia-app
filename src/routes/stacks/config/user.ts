import { PreHome, Home } from "../../../containers";

export default {
    navigator: {
        screenOptions: {
            headerShown: false
        }
    },
    screens: [
        {
            name: "PreHome",
            component: PreHome,
            options: {}
        },
        {
            name: "Home",
            component: Home,
            options: {}
        }
    ]
};
