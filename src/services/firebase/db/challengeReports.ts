import { collection, doc, DocumentData, DocumentSnapshot, getDoc, getDocs, query, QuerySnapshot, setDoc, where } from "firebase/firestore";
import { db } from "../../../config/firebase";
import { parseCollection } from "../../../helpers/collectionUtils";
import { IChallengeReport } from "../../../models/IChallengeReport";
import { ITopic } from "../../../models/ITopic";
import SubtopicsCollection from "./subtopics";

export default class ChallengeReportsCollection {
    private static readonly collectionName = "challengeReports";
    private static readonly ref = collection(db, this.collectionName);

    static get(id: string = null): Promise<DocumentSnapshot<DocumentData>> {
        return getDoc(doc(this.ref, id));
    }

    static async find(user: string, challenges: string[] = []) {
        const filterUser = where("userId", "==", user);
        const q = challenges.length === 0 ?
            query(this.ref, filterUser)
            :
            query(this.ref, filterUser, where("challengeId", "in", challenges));

        const reports = await getDocs(q);
        return parseCollection(reports);
    }

    static async findByTopic(user: string, topic: ITopic) {
        const challenges = []
        const subtopics = parseCollection(await SubtopicsCollection.getAll(topic.subtopics));
        for (const subtopic of subtopics) {
            challenges.concat(subtopic.challenges);
        }

        return this.find(user, challenges);
    }

    static post(data: IChallengeReport) {
        return setDoc(doc(this.ref), data);
    }
}