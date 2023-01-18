import {
    arrayRemove, arrayUnion, collection, doc, DocumentData,
    getDoc, getDocs, query, QuerySnapshot, updateDoc, where
} from "firebase/firestore";
import { db } from "../../../config/firebase";
import { IParticipant } from "../../../models/IParticipant";

export default abstract class TeamsCollection {
    private static readonly collectionName = "teams";
    private static readonly ref = collection(db, this.collectionName);

    static getMain(): Promise<QuerySnapshot<DocumentData>> {
        const docsQuery = query(this.ref, where("ownerId", "==", "main"));

        return getDocs(docsQuery);
    }

    static async getAll(user: string) {
        return getDoc(doc(this.ref, user));
        // const docsQuery = query(this.ref, where("participants", "array-contains", { userId: user, points: 1, invitationStatus: "PENDING" }));

        // return getDocs(docsQuery);
    }

    static insertParticipant(id: string, participant: IParticipant) {
        return updateDoc(doc(this.ref, id), {
            participants: arrayUnion(participant)
        });
    }

    static deleteParticipant(id: string, participant: IParticipant) {
        return updateDoc(doc(this.ref, id), {
            participants: arrayRemove(participant)
        });
    }
}