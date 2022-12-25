import { Home } from "../../../containers";
import { AccountStack } from "../account";
import { ChatStack } from "../chat";

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
            name: "ChatStack",
            component: ChatStack,
            options: defaultOptions,
            icon: "message-text"
        },
        {
            name: "Home",
            component: Home,
            options: defaultOptions,
            icon: "home"
        },
        {
            name: "AccountStack",
            component: AccountStack,
            options: defaultOptions,
            icon: "account-settings"
        }
    ]
};
