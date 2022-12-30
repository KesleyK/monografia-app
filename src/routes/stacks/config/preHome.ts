import { Chat, PreHome, Ranking } from "../../../containers";
import { BottomTabNavigator } from "../bottomTabNavigator";
import { TopicStack } from "../topic";

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
            name: "TopicStack",
            component: TopicStack,
            options: {}
        },
        {
            name: "Ranking",
            component: Ranking,
            options: {}
        },
        {
            name: "Chat",
            component: Chat,
            options: {}
        }
    ]
};
