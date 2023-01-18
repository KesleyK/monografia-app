import { collection, DocumentData, getDocs, query, QuerySnapshot, where } from "firebase/firestore";
import { db } from "../../../config/firebase";

export default abstract class TeamsCollection {
    private static readonly collectionName = "teams";
    private static readonly ref = collection(db, this.collectionName);

    static getMain(): Promise<QuerySnapshot<DocumentData>> {
        const docsQuery = query(this.ref, where("ownerId", "==", "main"));

        return getDocs(docsQuery);
    }

    static async getAll(participants: string[]) {
        const docsQuery = query(this.ref, where("participants", "array-contains-any", participants));

        return getDocs(docsQuery);
    }
}