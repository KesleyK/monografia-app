import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { IUser } from "../../../models/IUser";
import { collection, addDoc } from "firebase/firestore";
import { db } from '../../../config/firebase'

export async function createUser(user: IUser, password: string) {
    const auth = getAuth();
    await createUserWithEmailAndPassword(auth, user.email, password);
    await addDoc(collection(db, "users"), user);
}