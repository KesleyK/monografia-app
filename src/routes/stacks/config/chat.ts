import { Chat, ChatList } from "../../../containers";

export default {
    navigator: {
        screenOptions: {
            headerShown: false
        }
    },
    screens: [
        {
            name: "ChatList",
            component: ChatList,
            options: {}
        },
        {
            name: "Chat",
            component: Chat,
            options: {}
        }
    ]
};
