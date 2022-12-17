import { createUserWithEmailAndPassword, getAuth, sendEmailVerification } from "firebase/auth";
import { collection, doc, setDoc } from "firebase/firestore";
import { db } from '../../../config/firebase';
import { IUser } from "../../../models/IUser";
import { DBCollection } from "../db/collectionsMapping";

export async function createUser(user: IUser, password: string) {
    const auth = getAuth();
    const usersCollection = collection(db, DBCollection.USERS);
    const uid = user.email;
    
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, user.email, password);
        await sendEmailVerification(userCredential.user);
        await setDoc(doc(usersCollection, uid), user);
    } catch (err) {
        alert("Ocorreu um erro inesperado: " + err);
    }
}
