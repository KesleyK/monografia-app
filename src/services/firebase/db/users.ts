import { collection, doc, DocumentData, DocumentSnapshot, getDoc, getDocs, QuerySnapshot, setDoc } from "firebase/firestore";
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

    static getAll(): Promise<QuerySnapshot<DocumentData>> {
        return getDocs(this.ref);
    }

    static post(id: string, userInfo: IUser): Promise<void> {
        return setDoc(doc(this.ref, id), userInfo);
    }

    static put(id: string, userInfo: IUser): Promise<void> {
        return setDoc(doc(this.ref, id), userInfo, { merge: true });
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
