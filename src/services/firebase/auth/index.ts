import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth';

export async function createUser(email, password) {
    const auth = getAuth();
    await createUserWithEmailAndPassword(auth, email, password);
};

export async function signinUser(email, password) {
    const auth = getAuth();
    await signInWithEmailAndPassword(auth, email, password);
}

export async function signoutUser() {
    const auth = getAuth();
    await signOut(auth);
}

export function watchAuthStateChange(onAuthStateChange) {
    const auth = getAuth();
    const unsubscribeFromAuthStatuChanged = onAuthStateChanged(
        auth,
        (user) => {
            if (user) {
                onAuthStateChange(user);
            } else {
                onAuthStateChange(undefined);
            }
        }
    );

    return unsubscribeFromAuthStatuChanged;
}
