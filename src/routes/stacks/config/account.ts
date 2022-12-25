import { AccountSettings, ChangePassword, UpdateProfile } from "../../../containers";

export default {
    navigator: {
        screenOptions: {
            headerShown: false
        }
    },
    screens: [
        {
            name: "AccountSettings",
            component: AccountSettings,
            options: {}
        },
        {
            name: "UpdateProfile",
            component: UpdateProfile,
            options: {}
        },
        {
            name: "ChangePassword",
            component: ChangePassword,
            options: {}
        }
    ]
};
