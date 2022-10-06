import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';

export async function createUser(email, password) {
    const auth = getAuth();

    await createUserWithEmailAndPassword(auth, email, password);
};

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
