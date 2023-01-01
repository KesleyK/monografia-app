import { collection, doc, DocumentData, DocumentSnapshot, getDoc, getDocs, QuerySnapshot, setDoc } from "firebase/firestore";
import { db } from "../../../config/firebase";
import { IChallenge } from "../../../models/IChallenge";

export default abstract class ChallengesCollection {
    private static collectionName = "topics";

    static get(id: string = null): Promise<DocumentSnapshot<DocumentData>> {
        return getDoc(doc(db, this.collectionName, id));
    }

    static getAll(): Promise<QuerySnapshot<DocumentData>> {
        return getDocs(collection(db, this.collectionName));
    }

    static createTestData(data: IChallenge) {
        return setDoc(doc(collection(db, this.collectionName)), data);
    }
}