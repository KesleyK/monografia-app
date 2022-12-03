import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

export async function createUser(email, password) {
    const auth = getAuth();
    await createUserWithEmailAndPassword(auth, email, password);
}
