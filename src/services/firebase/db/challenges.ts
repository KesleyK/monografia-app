import { collection, doc, DocumentData, DocumentSnapshot, getDoc, getDocs, QuerySnapshot, setDoc } from "firebase/firestore";
import { db } from "../../../config/firebase";
import { IChallenge } from "../../../models/IChallenge";

export default class ChallengesCollection {
    private static readonly collectionName = "challenges";
    private static readonly ref = collection(db, this.collectionName);

    static get(id: string = null): Promise<DocumentSnapshot<DocumentData>> {
        return getDoc(doc(this.ref, id));
    }

    static getAll(): Promise<QuerySnapshot<DocumentData>> {
        return getDocs(this.ref);
    }

    static createTestData(data: IChallenge) {
        return setDoc(doc(this.ref), data);
    }
}