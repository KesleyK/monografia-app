import { collection, doc, DocumentData, DocumentSnapshot, getDoc, getDocs, QuerySnapshot, setDoc } from "firebase/firestore";
import { db } from "../../../config/firebase";
import { IUserProgress } from "../../../models/IUserProgress";

export default abstract class UserProgressCollection {
    private static collectionName = "user_progress";

    static get(id: string = null): Promise<DocumentSnapshot<DocumentData>> {
        return getDoc(doc(db, this.collectionName, id));
    }

    static getAll(): Promise<QuerySnapshot<DocumentData>> {
        return getDocs(collection(db, this.collectionName));
    }

    static createTestData(data: IUserProgress) {
        return setDoc(doc(collection(db, this.collectionName)), data);
    }
}