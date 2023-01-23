import { collection, doc, DocumentData, DocumentSnapshot, getDoc, getDocs, QuerySnapshot, setDoc } from "firebase/firestore";
import { db } from "../../../config/firebase";
import { ITopic } from "../../../models/ITopic";

export default class TopicsCollection {
    private static readonly collectionName = "topics";
    private static readonly ref = collection(db, this.collectionName);

    static get(id: string = null): Promise<DocumentSnapshot<DocumentData>> {
        return getDoc(doc(this.ref, id));
    }

    static getAll(): Promise<QuerySnapshot<DocumentData>> {
        return getDocs(this.ref);
    }

    static createTestData(data: ITopic) {
        return setDoc(doc(this.ref), data);
    }
}