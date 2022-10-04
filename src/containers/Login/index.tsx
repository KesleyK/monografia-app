import { useState } from "react";
import { Button, Input, PrimaryTitle, Wrapper } from "../../components";

export function Login() {
    const [user, setUser] = useState("");
    const [password, setPassword] = useState("");

    const onFormSubmit = () => {
        const formData = {
            user,
            password,
        };

        console.log(formData);
    };

    return (
        <Wrapper>
            <PrimaryTitle>Login</PrimaryTitle>

            <Input placeholder="Usuário" value={user} onChangeText={setUser} />

            <Input
                placeholder="Senha"
                onChangeText={setPassword}
                value={password}
            />

            <Button title="Login" onPress={onFormSubmit} />
        </Wrapper>
    );
}
