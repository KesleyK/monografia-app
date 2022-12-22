import { createUserWithEmailAndPassword, getAuth, sendEmailVerification } from "firebase/auth";
import { IUser } from "../../../models/IUser";
import UsersCollection from "../db/users";

export async function createUser(user: IUser, password: string) {
    const auth = getAuth();

    try {
        const userCredential = await createUserWithEmailAndPassword(auth, user.email, password);
        await sendEmailVerification(userCredential.user);
        await UsersCollection.post(user.email, user);
    } catch (err) {
        alert("Ocorreu um erro inesperado: " + err);
    }
}
