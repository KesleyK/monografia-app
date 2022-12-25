import { AccountSettings, ChangePassword, Home, PreHome, Ranking, UpdateProfile } from "../../../containers";
import { Topics } from "../../../containers/Topics";
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
        },
        {
            name: "Topics",
            component: Topics,
            options: {}
        },
        {
            name: "Ranking",
            component: Ranking,
            options: {}
        }
    ]
};
