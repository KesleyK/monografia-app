import { PreHome } from "../../../containers";
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
            options: {},
        },
        {
            name: "BottomTabNavigator",
            component: BottomTabNavigator,
            options: {}
        }
    ]
};
