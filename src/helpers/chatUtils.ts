import ChatCollection from "../services/firebase/db/chat";

export async function chatBetween(from: string, to: string, navigation, create = false): Promise<void> {
    if (from === to) {
        return;
    }

    if (create) {
        await ChatCollection.create(from, to);
    }

    navigation.navigate("Chat", { userId: to });
}