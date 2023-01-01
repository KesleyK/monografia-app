import { Challenge, Chat, PreHome, Ranking, Topic, TopicList } from "../../../containers";
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
            name: "TopicList",
            component: TopicList,
            options: {}
        },
        {
            name: "Topic",
            component: Topic,
            options: {}
        },
        {
            name: "Challenge",
            component: Challenge,
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
