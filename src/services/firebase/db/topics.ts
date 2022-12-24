import { collection, doc, DocumentData, DocumentSnapshot, getDoc, getDocs, QuerySnapshot, setDoc } from "firebase/firestore";
import { db } from "../../../config/firebase";
import { ITopic } from "../../../models/ITopic";

export default abstract class TopicsCollection {
    private static collectionName = "topics";

    static get(id: string = null): Promise<DocumentSnapshot<DocumentData>> {
        return getDoc(doc(db, this.collectionName, id));
    }

    static getAll(): Promise<QuerySnapshot<DocumentData>> {
        return getDocs(collection(db, this.collectionName));
    }

    static testMass(data: ITopic) {
        return setDoc(doc(collection(db, this.collectionName)), data);
    }
}