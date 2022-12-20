import { AccountSettings, ChangePassword, PreHome, UpdateProfile } from "../../../containers";
import { BottomTabNavigator } from "../bottomTabNavigator";

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
            name: "BottomTabNavigator",
            component: BottomTabNavigator,
            options: {}
        },
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
