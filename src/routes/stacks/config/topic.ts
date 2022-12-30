import { Topic, TopicList } from "../../../containers";

export default {
    navigator: {
        screenOptions: {
            headerShown: false
        }
    },
    screens: [
        {
            name: "TopicList",
            component: TopicList,
            options: {}
        },
        {
            name: "Topic",
            component: Topic,
            options: {}
        }
    ]
};