import { collection, doc, DocumentData, DocumentSnapshot, getDoc, getDocs, query, QuerySnapshot, setDoc, where } from "firebase/firestore";
import { db } from "../../../config/firebase";
import { parseCollection } from "../../../helpers/collectionUtils";
import { IChallengeReport } from "../../../models/IChallengeReport";

export default class UserProgressCollection {
    private static readonly collectionName = "challengeReports";
    private static readonly ref = collection(db, this.collectionName);

    static get(id: string = null): Promise<DocumentSnapshot<DocumentData>> {
        return getDoc(doc(this.ref, id));
    }

    static async find(user: string, challenge: string = null) {
        const q = query(this.ref, where("userId", "==", user));
        const chats = await getDocs(q);

        return parseCollection(chats);
    }

    static post(data: IChallengeReport) {
        return setDoc(doc(this.ref), data);
    }
}