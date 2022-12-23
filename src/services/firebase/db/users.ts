import { collection, doc, DocumentData, DocumentSnapshot, getDoc, setDoc } from "firebase/firestore";
import { db } from "../../../config/firebase";
import { getDateFromSeconds } from "../../../helpers/dateUtils";
import { EducationalBackground } from "../../../models/enum/EducationalBackground";
import { IUser } from "../../../models/IUser";

export default abstract class UsersCollection {
    private static collectionName = "users";
    
    static get(id: string): Promise<DocumentSnapshot<DocumentData>> {
        return getDoc(doc(db, this.collectionName, id));
    }

    static post(id: string, userInfo: IUser): Promise<void> {
        return setDoc(doc(collection(db, this.collectionName), id), userInfo);
    }

    static put(id: string, userInfo: IUser): Promise<void> {
        return setDoc(doc(collection(db, this.collectionName), id), userInfo, { merge: true });
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
