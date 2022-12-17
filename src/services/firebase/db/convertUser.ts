import { DocumentData, DocumentSnapshot } from "firebase/firestore";
import { getDateFromSeconds } from "../../../helpers/dateUtils";
import { EducationalBackground } from "../../../models/enum/EducationalBackground";
import { IUser } from "../../../models/IUser";

export function convertUser(firestoreSnapshot: DocumentSnapshot<DocumentData>): IUser {
    const firestoreData = firestoreSnapshot.data();

    return {
        name: firestoreData.name,
        email: firestoreData.email,
        educationalBackground: EducationalBackground[firestoreData.educationalBackground],
        birthDate: getDateFromSeconds(firestoreData.birthDate.seconds),
        points: firestoreData.points
    };
}