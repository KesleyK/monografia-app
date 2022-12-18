import { createUserWithEmailAndPassword, getAuth, sendEmailVerification } from "firebase/auth";
import { collection, doc, setDoc } from "firebase/firestore";
import { db } from '../../../config/firebase';
import { IUser } from "../../../models/IUser";
import { DBCollection } from "../db/collectionsMapping";

export async function updateUserProfile(user: IUser) {
    const auth = getAuth();
    const usersCollection = collection(db, DBCollection.USERS);
    const uid = user.email;
    
    return await setDoc(doc(usersCollection, uid), user, { merge: true });
}
