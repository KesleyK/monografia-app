import { collection, doc, DocumentData, DocumentSnapshot, getDoc, getDocs, query, QuerySnapshot, updateDoc, where } from "firebase/firestore";
import { db } from "../../../config/firebase";
import { ParticipantStatus } from "../../../models/enum/ParticipantStatus";

export default class ParticipantsCollection {
    private static readonly collectionName = "participants";
    private static readonly ref = collection(db, this.collectionName);

    static get(id: string = null): Promise<DocumentSnapshot<DocumentData>> {
        return getDoc(doc(this.ref, id));
    }

    static find(userId: string): Promise<QuerySnapshot<DocumentData>> {
        const docsQuery = query(this.ref, where("userId", "==", userId));

        return getDocs(docsQuery);
    }

    static updateStatus(id: string, status: ParticipantStatus) {
        return updateDoc(doc(this.ref, id), {
            status
        });
    }
}