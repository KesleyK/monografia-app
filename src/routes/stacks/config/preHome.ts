import { PreHome, Ranking, Topics } from "../../../containers";
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
