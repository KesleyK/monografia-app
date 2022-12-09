import { useState, useEffect } from "react";
import { watchAuthStateChanged } from "../services/firebase/auth/watchAuthStateChanged";

export function useAuthentication() {
    const [user, setUser] = useState();

    function onAuthStateChange(newUserState) {
        setUser(newUserState);
    }

    useEffect(() => {
        return watchAuthStateChanged(onAuthStateChange);
    }, []);

    return { user };
}
