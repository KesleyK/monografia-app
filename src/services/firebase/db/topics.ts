import {
    collection,
    doc,
    DocumentData,
    documentId,
    DocumentSnapshot,
    getDoc,
    getDocs,
    query,
    QuerySnapshot,
    setDoc,
    where
} from "firebase/firestore";
import { db } from "../../../config/firebase";
import { ITopic } from "../../../models/ITopic";

export default class TopicsCollection {
    private static readonly collectionName = "topics";
    private static readonly ref = collection(db, this.collectionName);

    static get(id: string = null): Promise<DocumentSnapshot<DocumentData>> {
        return getDoc(doc(this.ref, id));
    }

    static getAll(ids: string[]): Promise<QuerySnapshot<DocumentData>> {
        if (!ids || ids.length === 0) {
            ids = ["none"];
        }

        const docsQuery = query(this.ref, where(documentId(), "in", ids));
        return getDocs(docsQuery);
    }

    static createTestData(data: ITopic) {
        const createdDoc = doc(this.ref);
        setDoc(createdDoc, data);

        return {id: createdDoc.id, ...data};
    }
}