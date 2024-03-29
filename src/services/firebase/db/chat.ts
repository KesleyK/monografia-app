import {
    arrayUnion,
    collection,
    doc,
    DocumentData,
    DocumentSnapshot,
    getDoc,
    getDocs,
    increment,
    onSnapshot,
    query,
    setDoc,
    updateDoc,
    where
} from "firebase/firestore";
import { db } from "../../../config/firebase";
import { parseCollection } from "../../../helpers/collectionUtils";

export default class ChatCollection {
    private static readonly collectionName = "chats";
    private static readonly ref = collection(db, this.collectionName);

    static get(id: string): Promise<DocumentSnapshot<DocumentData>> {
        return getDoc(doc(this.ref, id));
    }

    static async create(user1: string, user2: string): Promise<void> {
        const exists = await ChatCollection.find(user1, user2);

        if (exists) {
            return;
        }

        return setDoc(doc(this.ref), {
            receivers: [user1, user2],
            msgs: [],
            unread: 0,
            lastSender: user1
        });
    }

    static sendMessage(id: string, msg: string, user: string) {
        return updateDoc(doc(this.ref, id), {
            unread: increment(1),
            lastSender: user,
            msgs: arrayUnion({
                from: user,
                msg,
                timestamp: new Date().getTime()
            })
        });
    }

    static async find(user1: string, user2: string = null) {
        if (!user2) {
            const q = query(this.ref, where('receivers', 'array-contains', user1));
            const chats = await getDocs(q);

            return parseCollection(chats);
        }

        const q = query(this.ref, where('receivers', 'array-contains-any', [user1, user2]));
        const chats = await getDocs(q);
        let chatReference;

        chats.forEach((chat) => {
            const data = chat.data();
            if (
                !chatReference
                && data.receivers.includes(user1)
                && (user2 === null || data.receivers.includes(user2))
            ) {
                chatReference = { ...data, id: chat.id };
            }
        });

        return chatReference;
    }

    static async readMessages(id: string, user: string) {
        const chat = await ChatCollection.get(id);
        if (user === chat.data().lastSender) {
            return;
        }

        return updateDoc(doc(this.ref, id), {
            unread: 0
        });
    }

    static listener(id: string, callback) {
        return onSnapshot(doc(this.ref, id), callback);
    }
}