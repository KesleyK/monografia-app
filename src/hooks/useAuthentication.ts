import { useState, useEffect } from "react";
import { watchAuthStateChanged } from "../services/firebase/auth/watchAuthStateChanged";

export function useAuthentication() {
    const [user, setUser] = useState();
    const [handshakeAccomplished, setHandshakeAccomplished] = useState(false);

    function onAuthStateChange(newUserState) {
        setUser(newUserState);
        setHandshakeAccomplished(true);
    }

    useEffect(() => {
        return watchAuthStateChanged(onAuthStateChange);
    }, []);

    return { user, handshakeAccomplished };
}
