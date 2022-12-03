import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

export async function signinUser(email, password) {
    const auth = getAuth();
    await signInWithEmailAndPassword(auth, email, password);
}
