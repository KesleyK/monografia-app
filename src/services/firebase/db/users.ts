import {
    collection,
    doc,
    DocumentData,
    DocumentSnapshot,
    getDoc,
    getDocs,
    increment,
    orderBy,
    query,
    QuerySnapshot,
    setDoc,
    updateDoc,
    limit
} from "firebase/firestore";
import { db } from "../../../config/firebase";
import { getDateFromSeconds } from "../../../helpers/dateUtils";
import { EducationalBackground } from "../../../models/enum/EducationalBackground";
import { IUser } from "../../../models/IUser";

export default class UsersCollection {
    private static readonly collectionName = "users";
    private static readonly ref = collection(db, this.collectionName);

    static get(id: string): Promise<DocumentSnapshot<DocumentData>> {
        return getDoc(doc(this.ref, id));
    }

    static getAll(team = null): Promise<QuerySnapshot<DocumentData>> {
        const order = orderBy("points", "desc");
        const q = query(this.ref, order);

        return getDocs(q);
    }

    static find(limitBy, team = null): Promise<QuerySnapshot<DocumentData>> {
        const order = orderBy("points", "desc");
        const q = query(this.ref, order, limit(limitBy));

        return getDocs(q);
    }

    static post(id: string, userInfo: IUser): Promise<void> {
        return setDoc(doc(this.ref, id), userInfo);
    }

    static put(id: string, userInfo: IUser): Promise<void> {
        return setDoc(doc(this.ref, id), userInfo, { merge: true });
    }

    static acquirePoints(id: string, points: number) {
        return updateDoc(doc(this.ref, id), {
            points: increment(points),
        });
    }

    static convert(firestoreSnapshot: DocumentSnapshot<DocumentData>): IUser {
        const firestoreData = firestoreSnapshot.data();

        return {
            name: firestoreData.name,
            email: firestoreData.email,
            educationalBackground: Object.values(EducationalBackground).find(
                (s) => s === firestoreData.educationalBackground
            ),
            birthDate: getDateFromSeconds(firestoreData.birthDate.seconds),
            points: firestoreData.points
        };
    }
}
