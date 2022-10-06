import { useState, useEffect } from "react";
import { watchAuthStateChange } from "../../services";

export function useAuthentication() {
    const [user, setUser] = useState();

    function onAuthStateChange(newUserState) {
        setUser(newUserState);
    }

    useEffect(() => {
        return watchAuthStateChange(onAuthStateChange);
    }, []);

    return { user };
}
