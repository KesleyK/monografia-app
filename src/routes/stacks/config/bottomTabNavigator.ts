import { Home, AccountSettings } from "../../../containers";

import styles from "../styles/bottomTabBar";

const defaultOptions = {
    tabBarShowLabel: false
};

export default {
    navigator: {
        screenOptions: {
            headerShown: false,
            tabBarActiveTintColor: "black",
            tabBarStyle: styles.tabBar
        }
    },
    screens: [
        {
            name: "Home",
            component: Home,
            options: defaultOptions,
            icon: "home"
        },
        {
            name: "AccountSettings",
            component: AccountSettings,
            options: defaultOptions,
            icon: "account-settings"
        }
    ]
};
