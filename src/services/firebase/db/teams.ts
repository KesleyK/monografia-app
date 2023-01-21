import { arrayUnion, collection, doc, DocumentData, getDocs, query, QuerySnapshot, updateDoc, where } from "firebase/firestore";
import { db } from "../../../config/firebase";
import { parseCollection } from "../../../helpers/collectionUtils";

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

    static async addGlobalCourse(topicId) {
        const global = parseCollection(await this.getMain())[0];

        return updateDoc(doc(this.ref, global.id), {
            topics: arrayUnion(topicId)
        });
    }
}